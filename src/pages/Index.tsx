import { useState, useEffect } from "react";
import { LoginForm } from "@/components/LoginForm";
import { UserDashboard } from "@/components/UserDashboard";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { InvestmentPackages } from "@/components/InvestmentPackages";
import { Footer } from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [showDashboard, setShowDashboard] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = (userData: { email: string; name: string }) => {
    // This is handled by the auth state change listener
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setShowDashboard(false);
  };

  const handleInvest = async (packageData: { title: string; price: number; cycle: string }) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to make an investment",
        variant: "destructive",
      });
      return;
    }

    try {
      // Extract number of days from cycle string (e.g., "7 Days" -> 7)
      const cycleDays = parseInt(packageData.cycle.split(' ')[0]);
      
      const { data, error } = await supabase.rpc('create_investment', {
        package_title_param: packageData.title,
        invested_amount_param: packageData.price,
        cycle_days_param: cycleDays
      });

      const result = data as { success: boolean; message: string };

      if (result.success) {
        toast({
          title: "Investment Successful",
          description: `Invested KES ${packageData.price.toLocaleString()} in ${packageData.title}`,
        });
        setShowDashboard(true);
      } else {
        toast({
          title: "Investment Failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Investment error:', error);
      toast({
        title: "Error",
        description: "Failed to process investment",
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  if (showDashboard) {
    return (
      <UserDashboard 
        user={{ email: user.email || '', name: user.email?.split('@')[0] || '' }} 
        onLogout={handleLogout}
        onBack={() => setShowDashboard(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <InvestmentPackages onInvest={handleInvest} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
