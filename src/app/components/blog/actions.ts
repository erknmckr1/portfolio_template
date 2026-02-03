"use server";

import { createClient } from "@/app/lib/supabase/server";

export async function incrementView(postId: string) {
    const supabase = await createClient();

    const { error } = await supabase.rpc("increment_view_count", {
        post_id: postId,
    });

    if (error) {
        console.error("Error incrementing view count:", error);
    }
}
