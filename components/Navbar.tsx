"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import BookCallButton from "./BookCallButton";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setIsOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-primary-dark/95 backdrop-blur-md shadow-lg border-b border-primary-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a 
            href="/" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-2xl font-bold text-primary-accent hover:text-primary-accent-cyan transition-colors"
          >
            Vocemi
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              Home
            </a>
            <a
              href="#services"
              onClick={(e) => handleNavClick(e, "#services")}
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              Services
            </a>
            <a
              href="#faq"
              onClick={(e) => handleNavClick(e, "#faq")}
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              FAQ
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              Contact
            </a>
            <BookCallButton variant="primary" />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-primary-dark border-t border-primary-secondary/50">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
                setIsOpen(false);
              }}
              className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-primary-secondary/50 rounded-md transition-colors font-medium"
            >
              Home
            </a>
            <a
              href="#services"
              onClick={(e) => handleNavClick(e, "#services")}
              className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-primary-secondary/50 rounded-md transition-colors font-medium"
            >
              Services
            </a>
            <a
              href="#faq"
              onClick={(e) => handleNavClick(e, "#faq")}
              className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-primary-secondary/50 rounded-md transition-colors font-medium"
            >
              FAQ
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-primary-secondary/50 rounded-md transition-colors font-medium"
            >
              Contact
            </a>
            <div className="pt-2">
              <BookCallButton variant="primary" className="w-full" />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

