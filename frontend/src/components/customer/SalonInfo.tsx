import { Phone, MapPin, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    text: "Amazing experience! The staff was so welcoming and professional. My hair has never looked better!",
    rating: 5,
  },
  {
    id: 2,
    name: "Rahul Verma",
    text: "Quick booking over the phone, no waiting time. The haircut was exactly what I wanted. Highly recommend!",
    rating: 5,
  },
  {
    id: 3,
    name: "Anita Patel",
    text: "The facial treatment was so relaxing. The salon has such a calming atmosphere. Will definitely visit again.",
    rating: 5,
  },
];

const SalonInfo = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Info */}
          <div>
            <span className="inline-block px-4 py-1 rounded-full bg-rose-light text-primary text-sm font-medium mb-4">
              Visit Us
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Find Us at Glow & Go
            </h2>

            {/* Info Cards */}
            <div className="space-y-4 mb-8">
              <Card variant="ghost" className="flex items-start gap-4 p-4 bg-card rounded-xl">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Opening Hours</h3>
                  <p className="text-muted-foreground text-sm">
                    Monday – Saturday: 10:00 AM – 8:00 PM
                  </p>
                  <p className="text-destructive text-sm font-medium">Sunday: Closed</p>
                </div>
              </Card>

              <Card variant="ghost" className="flex items-start gap-4 p-4 bg-card rounded-xl">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Our Location</h3>
                  <p className="text-muted-foreground text-sm">
                    123 Beauty Lane, Koramangala
                  </p>
                  <p className="text-muted-foreground text-sm">Bangalore, Karnataka 560034</p>
                </div>
              </Card>

              <Card variant="ghost" className="flex items-start gap-4 p-4 bg-card rounded-xl">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Contact Us</h3>
                  <a href="tel:+919876543210" className="text-primary font-semibold text-lg hover:underline">
                    +91 98765 43210
                  </a>
                </div>
              </Card>
            </div>

            <Button variant="call" size="lg" asChild>
              <a href="tel:+919876543210">
                <Phone className="w-5 h-5" />
                Call Now to Book
              </a>
            </Button>
          </div>

          {/* Right Column - Testimonials */}
          <div>
            <span className="inline-block px-4 py-1 rounded-full bg-gold-light text-accent-foreground text-sm font-medium mb-4">
              Customer Love
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              What Our Customers Say
            </h2>

            <div className="space-y-4">
              {testimonials.map((testimonial, index) => (
                <Card
                  key={testimonial.id}
                  variant="elevated"
                  className="p-5 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-0">
                    {/* Stars */}
                    <div className="flex gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                      ))}
                    </div>
                    {/* Quote */}
                    <p className="text-foreground mb-4 italic">"{testimonial.text}"</p>
                    {/* Author */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-light to-gold-light" />
                      <span className="font-semibold text-foreground">
                        {testimonial.name}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SalonInfo;
