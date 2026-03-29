// app/sections/Timeline.tsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface TimelineItem {
  id: number;
  year: string;
  title: string;
  institution: string;
  location: string;
  description: string;
  side: 'left' | 'right';
}

const timelineData: TimelineItem[] = [
  {
    id: 1,
    year: '2025 - 2026',
    title: 'Licence 3 Génie Logiciel',
    institution: 'Ecole Supérieure de Gestion d\'informatique et des Sciences (ESGIS)',
    location: 'Libreville, Gabon',
    description:
      "Spécialisation en développement web, mobile et machine, sécurités des applications, architecture logicielle et base de données. Projet de fin d'études sur les applications temps réel.(En cours)",
    side: 'left',
  },
  {
    id: 2,
    year: '2024 - 2025',
    title: 'Licence 2 tronc-commun Informatique et Reseaux Telecoms',
    institution: 'Ecole Supérieure de Gestion d\'informatique et des Sciences (ESGIS)',
    location: 'Libreville, Gabon',
    description:
      "Fondamentaux de l'informatique : algorithmes, structures de données, programmation orientée objet, Réseaux, Sécurités, virtualisation...",
    side: 'right',
  },
  {
    id: 3,
    year: '2023 - 2024',
    title: 'Licence 1 tronc-commun Informatique et Reseaux Telecoms',
    institution: 'Ecole Supérieure de Gestion d\'informatique et des Sciences (ESGIS)',
    location: 'Libreville, Gabon',
    description:
      "Fondamentaux de l'informatique : algorithmes, structures de données, programmation orientée objet, Réseaux, Sécurités, virtualisation...",
    side: 'left',
  },
  {
    id: 4,
    year: '2022',
    title: 'Baccalauréat Scientifique (C)',
    institution: 'Lycée Paul Emane EYEGUE',
    location: 'Libreville, Gabon',
    description:
      "Mention Passable, spécialité Mathématiques et Sciences physiques.",
    side: 'right',
  },
];

const Timeline = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

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

      // Animation de la ligne centrale
      gsap.fromTo(
        lineRef.current,
        { height: '0%' },
        {
          height: '100%',
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: itemsRef.current,
            start: 'top 80%',
          },
        }
      );

      // Animation des éléments de la timeline
      const items = itemsRef.current?.querySelectorAll('.timeline-item');
      if (items) {
        items.forEach((item) => {
          const side = item.classList.contains('left') ? -60 : 60;
          
          gsap.fromTo(
            item,
            { opacity: 0, x: side },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 85%',
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-[#050505]"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 max-w-5xl mx-auto">
        {/* Titre de section */}
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f1f5fb] mb-4"
          >
            Mon{' '}
            <span className="bg-gradient-to-r from-[#c5fb67] to-[#9ed854] bg-clip-text text-transparent">
              Parcours
            </span>
          </h2>
          <p className="text-[#cccccc] text-lg max-w-2xl mx-auto">
            Mon parcours académique et mes formations en informatique.
          </p>
        </div>

        {/* Timeline */}
        <div ref={itemsRef} className="relative">
          {/* Ligne centrale */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#404040] transform md:-translate-x-1/2">
            <div
              ref={lineRef}
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#c5fb67] to-[#c5fb67]/50"
              style={{ height: '0%' }}
            />
          </div>

          {/* Éléments de la timeline */}
          <div className="space-y-12">
            {timelineData.map((item) => (
              <div
                key={item.id}
                className={`timeline-item relative flex items-start ${
                  item.side === 'left' ? 'left' : 'right'
                } md:flex-row ${item.side === 'left' ? '' : 'md:flex-row-reverse'}`}
              >
                {/* Point sur la ligne */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-[#c5fb67] rounded-full border-4 border-[#050505] transform -translate-x-1/2 z-10 mt-2 shadow-[0_0_20px_rgba(197,251,103,0.5)]" />

                {/* Contenu */}
                <div
                  className={`ml-12 md:ml-0 md:w-5/12 ${
                    item.side === 'left' ? 'md:pr-12' : 'md:pl-12'
                  }`}
                >
                  <div className="bg-[#1c1c1c] rounded-xl p-6 border border-[#404040] hover:border-[#c5fb67]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(197,251,103,0.2)]">
                    {/* Badge année */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#c5fb67]/10 rounded-full text-[#c5fb67] text-sm font-medium mb-4">
                      <Calendar size={14} />
                      {item.year}
                    </div>

                    {/* Titre */}
                    <h3 className="text-xl font-bold text-[#f1f5fb] mb-2 hover:text-[#c5fb67] transition-colors">
                      {item.title}
                    </h3>

                    {/* Institution */}
                    <div className="flex items-center gap-2 text-[#cccccc] mb-2">
                      <GraduationCap size={16} />
                      <span>{item.institution}</span>
                    </div>

                    {/* Localisation */}
                    <div className="flex items-center gap-2 text-[#cccccc] text-sm mb-4">
                      <MapPin size={14} />
                      <span>{item.location}</span>
                    </div>

                    {/* Description */}
                    <p className="text-[#cccccc] text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Espace vide pour l'autre côté */}
                <div className="hidden md:block md:w-5/12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;