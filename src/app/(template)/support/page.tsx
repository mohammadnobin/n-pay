import { SupportCenter } from "@/components/homepage/SupportCenter";
import { Faq } from "@/components/homepage/Faq";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/support", "support");

export default function SupportPage() {
  return (
    <>
      <SupportCenter />
      <Faq />
    </>
  );
}
