import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CurrencyProvider } from "@/components/site/CurrencyProvider";
import SiteStickyCta from "@/components/site/SiteStickyCta";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CurrencyProvider>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <SiteStickyCta />
    </CurrencyProvider>
  );
}
