import { Facebook, Instagram, Mail, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background font-outfit py-10 px-4 border-t">
      <div className="flex flex-col items-center space-y-4">
        <h2 className="text-lg font-semibold">Contact Us</h2>

        <div className="flex space-x-6">
          <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <Facebook className="h-5 w-5 hover:text-primary transition-colors" />
          </a>
          <a href="https://instagram.com/abiabdillahx" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Instagram className="h-5 w-5 hover:text-primary transition-colors" />
          </a>
          <a href="mailto:zencipher@tuta.io" aria-label="Email">
            <Mail className="h-5 w-5 hover:text-primary transition-colors" />
          </a>
          <a href="https://github.com/abiabdillahx/sea-catering" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github className="h-5 w-5 hover:text-primary transition-colors" />
          </a>
        </div>

        <div className="text-md text-muted-accent">
          Contact Our Manager: <span className="font-medium text-accent">Brian</span> (<a href='https://wa.me/+628123456789' target='_blank'>08123456789</a>)
        </div>
      </div>
      <div className="border-t border-border my-4 mx-100" />
      <div className="justify-items-center">
        <p className="text-sm">&copy; 2025 All rights reserved</p>

      </div>
    </footer>
  );
}
