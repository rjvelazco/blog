import { Suspense } from 'react';

import { BlogPostsSection } from '@components/blog/blog-posts-section';
import { getPosts } from '@utils/post-utils';

export const metadata = {
  title: 'Blog - Rafael Velazco',
  description: 'Articles and tutorials about web development, Angular, and software engineering',
};

function BlogPostsFallback() {
  return (
    <div className="flex gap-14 items-start">
      <div className="flex-1 min-w-0 h-64 animate-pulse rounded-xl bg-gray-100 dark:bg-[#2a2a2a]" />
      <aside className="w-52 shrink-0 hidden lg:block space-y-8">
        <div className="h-40 animate-pulse rounded-lg bg-gray-100 dark:bg-[#2a2a2a]" />
        <div className="h-32 animate-pulse rounded-lg bg-gray-100 dark:bg-[#2a2a2a]" />
      </aside>
    </div>
  );
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="mx-auto flex flex-col gap-12 py-8 md:py-14">
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

      <Suspense fallback={<BlogPostsFallback />}>
        <BlogPostsSection posts={posts} />
      </Suspense>
    </div>
  );
}
