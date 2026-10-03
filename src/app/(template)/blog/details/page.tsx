import { Suspense } from "react";
import { BlogPost } from "@/components/homepage/BlogPost";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/blog/details", "blogTitle");

// Which post to show is only known in the browser, so the prerendered HTML
// stops at this boundary and the article renders on the client.
export default function BlogPostPage() {
  return (
    <Suspense>
      <BlogPost />
    </Suspense>
  );
}
