import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Download, Printer, ArrowLeft, Flag, CheckCircle } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { toast } from "sonner";

export default function Receipt() {
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState<any>(null);

  useEffect(() => {
    const data = sessionStorage.getItem("paymentData");
    if (!data) {
      toast.error("No receipt data found.");
      navigate("/dashboard");
      return;
    }
    setPaymentData(JSON.parse(data));
  }, [navigate]);

  const handleDownloadPDF = () => {
    toast.success("Receipt download started!");
    // In production, this would generate and download the receipt as PDF
  };

  const handlePrint = () => {
    window.print();
  };

  if (!paymentData) {
    return null;
  }

  const receiptNumber = `RCP-${paymentData.transactionId?.split("-")[1] || Date.now()}`;
  const verificationUrl = `${window.location.origin}/verify?id=${paymentData.licenseId}`;

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
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>

            {/* Receipt Card */}
            <Card className="shadow-lg print:shadow-none" id="receipt">
              <CardContent className="p-8">
                {/* Header */}
                <div className="flex items-start justify-between border-b pb-6 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                      <Flag className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h2 className="font-bold text-lg">GoKart License Authority</h2>
                      <p className="text-sm text-muted-foreground">Official Payment Receipt</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Receipt No.</p>
                    <p className="font-mono font-bold">{receiptNumber}</p>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex items-center gap-2 bg-racing-green/10 text-racing-green px-4 py-2 rounded-lg mb-6 w-fit">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Payment Verified</span>
                </div>

                {/* Details Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Name</p>
                      <p className="font-medium">{paymentData.fullName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{paymentData.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{paymentData.phone || "Not provided"}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">License Type</p>
                      <p className="font-medium">{paymentData.licenseName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">License ID</p>
                      <p className="font-mono font-bold text-racing-orange">{paymentData.licenseId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Payment ID</p>
                      <p className="font-mono text-sm">{paymentData.transactionId}</p>
                    </div>
                  </div>
                </div>

                {/* Payment Details */}
                <div className="bg-muted/50 rounded-xl p-4 mb-6">
                  <h3 className="font-bold mb-4">Payment Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">License Fee</span>
                      <span>${paymentData.price}.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Processing Fee</span>
                      <span>$0.00</span>
                    </div>
                    <div className="flex justify-between border-t pt-2 mt-2">
                      <span className="font-bold">Total Paid</span>
                      <span className="font-bold text-lg text-racing-orange">${paymentData.price}.00</span>
                    </div>
                  </div>
                </div>

                {/* Validity */}
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  <div className="bg-muted/50 rounded-xl p-4">
                    <p className="text-sm text-muted-foreground">Validity Start</p>
                    <p className="font-bold">{paymentData.issueDate}</p>
                  </div>
                  <div className="bg-muted/50 rounded-xl p-4">
                    <p className="text-sm text-muted-foreground">Validity End</p>
                    <p className="font-bold">{paymentData.expiryDate}</p>
                  </div>
                </div>

                {/* QR Code & Signature */}
                <div className="flex items-end justify-between pt-6 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Scan to verify</p>
                    <div className="bg-primary-foreground p-2 rounded-lg inline-block">
                      <QRCodeSVG value={verificationUrl} size={80} />
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="w-32 border-b border-foreground mb-2" />
                    <p className="font-medium">Authorized Signature</p>
                    <p className="text-sm text-muted-foreground">GoKart License Authority</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8 pt-6 border-t text-sm text-muted-foreground">
                  <p>This is a computer-generated receipt and does not require a physical signature.</p>
                  <p className="mt-1">For support, contact: support@gokartlicense.com</p>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mt-6 print:hidden">
              <Button variant="outline" onClick={handleDownloadPDF}>
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Button variant="racing" onClick={handlePrint}>
                <Printer className="w-4 h-4 mr-2" />
                Print Receipt
              </Button>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
