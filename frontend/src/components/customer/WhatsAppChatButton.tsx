import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';

const WhatsAppChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = '919876543210'; // Your WhatsApp business number
  const message = encodeURIComponent('Hi! I\'d like to know more about your salon services and book an appointment.');

  const handleButtonClick = () => {
    console.log('WhatsApp button clicked');
    setIsOpen(true);
  };

  const openWhatsApp = (customMessage?: string) => {
    const msg = customMessage || message;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${msg}`;
    console.log('Opening WhatsApp:', whatsappUrl);
    window.open(whatsappUrl, '_blank');
  };

  const quickActions = [
    {
      label: 'Book Appointment',
      message: 'Hi! I\'d like to book an appointment at Salon Swift.',
      icon: '📅'
    },
    {
      label: 'Service Prices',
      message: 'Hi! Can you send me your service price list?',
      icon: '💰'
    },
    {
      label: 'Business Hours',
      message: 'Hi! What are your business hours?',
      icon: '🕐'
    },
    {
      label: 'Location',
      message: 'Hi! Can you share your salon location?',
      icon: '📍'
    }
  ];

  return (
    <>
      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 left-6 z-[60]">
        <Button
          onClick={handleButtonClick}
          size="lg"
          className="w-14 h-14 rounded-full shadow-lg bg-green-500 hover:bg-green-600 border-2 border-white/50 relative group cursor-pointer"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute -top-8 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Chat on WhatsApp
          </span>
        </Button>
        
        {/* Pulse Animation */}
        <div className="absolute inset-0 rounded-full bg-green-500/20 animate-ping"></div>
      </div>

      {/* WhatsApp Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 z-[70] w-80 max-w-[90vw]">
          <Card className="shadow-2xl border-2 border-green-500/20">
            <CardContent className="p-0">
              {/* Header */}
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-t-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Salon Swift</h3>
                    <p className="text-xs opacity-90">Usually replies instantly</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Welcome Message */}
              <div className="p-4 bg-gray-50">
                <div className="bg-white p-3 rounded-lg border border-gray-200 mb-4">
                  <p className="text-sm text-gray-700">
                    👋 Welcome to Salon Swift! How can I help you today?
                  </p>
                </div>

                {/* Quick Actions */}
                <div className="space-y-2">
                  <p className="text-xs font-medium text-gray-600 mb-2">Quick Actions:</p>
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => openWhatsApp(action.message)}
                      className="w-full justify-start text-left h-auto py-3 px-3 hover:bg-green-50 hover:border-green-300"
                    >
                      <span className="mr-2 text-lg">{action.icon}</span>
                      <span className="text-sm">{action.label}</span>
                    </Button>
                  ))}
                </div>

                {/* Custom Message */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs font-medium text-gray-600 mb-2">Or type your message:</p>
                  <Button
                    onClick={() => openWhatsApp()}
                    className="w-full bg-green-500 hover:bg-green-600"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Start WhatsApp Chat
                  </Button>
                </div>
              </div>

              {/* Footer */}
              <div className="p-3 bg-gray-100 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  Powered by WhatsApp Business
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default WhatsAppChatButton;
