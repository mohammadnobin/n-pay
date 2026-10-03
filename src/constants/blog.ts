/** The teaser grid and the post page both read from here, so a post exists in
 *  exactly one place. Each id maps to `blogPost{id}Title`, `…Note` and
 *  `…Body1..3` in the dictionaries — there is no blog backend yet. */
export const BLOG_POSTS = [1, 2, 3] as const;

export const BLOG_BODY_PARAGRAPHS = [1, 2, 3] as const;

export function isBlogPost(id: string): id is `${(typeof BLOG_POSTS)[number]}` {
  return BLOG_POSTS.some((post) => String(post) === id);
}
