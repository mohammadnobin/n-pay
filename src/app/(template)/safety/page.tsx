import { SecurityOverview } from "@/components/homepage/SecurityOverview";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/security", "security");

export default function SecurityPage() {
  return <SecurityOverview />;
}
