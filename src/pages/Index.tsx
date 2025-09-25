import { useState } from "react";
import { LoginForm } from "@/components/LoginForm";
import { UserProfile } from "@/components/UserProfile";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { InvestmentPackages } from "@/components/InvestmentPackages";
import { Footer } from "@/components/Footer";

const Index = () => {
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);

  const handleLogin = (userData: { email: string; name: string }) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleInvest = (packageData: { title: string; price: number }) => {
    // Mock investment logic - would integrate with backend
    console.log("Investment made:", packageData);
  };

  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <InvestmentPackages onInvest={handleInvest} />
        <UserProfile user={user} onLogout={handleLogout} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
