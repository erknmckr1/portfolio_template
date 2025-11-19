// lib/get-post.ts

import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { mdxComponents } from "../components/blog/mdx-components";

// Bu type frontmatter içindeki değerleri temsil eder.
export type BlogFrontmatter = {
  title: string;
  description?: string;
  date: string;
  readingTime?: string;
  tags?: string[];
};

export type BlogHeading = {
  level: number;
  text: string;
  id: string;
};

// MDX dosyalarının bulunduğu klasör yolu:
const BLOG_DIR = path.join(process.cwd(), "content/blog");

export async function getPost(slug: string) {
  // Örn: slug="intersection-observer"
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  // MDX dosyasının içeriğini oku bir string olarak ele al 
  const fileContent = fs.readFileSync(filePath, "utf8");

  const headings: BlogHeading[] = [];

  // aşağıdaki regex ile MDX derlenmeden TOC için başlıkları çıkarıyoruz.
  const extractHeadings = (text: string) => {
    const headingRegex = /^(#{1,3})\s+(.*)$/gm;
    let match;
    while ((match = headingRegex.exec(text))) {
      const level = match[1].length;
      const textValue = match[2].trim();
      const id = textValue.toLowerCase().replace(/[^a-z0-9]+/g, "-");

      headings.push({ level, text: textValue, id });
    }
  };
  extractHeadings(fileContent);
  // MDX'i React component'e çevir
  // Ayrıca parseFrontmatter sayesinde `---` içi meta bilgileri de alıyoruz
  const { content, frontmatter } = await compileMDX<BlogFrontmatter>({
    source: fileContent,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
    },
  });

  // Sonuç olarak:
  // content => React bileşeni
  // frontmatter => title, description, tags, date...
  // headings => sayfa içi başlıklar (TOC için)
  return {
    meta: {
      ...frontmatter,
      headings,
      slug,
    },
    content,
  };
}
