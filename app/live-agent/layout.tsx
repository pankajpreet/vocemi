import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Agent",
  robots: { index: false, follow: false },
};

export default function LiveAgentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
