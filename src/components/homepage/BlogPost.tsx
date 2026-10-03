"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { Reveal, REVEAL_STEP } from "@/components/share/Reveal";
import { BlogMark } from "./BlogMark";
import { BLOG_BODY_PARAGRAPHS, BLOG_POSTS, isBlogPost } from "@/constants/blog";
import { routes } from "@/constants/routes";

/** One post, chosen by `?id=`. The site is a static export, so the route is a
 *  single file and the id is read in the browser; an unknown id says so rather
 *  than rendering an empty article. */
export function BlogPost() {
  const { t } = useLang();
  const id = useSearchParams().get("id") ?? "";

  if (!isBlogPost(id))
    return (
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-4xl font-semibold">{t("notFoundTitle")}</h1>
        <p className="mt-5 text-lg text-muted-foreground">{t("notFound")}</p>
        <BackLink label={t("blogAllPosts")} className="mt-8" />
      </section>
    );

  const others = BLOG_POSTS.filter((post) => String(post) !== id);

  return (
    <article className="mx-auto max-w-3xl px-6 pt-20 pb-24">
      <Reveal>
        <BackLink label={t("blogAllPosts")} />
        <h1 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-[-.03em] sm:text-5xl">
          {t(`blogPost${id}Title`)}
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          {t(`blogPost${id}Note`)}
        </p>
      </Reveal>

      <Reveal delay={REVEAL_STEP}>
        <div className="anim-sheen mt-10 flex aspect-[16/7] items-center justify-center rounded-2xl bg-muted text-foreground">
          <BlogMark className="size-20 sm:size-24" />
        </div>
      </Reveal>

      <Reveal delay={REVEAL_STEP * 2}>
        <div className="mt-10 space-y-6 text-base leading-8 text-muted-foreground">
          {BLOG_BODY_PARAGRAPHS.map((paragraph) => (
            <p key={paragraph}>{t(`blogPost${id}Body${paragraph}`)}</p>
          ))}
        </div>
      </Reveal>

      <Reveal delay={REVEAL_STEP * 3}>
        <nav
          aria-label={t("blogTitle")}
          className="mt-14 border-t border-border pt-8"
        >
          <p className="eyebrow text-primary">{t("blogTitle")}</p>
          <ul className="mt-4 space-y-3">
            {others.map((post) => (
              <li key={post}>
                <Link
                  href={routes.blogPost(post)}
                  className="group inline-flex items-center gap-2 font-semibold hover:text-primary"
                >
                  {t(`blogPost${post}Title`)}
                  <ArrowRight size={15} className="shrink-0 rtl:rotate-180" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Reveal>
    </article>
  );
}

function BackLink({ label, className }: { label: string; className?: string }) {
  return (
    <Link
      href={`${routes.home}#blog`}
      className={`inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary ${className ?? ""}`}
    >
      <ArrowLeft size={16} className="rtl:rotate-180" />
      {label}
    </Link>
  );
}
