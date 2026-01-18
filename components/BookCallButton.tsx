import Link from "next/link";
import { siteConfig } from "@/lib/config";

interface BookCallButtonProps {
  variant?: "primary" | "secondary";
  className?: string;
  children?: React.ReactNode;
}

export default function BookCallButton({
  variant = "primary",
  className = "",
  children,
}: BookCallButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-base transition-all duration-300";
  const variants = {
    primary:
      "bg-gradient-to-r from-primary-accent to-primary-accent-alt text-white hover:shadow-lg hover:shadow-primary-accent/40 hover:-translate-y-0.5",
    secondary:
      "bg-transparent border-2 border-primary-accent text-white hover:bg-primary-accent hover:text-white",
  };

  return (
    <Link
      href={siteConfig.bookCallUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children || "Book a Call"}
    </Link>
  );
}

