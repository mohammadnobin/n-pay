"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { Reveal, REVEAL_STEP } from "@/components/share/Reveal";
import { BlogMark } from "./BlogMark";
import { BLOG_POSTS } from "@/constants/blog";
import { routes } from "@/constants/routes";

/** Static teaser grid: three illustrative posts, each opening the post page. */
export function Blog() {
  const { t } = useLang();
  return (
    <section
      id="blog"
      data-stop="blog"
      className="mx-auto max-w-7xl px-6 py-20"
    >
      <Reveal className="mx-auto max-w-xl text-center">
        <h2 className="text-4xl font-bold tracking-[-.03em] sm:text-5xl">
          {t("blogTitle")}
        </h2>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">
          {t("blogNote")}
        </p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
          {t("blogExploreAll")}
          <ArrowRight size={15} className="rtl:rotate-180" />
        </span>
      </Reveal>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {BLOG_POSTS.map((n) => (
          <Reveal key={n} delay={(n - 1) * REVEAL_STEP} className="h-full">
            {/* The whole card is the link, and the copy sits in a column so
             *  "Read more" lands on the same line in every card, however long
             *  the title above it runs. */}
            <Link
              href={routes.blogPost(n)}
              className="flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/40"
            >
              <div className="anim-sheen flex aspect-[4/3] shrink-0 items-center justify-center bg-muted text-foreground">
                <BlogMark className="size-16 sm:size-20" />
              </div>
              <article className="flex flex-1 flex-col p-5">
                <h3 className="font-bold">{t(`blogPost${n}Title`)}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {t(`blogPost${n}Note`)}
                </p>
                <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold text-primary">
                  {t("blogReadMore")}
                  <ArrowRight size={14} className="rtl:rotate-180" />
                </span>
              </article>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
