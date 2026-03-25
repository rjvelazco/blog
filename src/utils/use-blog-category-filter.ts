'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

import type { BlogPost } from '@utils/post-utils';

export function useBlogCategoryFilter(posts: BlogPost[]) {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category') || null;

  const filteredPosts = useMemo(() => {
    if (!activeCategory) return posts;
    return posts.filter((post) => post.category === activeCategory);
  }, [posts, activeCategory]);

  const categories = useMemo(
    () => [...new Set(posts.map((post) => post.category).filter(Boolean))] as string[],
    [posts]
  );

  return { filteredPosts, categories, activeCategory };
}
