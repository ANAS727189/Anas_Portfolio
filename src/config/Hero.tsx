import { Linkedin, Github, Twitter, Mail } from "lucide-react";

export const techBadges = [
  { src: "/techstack/typescript.svg", alt: "Typescript", label: "Typescript" },
  { src: "/techstack/react.svg", alt: "React", label: "React" },
  { src: "/techstack/nextjs.svg", alt: "Next.js", label: "Next.js" },
  { src: "/techstack/nodejs.svg", alt: "Node.js", label: "Node.js" },
  { src: "/techstack/golang.svg", alt: "Golang", label: "Golang" },
  { src: "/techstack/docker.svg", alt: "Docker", label: "Docker" },
  { src: "/techstack/mongodb.png", alt: "MongoDB", label: "MongoDB" },
];
export const heroConfig = {
  name: 'Anas',
  title: 'A Full Stack web developer.',
  avatar: '/my-cartoon.png',
  buttons: [
    {
      variant: 'outline',
      text: 'Resume / CV',
      href: '/resume',
      icon: 'CV',
    },
    {
      variant: 'default',
      text: 'Get in touch',
      href: '/contact',
      icon: 'Chat',
    },
  ],
};


export const socialLinks = [
  {
    href: "https://www.linkedin.com/in/anas-k-71b473296/",
    icon: Linkedin,
    label: "LinkedIn",
    hoverColor: "hover:text-[#0077B5]",
  },
  {
    href: "https://www.github.com/ANAS727189/",
    icon: Github,
    label: "GitHub",
    hoverColor: "hover:text-blue-500",
  },
  {
    href: "https://www.x.com/Anas_is_me/",
    icon: Twitter,
    label: "Twitter",
    hoverColor: "hover:text-[#1DA1F2]",
  },
  {
    href: "mailto:anas23khan083@gmail.com",
    icon: Mail,
    label: "Email",
    hoverColor: "hover:text-blue-400",
  },
];