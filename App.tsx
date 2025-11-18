import React, { useState, useEffect } from 'react';
import { Terminal, Database, Palette } from 'lucide-react';
import { PROFILE, EXPERIENCE, PROJECTS, SKILLS } from './constants';
import { Section } from './components/Section';
import { AIChat } from './components/AIChat';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white font-sans">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-white border-b border-gray border-opacity-10 py-4' : 'bg-transparent py-8'}`}>
        <div className="max-w-4xl mx-auto px-6 flex justify-between items-center">
          <h1 className="font-bold text-xl tracking-tight text-black">{PROFILE.name}</h1>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="pt-40 pb-20 px-6 max-w-4xl mx-auto">
          <div className="space-y-8">
            
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-black leading-[1.1]">
              Data Scientist & <br />
              <span className="text-gray">Builder</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-gray max-w-2xl leading-relaxed font-light">
              {PROFILE.bio}
            </p>

          </div>
        </section>

        {/* Experience Section */}
        <Section id="experience" title="Experience">
          {EXPERIENCE.map((job) => {
            const isCurrent = job.period.includes('Present');
            return (
              <div key={job.id} className={`group relative pl-8 border-l border-gray border-opacity-20 ${isCurrent ? '' : 'opacity-50'}`}>
                <div className="absolute -left-1.5 top-1.5 w-3 h-3 bg-white border-2 border-gray rounded-full"></div>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                  <h3 className="text-xl font-semibold text-black">{job.role}</h3>
                  <span className="font-mono text-xs text-gray mt-1 sm:mt-0">{job.period}</span>
                </div>
                <div className="text-gray font-medium mb-3">{job.company}</div>
                <p className="text-gray leading-relaxed mb-4 text-sm sm:text-base">
                  {job.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <span key={skill} className="px-2 py-1 border border-gray border-opacity-30 text-gray text-xs rounded font-mono cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </Section>

        {/* Projects Section */}
        <Section id="projects" title="Projects">
          <div className="grid md:grid-cols-2 gap-8">
            {PROJECTS.map((project) => (
              <div key={project.id} className="group flex flex-col border border-gray border-opacity-20 rounded-none p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="text-black">
                    {project.category === 'Data Science' && <Database size={20} strokeWidth={1.5} />}
                    {project.category === 'Web Dev' && <Terminal size={20} strokeWidth={1.5} />}
                    {project.category === 'Creative' && <Palette size={20} strokeWidth={1.5} />}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-black mb-2">{project.title}</h3>
                <p className="text-gray text-sm leading-relaxed mb-6 flex-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="text-xs font-mono text-gray">#{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Skills Section */}
        <Section id="skills" title="Skills">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {SKILLS.map((skillGroup) => (
              <div key={skillGroup.category}>
                <h3 className="text-sm font-bold text-black uppercase tracking-wider mb-4 border-b border-gray border-opacity-20 pb-2">
                  {skillGroup.category}
                </h3>
                <ul className="space-y-2">
                  {skillGroup.items.map((item) => (
                    <li key={item} className="text-gray text-sm cursor-default">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* Footer */}
        <footer className="py-20 border-t border-gray border-opacity-20 mt-20">
          <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h4 className="font-bold text-black">{PROFILE.name}</h4>
              <p className="text-gray text-sm mt-1">{PROFILE.title}</p>
            </div>
            
            <div className="text-sm text-gray">
              &copy; {new Date().getFullYear()}
            </div>
          </div>
        </footer>
      </main>
      <AIChat />
    </div>
  );
};

export default App;