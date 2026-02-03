import { createClient as createBrowserClient } from "./supabase/client";
import { createClient as createServerClient } from "./supabase/server";

const isServer = typeof window === "undefined";

async function getSupabase() {
    if (isServer) {
        return await createServerClient();
    }
    return createBrowserClient();
}

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    category: string;
    tags: string[];
    image_url: string;
    created_at: string;
    is_published: boolean;
    author_id: string;
    view_count: number;
}

export async function getAllPostsFromDB() {
    const supabase = await getSupabase();
    const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching all posts:", error.message);
        return [];
    }
    return data as BlogPost[];
}

export async function getPostBySlug(slug: string) {
    const supabase = await getSupabase();
    const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .single();

    if (error) {
        console.error(`Error fetching post by slug (${slug}):`, error.message);
        return null;
    }
    return data as BlogPost;
}

export async function getRelatedPosts(category: string, currentSlug: string) {
    const supabase = await getSupabase();

    // Eğer kategori yoksa boş döndür
    if (!category) return [];

    const { data, error } = await supabase
        .from("blogs")
        .select("id, title, slug, excerpt, created_at, image_url, category")
        .eq("is_published", true)
        .eq("category", category)
        .neq("slug", currentSlug)
        .limit(3)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching related posts:", error.message);
        return [];
    }

    return data as BlogPost[];
}
