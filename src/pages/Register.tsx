import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { motion } from "framer-motion";
import { Flag, CheckCircle, ArrowRight, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

const licenseTypes = [
  { id: "beginner", name: "Beginner License", price: 349, color: "border-racing-green" },
  { id: "pro", name: "Pro License", price: 400, color: "border-racing-orange" },
  { id: "championship", name: "Championship License", price: 799, color: "border-racing-gold" },
];

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    password: "",
    licenseType: "pro",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.fullName || !formData.email || !formData.password || !formData.dateOfBirth) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Store registration data in session storage for payment page
    const selectedLicense = licenseTypes.find((l) => l.id === formData.licenseType);
    sessionStorage.setItem("registrationData", JSON.stringify({
      ...formData,
      price: selectedLicense?.price,
      licenseName: selectedLicense?.name,
    }));

    toast.success("Registration submitted! Proceeding to payment...");
    navigate("/payment");
  };

  const selectedLicense = licenseTypes.find((l) => l.id === formData.licenseType);

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-racing-orange/10 border border-racing-orange/20 rounded-full px-4 py-2 mb-4">
                <Flag className="w-4 h-4 text-racing-orange" />
                <span className="text-sm font-medium">License Application</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Register for Your License</h1>
              <p className="text-muted-foreground">
                Fill in your details to apply for your go-kart racing license.
              </p>
            </div>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Please provide accurate information as it will appear on your license.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      required
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Date of Birth */}
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth *</Label>
                    <Input
                      id="dob"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                      required
                    />
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      placeholder="123 Racing Street, Track City"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a secure password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* License Type Selection */}
                  <div className="space-y-4">
                    <Label>License Type *</Label>
                    <RadioGroup
                      value={formData.licenseType}
                      onValueChange={(value) => setFormData({ ...formData, licenseType: value })}
                      className="grid gap-3"
                    >
                      {licenseTypes.map((license) => (
                        <div key={license.id}>
                          <RadioGroupItem
                            value={license.id}
                            id={license.id}
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor={license.id}
                            className={`flex items-center justify-between rounded-xl border-2 p-4 cursor-pointer transition-all hover:bg-muted/50 peer-data-[state=checked]:${license.color} peer-data-[state=checked]:bg-muted ${
                              formData.licenseType === license.id ? license.color + " bg-muted" : "border-border"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                formData.licenseType === license.id ? "bg-racing-orange border-racing-orange" : "border-muted-foreground"
                              }`}>
                                {formData.licenseType === license.id && (
                                  <CheckCircle className="w-3 h-3 text-primary-foreground" />
                                )}
                              </div>
                              <span className="font-medium">{license.name}</span>
                            </div>
                            <span className="font-bold text-lg">₹{license.price}</span>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Summary */}
                  <div className="bg-muted/50 rounded-xl p-4 border">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Selected License:</span>
                      <span className="font-bold">{selectedLicense?.name}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-muted-foreground">Total Amount:</span>
                      <span className="font-bold text-xl text-racing-orange">₹{selectedLicense?.price}</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" variant="racing" size="lg" className="w-full">
                    Continue to Payment
                    <ArrowRight className="w-5 h-5" />
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link to="/login" className="text-racing-orange hover:underline font-medium">
                      Login here
                    </Link>
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
