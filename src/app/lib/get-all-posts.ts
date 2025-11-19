// lib/get-all-posts.ts
import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";

export type PostMeta = {
  title: string;
  description?: string;
  date: string;
  tags?: string[];
  slug: string;
};

// blog mdx dosyalarının olduğu klasör
const BLOG_DIR = path.join(process.cwd(), "content/blog");

export async function getAllPosts(): Promise<PostMeta[]> {
  // klasordeki tüm dosyaları oku
  const files = fs.readdirSync(BLOG_DIR);
  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith(".mdx"))
      .map(async (file) => {
        const slug = file.replace(".mdx", "");
        const filePath = path.join(BLOG_DIR, file);
        const mdxSource = fs.readFileSync(filePath, "utf8");

        const { frontmatter } = await compileMDX({
          source: mdxSource,
          options: { parseFrontmatter: true },
        });
        return {
          ...(frontmatter as PostMeta),
          slug,
        } satisfies PostMeta;
      })
  );

  // Tarihe göre sırala (Yeni → Eski)
  return posts.sort((a, b) => +new Date(b.date) - +new Date(a.date));
}
