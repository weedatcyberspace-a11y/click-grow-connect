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
  onInvest?: (packageData: { title: string; price: number; cycle: string }) => void;
}

export const InvestmentPackages = ({ onInvest }: InvestmentPackagesProps) => {
  const { toast } = useToast();

  const handleBuyPackage = (packageTitle: string, packagePrice: number, cycle: string) => {
    if (onInvest) {
      onInvest({ title: packageTitle, price: packagePrice, cycle });
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
      daily: 114, // (500 * 8) / 7 days = ~571 daily profit  
      total: 4000, // 500 * 8 (doubled then multiplied by 4)
      discount: "17% OFF",
    },
    {
      title: "Solar Panel Investment",
      image: solarRoofImage,
      cycle: "10 Days",
      available: 12,
      price: 1000,
      originalPrice: 1200,
      daily: 800, // (1000 * 8) / 10 days = 800 daily profit
      total: 8000, // 1000 * 8
      discount: "17% OFF",
    },
    {
      title: "Electric Vehicle Parts",
      image: modelLineupImage,
      cycle: "14 Days",
      available: 10,
      price: 2000,
      originalPrice: 2400,
      daily: 1143, // (2000 * 8) / 14 days = ~1143 daily profit
      total: 16000, // 2000 * 8
      discount: "17% OFF",
    },
    {
      title: "Battery Technology",
      image: powerwallImage,
      cycle: "21 Days",
      available: 8,
      price: 3500,
      originalPrice: 4200,
      daily: 1333, // (3500 * 8) / 21 days = ~1333 daily profit
      total: 28000, // 3500 * 8
      discount: "17% OFF",
    },
    {
      title: "Smart Energy Systems",
      image: solarRoofImage,
      cycle: "30 Days",
      available: 6,
      price: 5000,
      originalPrice: 6000,
      daily: 1333, // (5000 * 8) / 30 days = ~1333 daily profit
      total: 40000, // 5000 * 8
      discount: "17% OFF",
    },
    {
      title: "Autonomous Driving Tech",
      image: selfDrivingImage,
      cycle: "45 Days",
      available: 5,
      price: 8000,
      originalPrice: 9600,
      daily: 1422, // (8000 * 8) / 45 days = ~1422 daily profit
      total: 64000, // 8000 * 8
      discount: "17% OFF",
    },
    {
      title: "Tesla Bot Development",
      image: teslaBotImage,
      cycle: "60 Days",
      available: 4,
      price: 12000,
      originalPrice: 14400,
      daily: 1600, // (12000 * 8) / 60 days = 1600 daily profit
      total: 96000, // 12000 * 8
      discount: "17% OFF",
    },
    {
      title: "Premium Vehicle Package",
      image: teslaRoadsterImage,
      cycle: "30 Days",
      available: 3,
      price: 15000,
      originalPrice: 18000,
      daily: 4000, // (15000 * 8) / 30 days = 4000 daily profit
      total: 120000, // 15000 * 8
      discount: "17% OFF",
    },
    {
      title: "Commercial Transport",
      image: teslaSemiImage,
      cycle: "45 Days",
      available: 2,
      price: 20000,
      originalPrice: 24000,
      daily: 3556, // (20000 * 8) / 45 days = ~3556 daily profit
      total: 160000, // 20000 * 8
      discount: "17% OFF",
    },
    {
      title: "Next-Gen Vehicle Platform",
      image: cybertruckImage,
      cycle: "60 Days",
      available: 2,
      price: 30000,
      originalPrice: 36000,
      daily: 4000, // (30000 * 8) / 60 days = 4000 daily profit
      total: 240000, // 30000 * 8
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
              onBuy={() => handleBuyPackage(pkg.title, pkg.price, pkg.cycle)}
            />
          ))}
        </div>

      </div>
    </section>
  );
};