'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { VariantProps } from 'class-variance-authority';

import { Badge, badgeVariants } from '@components/ui/badge';
import { cn } from '@components/utils';
import type { BlogPost } from '@utils/post-utils';
import { useBlogCategoryFilter } from '@utils/use-blog-category-filter';

type BadgeVariant = VariantProps<typeof badgeVariants>['variant'];

type BlogPostsSectionProps = {
  posts: BlogPost[];
};

const categoryVariant = (category: string): BadgeVariant => {
  const map: Record<string, BadgeVariant> = {
    Angular: 'angular',
    NgRx: 'ngrx',
    Book: 'book',
    Leadership: 'leadership',
  };
  return map[category] ?? 'default';
};

export function BlogPostsSection({ posts }: BlogPostsSectionProps) {
  const pathname = usePathname();
  const { filteredPosts, categories, activeCategory } = useBlogCategoryFilter(posts);

  return (
    <div className="flex gap-14 items-start">
      <section className="flex-1 min-w-0">
        {filteredPosts.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 py-8">No hay artículos en esta categoría.</p>
        ) : (
          filteredPosts.map((post, i) => (
            <div key={post.slug}>
              <BlogItem post={post} blogListPath={pathname} first={i === 0} />
              {i < filteredPosts.length - 1 && <div className="border-t border-gray-100 dark:border-[#2a2a2a] my-1" />}
            </div>
          ))
        )}
      </section>

      <aside className="w-52 shrink-0 sticky top-24 hidden lg:block space-y-8">
        <div>
          <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-gray-300 dark:text-gray-600 mb-4">
            Categorías
          </p>
          <div className="flex flex-col gap-2">
            <CategoryLink href={pathname} label="Todos" active={activeCategory === null} />
            {categories.map((cat) => (
              <CategoryLink
                key={cat}
                href={`${pathname}?category=${encodeURIComponent(cat)}`}
                label={cat}
                active={activeCategory === cat}
              />
            ))}
          </div>
        </div>

        <div className="border-t border-gray-100 dark:border-[#2a2a2a]" />

        <div>
          <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-gray-300 dark:text-gray-600 mb-4">
            Sobre mí
          </p>
          <p className="text-[12px] text-gray-500 dark:text-gray-400 leading-relaxed mb-3">
            Senior Software Engineer. Escribo sobre lo que aprendo trabajando con código, personas e ideas.
          </p>
          <Link
            href="/portfolio"
            className="text-[12px] font-semibold text-primary-700 dark:text-primary-500 hover:text-primary-800 dark:hover:text-primary-400 transition-colors"
          >
            Leer más →
          </Link>
        </div>
      </aside>
    </div>
  );
}

function CategoryLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        'text-left text-[13px] font-medium px-3 py-2 rounded-lg border transition-colors',
        active
          ? 'bg-primary-700 dark:bg-primary-800 text-white border-primary-700 dark:border-primary-800'
          : 'border-gray-200 dark:border-[#2a2a2a] text-gray-500 dark:text-gray-400 hover:border-primary-300 dark:hover:border-primary-700 hover:text-primary-700 dark:hover:text-primary-500'
      )}
    >
      {label}
    </Link>
  );
}

function BlogItem({ post, blogListPath, first }: { post: BlogPost; blogListPath: string; first: boolean }) {
  return (
    <article
      className={cn(
        'group -mx-4 px-4 py-5 rounded-xl hover:bg-[rgba(77,124,95,0.04)] dark:hover:bg-[rgba(77,124,95,0.08)] transition-colors',
        first && 'pt-0'
      )}
    >
      <div className="flex items-center gap-2.5 mb-3">
        <time className="text-[12px] text-gray-400 dark:text-gray-500" dateTime={post.publishDate}>
          {new Date(post.publishDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
        {post.category && (
          <>
            <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
            <Link href={`${blogListPath}?category=${encodeURIComponent(post.category)}`}>
              <Badge variant={categoryVariant(post.category)}>{post.category}</Badge>
            </Link>
          </>
        )}
      </div>

      <Link href={`/blog/posts/${post.slug}`}>
        <h2 className="text-[18px] font-bold tracking-tight text-gray-900 dark:text-white mb-2 leading-snug group-hover:text-primary-700 dark:group-hover:text-primary-500 transition-colors">
          {post.title}
        </h2>
      </Link>

      <p className="text-[14px] text-gray-500 dark:text-gray-400 leading-relaxed mb-3 max-w-xl">{post.description}</p>

      <Link
        href={`/blog/posts/${post.slug}`}
        className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary-700 dark:text-primary-500 hover:text-primary-800 dark:hover:text-primary-400 transition-colors"
      >
        Leer más
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </Link>
    </article>
  );
}
