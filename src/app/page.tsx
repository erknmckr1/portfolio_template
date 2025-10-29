import Hero from "./components/Hero";
import Divider from "./components/Divider";
import Biography from "./components/biography/Biography";
import Portfolio from "./components/portfolio/Portfolio";
import Services from "./components/services/Services";
import Contact from "./components/contact/Contact";
import BlogWrapper from "./components/blog/BlogWrapper";
export default function Home() {
  return (
    <div className="">
      <Hero />
      <Divider />
      <Biography />
      <Divider />
      <Portfolio />
      <Divider />
      <Services />
      <Divider />
      <BlogWrapper />
      <Divider />
      <Contact />
    </div>
  );
}
