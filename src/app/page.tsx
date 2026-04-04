import Hero from "./_Landing/Hero";
import Experience from "./_Landing/Experience";
import Project from "./_Landing/Project";
import OpenSource from "./_Landing/OpenSource";
import Blog from "./_Landing/Blog";
import About from "./_Landing/About";
import Profile from "./_Landing/Profile";
import Contact from "./_Landing/Contact";
import WalkingCat from "@/components/WalkingCat";
import { generateMetadata as getMeta } from "@/config/Meta";

export async function generateMetadata() {
  return getMeta("/");
}

export default function Home() {
  return (
    <div>
      {/* Black — sleek, mysterious, classic */}
      <div className="relative">
        <Hero />
        <WalkingCat variant="black" />
      </div>

      {/* Tuxedo — dapper black-and-white gentleman */}
      <div className="relative">
        <Experience />
        <WalkingCat variant="tuxedo" />
      </div>

      {/* Orange tabby — bold, loud, Garfield energy */}
      <div className="relative">
        <Project />
        <WalkingCat variant="orange-tabby" />
      </div>

      {/* Calico — three-colour good-luck cat */}
      <div className="relative">
        <OpenSource />
        <WalkingCat variant="calico" />
      </div>

      {/* Tortoiseshell — fiery swirl of brown and ginger */}
      <div className="relative">
        <About />
        <WalkingCat variant="tortoiseshell" />
      </div>

      {/* Lilac — rare, dreamy lavender coat */}
      <div className="relative">
        <Blog />
        <WalkingCat variant="lilac" />
      </div>

      {/* Russian Blue — silver-tipped blue-grey aristocrat */}
      <div className="relative">
        <Profile />
        <WalkingCat variant="russian-blue" />
      </div>

      {/* White — pure Turkish Angora snow cat */}
      <div className="relative">
        <Contact />
        <WalkingCat variant="white" />
      </div>
    </div>
  );
}