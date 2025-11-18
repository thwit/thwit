export interface Job {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  skills: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  category: 'Data Science' | 'Web Dev' | 'Creative';
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Profile {
  name: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  socials: {
    github: string;
    linkedin: string;
    twitter?: string;
  };
}

export enum MessageRole {
  USER = 'user',
  MODEL = 'model',
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  text: string;
  isStreaming?: boolean;
}