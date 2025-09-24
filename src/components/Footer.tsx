import { Button } from "@/components/ui/button";

export const Footer = () => {
  const handleWhatsAppContact = () => {
    window.open("https://wa.me/254114470612", "_blank");
  };

  return (
    <footer className="bg-investment-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-bold mb-4">
              <span className="text-foreground">VISIONTECH</span>
              <span className="text-investment-secondary"> 2030</span>
              <span className="text-foreground"> CAPITAL</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Leading the future of investment technology. Join thousands of investors 
              earning daily returns from revolutionary tech projects.
            </p>
            <Button 
              variant="whatsapp"
              onClick={handleWhatsAppContact}
              className="mb-4"
            >
              💬 Contact Support
            </Button>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#home" className="hover:text-investment-primary transition-colors">Home</a></li>
              <li><a href="#packages" className="hover:text-investment-primary transition-colors">Investment Packages</a></li>
              <li><a href="#about" className="hover:text-investment-primary transition-colors">About Us</a></li>
              <li><button onClick={handleWhatsAppContact} className="hover:text-investment-primary transition-colors">Contact</button></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Investment Info</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>📈 Daily Returns</li>
              <li>🔒 Secure Platform</li>
              <li>💰 Multiple Packages</li>
              <li>📱 WhatsApp Support</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground">
              © 2024 VisionTech2030 Capital. All rights reserved.
            </p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <span className="text-muted-foreground">Contact us:</span>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleWhatsAppContact}
                className="text-investment-success hover:text-investment-success/80"
              >
                📱 +254114470612
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};