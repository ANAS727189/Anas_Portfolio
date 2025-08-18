import Hero from "./_Landing/Hero";
import Experience from "./_Landing/Experience";
import Project from "./_Landing/Project";
import Blog from "./_Landing/Blog";
import About from "./_Landing/About";
import Profile from "./_Landing/Profile";
import Contact from "./_Landing/Contact";
import { generateMetadata as getMeta } from "@/config/Meta";

export async function generateMetadata() {
  return getMeta("/");
}

export default function Home() {
  return (
    <div>
     <Hero />
     <Experience />
     <Project />
     <About />
     <Blog />
     <Profile />
     <Contact />
    </div>
  );
}
