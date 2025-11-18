import { Job, Profile, Project, Skill } from './types';

export const PROFILE: Profile = {
  name: "Thomas Witting",
  title: "Software Engineer & Data Scientist",
  bio: "Versatile Software Engineer & Data Scientist with a strong background in machine learning, algorithm development, and software craftsmanship. Strong experience in Python, with a great intuition for software development. Passionate about efficient programming, continuous learning, and ML-driven decision-making for solving business needs.",
  location: "Copenhagen, Denmark",
  email: "thomaswitting97@gmail.com",
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com"
  }
};

export const EXPERIENCE: Job[] = [
  {
    id: "1",
    role: "Data Scientist",
    company: "Udviklings- og Forenklingsstyrelsen",
    period: "Jul. 2024 – Present",
    description: "Led the design and development of two XGBoost-based fraud detection models in Python, deployed with CI/CD. Collaborated on a custom entity matching solution with high accuracy. Developing complex ELT flows in SQL for graph databases (Neo4j).",
    skills: ["Python", "XGBoost", "SQL", "Neo4j", "CI/CD"]
  },
  {
    id: "2",
    role: "Teaching Assistant",
    company: "Technical University of Denmark (DTU)",
    period: "Sep. 2023 – Dec. 2023",
    description: "Taught software engineering principles, OOP, recursion, and algorithmic design in Python. Led hands-on coding workshops on best practices and writing clean, efficient code.",
    skills: ["Python", "OOP", "Mentoring", "Algorithms"]
  },
  {
    id: "3",
    role: "Student Data Scientist",
    company: "Rigshospitalet",
    period: "Mar. 2023 – Jun. 2023",
    description: "Developed and deployed a semi-automated Python tool to assist medical professionals in verifying ML-treated CT scans. Optimized image processing and data pipelines to improve diagnostic workflows.",
    skills: ["Python", "Image Processing", "Matplotlib", "Data Pipelines"]
  },
  {
    id: "4",
    role: "Student Software Developer",
    company: "Robotize",
    period: "Mar. 2020 – Dec. 2020",
    description: "Contributed to a vision-based, high-performance C++ and Python codebase for real-time robot navigation. Designed and implemented a semi-automated testing pipeline.",
    skills: ["C++", "Python", "Robotics", "Testing"]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Data-Driven Walkability Index",
    description: "Master's Thesis. Designed and implemented a scalable ML pipeline for urban walkability analysis using XGBoost and Random Forest. Developed containerized services to ensure modularity.",
    technologies: ["Python", "Docker", "XGBoost", "ML Pipelines"],
    category: "Data Science",
    link: "#"
  },
  {
    id: "p2",
    title: "Road Surface Classification",
    description: "Hobby Project. Developed a CNN model in TensorFlow with 83% accuracy to classify gravel and asphalt roads from satellite images using MapBox and OpenStreetMap APIs.",
    technologies: ["TensorFlow", "CNN", "MapBox API", "Computer Vision"],
    category: "Creative",
    link: "#"
  },
  {
    id: "p3",
    title: "Multi-Agent Path Planning",
    description: "Developed high-performance path-planning algorithms for multi-agent robotics environments. Integrated state-of-the-art search algorithms to optimize efficiency.",
    technologies: ["Python", "Algorithms", "AI", "Search"],
    category: "Data Science",
    link: "#"
  }
];

export const SKILLS: Skill[] = [
  { category: "Languages", items: ["Python", "C++", "Java", "SQL"] },
  { category: "ML/AI", items: ["Pandas", "Scikit-Learn", "XGBoost", "TensorFlow", "OpenCV"] },
  { category: "Software Eng", items: ["CI/CD", "Docker", "Git", "Clean Code", "Scrum"] },
  { category: "Data & Tools", items: ["Elasticsearch", "Neo4j", "NumPy", "MLFlow"] },
];

export const AI_SYSTEM_INSTRUCTION = `You are a friendly and professional AI assistant for Thomas Witting's portfolio website.
Your role is to answer questions about Thomas's professional background, skills, and projects based on the following information.

Profile:
${JSON.stringify(PROFILE)}

Experience:
${JSON.stringify(EXPERIENCE)}

Projects:
${JSON.stringify(PROJECTS)}

Skills:
${JSON.stringify(SKILLS)}

If a user asks about something not in this context, politely mention that you only have information about Thomas's professional portfolio.
Keep answers concise and relevant.`;