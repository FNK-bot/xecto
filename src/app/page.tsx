import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Projects } from "@/components/landing/Projects";
import { Technologies } from "@/components/landing/Technologies";
import { Testimonials } from "@/components/landing/Testimonials";
import { Companies } from "@/components/landing/Companies";
import { Contact } from "@/components/landing/Contact";
import { Footer } from "@/components/landing/Footer";
import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";
import type { Project } from "@/lib/types";
import { projects as mockProjects } from "@/lib/data";

async function getProjects(): Promise<Project[]> {
  try {
    const projectsCol = collection(db, "projects");
    const q = query(projectsCol, orderBy("submittedAt", "desc"), limit(3));
    const projectSnapshot = await getDocs(q);
    const projectList = projectSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        description: data.description,
        image: {
          src: data.imageUrl,
          hint: data.name,
        },
        technologies: data.technologies,
        company: data.company,
      };
    }) as Project[];
    
    // If firebase returns nothing, use mock projects
    if (projectList.length === 0) {
      return mockProjects;
    }
    return projectList;
  } catch (error) {
    console.error("Error fetching projects from Firebase. Falling back to mock data.", error);
    return mockProjects;
  }
}

export default async function Home() {
  const projects = await getProjects();
  
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <Projects projects={projects} />
        <Technologies />
        <Testimonials />
        <Companies />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
