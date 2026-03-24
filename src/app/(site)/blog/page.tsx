import Link from 'next/link';
import { BlogPost, getPosts } from '@utils/post-utils';
import { Badge, badgeVariants } from '@components/ui/badge';
import type { VariantProps } from 'class-variance-authority';

export const metadata = {
  title: 'Blog - Rafael Velazco',
  description: 'Articles and tutorials about web development, Angular, and software engineering',
};

type BadgeVariant = VariantProps<typeof badgeVariants>['variant'];

const categoryVariant = (category: string): BadgeVariant => {
  const map: Record<string, BadgeVariant> = {
    Angular: 'angular',
    NgRx: 'ngrx',
    Book: 'book',
    Leadership: 'leadership',
  };
  return map[category] ?? 'default';
};

export default async function BlogPage() {
  const posts = await getPosts();

  const categories = [...new Set(posts.map((post) => post.category).filter(Boolean))] as string[];

  return (
    <div className="mx-auto flex flex-col gap-12 py-8 md:py-14">
      {/* Page heading */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="block w-5 h-0.5 bg-primary-700 dark:bg-primary-500 rounded-full" />
          <span className="text-[11px] font-semibold tracking-widest uppercase text-primary-700 dark:text-primary-500">
            Blog
          </span>
        </div>
        <h1 className="text-[36px] font-extrabold tracking-[-0.025em] text-gray-900 dark:text-white mb-3">
          Artículos Recientes
        </h1>
        <p className="text-[15px] text-gray-500 dark:text-gray-400 max-w-lg leading-relaxed">
          Escribo sobre Angular, NgRx, arquitectura de software, personas, equipos y los libros que cambian mi forma de
          trabajar.
        </p>
      </div>

      {/* Content + Sidebar */}
      <div className="flex gap-14 items-start">
        {/* Article list */}
        <section className="flex-1 min-w-0">
          {posts.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 py-8">No hay artículos en esta categoría.</p>
          ) : (
            posts.map((post, i) => (
              <div key={post.slug}>
                <BlogItem post={post} />
                {i < posts.length - 1 && <div className="border-t border-gray-100 dark:border-[#2a2a2a] my-1" />}
              </div>
            ))
          )}
        </section>

        {/* Sidebar */}
        <aside className="w-52 shrink-0 sticky top-24 hidden lg:block space-y-8">
          {/* Categories */}
          <div>
            <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-gray-300 dark:text-gray-600 mb-4">
              Categorías
            </p>
            <div className="flex flex-col gap-2">
              <CategoryLink href="/blog" label="Todos" active={false} />
              {categories.map((cat) => (
                <CategoryLink key={cat} href={`/blog?category=${encodeURIComponent(cat)}`} label={cat} active={false} />
              ))}
            </div>
          </div>

          <div className="border-t border-gray-100 dark:border-[#2a2a2a]" />

          {/* About snippet */}
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
    </div>
  );
}

function CategoryLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={[
        'text-left text-[13px] font-medium px-3 py-2 rounded-lg border transition-colors',
        active
          ? 'bg-primary-700 dark:bg-primary-800 text-white border-primary-700 dark:border-primary-800'
          : 'border-gray-200 dark:border-[#2a2a2a] text-gray-500 dark:text-gray-400 hover:border-primary-300 dark:hover:border-primary-700 hover:text-primary-700 dark:hover:text-primary-500',
      ].join(' ')}
    >
      {label}
    </Link>
  );
}

function BlogItem({ post }: { post: BlogPost }) {
  return (
    <article className="group -mx-4 px-4 py-5 rounded-xl hover:bg-[rgba(77,124,95,0.04)] dark:hover:bg-[rgba(77,124,95,0.08)] transition-colors">
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
            <Link href={`/blog?category=${encodeURIComponent(post.category)}`}>
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
