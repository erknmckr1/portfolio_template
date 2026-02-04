// app/blog/page.tsx

import Link from "next/link";
import { getAllPostsFromDB } from "@/app/lib/supabase-posts";
import { calculateReadingTime } from "@/app/lib/utils/readingTime";
import ViewCounter from "@/app/components/blog/ViewCounter";

export default async function BlogListPage() {
  const posts = await getAllPostsFromDB();
  return (
    <main className="mx-auto max-w-4xl py-16 px-4">
      <h1 className="text-6xl font-black mb-6 uppercase tracking-tighter" style={{ fontFamily: "serif" }}>
        Blog
      </h1>

      <p className="text-xl font-bold uppercase tracking-widest text-gray-400 mb-12">
        Yeni yazılar, teknik makaleler ve geliştirme notları.
      </p>

      <div className="grid gap-8">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group block bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-none hover:translate-x-1 hover:translate-y-1"
          >
            {post.category && (
              <span className="inline-block bg-black text-white px-3 py-1 text-xs font-bold uppercase mb-4">
                {post.category}
              </span>
            )}

            <h2 className="text-3xl font-black group-hover:text-teal-600 transition-colors uppercase leading-tight">
              {post.title}
            </h2>

            {post.excerpt && (
              <p className="mt-4 text-gray-600 font-medium line-clamp-2">
                {post.excerpt}
              </p>
            )}

            <div className="mt-8 flex items-center justify-between text-xs font-black uppercase tracking-widest border-t-2 border-black pt-4">
              <div className="flex items-center gap-2">
                <span>{new Date(post.created_at).toLocaleDateString("tr-TR")}</span>
                <span className="text-gray-400">•</span>
                <span>{calculateReadingTime(post.content)}</span>
                <span className="text-gray-400">•</span>
                <ViewCounter postId={post.id} initialViews={post.view_count || 0} increment={false} />
              </div>


              {post.tags && post.tags.length > 0 && (
                <div className="flex gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 border border-black bg-gray-50 italic"
                    >
                      #{tag}
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
