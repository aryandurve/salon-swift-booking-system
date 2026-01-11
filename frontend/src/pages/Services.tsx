import { Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/customer/Header";
import Footer from "@/components/customer/Footer";
import StickyCallButton from "@/components/customer/StickyCallButton";
import serviceFacial from "@/assets/service-facial.jpg";
import serviceHaircut from "@/assets/service-haircut.jpg";
import serviceHaircutStyling from "@/assets/service-haircut-styling.jpg";
import serviceBeard from "@/assets/service-beard.jpg";
import serviceColoring from "@/assets/service-coloring.jpg";
import serviceSpa from "@/assets/service-spa.jpg";

const services = [
  {
    id: 1,
    name: "Haircut",
    price: "₹500",
    duration: "30 mins",
    description: "Classic haircut with expert styling to suit your face shape",
    image: serviceHaircut,
    category: "Hair",
  },
  {
    id: 2,
    name: "Haircut + Styling",
    price: "₹700",
    duration: "45 mins",
    description: "Haircut with professional blow dry and styling",
    image: serviceHaircutStyling,
    category: "Hair",
  },
  {
    id: 3,
    name: "Hair Spa",
    price: "₹1,200",
    duration: "60 mins",
    description: "Deep conditioning treatment for healthy, shiny hair",
    image: serviceSpa,
    category: "Hair",
  },
  {
    id: 4,
    name: "Beard Trim",
    price: "₹300",
    duration: "20 mins",
    description: "Professional beard shaping and grooming",
    image: serviceBeard,
    category: "Grooming",
  },
  {
    id: 5,
    name: "Hair Coloring (Basic)",
    price: "₹2,000",
    duration: "90 mins",
    description: "Full head color with premium products",
    image: serviceColoring,
    category: "Hair",
  },
  {
    id: 6,
    name: "Facial",
    price: "₹1,500",
    duration: "60 mins",
    description: "Relaxing facial treatment for glowing skin",
    image: serviceFacial,
    category: "Skin",
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block px-4 py-1 rounded-full bg-rose-light text-primary text-sm font-medium mb-4">
              Our Menu
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Services & Pricing
            </h1>
            <p className="font-body text-muted-foreground text-lg">
              Explore our complete range of premium salon services. All prices are inclusive of taxes.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {services.map((service, index) => (
              <Card
                key={service.id}
                variant="service"
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded-full bg-gold-light text-accent-foreground text-xs font-medium">
                      {service.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {service.duration}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    {service.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">
                      {service.price}
                    </span>
                    <Button variant="soft" size="sm" asChild>
                      <a href="tel:+919876543210">
                        <Phone className="w-4 h-4" />
                        Call to Book
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center bg-gradient-to-r from-rose-light via-card to-gold-light rounded-2xl p-8 md:p-12">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to Book Your Appointment?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Call us now and our smart receptionist will help you book the perfect time slot.
            </p>
            <Button variant="call" size="xl" asChild>
              <a href="tel:+919876543210">
                <Phone className="w-5 h-5" />
                Call Now: +91 98765 43210
              </a>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
      <StickyCallButton />
    </div>
  );
};

export default Services;
