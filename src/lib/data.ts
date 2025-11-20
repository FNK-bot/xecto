import type { Project, Technology, Testimonial, Company } from "@/lib/types";
import { Code, Bot, Database, Cloud, Palette, ShieldCheck, Zap } from "lucide-react";
import { ReactIcon } from "@/components/icons/ReactIcon";
import { NextjsIcon } from "@/components/icons/NextjsIcon";
import { FirebaseIcon } from "@/components/icons/FirebaseIcon";
import { TailwindIcon } from "@/components/icons/TailwindIcon";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const findImage = (id: string) => {
  const image = PlaceHolderImages.find((img) => img.id === id);
  if (!image) return { src: "https://picsum.photos/seed/error/600/400", hint: "error" };
  return { src: image.imageUrl, hint: image.imageHint };
};

export const projects: Project[] = [
  {
    id: "1",
    name: "QuantumLeap CRM",
    description: "A comprehensive CRM platform designed for B2B sales teams, featuring advanced analytics, lead scoring, and automated workflows to boost productivity and drive revenue growth.",
    image: findImage("project-1"),
    technologies: ["Next.js", "React", "Firebase", "Tailwind CSS"],
    company: "Stellar Solutions",
  },
  {
    id: "2",
    name: "Artisan Emporium",
    description: "An e-commerce marketplace connecting artisans with a global audience. The platform features robust inventory management, secure payments, and a beautiful, responsive design.",
    image: findImage("project-2"),
    technologies: ["React", "GenAI", "Firebase", "Next.js"],
    company: "Creative Guild",
  },
  {
    id: "3",
    name: "ConnectSphere",
    description: "A community-building mobile app for professionals. Features include event management, a resource library, and a mentorship-matching system to foster career development.",
    image: findImage("project-3"),
    technologies: ["React Native", "Firebase", "Cloud Tech", "GenAI"],
    company: "Innovate Inc.",
  },
];

export const technologies: Technology[] = [
  {
    name: "Next.js",
    icon: NextjsIcon,
    description: "Full-stack web applications with the latest React features.",
  },
  {
    name: "React",
    icon: ReactIcon,
    description: "Dynamic and responsive user interfaces with the most popular library.",
  },
  {
    name: "Firebase",
    icon: FirebaseIcon,
    description: "Scalable and secure backend services, from databases to authentication.",
  },
  {
    name: "Tailwind CSS",
    icon: TailwindIcon,
    description: "Rapid UI development with a utility-first CSS framework.",
  },
  {
    name: "GenAI",
    icon: Bot,
    description: "Integrating cutting-edge AI to build smarter, more capable applications.",
  },
  {
    name: "Cloud Tech",
    icon: Cloud,
    description: "Leveraging cloud infrastructure for robust, scalable, and reliable solutions.",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    quote: "Xacto Hub transformed our vision into a reality with a level of professionalism and technical skill that is second to none. Their team delivered a product that exceeded our wildest expectations.",
    name: "Sarah Johnson",
    title: "CEO",
    company: "Stellar Solutions",
    image: findImage("testimonial-1"),
  },
  {
    id: "2",
    quote: "The dedication and attention to detail from the Xacto Hub team were remarkable. They're not just developers; they are true partners in innovation.",
    name: "Michael Chen",
    title: "Founder",
    company: "Innovate Inc.",
    image: findImage("testimonial-2"),
  },
  {
    id: "3",
    quote: "Working with Xacto Hub was a seamless experience. They understood our needs and delivered a high-quality platform that our users love. Highly recommended!",
    name: "Emily Rodriguez",
    title: "Product Manager",
    company: "Creative Guild",
    image: findImage("testimonial-3"),
  },
];

export const companies: Company[] = [
  { id: "1", name: "TechNova", logo: findImage("company-logo-1") },
  { id: "2", name: "Innovate Inc.", logo: findImage("company-logo-2") },
  { id: "3", name: "Quantum Corp", logo: findImage("company-logo-3") },
  { id: "4", name: "Apex Industries", logo: findImage("company-logo-4") },
  { id: "5", name: "Stellar Solutions", logo: findImage("company-logo-5") },
];

export const services = [
    {
        icon: Palette,
        title: "UI/UX Design",
        description: "Crafting intuitive and beautiful user interfaces that provide a seamless user experience.",
    },
    {
        icon: Code,
        title: "Web Development",
        description: "Building robust and scalable web applications using the latest technologies.",
    },
    {
        icon: Bot,
        title: "AI Integration",
        description: "Leveraging artificial intelligence to create smart, automated, and personalized solutions.",
    },
    {
        icon: ShieldCheck,
        title: "Security & Auditing",
        description: "Ensuring your applications are secure, reliable, and compliant with industry standards.",
    },
     {
        icon: Zap,
        title: "Performance Optimization",
        description: "Fine-tuning your applications for lightning-fast load times and a smooth user experience.",
    },
    {
        icon: Cloud,
        title: "Cloud & DevOps",
        description: "Implementing scalable cloud infrastructure and CI/CD pipelines for efficient development.",
    }
]
