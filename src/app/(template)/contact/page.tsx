import { ContactPage } from "@/components/homepage/ContactPage";
import { Faq } from "@/components/homepage/Faq";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/contact", "contact");

export default function Contact() {
  return (
    <>
      <ContactPage />
      <Faq />
    </>
  );
}
