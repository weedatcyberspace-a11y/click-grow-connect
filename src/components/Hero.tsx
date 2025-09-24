import { Button } from "@/components/ui/button";

export const Hero = () => {
  const handleWhatsAppContact = () => {
    window.open("https://wa.me/254114470612", "_blank");
  };

  const handleScrollToPackages = () => {
    document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="bg-gradient-hero min-h-[80vh] flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-foreground">VISIONTECH</span>
            <span className="text-investment-secondary"> 2030</span>
            <br />
            <span className="text-foreground">CAPITAL</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-4">
            Investing in Tomorrow, Today
          </p>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the future of investment with our revolutionary packages. 
            Earn daily returns from cutting-edge technology investments including 
            Tesla, renewable energy, and autonomous driving projects.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="investment" 
              size="lg"
              onClick={handleScrollToPackages}
              className="text-lg px-8 py-4"
            >
              🚀 Explore Investment Packages
            </Button>
            
            <Button 
              variant="whatsapp" 
              size="lg"
              onClick={handleWhatsAppContact}
              className="text-lg px-8 py-4"
            >
              💬 WhatsApp Support
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Fast Returns</h3>
              <p className="text-muted-foreground">Daily earnings from your investments</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🔒</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Secure Platform</h3>
              <p className="text-muted-foreground">Your investments are protected</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">💼</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Professional Support</h3>
              <p className="text-muted-foreground">24/7 WhatsApp customer service</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};