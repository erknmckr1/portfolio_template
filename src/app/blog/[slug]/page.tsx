// app/blog/[slug]/page.tsx

import { getPost } from "@/app/lib/get-post";
import { notFound } from "next/navigation";
import { getAllPosts } from "@/app/lib/get-all-posts";
import TOC from "@/app/components/blog/TOC";
import { format } from "date-fns";
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  //  BURASI ÖNEMLİ: params Promise → unwrap etmeliyiz
  const { slug } = await params;

  let post;
  try {
    post = await getPost(slug);
  } catch (err) {
    console.log("MDX load error:", err);
    return notFound();
  }

  if (!post) return notFound();

  const { meta, content } = post;
  
  return (
    <div className="w-full relative flex flex-col lg:flex-row lg:gap-12  max-w-7xl mx-auto">
      <main className="lg:mx-auto lg:max-w-3xl py-24 px-4">
        <h1 className="text-4xl font-bold tracking-tight mb-3">{meta.title}</h1>

        {meta.description && (
          <p className="lg:text-lg text-gray-600 mb-6">{meta.description}</p>
        )}

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-10">
          <span>{format(new Date(meta.date), "d MMMM yyyy")}</span>

          {meta.tags && meta.tags.length > 0 && (
            <ul className="flex gap-2">
              {meta.tags.map((tag) => (
                <li
                  key={tag}
                  className="px-2 py-0.5 rounded bg-gray-200 text-gray-700 text-xs"
                >
                  #{tag}
                </li>
              ))}
            </ul>
          )}
        </div>

        <article className="prose prose-lg ">{content}</article>
      </main>

      <div className="hidden  xl:block w-64  top-20 right-10 h-fit border-l pl-6"></div>
      <aside className="fixed hidden  xl:block w-64  top-20 right-10 h-fit border-l pl-6">
        <TOC headings={meta.headings} />
      </aside>
    </div>
  );
}
