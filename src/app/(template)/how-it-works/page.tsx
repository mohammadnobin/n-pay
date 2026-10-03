import { HowItWorks } from "@/components/homepage/HowItWorks";
import { Faq } from "@/components/homepage/Faq";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/how-it-works", "howItWorks");

export default function HowItWorksPage() {
  return (
    <>
      <HowItWorks />
      <Faq />
    </>
  );
}
