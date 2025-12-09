import { QRCodeSVG } from "qrcode.react";
import { Flag, Shield } from "lucide-react";

interface LicenseCardProps {
  licenseId: string;
  name: string;
  licenseType: "beginner" | "pro" | "championship";
  issueDate: string;
  expiryDate: string;
  photoUrl?: string;
}

const licenseTypeConfig = {
  beginner: { label: "Beginner", color: "bg-racing-green" },
  pro: { label: "Pro", color: "bg-racing-orange" },
  championship: { label: "Championship", color: "bg-racing-gold" },
};

export function LicenseCard({
  licenseId,
  name,
  licenseType,
  issueDate,
  expiryDate,
  photoUrl,
}: LicenseCardProps) {
  const typeConfig = licenseTypeConfig[licenseType];
  const verificationUrl = `${window.location.origin}/verify?id=${licenseId}`;

  return (
    <div className="license-card rounded-2xl p-6 text-primary-foreground w-full max-w-md aspect-[1.6/1] relative overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-racing-orange rounded-lg flex items-center justify-center">
            <Flag className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs opacity-70">GoKart License</p>
            <p className="font-bold text-sm">Authority</p>
          </div>
        </div>
        <div className={`${typeConfig.color} px-3 py-1 rounded-full`}>
          <span className="text-xs font-bold text-primary-foreground">{typeConfig.label}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-4 mt-4 relative z-10">
        {/* Photo */}
        <div className="w-20 h-24 rounded-lg bg-primary-foreground/20 overflow-hidden flex-shrink-0">
          {photoUrl ? (
            <img src={photoUrl} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Shield className="w-8 h-8 opacity-50" />
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <p className="text-lg font-bold truncate">{name}</p>
          <p className="text-xs opacity-70 mt-1">License ID</p>
          <p className="font-mono text-sm">{licenseId}</p>
          <div className="flex gap-4 mt-2">
            <div>
              <p className="text-[10px] opacity-70">Issue Date</p>
              <p className="text-xs font-medium">{issueDate}</p>
            </div>
            <div>
              <p className="text-[10px] opacity-70">Expiry Date</p>
              <p className="text-xs font-medium">{expiryDate}</p>
            </div>
          </div>
        </div>

        {/* QR Code */}
        <div className="flex-shrink-0">
          <div className="bg-primary-foreground rounded-lg p-1.5">
            <QRCodeSVG value={verificationUrl} size={56} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-3 left-6 right-6 flex items-center justify-between text-[10px] opacity-60 z-10">
        <span>Scan QR to verify</span>
        <span>www.gokartlicense.com</span>
      </div>
    </div>
  );
}
