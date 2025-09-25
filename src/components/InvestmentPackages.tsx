import { useState } from "react";
import { InvestmentCard } from "./InvestmentCard";
import { useToast } from "@/hooks/use-toast";
import powerwallImage from "@/assets/powerwall.jpg";
import solarRoofImage from "@/assets/solar-roof.jpg";
import teslaBotImage from "@/assets/tesla-bot.jpg";
import selfDrivingImage from "@/assets/self-driving.jpg";
import modelLineupImage from "@/assets/model-lineup.jpg";
import teslaRoadsterImage from "@/assets/tesla-roadster.jpg";
import teslaSemiImage from "@/assets/tesla-semi.jpg";
import cybertruckImage from "@/assets/cybertruck.jpg";

interface InvestmentPackagesProps {
  onInvest?: (packageData: { title: string; price: number }) => void;
}

export const InvestmentPackages = ({ onInvest }: InvestmentPackagesProps) => {
  const { toast } = useToast();

  const handleBuyPackage = (packageTitle: string, packagePrice: number) => {
    if (onInvest) {
      onInvest({ title: packageTitle, price: packagePrice });
    } else {
      toast({
        title: "Investment Selected",
        description: `You selected ${packageTitle} for KES ${packagePrice.toLocaleString()}`,
      });
    }
  };

  const packages = [
    {
      title: "Basic Starter Package",
      image: powerwallImage,
      cycle: "7 Days",
      available: 15,
      price: 500,
      originalPrice: 600,
      daily: 57, // (500 * 4) / 7 days = ~286 daily profit, so 57 daily return
      total: 2000, // 500 * 4 (investment doubled twice)
      discount: "17% OFF",
    },
    {
      title: "Solar Panel Investment",
      image: solarRoofImage,
      cycle: "10 Days",
      available: 12,
      price: 1000,
      originalPrice: 1200,
      daily: 100, // (1000 * 4) / 10 days = 400 daily profit
      total: 4000, // 1000 * 4
      discount: "17% OFF",
    },
    {
      title: "Electric Vehicle Parts",
      image: modelLineupImage,
      cycle: "14 Days",
      available: 10,
      price: 2000,
      originalPrice: 2400,
      daily: 143, // (2000 * 4) / 14 days = ~571 daily profit
      total: 8000, // 2000 * 4
      discount: "17% OFF",
    },
    {
      title: "Battery Technology",
      image: powerwallImage,
      cycle: "21 Days",
      available: 8,
      price: 3500,
      originalPrice: 4200,
      daily: 167, // (3500 * 4) / 21 days = ~667 daily profit
      total: 14000, // 3500 * 4
      discount: "17% OFF",
    },
    {
      title: "Smart Energy Systems",
      image: solarRoofImage,
      cycle: "30 Days",
      available: 6,
      price: 5000,
      originalPrice: 6000,
      daily: 167, // (5000 * 4) / 30 days = ~667 daily profit
      total: 20000, // 5000 * 4
      discount: "17% OFF",
    },
    {
      title: "Autonomous Driving Tech",
      image: selfDrivingImage,
      cycle: "45 Days",
      available: 5,
      price: 8000,
      originalPrice: 9600,
      daily: 178, // (8000 * 4) / 45 days = ~711 daily profit
      total: 32000, // 8000 * 4
      discount: "17% OFF",
    },
    {
      title: "Tesla Bot Development",
      image: teslaBotImage,
      cycle: "60 Days",
      available: 4,
      price: 12000,
      originalPrice: 14400,
      daily: 200, // (12000 * 4) / 60 days = 800 daily profit
      total: 48000, // 12000 * 4
      discount: "17% OFF",
    },
    {
      title: "Premium Vehicle Package",
      image: teslaRoadsterImage,
      cycle: "30 Days",
      available: 3,
      price: 15000,
      originalPrice: 18000,
      daily: 500, // (15000 * 4) / 30 days = 2000 daily profit
      total: 60000, // 15000 * 4
      discount: "17% OFF",
    },
    {
      title: "Commercial Transport",
      image: teslaSemiImage,
      cycle: "45 Days",
      available: 2,
      price: 20000,
      originalPrice: 24000,
      daily: 533, // (20000 * 4) / 45 days = ~1778 daily profit
      total: 80000, // 20000 * 4
      discount: "17% OFF",
    },
    {
      title: "Next-Gen Vehicle Platform",
      image: cybertruckImage,
      cycle: "60 Days",
      available: 2,
      price: 30000,
      originalPrice: 36000,
      daily: 500, // (30000 * 4) / 60 days = 2000 daily profit
      total: 120000, // 30000 * 4
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
              onBuy={() => handleBuyPackage(pkg.title, pkg.price)}
            />
          ))}
        </div>

      </div>
    </section>
  );
};