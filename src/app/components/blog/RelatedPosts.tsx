import Link from "next/link";
import { getRelatedPosts } from "@/app/lib/supabase-posts";

interface RelatedPostsProps {
    category: string;
    currentSlug: string;
}

export default async function RelatedPosts({ category, currentSlug }: RelatedPostsProps) {
    const relatedPosts = await getRelatedPosts(category, currentSlug);

    if (!relatedPosts || relatedPosts.length === 0) {
        return null;
    }

    return (
        <div className="mt-24 border-t-8 border-black pt-12">
            <h3 className="text-3xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4">
                <span className="bg-yellow-400 px-4 py-1 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-xl">
                    {category}
                </span>
                Kategorisinden Diğer Yazılar
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((post) => (
                    <Link
                        key={post.id}
                        href={`/blog/${post.slug}`}
                        className="group block bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-none hover:translate-x-1 hover:translate-y-1 h-full flex flex-col"
                    >
                        {post.image_url && (
                            <div className="mb-4 aspect-video bg-gray-100 border-2 border-black overflow-hidden relative">
                                <img
                                    src={post.image_url}
                                    alt={post.title}
                                    className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500"
                                />
                            </div>
                        )}

                        <h4 className="text-xl font-black leading-tight mb-2 group-hover:text-teal-600 transition-colors uppercase">
                            {post.title}
                        </h4>

                        <div className="mt-auto pt-4 border-t-2 border-black flex items-center justify-between text-xs font-bold uppercase tracking-widest text-gray-500">
                            <span>{new Date(post.created_at).toLocaleDateString("tr-TR")}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
