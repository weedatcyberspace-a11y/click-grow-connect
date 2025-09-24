import { Button } from "@/components/ui/button";

export const Header = () => {
  const handleWhatsAppContact = () => {
    window.open("https://wa.me/254114470612", "_blank");
  };

  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold">
              <span className="text-foreground">VISIONTECH</span>
              <span className="text-investment-secondary"> 2030</span>
              <span className="text-foreground"> CAPITAL</span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#home" className="text-foreground hover:text-investment-primary transition-colors">
              Home
            </a>
            <a href="#packages" className="text-foreground hover:text-investment-primary transition-colors">
              Packages
            </a>
            <a href="#about" className="text-foreground hover:text-investment-primary transition-colors">
              About
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <Button 
              variant="whatsapp"
              onClick={handleWhatsAppContact}
              className="flex items-center gap-2"
            >
              💬 Contact WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};