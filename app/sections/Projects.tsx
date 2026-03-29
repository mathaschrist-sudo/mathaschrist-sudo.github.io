// app/sections/Projects.tsx
'use client';

import { useState } from 'react';
import { ExternalLink, Mail, Globe, Smartphone } from 'lucide-react'; // Remplacé Github par Mail
import Image from 'next/image';

const Projects = () => {
  const [filter, setFilter] = useState('all');

  const categories = [
    { id: 'all', name: 'Tous' },
    { id: 'web', name: 'Web' },
    { id: 'mobile', name: 'Mobile' },
  ];

  const projects = [
    {
      id: 1,
      title: 'Blog',
      description: 'Blog pour l\'Association citoyenne du quartier la Sorbonne, Libreville. (En cours)',
      image: '/blog.png',
      category: 'web',
      tags: ['Next.js', 'Shadcn.ui', 'Prisma', 'Tailwindcss'],
      demoUrl: '#',
      useImage: true, 
      icon: Globe,
    },
    {
      id: 2,
      title: 'Portfolio',
      description: 'Mon portfolio.',
      image: '/portfolio.png', 
      category: 'web',
      tags: ['React', 'Next.js', 'Tailwindcss', 'GSAP'],
      demoUrl: 'https://mathaschrist-sudo-github-io.vercel.app',
      useImage: true, 
      icon: Globe, 
    },
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-20 lg:py-32 bg-[#050505]">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-[#f1f5fb] mb-4">
            Mes <span className="text-[#c5fb67]">Projets</span>
          </h2>
          <p className="text-[#cccccc] text-lg max-w-2xl mx-auto">
            Découvrez une sélection de mes réalisations récentes et en cours 
            du développement web.
          </p>
        </div>

        {/* Filtres */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                filter === cat.id
                  ? 'bg-[#c5fb67] text-[#050505]'
                  : 'bg-transparent border border-[#404040] text-[#cccccc] hover:border-[#c5fb67] hover:text-[#c5fb67]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Grille de projets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const IconComponent = project.icon;
            return (
              <div
                key={project.id}
                className="group relative bg-[#0a0a0a] border border-[#404040] rounded-xl overflow-hidden hover:border-[#c5fb67] transition-all duration-500 hover:-translate-y-2"
              >
                {/* Image du projet ou Icon */}
                <div className="h-48 bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[#c5fb67]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {project.useImage ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={200}
                      height={150}
                      className="object-cover rounded-lg transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <IconComponent 
                      size={48} 
                      className="text-[#404040] group-hover:text-[#c5fb67] transition-colors duration-500" 
                    />
                  )}
                </div>

                {/* Contenu */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#f1f5fb] mb-2 group-hover:text-[#c5fb67] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-[#cccccc] text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs bg-[#1a1a1a] text-[#c5fb67] rounded-full border border-[#404040]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4">
                    <a
                      href={project.demoUrl}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#c5fb67] text-[#050505] rounded-lg font-semibold text-sm hover:bg-[#b8f85a] transition-colors"
                    >
                      <ExternalLink size={16} />
                      Demo
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Voir plus - MODIFIÉ */}
        <div className="text-center mt-16">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[#c5fb67] text-[#c5fb67] rounded-lg font-semibold hover:bg-[#c5fb67] hover:text-[#050505] transition-all duration-300"
          >
            <Mail size={20} /> {/* Icône Mail au lieu de Github */}
            Contactez-moi pour en savoir plus
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;