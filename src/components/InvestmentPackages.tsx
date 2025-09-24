import { InvestmentCard } from "./InvestmentCard";
import { useToast } from "@/components/ui/use-toast";
import powerwallImage from "@/assets/powerwall.jpg";
import solarRoofImage from "@/assets/solar-roof.jpg";
import teslaBotImage from "@/assets/tesla-bot.jpg";
import selfDrivingImage from "@/assets/self-driving.jpg";
import modelLineupImage from "@/assets/model-lineup.jpg";
import teslaRoadsterImage from "@/assets/tesla-roadster.jpg";
import teslaSemiImage from "@/assets/tesla-semi.jpg";
import cybertruckImage from "@/assets/cybertruck.jpg";

export const InvestmentPackages = () => {
  const { toast } = useToast();

  const handleBuyPackage = (packageName: string) => {
    toast({
      title: "Ready to Invest?",
      description: `Contact us on WhatsApp to purchase the ${packageName} package. Our team will guide you through the process.`,
      duration: 5000,
    });
    
    // Open WhatsApp with pre-filled message
    const message = encodeURIComponent(`Hi! I'm interested in the ${packageName} investment package. Can you help me get started?`);
    window.open(`https://wa.me/254114470612?text=${message}`, "_blank");
  };

  const packages = [
    {
      title: "Basic Starter Package",
      image: powerwallImage,
      cycle: "7 Days",
      available: 15,
      price: 500,
      originalPrice: 600,
      daily: 25,
      total: 175,
      discount: "17% OFF",
    },
    {
      title: "Solar Panel Investment",
      image: solarRoofImage,
      cycle: "10 Days",
      available: 12,
      price: 1000,
      originalPrice: 1200,
      daily: 50,
      total: 500,
      discount: "17% OFF",
    },
    {
      title: "Electric Vehicle Parts",
      image: modelLineupImage,
      cycle: "14 Days",
      available: 10,
      price: 2000,
      originalPrice: 2400,
      daily: 100,
      total: 1400,
      discount: "17% OFF",
    },
    {
      title: "Battery Technology",
      image: powerwallImage,
      cycle: "21 Days",
      available: 8,
      price: 3500,
      originalPrice: 4200,
      daily: 175,
      total: 3675,
      discount: "17% OFF",
    },
    {
      title: "Smart Energy Systems",
      image: solarRoofImage,
      cycle: "30 Days",
      available: 6,
      price: 5000,
      originalPrice: 6000,
      daily: 250,
      total: 7500,
      discount: "17% OFF",
    },
    {
      title: "Autonomous Driving Tech",
      image: selfDrivingImage,
      cycle: "45 Days",
      available: 5,
      price: 8000,
      originalPrice: 9600,
      daily: 400,
      total: 18000,
      discount: "17% OFF",
    },
    {
      title: "Tesla Bot Development",
      image: teslaBotImage,
      cycle: "60 Days",
      available: 4,
      price: 12000,
      originalPrice: 14400,
      daily: 600,
      total: 36000,
      discount: "17% OFF",
    },
    {
      title: "Premium Vehicle Package",
      image: teslaRoadsterImage,
      cycle: "30 Days",
      available: 3,
      price: 15000,
      originalPrice: 18000,
      daily: 750,
      total: 22500,
      discount: "17% OFF",
    },
    {
      title: "Commercial Transport",
      image: teslaSemiImage,
      cycle: "45 Days",
      available: 2,
      price: 20000,
      originalPrice: 24000,
      daily: 1000,
      total: 45000,
      discount: "17% OFF",
    },
    {
      title: "Next-Gen Vehicle Platform",
      image: cybertruckImage,
      cycle: "60 Days",
      available: 2,
      price: 30000,
      originalPrice: 36000,
      daily: 1500,
      total: 90000,
      discount: "17% OFF",
    },
  ];

  return (
    <section id="packages" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Investment Packages
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose from our diverse portfolio of cutting-edge technology investments. 
            Each package offers different returns and investment periods.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <InvestmentCard
              key={index}
              title={pkg.title}
              image={pkg.image}
              cycle={pkg.cycle}
              available={pkg.available}
              price={pkg.price}
              originalPrice={pkg.originalPrice}
              daily={pkg.daily}
              total={pkg.total}
              discount={pkg.discount}
              onBuy={() => handleBuyPackage(pkg.title)}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Need help choosing the right package for you?
          </p>
          <button
            onClick={() => window.open("https://wa.me/254114470612", "_blank")}
            className="inline-flex items-center gap-2 text-investment-primary hover:text-investment-accent transition-colors"
          >
            💬 Chat with our investment advisors on WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
};