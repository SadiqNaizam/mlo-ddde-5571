import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/40">
      <div className="container flex flex-col items-center justify-between gap-4 py-4 md:h-16 md:flex-row md:py-0">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} Baker's Harmony. All rights reserved.
        </p>
        <nav className="flex items-center gap-4">
          <Link to="#" className="text-sm text-muted-foreground hover:text-primary">
            Help
          </Link>
          <Link to="#" className="text-sm text-muted-foreground hover:text-primary">
            Support
          </Link>
          <Link to="#" className="text-sm text-muted-foreground hover:text-primary">
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;