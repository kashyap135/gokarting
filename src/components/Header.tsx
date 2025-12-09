import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Flag, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-b border-primary-foreground/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-racing-orange rounded-lg flex items-center justify-center">
              <Flag className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <span className="text-primary-foreground font-bold text-lg">GoKart</span>
              <span className="text-racing-orange font-bold text-lg"> License</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/verify" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm font-medium">
              Verify License
            </Link>
            <Link to="/login">
              <Button variant="hero-outline" size="sm">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="racing" size="sm">
                Apply Now
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-primary-foreground p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4 border-t border-primary-foreground/10"
            >
              <div className="flex flex-col gap-3">
                <Link
                  to="/verify"
                  className="text-primary-foreground/80 hover:text-primary-foreground py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Verify License
                </Link>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="hero-outline" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="racing" className="w-full">
                    Apply Now
                  </Button>
                </Link>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
