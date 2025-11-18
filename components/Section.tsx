import React from 'react';

interface SectionProps {
  id?: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({ id, title, children, className = "" }) => {
  return (
    <section id={id} className={`py-20 md:py-32 px-6 max-w-4xl mx-auto ${className}`}>
      <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 mb-12">
        <h2 className="text-sm font-mono text-gray uppercase tracking-widest min-w-[120px]">
          {title}
        </h2>
        <div className="h-px bg-gray flex-1 hidden md:block opacity-20" />
      </div>
      <div className="space-y-12">
        {children}
      </div>
    </section>
  );
};
