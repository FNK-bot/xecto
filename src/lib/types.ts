import type { ComponentType } from "react";

export type Project = {
  id: string;
  name: string;
  description: string;
  image: {
    src: string;
    hint: string;
  };
  technologies: string[];
  company: string;
};

export type Technology = {
  name:string;
  icon: ComponentType<{ className?: string }>;
  description: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  title: string;
  company: string;
  image: {
    src: string;
    hint: string;
  };
};

export type Company = {
  id: string;
  name: string;
  logo: {
    src: string;
    hint: string;
  };
};
