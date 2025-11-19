// app/blog/page.tsx

import Link from "next/link";
import { getAllPosts } from "../lib/get-all-posts";

export default async function BlogListPage() {
  const posts = await getAllPosts();

  return (
    <main className="mx-auto max-w-4xl py-16 px-4">
      <h1 className="text-4xl font-bold mb-6">Blog</h1>

      <p className="text-muted-foreground mb-12">
        Yeni yazılar, teknik makaleler ve geliştirme notları.
      </p>

      <div className="grid gap-8">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block rounded-2xl border p-6 transition hover:shadow-lg hover:border-primary/50"
          >
            <h2 className="text-2xl font-semibold group-hover:text-primary transition">
              {post.title}
            </h2>

            {post.description && (
              <p className="mt-2 text-muted-foreground">
                {post.description}
              </p>
            )}

            <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
              <span>{post.date}</span>

              {post.tags && post.tags.length > 0 && (
                <div className="flex gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded bg-accent text-accent-foreground text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
