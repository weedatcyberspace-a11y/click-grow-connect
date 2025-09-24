import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface ClientDetailsFormProps {
  isOpen: boolean;
  onClose: () => void;
  packageTitle: string;
  packagePrice: number;
}

export const ClientDetailsForm = ({ isOpen, onClose, packageTitle, packagePrice }: ClientDetailsFormProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    investmentAmount: packagePrice.toString(),
    idNumber: "",
  });
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.fullName || !formData.phoneNumber || !formData.investmentAmount) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Create WhatsApp message
    const message = `Hi! I want to invest in: ${packageTitle}

Client Details:
• Full Name: ${formData.fullName}
• Phone: ${formData.phoneNumber}
• Email: ${formData.email || "Not provided"}
• ID Number: ${formData.idNumber || "Not provided"}
• Investment Amount: KES ${parseInt(formData.investmentAmount).toLocaleString()}

Please guide me through the investment process.`;

    const whatsappUrl = `https://wa.me/254114470612?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Redirecting to WhatsApp",
      description: "Opening WhatsApp with your investment details",
    });
    
    onClose();
    
    // Reset form
    setFormData({
      fullName: "",
      phoneNumber: "",
      email: "",
      investmentAmount: packagePrice.toString(),
      idNumber: "",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-card">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground">
            Investment Details
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Complete your details to invest in {packageTitle}
          </p>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-sm font-medium">
              Full Name *
            </Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber" className="text-sm font-medium">
              Phone Number *
            </Label>
            <Input
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              placeholder="e.g., 254712345678"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="your@email.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="idNumber" className="text-sm font-medium">
              ID Number
            </Label>
            <Input
              id="idNumber"
              value={formData.idNumber}
              onChange={(e) => handleInputChange("idNumber", e.target.value)}
              placeholder="Your national ID number"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="investmentAmount" className="text-sm font-medium">
              Investment Amount (KES) *
            </Label>
            <Input
              id="investmentAmount"
              type="number"
              value={formData.investmentAmount}
              onChange={(e) => handleInputChange("investmentAmount", e.target.value)}
              min={packagePrice}
              required
            />
            <p className="text-xs text-muted-foreground">
              Minimum: KES {packagePrice.toLocaleString()}
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" variant="buy" className="flex-1">
              Proceed to WhatsApp
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};