import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface InvestmentCardProps {
  title: string;
  image: string;
  cycle: string;
  available: number;
  price: number;
  originalPrice?: number;
  daily: number;
  total: number;
  discount?: string;
  onBuy: () => void;
}

export const InvestmentCard = ({
  title,
  image,
  cycle,
  available,
  price,
  originalPrice,
  daily,
  total,
  discount,
  onBuy,
}: InvestmentCardProps) => {
  return (
    <Card className="bg-investment-card border-border shadow-card-investment p-6 hover:shadow-investment transition-all duration-300">
      <div className="flex items-start gap-4 mb-4">
        <div className="relative">
          <img 
            src={image} 
            alt={title}
            className="w-16 h-16 rounded-lg object-cover"
          />
          {discount && (
            <Badge className="absolute -top-2 -right-2 bg-investment-warning text-black text-xs px-2 py-1">
              {discount}
            </Badge>
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
          <div className="space-y-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>📅 Cycle: {cycle}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>📦 Available: {available}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-investment-success">✅ In Stock</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-secondary/20 rounded-lg">
        <div className="text-center">
          <div className="text-xs text-muted-foreground mb-1">Price</div>
          <div className="space-y-1">
            {originalPrice && (
              <div className="text-xs text-muted-foreground line-through">
                KES {originalPrice.toLocaleString()}
              </div>
            )}
            <div className="font-semibold text-foreground">
              KES {price.toLocaleString()}
            </div>
          </div>
        </div>
        <div className="text-center">
          <div className="text-xs text-muted-foreground mb-1">Daily</div>
          <div className="font-semibold text-investment-success">
            KES {daily.toLocaleString()}
          </div>
        </div>
        <div className="text-center">
          <div className="text-xs text-muted-foreground mb-1">Total</div>
          <div className="font-semibold text-investment-accent">
            KES {total.toLocaleString()}
          </div>
        </div>
      </div>

      <Button 
        variant="buy" 
        className="w-full mb-2"
        onClick={onBuy}
      >
        🛒 Buy Shares Now
      </Button>
      
      {discount && (
        <div className="text-center text-sm text-investment-warning font-medium">
          Save KES {(originalPrice! - price).toLocaleString()} today!
        </div>
      )}
    </Card>
  );
};