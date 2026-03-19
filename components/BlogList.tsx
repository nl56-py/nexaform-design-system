'use client';

import { useMemo, useState } from 'react';
import { BlogCard } from './BlogCard';

export type BlogPost = {
  title: string;
  excerpt: string;
  category: string;
  date: string;
};

type BlogListProps = {
  posts: BlogPost[];
};

const categories = [
  'All',
  'AI & Automation',
  'Product Strategy',
  'Operations',
  'Consulting',
  'Systems Design',
];

export function BlogList({ posts }: BlogListProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesText =
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesText;
    });
  }, [posts, search, selectedCategory]);

  return (
    <div className="space-y-10">
      <div className="grid gap-4 md:grid-cols-2 md:items-center">
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-panel px-4 py-3 shadow-panel">
          <span className="text-sm font-semibold text-textSecondary">Filter by category</span>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  selectedCategory === category
                    ? 'bg-accentPrimary text-white'
                    : 'bg-backgroundSecondary text-textSecondary hover:bg-accentPrimary/8 hover:text-accentPrimary'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search articles"
            className="w-full rounded-2xl border border-border bg-panel px-4 py-3 text-sm text-textPrimary outline-none placeholder:text-textSecondary focus:border-accentPrimary focus:ring-2 focus:ring-accentPrimary/15"
          />
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-textSecondary">
            Find
          </span>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {filtered.length > 0 ? (
          filtered.map((post) => (
            <BlogCard
              key={post.title}
              title={post.title}
              excerpt={post.excerpt}
              category={post.category}
              date={post.date}
              href="/blog"
            />
          ))
        ) : (
          <div className="col-span-full rounded-2xl border border-border bg-panel p-10 text-center text-sm text-textSecondary shadow-panel">
            No articles match your search. Try a different term or category.
          </div>
        )}
      </div>
    </div>
  );
}
