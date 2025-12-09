import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Search, CheckCircle, XCircle, Shield, Calendar, User, Flag } from "lucide-react";
import { toast } from "sonner";

interface VerificationResult {
  valid: boolean;
  name?: string;
  licenseType?: string;
  expiryDate?: string;
  status?: string;
}

export default function Verify() {
  const [searchParams] = useSearchParams();
  const initialId = searchParams.get("id") || "";
  
  const [licenseId, setLicenseId] = useState(initialId);
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);

  const handleVerify = () => {
    if (!licenseId.trim()) {
      toast.error("Please enter a license ID");
      return;
    }

    setIsSearching(true);
    setResult(null);

    // Simulate verification - in production this would query the database
    setTimeout(() => {
      // Check if we have this license in session storage (for demo purposes)
      const userData = sessionStorage.getItem("userData");
      const paymentData = sessionStorage.getItem("paymentData");

      let foundLicense = null;

      if (userData) {
        const user = JSON.parse(userData);
        if (user.licenseId === licenseId) {
          foundLicense = user;
        }
      }

      if (!foundLicense && paymentData) {
        const payment = JSON.parse(paymentData);
        if (payment.licenseId === licenseId) {
          foundLicense = {
            name: payment.fullName,
            licenseType: payment.licenseType,
            expiryDate: payment.expiryDate,
          };
        }
      }

      if (foundLicense) {
        setResult({
          valid: true,
          name: foundLicense.name,
          licenseType: foundLicense.licenseType,
          expiryDate: foundLicense.expiryDate,
          status: "Active",
        });
      } else {
        // Demo: Accept any license ID starting with "GKL-"
        if (licenseId.startsWith("GKL-")) {
          setResult({
            valid: true,
            name: "Demo User",
            licenseType: "pro",
            expiryDate: "December 15, 2026",
            status: "Active",
          });
        } else {
          setResult({ valid: false });
        }
      }

      setIsSearching(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-lg mx-auto"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold mb-2">License Verification</h1>
              <p className="text-muted-foreground">
                Enter a license ID or scan a QR code to verify its authenticity.
              </p>
            </div>

            {/* Search Form */}
            <Card className="shadow-lg mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Enter License ID</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="licenseId">License ID</Label>
                    <Input
                      id="licenseId"
                      placeholder="e.g., GKL-2024-ABC123"
                      value={licenseId}
                      onChange={(e) => setLicenseId(e.target.value.toUpperCase())}
                      onKeyDown={(e) => e.key === "Enter" && handleVerify()}
                    />
                  </div>
                  <Button
                    variant="racing"
                    className="w-full"
                    onClick={handleVerify}
                    disabled={isSearching}
                  >
                    {isSearching ? (
                      <span className="flex items-center gap-2">
                        <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Verifying...
                      </span>
                    ) : (
                      <>
                        <Search className="w-5 h-5" />
                        Verify License
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <AnimatePresence mode="wait">
              {result && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <Card className={`shadow-lg ${result.valid ? "border-racing-green" : "border-destructive"}`}>
                    <CardContent className="pt-6">
                      {result.valid ? (
                        <div className="text-center">
                          <div className="w-16 h-16 bg-racing-green rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-8 h-8 text-primary-foreground" />
                          </div>
                          <h2 className="text-2xl font-bold text-racing-green mb-6">VALID LICENSE</h2>

                          <div className="space-y-4 text-left">
                            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                              <User className="w-5 h-5 text-muted-foreground" />
                              <div>
                                <p className="text-sm text-muted-foreground">License Holder</p>
                                <p className="font-medium">{result.name}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                              <Flag className="w-5 h-5 text-muted-foreground" />
                              <div>
                                <p className="text-sm text-muted-foreground">License Type</p>
                                <p className="font-medium capitalize">{result.licenseType} License</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                              <Calendar className="w-5 h-5 text-muted-foreground" />
                              <div>
                                <p className="text-sm text-muted-foreground">Valid Until</p>
                                <p className="font-medium">{result.expiryDate}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 justify-center pt-4">
                              <span className="w-2 h-2 bg-racing-green rounded-full animate-pulse" />
                              <span className="text-sm font-medium text-racing-green">
                                Status: {result.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-6">
                          <div className="w-16 h-16 bg-destructive rounded-full flex items-center justify-center mx-auto mb-4">
                            <XCircle className="w-8 h-8 text-destructive-foreground" />
                          </div>
                          <h2 className="text-2xl font-bold text-destructive mb-2">INVALID LICENSE</h2>
                          <p className="text-muted-foreground">
                            No valid license found for this ID. Please check the ID and try again.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Info */}
            <div className="mt-8 p-4 bg-muted/50 rounded-lg border">
              <h3 className="font-medium mb-2">How to verify:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Enter the license ID printed on the license card</li>
                <li>• Or scan the QR code on the license</li>
                <li>• Demo: Any ID starting with "GKL-" will show as valid</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
