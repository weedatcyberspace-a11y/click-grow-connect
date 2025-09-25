-- Create investments table to track user investments
CREATE TABLE public.investments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  package_title TEXT NOT NULL,
  invested_amount NUMERIC NOT NULL,
  expected_return NUMERIC NOT NULL,
  investment_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  maturity_date TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'matured', 'withdrawn')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create transactions table for deposits/withdrawals/returns
CREATE TABLE public.transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('deposit', 'withdrawal', 'investment', 'return')),
  amount NUMERIC NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.investments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for investments
CREATE POLICY "Users can view their own investments" 
ON public.investments 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own investments" 
ON public.investments 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own investments" 
ON public.investments 
FOR UPDATE 
USING (auth.uid() = user_id);

-- RLS Policies for transactions
CREATE POLICY "Users can view their own transactions" 
ON public.transactions 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own transactions" 
ON public.transactions 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create trigger for updating timestamps
CREATE TRIGGER update_investments_updated_at
BEFORE UPDATE ON public.investments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_transactions_updated_at
BEFORE UPDATE ON public.transactions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Function to handle investment creation
CREATE OR REPLACE FUNCTION public.create_investment(
  package_title_param TEXT,
  invested_amount_param NUMERIC,
  cycle_days_param INTEGER
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_profile_id UUID;
  expected_return_amount NUMERIC;
  maturity_date_calc TIMESTAMP WITH TIME ZONE;
  result JSON;
BEGIN
  -- Get the user's profile
  SELECT id INTO user_profile_id 
  FROM public.profiles 
  WHERE user_id = auth.uid() 
  LIMIT 1;
  
  IF user_profile_id IS NULL THEN
    RETURN JSON_BUILD_OBJECT('success', false, 'message', 'Profile not found');
  END IF;
  
  -- Check if user has sufficient balance
  IF (SELECT account_balance FROM public.profiles WHERE user_id = auth.uid()) < invested_amount_param THEN
    RETURN JSON_BUILD_OBJECT('success', false, 'message', 'Insufficient balance');
  END IF;
  
  -- Calculate expected return (invested amount * 8)
  expected_return_amount := invested_amount_param * 8;
  
  -- Calculate maturity date
  maturity_date_calc := now() + interval '1 day' * cycle_days_param;
  
  -- Create investment record
  INSERT INTO public.investments (
    user_id, 
    package_title, 
    invested_amount, 
    expected_return, 
    maturity_date
  ) VALUES (
    auth.uid(), 
    package_title_param, 
    invested_amount_param, 
    expected_return_amount, 
    maturity_date_calc
  );
  
  -- Deduct from user balance
  UPDATE public.profiles 
  SET account_balance = account_balance - invested_amount_param,
      updated_at = now()
  WHERE user_id = auth.uid();
  
  -- Create transaction record
  INSERT INTO public.transactions (
    user_id, 
    type, 
    amount, 
    description
  ) VALUES (
    auth.uid(), 
    'investment', 
    -invested_amount_param, 
    'Investment in ' || package_title_param
  );
  
  RETURN JSON_BUILD_OBJECT(
    'success', true, 
    'message', 'Investment created successfully',
    'expected_return', expected_return_amount,
    'maturity_date', maturity_date_calc
  );
END;
$$;

-- Function to handle deposits
CREATE OR REPLACE FUNCTION public.process_deposit(amount_param NUMERIC)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_profile_id UUID;
  result JSON;
BEGIN
  -- Get the user's profile
  SELECT id INTO user_profile_id 
  FROM public.profiles 
  WHERE user_id = auth.uid() 
  LIMIT 1;
  
  IF user_profile_id IS NULL THEN
    RETURN JSON_BUILD_OBJECT('success', false, 'message', 'Profile not found');
  END IF;
  
  -- Add to user balance
  UPDATE public.profiles 
  SET account_balance = account_balance + amount_param,
      updated_at = now()
  WHERE user_id = auth.uid();
  
  -- Create transaction record
  INSERT INTO public.transactions (
    user_id, 
    type, 
    amount, 
    description
  ) VALUES (
    auth.uid(), 
    'deposit', 
    amount_param, 
    'Account deposit'
  );
  
  RETURN JSON_BUILD_OBJECT(
    'success', true, 
    'message', 'Deposit processed successfully'
  );
END;
$$;

-- Function to handle withdrawals
CREATE OR REPLACE FUNCTION public.process_withdrawal(amount_param NUMERIC)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_profile_id UUID;
  current_balance NUMERIC;
  result JSON;
BEGIN
  -- Get the user's profile and balance
  SELECT id, account_balance INTO user_profile_id, current_balance
  FROM public.profiles 
  WHERE user_id = auth.uid() 
  LIMIT 1;
  
  IF user_profile_id IS NULL THEN
    RETURN JSON_BUILD_OBJECT('success', false, 'message', 'Profile not found');
  END IF;
  
  -- Check sufficient balance
  IF current_balance < amount_param THEN
    RETURN JSON_BUILD_OBJECT('success', false, 'message', 'Insufficient balance');
  END IF;
  
  -- Deduct from user balance
  UPDATE public.profiles 
  SET account_balance = account_balance - amount_param,
      updated_at = now()
  WHERE user_id = auth.uid();
  
  -- Create transaction record
  INSERT INTO public.transactions (
    user_id, 
    type, 
    amount, 
    description,
    status
  ) VALUES (
    auth.uid(), 
    'withdrawal', 
    -amount_param, 
    'Account withdrawal',
    'pending'
  );
  
  RETURN JSON_BUILD_OBJECT(
    'success', true, 
    'message', 'Withdrawal request submitted'
  );
END;
$$;