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
      title: "Powerwall Battery Manufacturing",
      image: powerwallImage,
      cycle: "2 Days",
      available: 6,
      price: 200,
      originalPrice: 222,
      daily: 125,
      total: 250,
      discount: "Limited Offer",
    },
    {
      title: "Solar Roof",
      image: solarRoofImage,
      cycle: "3 Days",
      available: 6,
      price: 11000,
      originalPrice: 12222,
      daily: 7000,
      total: 21000,
      discount: "10% OFF",
    },
    {
      title: "Tesla Bot (Optimus)",
      image: teslaBotImage,
      cycle: "60 Days",
      available: 7,
      price: 13500,
      originalPrice: 15000,
      daily: 600,
      total: 36000,
      discount: "10% OFF",
    },
    {
      title: "Full Self-Driving (FSD) Project",
      image: selfDrivingImage,
      cycle: "45 Days",
      available: 8,
      price: 22500,
      originalPrice: 25000,
      daily: 1750,
      total: 78750,
      discount: "10% OFF",
    },
    {
      title: "Model Lineup (S, 3, X, Y)",
      image: modelLineupImage,
      cycle: "30 Days",
      available: 4,
      price: 18000,
      originalPrice: 20000,
      daily: 2000,
      total: 60000,
      discount: "10% OFF",
    },
    {
      title: "Tesla Roadster",
      image: teslaRoadsterImage,
      cycle: "30 Days",
      available: 5,
      price: 40500,
      originalPrice: 45000,
      daily: 3600,
      total: 108000,
      discount: "10% OFF",
    },
    {
      title: "Tesla Semi",
      image: teslaSemiImage,
      cycle: "30 Days",
      available: 3,
      price: 90000,
      originalPrice: 100000,
      daily: 6000,
      total: 180000,
      discount: "10% OFF",
    },
    {
      title: "Cybertruck",
      image: cybertruckImage,
      cycle: "30 Days",
      available: 9,
      price: 117000,
      originalPrice: 130000,
      daily: 8000,
      total: 240000,
      discount: "10% OFF",
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