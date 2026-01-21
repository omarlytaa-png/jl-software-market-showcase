import React from 'react';
import { Mail, Phone, MessageCircle } from 'lucide-react';

const Watermark: React.FC = () => {
  return (
    <div className="fixed bottom-20 md:bottom-4 right-4 z-40">
      <div className="bg-card/95 backdrop-blur border border-border rounded-lg shadow-lg p-3 space-y-2">
        {/* Logo & Brand */}
        <div className="flex items-center gap-2">
          <img 
            src="/jl-software-logo.png" 
            alt="JL Software" 
            className="h-6 w-auto"
          />
          <span className="text-xs font-semibold text-foreground">JL Software</span>
        </div>
        
        {/* Contact Links */}
        <div className="flex items-center gap-2">
          <a 
            href="mailto:info@javalab.co.ke"
            className="p-1.5 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
            title="Email: info@javalab.co.ke"
          >
            <Mail className="h-3.5 w-3.5 text-primary" />
          </a>
          <a 
            href="tel:0111679286"
            className="p-1.5 rounded-full bg-secondary/10 hover:bg-secondary/20 transition-colors"
            title="Call: 0111 679 286"
          >
            <Phone className="h-3.5 w-3.5 text-secondary" />
          </a>
          <a 
            href="https://wa.me/254741837945"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-full bg-success/10 hover:bg-success/20 transition-colors"
            title="WhatsApp: +254 741 837 945"
          >
            <MessageCircle className="h-3.5 w-3.5 text-success" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Watermark;
