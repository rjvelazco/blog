import Link from 'next/link';
import { getPosts } from '@utils/post-utils';
import { Badge, badgeVariants } from '@components/ui/badge';
import type { VariantProps } from 'class-variance-authority';

type BadgeVariant = VariantProps<typeof badgeVariants>['variant'];

const NOW_MS = Date.now();

const categoryVariant = (category: string): BadgeVariant => {
  const map: Record<string, BadgeVariant> = {
    Angular: 'angular',
    NgRx: 'ngrx',
    Book: 'book',
    Leadership: 'leadership',
  };
  return map[category] ?? 'default';
};

export default async function Home() {
  const posts = await getPosts();
  const featuredPosts = posts.slice(0, 3);

  const isNewPost = (publishDate: string) => {
    const publishMs = new Date(publishDate).getTime();
    if (Number.isNaN(publishMs)) return false;
    if (publishMs > NOW_MS) return false;
    const oneWeekMs = 7 * 24 * 60 * 60 * 1000;
    return NOW_MS - publishMs < oneWeekMs;
  };

  return (
    <div className="mx-auto flex flex-col gap-12 py-8 md:py-12">
      {/* Hero Section */}
      <section className="pt-4 pb-8 md:pb-16">
        <p className="text-[11px] font-bold tracking-[0.08em] uppercase text-[#aaaaaa] dark:text-[#555555] mb-4">
          Senior Software Engineer
        </p>
        <h1 className="text-5xl md:text-[56px] font-extrabold leading-tight tracking-[-0.03em] text-[#111111] dark:text-[#f0f0f0] max-w-2xl">
          Entrega valor <span className="text-primary-700 dark:text-primary-500">más allá del código</span>
        </h1>
        <p className="mt-4 text-base md:text-lg text-[#666666] dark:text-[#aaaaaa] max-w-xl">
          Escribo sobre Angular, arquitectura frontend, personas e ideas.
        </p>
      </section>

      {/* Latest Posts Section */}
      {featuredPosts.length > 0 && (
        <section className="space-y-8">
          <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.02em] text-[#111111] dark:text-[#f0f0f0]">
            Artículos Recientes
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map((post) => (
              <article
                key={post.slug}
                className="group relative rounded-xl border border-[#eeeeee] dark:border-[#2a2a2a] bg-card hover:shadow-md hover:border-primary-300 dark:hover:border-primary-800 transition-all duration-300"
              >
                <div className="p-6">
                  {isNewPost(post.publishDate) && (
                    <Badge
                      variant="newGold"
                      className="absolute right-0 -top-3 -translate-x-1/2 z-10 shadow-md"
                      aria-label="New post"
                    >
                      NEW
                    </Badge>
                  )}
                  <div className="flex items-center gap-2 mb-3">
                    <time className="text-[13px] text-[#aaaaaa]" dateTime={post.publishDate}>
                      {new Date(post.publishDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </time>
                    {post.category && (
                      <>
                        <span className="text-[#aaaaaa]">·</span>
                        <Badge variant={categoryVariant(post.category)}>{post.category}</Badge>
                      </>
                    )}
                  </div>

                  <Link href={`/blog/posts/${post.slug}`}>
                    <h3 className="text-[18px] font-semibold mb-3 group-hover:text-primary-700 dark:group-hover:text-primary-500 transition-colors leading-tight text-[#111111] dark:text-[#f0f0f0]">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-[15px] text-[#666666] dark:text-[#aaaaaa] mb-4 leading-relaxed line-clamp-3">
                    {post.description}
                  </p>

                  <Link
                    href={`/blog/posts/${post.slug}`}
                    className="inline-flex items-center text-primary-700 dark:text-primary-500 hover:text-primary-800 dark:hover:text-primary-400 font-medium transition-colors text-sm"
                  >
                    Leer más →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div>
            <Link
              href="/blog"
              className="inline-flex items-center text-primary-700 dark:text-primary-500 hover:text-primary-800 font-semibold transition-colors"
            >
              Ver todos los artículos →
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
