import { Navbar } from "@/components/share/Navbar";
import { Footer } from "@/components/share/Footer";
import { SkipLink } from "@/components/share/SkipLink";
import { SmoothScroll } from "@/components/share/SmoothScroll";
import { ScrollAura } from "@/components/share/ScrollAura";
export default function TemplateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative isolate min-h-screen bg-card">
      <SmoothScroll />
      <ScrollAura />
      <SkipLink />
      <Navbar />
      <main id="main">{children}</main>
      <Footer />
    </div>
  );
}
