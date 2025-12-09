import { Link } from "react-router-dom";
import { Flag, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-racing-orange rounded-lg flex items-center justify-center">
                <Flag className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <span className="font-bold text-lg">GoKart</span>
                <span className="text-racing-orange font-bold text-lg"> License</span>
              </div>
            </div>
            <p className="text-primary-foreground/70 text-sm">
              Official licensing authority for professional and recreational go-kart racing.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 text-racing-orange">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/register" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Apply for License
                </Link>
              </li>
              <li>
                <Link to="/verify" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Verify License
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* License Types */}
          <div>
            <h4 className="font-bold mb-4 text-racing-orange">License Types</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>Beginner License</li>
              <li>Pro License</li>
              <li>Championship License</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4 text-racing-orange">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-primary-foreground/70">
                <Mail className="w-4 h-4" />
                support@gokartlicense.com
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/70">
                <Phone className="w-4 h-4" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/70">
                <MapPin className="w-4 h-4" />
                Racing Center, Track City
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-8 pt-8 text-center text-sm text-primary-foreground/50">
          <p>© {new Date().getFullYear()} GoKart Licensing Authority. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
