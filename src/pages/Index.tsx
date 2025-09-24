import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { InvestmentPackages } from "@/components/InvestmentPackages";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <InvestmentPackages />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
