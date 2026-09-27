import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking Confirmed",
  description: "Your Vocemi consultation has been booked.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function BookingConfirmedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
