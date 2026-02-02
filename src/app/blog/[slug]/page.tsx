// app/blog/[slug]/page.tsx

import { getPostBySlug, getAllPostsFromDB } from "@/app/lib/supabase-posts";
import { notFound } from "next/navigation";
import BlogContentViewer from "@/app/components/blog/BlogContentViewer";

export async function generateStaticParams() {
  const posts = await getAllPostsFromDB();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

import { extractHeadingsAndAddIds } from "@/app/lib/utils/toc";
import TOC from "@/app/components/blog/TOC";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return notFound();

  const { modifiedHtml, headings } = extractHeadingsAndAddIds(post.content);

  return (
    <div className="w-full max-w-7xl mx-auto py-24 px-4 bg-white flex flex-col xl:flex-row items-start">
      <main className="w-full xl:max-w-4xl">
        {/* Category & Date */}
        <div className="flex items-center gap-4 mb-6">
          {post.category && (
            <span className="bg-black text-white px-4 py-1 text-sm font-black uppercase tracking-widest">
              {post.category}
            </span>
          )}
          <span className="text-sm font-black uppercase tracking-widest text-gray-400">
            {new Date(post.created_at).toLocaleDateString("tr-TR")}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-none" style={{ fontFamily: "serif" }}>
          {post.title}
        </h1>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-xl md:text-2xl font-bold italic text-gray-500 mb-12 border-l-8 border-black pl-6">
            {post.excerpt}
          </p>
        )}

        {/* Image */}
        {post.image_url && (
          <div className="mb-12 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-gray-100 aspect-video relative overflow-hidden">
            <img
              src={post.image_url}
              alt={post.title}
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
            />
          </div>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex gap-2 mb-12">
            {post.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 border-2 border-black font-black uppercase text-[10px] tracking-widest hover:bg-black hover:text-white transition-colors cursor-default">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <hr className="border-t-4 border-black mb-12" />

        {/* Content */}
        <article>
          <BlogContentViewer htmlContent={modifiedHtml} />
        </article>
      </main>

      {/* Sidebar / TOC */}
      <TOC headings={headings} />
    </div>
  );
}
