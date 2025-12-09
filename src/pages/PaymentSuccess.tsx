import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CheckCircle, Download, CreditCard, ArrowRight, FileText } from "lucide-react";
import { toast } from "sonner";
import confetti from "canvas-confetti";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState<any>(null);

  useEffect(() => {
    const data = sessionStorage.getItem("paymentData");
    if (!data) {
      toast.error("No payment data found.");
      navigate("/");
      return;
    }
    setPaymentData(JSON.parse(data));

    // Celebration confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#f97316", "#1e3a5f", "#eab308"],
    });

    // Store user data for dashboard
    const userData = JSON.parse(data);
    sessionStorage.setItem("userData", JSON.stringify({
      name: userData.fullName,
      email: userData.email,
      licenseId: userData.licenseId,
      licenseType: userData.licenseType,
      issueDate: userData.issueDate,
      expiryDate: userData.expiryDate,
    }));
  }, [navigate]);

  if (!paymentData) {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto"
          >
            {/* Success Animation */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="w-24 h-24 bg-racing-green rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-12 h-12 text-primary-foreground" />
              </motion.div>
              <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
              <p className="text-muted-foreground">
                Your license has been issued. Check your email for confirmation.
              </p>
            </div>

            {/* Transaction Details */}
            <Card className="shadow-lg mb-6">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center gap-3 p-3 bg-racing-green/10 rounded-lg border border-racing-green/20">
                  <CreditCard className="w-5 h-5 text-racing-green" />
                  <span className="font-medium text-racing-green">Transaction Complete</span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Transaction ID</span>
                    <span className="font-mono text-sm">{paymentData.transactionId}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">License ID</span>
                    <span className="font-mono font-bold text-racing-orange">
                      {paymentData.licenseId}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Amount Paid</span>
                    <span className="font-bold">${paymentData.price}.00</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">License Type</span>
                    <span className="font-medium">{paymentData.licenseName}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Date & Time</span>
                    <span className="text-sm">{formatDate(paymentData.paymentDate)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link to="/receipt">
                <Button variant="outline" size="lg" className="w-full">
                  <Download className="w-5 h-5" />
                  Download Receipt
                </Button>
              </Link>

              <Link to="/dashboard">
                <Button variant="racing" size="lg" className="w-full">
                  View My License
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>

            {/* Info Text */}
            <div className="mt-8 p-4 bg-muted/50 rounded-lg border">
              <div className="flex gap-3">
                <FileText className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-foreground mb-1">What's next?</p>
                  <p>
                    Your license is now active and can be verified instantly. Upload your photo in the dashboard
                    to complete your license card.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
