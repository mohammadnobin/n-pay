import { Banner } from "@/components/homepage/Banner";
import { TravelPay } from "@/components/homepage/TravelPay";
import { DownloadApp } from "@/components/homepage/DownloadApp";
import { Features } from "@/components/homepage/Features";
import { Process } from "@/components/homepage/Process";
import { Blog } from "@/components/homepage/Blog";
import { Faq } from "@/components/homepage/Faq";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("", "seoTitle");

export default function HomePage() {
  return (
    <>
      <Banner />
      <Process />
      <Features />
      <TravelPay />
      <DownloadApp />
      <Blog />
      <Faq />
    </>
  );
}
