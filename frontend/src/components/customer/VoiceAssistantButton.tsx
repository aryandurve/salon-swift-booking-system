import { useState } from 'react';
import { Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import VoiceAssistant from './VoiceAssistant';

const VoiceAssistantButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Voice Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="w-14 h-14 rounded-full shadow-lg bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 border-2 border-white/50 relative group"
        >
          <Mic className="w-6 h-6" />
          <span className="absolute -top-8 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Voice Assistant
          </span>
        </Button>
        
        {/* Pulse Animation */}
        <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>
      </div>

      {/* Voice Assistant Modal */}
      <VoiceAssistant isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default VoiceAssistantButton;
