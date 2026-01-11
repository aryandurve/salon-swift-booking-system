import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const StickyCallButton = () => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden">
      <Button variant="call" size="xl" className="shadow-elevated animate-pulse-soft" asChild>
        <a href="tel:+919876543210">
          <Phone className="w-5 h-5" />
          Call Now to Book
        </a>
      </Button>
    </div>
  );
};

export default StickyCallButton;
