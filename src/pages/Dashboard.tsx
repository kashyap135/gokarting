import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LicenseCard } from "@/components/LicenseCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Download, Printer, FileText, RefreshCw, LogOut, Upload, Camera } from "lucide-react";
import { toast } from "sonner";

export default function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);
  const [photoUrl, setPhotoUrl] = useState<string | undefined>();

  useEffect(() => {
    const data = sessionStorage.getItem("userData");
    if (!data) {
      toast.error("Please login to access your dashboard");
      navigate("/login");
      return;
    }
    setUserData(JSON.parse(data));
  }, [navigate]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhotoUrl(event.target?.result as string);
        toast.success("Photo uploaded successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("userData");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleDownloadLicense = () => {
    toast.success("License download started!");
    // In production, this would generate and download the license as PNG
  };

  const handlePrintLicense = () => {
    window.print();
  };

  if (!userData) {
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
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold">Welcome, {userData.name}!</h1>
                <p className="text-muted-foreground">Manage your GoKart racing license.</p>
              </div>
              <Button variant="ghost" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* License Card Section */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="shadow-lg overflow-hidden">
                  <CardHeader>
                    <CardTitle>Your License Card</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    <LicenseCard
                      licenseId={userData.licenseId}
                      name={userData.name}
                      licenseType={userData.licenseType}
                      issueDate={userData.issueDate}
                      expiryDate={userData.expiryDate}
                      photoUrl={photoUrl}
                    />

                    {/* Action Buttons */}
                    <div className="flex flex-wrap justify-center gap-3 mt-6">
                      <Button variant="outline" onClick={handleDownloadLicense}>
                        <Download className="w-4 h-4 mr-2" />
                        Download PNG
                      </Button>
                      <Button variant="outline" onClick={handlePrintLicense}>
                        <Printer className="w-4 h-4 mr-2" />
                        Print
                      </Button>
                      <Link to="/receipt">
                        <Button variant="outline">
                          <FileText className="w-4 h-4 mr-2" />
                          View Receipt
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>

                {/* Photo Upload */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">Upload Your Photo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-28 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                        {photoUrl ? (
                          <img src={photoUrl} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          <Camera className="w-8 h-8 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground mb-3">
                          Upload a passport-style photo for your license card.
                        </p>
                        <label>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handlePhotoUpload}
                          />
                          <Button variant="outline" size="sm" asChild>
                            <span className="cursor-pointer">
                              <Upload className="w-4 h-4 mr-2" />
                              Upload Photo
                            </span>
                          </Button>
                        </label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* License Details */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">License Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">License ID</p>
                      <p className="font-mono font-bold text-racing-orange">{userData.licenseId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">License Type</p>
                      <p className="font-medium capitalize">{userData.licenseType} License</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <div className="inline-flex items-center gap-2 bg-racing-green/10 text-racing-green px-3 py-1 rounded-full">
                        <span className="w-2 h-2 bg-racing-green rounded-full" />
                        <span className="text-sm font-medium">Active</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Issue Date</p>
                      <p className="font-medium">{userData.issueDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Expiry Date</p>
                      <p className="font-medium">{userData.expiryDate}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Link to="/verify">
                      <Button variant="outline" className="w-full justify-start">
                        <FileText className="w-4 h-4 mr-2" />
                        Verify License
                      </Button>
                    </Link>
                    <Button variant="outline" className="w-full justify-start" onClick={() => toast.info("Renew feature coming soon!")}>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Renew License
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
