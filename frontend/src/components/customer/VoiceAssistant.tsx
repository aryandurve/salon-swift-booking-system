import { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Phone, MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

declare global {
  interface Window {
    Vapi: any;
  }
}

interface VoiceAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

const VoiceAssistant = ({ isOpen, onClose }: VoiceAssistantProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [conversation, setConversation] = useState<Array<{role: 'user' | 'assistant', text: string}>>([]);
  const vapiRef = useRef<any>(null);
  const conversationEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Vapi script
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@vapi-ai/web@latest/dist/vapi.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.Vapi) {
        vapiRef.current = window.Vapi;
        initializeVapi();
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  const initializeVapi = () => {
    const vapi = vapiRef.current;
    
    vapi.on('call-start', () => {
      setIsListening(true);
      setConversation(prev => [...prev, { role: 'assistant', text: 'Hello! I\'m your salon assistant. How can I help you today?' }]);
    });

    vapi.on('call-end', () => {
      setIsListening(false);
      setIsSpeaking(false);
    });

    vapi.on('speech-start', () => {
      setIsSpeaking(true);
    });

    vapi.on('speech-end', () => {
      setIsSpeaking(false);
    });

    vapi.on('transcript', (transcript: any) => {
      setTranscript(transcript);
      if (transcript.role === 'user') {
        setConversation(prev => [...prev, { role: 'user', text: transcript.text }]);
      }
    });
  };

  const startCall = async () => {
    try {
      const vapi = vapiRef.current;
      if (!vapi) return;

      const publicKey = 'bd91f41f-50d0-4aab-90af-ab1db3046de5';
      const agentId = '7cb2e7cc-f971-401a-9ffc-65bc05ac27c0';
      
      await vapi.start(publicKey, {
        assistant: {
          id: agentId
        }
      });
    } catch (error) {
      console.error('Error starting Vapi call:', error);
    }
  };

  const endCall = () => {
    const vapi = vapiRef.current;
    if (vapi) {
      vapi.stop();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 right-4 z-50 w-96 max-w-[90vw]">
      <Card className="shadow-2xl border-2 border-primary/20">
        <CardContent className="p-0">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <h3 className="font-semibold">Salon Assistant</h3>
              {isListening && (
                <Badge variant="secondary" className="bg-green-500 text-white">
                  Live
                </Badge>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Conversation Area */}
          <div className="h-80 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {conversation.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Click the microphone to start talking</p>
              </div>
            )}
            
            {conversation.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
            
            {isSpeaking && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 p-3 rounded-lg">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-75"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-150"></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={conversationEndRef} />
          </div>

          {/* Controls */}
          <div className="p-4 border-t bg-white">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                {isListening ? 'Listening...' : 'Click to start'}
              </div>
              
              <div className="flex items-center gap-2">
                {!isListening ? (
                  <Button
                    onClick={startCall}
                    size="lg"
                    className="bg-green-500 hover:bg-green-600"
                  >
                    <Mic className="w-5 h-5" />
                  </Button>
                ) : (
                  <Button
                    onClick={endCall}
                    size="lg"
                    variant="destructive"
                  >
                    <MicOff className="w-5 h-5" />
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                >
                  <a href="tel:+919876543210">
                    <Phone className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VoiceAssistant;
