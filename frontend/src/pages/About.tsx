import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/customer/Header";
import Footer from "@/components/customer/Footer";
import StickyCallButton from "@/components/customer/StickyCallButton";
import heroImage from "@/assets/hero-salon.jpg";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <span className="inline-block px-4 py-1 rounded-full bg-gold-light text-accent-foreground text-sm font-medium mb-4">
                About Us
              </span>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
                Welcome to Glow & Go Salon
              </h1>
              <p className="font-body text-muted-foreground text-lg mb-6 leading-relaxed">
                At Glow & Go, we believe that everyone deserves to look and feel their best. 
                Our salon combines premium services with a warm, welcoming atmosphere to create 
                an exceptional grooming experience.
              </p>
              <p className="font-body text-muted-foreground mb-8 leading-relaxed">
                With years of experience and a passion for beauty, our skilled team is dedicated 
                to helping you achieve your desired look. From classic haircuts to luxurious 
                spa treatments, we offer a complete range of services tailored to your needs.
              </p>
              <Button variant="call" size="lg" asChild>
                <a href="tel:+919876543210">
                  <Phone className="w-5 h-5" />
                  Book Your Visit
                </a>
              </Button>
            </div>
            <div className="relative">
              <img
                src={heroImage}
                alt="Glow & Go Salon"
                className="rounded-2xl shadow-elevated"
              />
              <div className="absolute -bottom-6 -left-6 bg-card rounded-xl p-6 shadow-card">
                <div className="text-3xl font-display font-bold text-primary">5+</div>
                <div className="text-sm text-muted-foreground">Years of Excellence</div>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="bg-secondary/30 rounded-2xl p-8 md:p-12">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
              Why Choose Glow & Go?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  Premium Quality
                </h3>
                <p className="text-muted-foreground text-sm">
                  We use only the finest products and latest techniques
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💝</span>
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  Personal Care
                </h3>
                <p className="text-muted-foreground text-sm">
                  Every client receives personalized attention and service
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📞</span>
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  Easy Booking
                </h3>
                <p className="text-muted-foreground text-sm">
                  Book instantly with our smart phone receptionist
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <StickyCallButton />
    </div>
  );
};

export default About;
