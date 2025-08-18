"use client";
import { Moon, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const initialTheme = savedTheme || "light";
    setTheme(initialTheme);

    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const handleToggle = () => {
    if (!theme) return;
    const newTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Smooth scroll handler
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="sticky top-0 z-20 rounded-md py-4 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 max-w-5xl mx-auto">
        <div className="flex items-baseline gap-4">
          {/* Avatar */}
          <Link href="/">
            <Image
              src="/my-cartoon.png"
              alt="My Cartoon"
              width={48}
              height={48}
              className="h-12 w-12 rounded-md border border-gray-200 bg-blue-300 transition-all duration-300 ease-in-out hover:scale-90 dark:bg-yellow-300"
            />
          </Link>

          {/* Links */}
          <div className="flex items-center justify-center gap-4">
            <a
              href="#work"
              onClick={(e) => handleNavClick(e, "work")}
              className="cursor-pointer transition-all duration-300 ease-in-out hover:underline hover:decoration-wavy hover:underline-offset-4"
            >
              Work
            </a>
            <a
              href="#blogs"
              onClick={(e) => handleNavClick(e, "blogs")}
              className="cursor-pointer transition-all duration-300 ease-in-out hover:underline hover:decoration-wavy hover:underline-offset-4"
            >
              Blogs
            </a>
            <a
              href="#projects"
              onClick={(e) => handleNavClick(e, "projects")}
              className="cursor-pointer transition-all duration-300 ease-in-out hover:underline hover:decoration-wavy hover:underline-offset-4"
            >
              Projects
            </a>
          </div>
        </div>

        {/* Right side - Theme Toggle */}
        <div className="flex items-center gap-4">
          <button onClick={handleToggle} disabled={!theme}>
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;