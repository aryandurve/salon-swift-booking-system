import { Phone, MessageSquare, Calendar, CheckCircle } from "lucide-react";

const steps = [
  {
    id: 1,
    icon: Phone,
    title: "Call Glow & Go Salon",
    description: "Dial our number and get connected instantly",
  },
  {
    id: 2,
    icon: MessageSquare,
    title: "Speak with Our Receptionist",
    description: "Our smart receptionist will assist you with booking",
  },
  {
    id: 3,
    icon: Calendar,
    title: "Confirm Your Appointment",
    description: "Choose your preferred date, time, and service",
  },
  {
    id: 4,
    icon: CheckCircle,
    title: "Receive Confirmation",
    description: "Get a confirmation email with all the details",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-gold-light text-accent-foreground text-sm font-medium mb-4">
            Simple Process
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            How Booking Works
          </h2>
          <p className="font-body text-muted-foreground">
            Book your appointment in just a few simple steps. Our smart receptionist is available to help you 24/7.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className="relative flex flex-col items-center text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Step Number */}
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gold text-accent-foreground font-bold text-sm flex items-center justify-center z-20">
                  {step.id}
                </div>

                {/* Icon */}
                <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-primary to-rose text-primary-foreground flex items-center justify-center mb-6 shadow-card">
                  <step.icon className="w-8 h-8" />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="font-body text-muted-foreground text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
