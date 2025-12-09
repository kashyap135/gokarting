import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Flag, Shield, Award, Zap, CheckCircle, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-kart.jpg";

const licenseTypes = [
  {
    name: "Beginner",
    price: "₹349",
    color: "bg-racing-green",
    features: ["Basic track access", "Weekend racing", "Safety certification", "1 year validity"],
  },
  {
    name: "Pro",
    price: "₹400",
    color: "bg-racing-orange",
    popular: true,
    features: ["All tracks access", "Competition eligible", "Priority booking", "2 year validity"],
  },
  {
    name: "Championship",
    price: "₹799",
    color: "bg-racing-gold",
    features: ["Championship events", "International validity", "VIP track access", "3 year validity"],
  },
];

const stats = [
  { value: "50K+", label: "Licensed Drivers" },
  { value: "200+", label: "Partner Tracks" },
  { value: "15+", label: "Years Experience" },
  { value: "99%", label: "Satisfaction Rate" },
];

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-16">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Go-kart racing"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-racing-orange/20 border border-racing-orange/30 rounded-full px-4 py-2 mb-6">
                <Flag className="w-4 h-4 text-racing-orange" />
                <span className="text-primary-foreground text-sm font-medium">Official Licensing Authority</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
                Get Your <span className="text-gradient">GoKart License</span> Today
              </h1>

              <p className="text-lg text-primary-foreground/80 mb-8 max-w-lg">
                Join thousands of licensed drivers. Apply online, pay securely, and receive your official racing license in minutes.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button variant="hero" size="xl" className="w-full sm:w-auto">
                    Apply for License
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/verify">
                  <Button variant="hero-outline" size="xl" className="w-full sm:w-auto">
                    Verify License
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="absolute bottom-0 left-0 right-0 bg-primary-foreground/10 backdrop-blur-md border-t border-primary-foreground/10"
        >
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-racing-orange">{stat.value}</p>
                  <p className="text-sm text-primary-foreground/70">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The most trusted licensing authority for go-kart racing enthusiasts worldwide.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "Secure & Official", desc: "Government-recognized licenses with QR verification" },
              { icon: Zap, title: "Instant Processing", desc: "Get your license approved within minutes" },
              { icon: Award, title: "International Valid", desc: "Race at partner tracks around the world" },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow border"
              >
                <div className="w-12 h-12 bg-racing-orange/10 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-racing-orange" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* License Types Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your License</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Select the license type that matches your racing ambitions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {licenseTypes.map((license, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all border ${
                  license.popular ? "ring-2 ring-racing-orange scale-105" : ""
                }`}
              >
                {license.popular && (
                  <div className="bg-racing-orange text-primary-foreground text-center py-2 text-sm font-bold">
                    Most Popular
                  </div>
                )}
                <div className="p-6">
                  <div className={`${license.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                    <Flag className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{license.name}</h3>
                  <p className="text-3xl font-bold mb-4">
                    {license.price}
                    <span className="text-sm font-normal text-muted-foreground">/license</span>
                  </p>
                  <ul className="space-y-3 mb-6">
                    {license.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-racing-green" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link to="/register">
                    <Button
                      variant={license.popular ? "racing" : "outline"}
                      className="w-full"
                    >
                      Get Started
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Hit the Track?
            </h2>
            <p className="text-primary-foreground/70 mb-8 max-w-lg mx-auto">
              Apply now and get your official go-kart racing license in minutes.
            </p>
            <Link to="/register">
              <Button variant="racing" size="xl">
                Start Application
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
