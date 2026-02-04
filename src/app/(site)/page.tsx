import Hero from "../components/Hero";
import Divider from "../components/Divider";
import Biography from "../components/biography/Biography";
import Portfolio from "../components/portfolio/Portfolio";
import Services from "../components/services/Services";
import Contact from "../components/contact/Contact";
import BlogWrapper from "../components/blog/BlogWrapper";
import { getAllPostsFromDB } from "../lib/supabase-posts";
import { getAllProjectsFromDB } from "../lib/supabase-posts";
export default async function Home() {
  const posts = await getAllPostsFromDB();
  const projects = await getAllProjectsFromDB();
  // Sadece son 3 yazıyı ana sayfada gösterelim
  const recentPosts = posts.slice(0, 3);
  return (
    <div className="">
      <Hero />
      <Divider />
      <Biography />
      <Divider />
      <Portfolio projects={projects} />
      <Divider />
      <Services />
      <Divider />
      <BlogWrapper blog={recentPosts} />
      <Divider />
      <Contact />
    </div>
  );
}
