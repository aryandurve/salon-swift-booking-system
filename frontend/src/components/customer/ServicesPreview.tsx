import { Phone, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import serviceFacial from "@/assets/service-facial.jpg";
import serviceHaircut from "@/assets/service-haircut.jpg";
import serviceHaircutStyling from "@/assets/service-haircut-styling.jpg";
import serviceSpa from "@/assets/service-spa.jpg";

const services = [
  {
    id: 1,
    name: "Haircut",
    price: "₹500",
    duration: "30 mins",
    image: serviceHaircut,
  },
  {
    id: 2,
    name: "Haircut + Styling",
    price: "₹700",
    duration: "45 mins",
    image: serviceHaircutStyling,
  },
  {
    id: 3,
    name: "Hair Spa",
    price: "₹1,200",
    duration: "60 mins",
    image: serviceSpa,
  },
  {
    id: 4,
    name: "Facial",
    price: "₹1,500",
    duration: "60 mins",
    image: serviceFacial,
  },
];

const ServicesPreview = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-rose-light text-primary text-sm font-medium mb-4">
            Our Services
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Premium Grooming Services
          </h2>
          <p className="font-body text-muted-foreground">
            From classic haircuts to luxurious spa treatments, we offer a complete range of services to help you look and feel your best.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {services.map((service, index) => (
            <Card
              key={service.id}
              variant="service"
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <CardContent className="p-5">
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {service.name}
                </h3>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-primary">
                    {service.price}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {service.duration}
                  </span>
                </div>
                <Button variant="soft" size="sm" className="w-full" asChild>
                  <a href="tel:+919876543210">
                    <Phone className="w-4 h-4" />
                    Call to Book
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button variant="outline" size="lg" asChild>
            <Link to="/services">
              View All Services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
