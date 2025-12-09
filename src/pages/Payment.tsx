import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CreditCard, Shield, Lock, ArrowLeft, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function Payment() {
  const navigate = useNavigate();
  const [registrationData, setRegistrationData] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const data = sessionStorage.getItem("registrationData");
    if (!data) {
      toast.error("No registration data found. Please register first.");
      navigate("/register");
      return;
    }
    setRegistrationData(JSON.parse(data));
  }, [navigate]);

  const handlePayment = () => {
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      // Generate transaction details
      const transactionId = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      const licenseId = `GKL-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
      const paymentDate = new Date().toISOString();

      // Store payment success data
      sessionStorage.setItem("paymentData", JSON.stringify({
        ...registrationData,
        transactionId,
        licenseId,
        paymentDate,
        issueDate: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
        expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000 * 2).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      }));

      toast.success("Payment successful!");
      navigate("/payment-success");
    }, 2000);
  };

  if (!registrationData) {
    return null;
  }

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
            <Link
              to="/register"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Registration
            </Link>

            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-racing-orange rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Complete Payment</h1>
              <p className="text-muted-foreground">
                Secure payment for your GoKart license.
              </p>
            </div>

            {/* Order Summary */}
            <Card className="shadow-lg mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Applicant Name</span>
                  <span className="font-medium">{registrationData.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email</span>
                  <span className="font-medium">{registrationData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">License Type</span>
                  <span className="font-medium">{registrationData.licenseName}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${registrationData.price}.00</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-muted-foreground">Processing Fee</span>
                    <span>$0.00</span>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-2xl font-bold text-racing-orange">
                      ${registrationData.price}.00
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Button */}
            <Card className="shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-6 p-3 bg-muted/50 rounded-lg">
                  <Shield className="w-5 h-5 text-racing-green" />
                  <span className="text-sm text-muted-foreground">
                    Your payment is secured with 256-bit SSL encryption
                  </span>
                </div>

                <Button
                  variant="racing"
                  size="lg"
                  className="w-full"
                  onClick={handlePayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Processing Payment...
                    </span>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      Pay ${registrationData.price}.00
                    </>
                  )}
                </Button>

                <div className="flex items-center justify-center gap-4 mt-6">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png"
                    alt="Visa"
                    className="h-6 opacity-60"
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/200px-Mastercard-logo.svg.png"
                    alt="Mastercard"
                    className="h-8 opacity-60"
                  />
                </div>

                <p className="text-center text-xs text-muted-foreground mt-4">
                  By proceeding, you agree to our Terms of Service and Privacy Policy.
                </p>
              </CardContent>
            </Card>

            {/* Security Features */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {[
                { icon: Shield, label: "Secure Payment" },
                { icon: Lock, label: "Data Protected" },
                { icon: CheckCircle, label: "Instant License" },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center mx-auto mb-2">
                    <item.icon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
