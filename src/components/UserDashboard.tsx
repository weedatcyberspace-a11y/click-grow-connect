import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Transaction {
  id: string;
  type: string;
  amount: number;
  description: string;
  status: string;
  created_at: string;
}

interface Investment {
  id: string;
  package_title: string;
  invested_amount: number;
  expected_return: number;
  investment_date: string;
  maturity_date: string;
  status: string;
}

interface UserDashboardProps {
  user: { email: string; name: string };
  onLogout: () => void;
  onBack: () => void;
}

export const UserDashboard = ({ user, onLogout, onBack }: UserDashboardProps) => {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      // Fetch profile data
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('account_balance, total_earned')
        .single();
      
      if (profileError) throw profileError;
      
      setBalance(profile?.account_balance || 0);

      // Fetch transactions
      const { data: transactionsData, error: transactionsError } = await supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (transactionsError) throw transactionsError;
      setTransactions(transactionsData || []);

      // Fetch investments
      const { data: investmentsData, error: investmentsError } = await supabase
        .from('investments')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (investmentsError) throw investmentsError;
      setInvestments(investmentsData || []);

    } catch (error) {
      console.error('Error fetching user data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch user data",
        variant: "destructive",
      });
    }
  };

  const handleDeposit = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid deposit amount",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('process_deposit', {
        amount_param: parseFloat(amount)
      });

      const result = data as { success: boolean; message: string };
      
      if (result.success) {
        toast({
          title: "Deposit Successful",
          description: result.message,
        });
        setAmount("");
        fetchUserData();
      } else {
        toast({
          title: "Deposit Failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Deposit error:', error);
      toast({
        title: "Error",
        description: "Failed to process deposit",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleWithdrawal = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount", 
        description: "Please enter a valid withdrawal amount",
        variant: "destructive",
      });
      return;
    }

    if (parseFloat(amount) > balance) {
      toast({
        title: "Insufficient Balance",
        description: "Withdrawal amount exceeds available balance",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('process_withdrawal', {
        amount_param: parseFloat(amount)
      });

      const result = data as { success: boolean; message: string };

      if (result.success) {
        toast({
          title: "Withdrawal Initiated",
          description: result.message,
        });
        setAmount("");
        fetchUserData();
      } else {
        toast({
          title: "Withdrawal Failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Withdrawal error:', error);
      toast({
        title: "Error",
        description: "Failed to process withdrawal",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Investment Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user.name}</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onBack}>
              Back to Packages
            </Button>
            <Button variant="outline" onClick={onLogout}>
              Logout
            </Button>
          </div>
        </div>

        {/* Balance Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Account Balance</CardTitle>
            <CardDescription>Your available investment balance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-investment-primary mb-4">
              KES {balance.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="transactions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="deposit-withdraw">Deposit/Withdraw</TabsTrigger>
            <TabsTrigger value="investments">My Investments</TabsTrigger>
          </TabsList>

          <TabsContent value="transactions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your latest account activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {transactions.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">No transactions yet</p>
                  ) : (
                    transactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(transaction.created_at)} • {transaction.type}
                          </p>
                        </div>
                        <div className="text-right flex items-center gap-2">
                          <div>
                            <p className={`font-medium ${
                              transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {transaction.amount > 0 ? '+' : ''}KES {Math.abs(transaction.amount).toLocaleString()}
                            </p>
                          </div>
                          <Badge className={getStatusColor(transaction.status)}>
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deposit-withdraw" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Deposit & Withdrawal</CardTitle>
                <CardDescription>Manage your account funds</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (KES)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    disabled={loading}
                  />
                </div>
                <div className="flex gap-3">
                  <Button 
                    onClick={handleDeposit}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Deposit"}
                  </Button>
                  <Button 
                    onClick={handleWithdrawal}
                    variant="outline"
                    className="flex-1"
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Withdraw"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="investments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>My Investments</CardTitle>
                <CardDescription>Track your investment portfolio</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {investments.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">No investments yet</p>
                  ) : (
                    investments.map((investment) => (
                      <div key={investment.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold">{investment.package_title}</h3>
                          <Badge className={getStatusColor(investment.status)}>
                            {investment.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Invested</p>
                            <p className="font-medium">KES {investment.invested_amount.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Expected Return</p>
                            <p className="font-medium text-green-600">KES {investment.expected_return.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Investment Date</p>
                            <p className="font-medium">{formatDate(investment.investment_date)}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Maturity Date</p>
                            <p className="font-medium">{formatDate(investment.maturity_date)}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};