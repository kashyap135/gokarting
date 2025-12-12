import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { QrCode, Shield, Lock, ArrowLeft, CheckCircle, Clock, Smartphone } from "lucide-react";
import { toast } from "sonner";
import { QRCodeSVG } from "qrcode.react";

export default function Payment() {
  const navigate = useNavigate();
  const [registrationData, setRegistrationData] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [countdown, setCountdown] = useState(135); // 2 minutes 15 seconds in seconds
  const [canConfirm, setCanConfirm] = useState(false);

  useEffect(() => {
    const data = sessionStorage.getItem("registrationData");
    if (!data) {
      toast.error("No registration data found. Please register first.");
      navigate("/register");
      return;
    }
    setRegistrationData(JSON.parse(data));
  }, [navigate]);

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setCanConfirm(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleConfirmPayment = () => {
    setIsProcessing(true);

    // Process payment confirmation
    setTimeout(() => {
      const transactionId = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      const licenseId = `GKL-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
      const paymentDate = new Date().toISOString();

      sessionStorage.setItem("paymentData", JSON.stringify({
        ...registrationData,
        transactionId,
        licenseId,
        paymentDate,
        issueDate: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
        expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000 * 2).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      }));

      toast.success("Payment confirmed!");
      navigate("/payment-success");
    }, 1500);
  };

  if (!registrationData) {
    return null;
  }

  // Generate UPI payment string with your actual UPI ID and dynamic amount
  const upiPaymentString = `upi://pay?pa=kavyasudhareddy2005@okhdfcbank&pn=Kavya%20Sudha&am=${registrationData.price}&cu=INR&tn=GoKart%20License%20Fee`;

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
                <QrCode className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Scan & Pay</h1>
              <p className="text-muted-foreground">
                Scan the QR code below to complete your payment.
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
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Total Amount</span>
                    <span className="text-2xl font-bold text-racing-orange">
                      ₹{registrationData.price}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* QR Code Payment Section */}
            <Card className="shadow-lg mb-6">
              <CardContent className="pt-6">
                <div className="text-center">
                  {/* Dynamic UPI QR Code with amount pre-filled */}
                  <div className="bg-white p-6 rounded-xl inline-block mb-4 shadow-inner">
                    <QRCodeSVG
                      value={upiPaymentString}
                      size={200}
                      level="H"
                      includeMargin={false}
                    />
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-2">
                    UPI ID: kavyasudhareddy2005@okhdfcbank
                  </p>

                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
                    <Smartphone className="w-4 h-4" />
                    <span>Scan with any UPI app (GPay, PhonePe, Paytm, etc.)</span>
                  </div>

                  {/* Payment Instructions */}
                  <div className="bg-muted/50 rounded-lg p-4 text-left mb-6">
                    <h3 className="font-semibold mb-2 text-sm">How to Pay:</h3>
                    <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                      <li>Open any UPI payment app on your phone</li>
                      <li>Scan the QR code above</li>
                      <li>Verify the amount (₹{registrationData.price})</li>
                      <li>Complete the payment</li>
                      <li>Click "I've Completed Payment" below</li>
                    </ol>
                  </div>

                  {/* Countdown runs in background - no visible timer */}

                  {/* Confirm Payment Button */}
                  <Button
                    variant="racing"
                    size="lg"
                    className="w-full"
                    onClick={handleConfirmPayment}
                    disabled={!canConfirm || isProcessing}
                  >
                    {isProcessing ? (
                      <span className="flex items-center gap-2">
                        <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Verifying Payment...
                      </span>
                    ) : canConfirm ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        I've Completed Payment
                      </>
                    ) : (
                      <>
                        <Lock className="w-5 h-5" />
                        Please Wait...
                      </>
                    )}
                  </Button>

                  {canConfirm && (
                    <p className="text-xs text-muted-foreground mt-3">
                      Only click after you've successfully completed the UPI payment
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Security Features */}
            <div className="grid grid-cols-3 gap-4">
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
