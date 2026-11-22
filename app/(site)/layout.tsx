import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SiteProviders from "@/components/offer/SiteProviders";
import SiteStickyCta from "@/components/offer/SiteStickyCta";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SiteProviders>
      <Navbar />
      <main>{children}</main>
      {/* Room for the mobile sticky bar so it never covers the footer. */}
      <div className="pb-[76px] md:pb-0 bg-cream">
        <Footer />
      </div>
      <SiteStickyCta />
    </SiteProviders>
  );
}
