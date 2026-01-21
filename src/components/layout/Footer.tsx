import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-border bg-card py-6 pb-20 md:pb-6">
      <div className="container space-y-6">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Brand */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <img 
              src="/jl-software-logo.png" 
              alt="JL Software" 
              className="h-10 w-auto"
            />
            <p className="text-xs text-muted-foreground">
              Building scalable software solutions
            </p>
          </div>
          
          {/* Contact Info */}
          <div className="flex flex-col items-center gap-3">
            <p className="text-sm font-medium">Contact Us</p>
            <div className="flex items-center gap-4">
              <a 
                href="mailto:info@javalab.co.ke"
                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                info@javalab.co.ke
              </a>
              <a 
                href="tel:0111679286"
                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-secondary transition-colors"
              >
                <Phone className="h-4 w-4" />
                0111 679 286
              </a>
              <a 
                href="https://wa.me/254741837945"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-success transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                +254 741 837 945
              </a>
            </div>
          </div>
          
          {/* Links */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link to="/demo-policy" className="hover:text-foreground transition-colors">
              Demo Policy
            </Link>
            <Link to="/demo-policy" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link to="/demo-policy" className="hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 border-t border-border flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-sm font-medium text-center">
            Demo Marketplace App built by <span className="text-primary">JL Software</span>
          </p>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} JL Software. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
