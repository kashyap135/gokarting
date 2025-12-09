import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Flag, Eye, EyeOff, LogIn } from "lucide-react";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login - in production this would connect to your auth system
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    // Demo login - for demonstration purposes
    setTimeout(() => {
      // Store demo user data
      sessionStorage.setItem("userData", JSON.stringify({
        name: "John Doe",
        email: formData.email,
        licenseId: "GKL-2024-001234",
        licenseType: "pro",
        issueDate: "2024-01-15",
        expiryDate: "2026-01-15",
      }));

      toast.success("Welcome back!");
      navigate("/dashboard");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />

      <main className="flex-1 pt-24 pb-16 flex items-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Flag className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
              <p className="text-muted-foreground">
                Sign in to access your license dashboard.
              </p>
            </div>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Enter your credentials to continue.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link to="#" className="text-sm text-racing-orange hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
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

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="racing"
                    size="lg"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Signing in...
                      </span>
                    ) : (
                      <>
                        Sign In
                        <LogIn className="w-5 h-5" />
                      </>
                    )}
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">New to GoKart?</span>
                    </div>
                  </div>

                  <Link to="/register">
                    <Button variant="outline" className="w-full">
                      Apply for a License
                    </Button>
                  </Link>
                </form>
              </CardContent>
            </Card>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Demo: Enter any email and password to login.
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
