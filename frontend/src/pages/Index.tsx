import Header from "@/components/customer/Header";
import HeroSection from "@/components/customer/HeroSection";
import ServicesPreview from "@/components/customer/ServicesPreview";
import HowItWorks from "@/components/customer/HowItWorks";
import SalonInfo from "@/components/customer/SalonInfo";
import Footer from "@/components/customer/Footer";
import StickyCallButton from "@/components/customer/StickyCallButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ServicesPreview />
        <HowItWorks />
        <SalonInfo />
      </main>
      <Footer />
      <StickyCallButton />
    </div>
  );
};

export default Index;
