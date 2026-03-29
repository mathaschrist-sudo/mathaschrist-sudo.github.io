// app/sections/Skills.tsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Server, Wrench } from 'lucide-react';

// Enregistrer GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    icon: <Code2 size={24} />,
    skills: [
      { name: 'React', level: 40 },
      { name: 'TypeScript', level: 40 },
      { name: 'next.js', level: 60 },
      { name: 'Tailwind CSS', level: 55 },
      { name: 'shadcn.ui', level: 45 },
      { name: 'GSAP', level: 50}
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: <Server size={24} />,
    skills: [
      { name: 'Node.js', level: 65 },
      { name: 'Prisma', level: 40},
      { name: 'Python', level: 10 },
      { name: 'PostgreSQL', level: 60 },
      { name: 'MySQL', level: 80 },
      { name: 'PHP', level: 60 },
    ],
  },
  {
    id: 'tools',
    title: 'Outils',
    icon: <Wrench size={24} />,
    skills: [
      { name: 'Git', level: 20 },
      { name: 'Docker', level: 5 },
      { name: 'VS Code', level: 80 },
      { name: 'PyCharm', level: 10},
    ],
  },
];

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const progressRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animation du titre
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
          },
        }
      );

      // Animation des cartes
      const cards = cardsRef.current?.querySelectorAll('.skill-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      // Animation des barres de progression
      progressRefs.current.forEach((bar, index) => {
        if (!bar) return;
        const level = parseInt(bar.dataset.level || '0');
        
        gsap.fromTo(
          bar,
          { width: '0%' },
          {
            width: `${level}%`,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 90%',
            },
            delay: index * 0.1,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  let progressIndex = 0;

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-[#050505]"
    >
      {/* Grille en arrière-plan */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(rgba(64, 64, 64, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(64, 64, 64, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12 max-w-7xl mx-auto">
        {/* Titre de section */}
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f1f5fb] mb-4"
          >
            Mes{' '}
            <span className="bg-gradient-to-r from-[#c5fb67] to-[#9ed854] bg-clip-text text-transparent">
              Compétences
            </span>
          </h2>
          <p className="text-[#cccccc] text-lg max-w-2xl mx-auto">
            Technologies et outils que j'utilise pour créer des
            applications web modernes.
          </p>
        </div>

        {/* Grille des compétences */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {skillCategories.map((category) => (
            <div
              key={category.id}
              className="skill-card bg-[#1c1c1c] rounded-xl p-6 border border-[#404040] hover:border-[#c5fb67]/50 transition-all duration-300"
            >
              {/* En-tête de la catégorie */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-[#c5fb67]/10 flex items-center justify-center text-[#c5fb67]">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-[#f1f5fb]">
                  {category.title}
                </h3>
              </div>

              {/* Liste des compétences */}
              <div className="space-y-4">
                {category.skills.map((skill) => {
                  const currentIndex = progressIndex++;
                  return (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-1">
                        <span className="text-[#cccccc] text-sm">
                          {skill.name}
                        </span>
                        <span className="text-[#c5fb67] text-sm font-medium">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-2 bg-[#404040] rounded-full overflow-hidden">
                        <div
                          ref={(el) => {
                            progressRefs.current[currentIndex] = el;
                          }}
                          data-level={skill.level}
                          className="h-full rounded-full bg-gradient-to-r from-[#c5fb67] to-[#9ed854]"
                          style={{
                            width: '0%',
                            boxShadow: '0 0 10px rgba(197, 251, 103, 0.3)',
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;