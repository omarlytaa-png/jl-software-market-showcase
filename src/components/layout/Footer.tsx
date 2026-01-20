import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-border bg-card py-6 pb-20 md:pb-6">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img 
              src="/jl-software-logo.png" 
              alt="JL Software" 
              className="h-8 w-auto"
            />
          </div>
          
          <p className="text-sm text-muted-foreground text-center">
            Demo Marketplace App built by JL Software
          </p>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
