// app/sections/Contact.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, Send, Facebook, MessageCircle } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  // AJOUT : Champ honeypot pour piéger les bots
  const [honeypot, setHoneypot] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
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

      gsap.fromTo(
        infoRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: infoRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        formRef.current,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
          },
        }
      );

      const socialIcons = infoRef.current?.querySelectorAll('.social-icon');
      if (socialIcons) {
        gsap.fromTo(
          socialIcons,
          { opacity: 0, scale: 0, rotate: -180 },
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: infoRef.current,
              start: 'top 70%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // AJOUT : Vérification anti-spam honeypot
    // Si le champ honeypot est rempli, c'est un bot → on arrête l'envoi
    if (honeypot !== '') {
      console.log('Bot détecté - soumission bloquée');
      return; // C'est un bot, on ne fait rien
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('https://formspree.io/f/mdaljebz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage('Message envoyé avec succès ! Je vous répondrai dès que possible.');
        setFormData({ name: '', email: '', message: '' });
        // AJOUT : Réinitialiser aussi le honeypot
        setHoneypot('');
      } else {
        throw new Error('Erreur lors de l\'envoi');
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Une erreur est survenue. Veuillez réessayer ou me contacter directement par email.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setSubmitMessage('');
        setSubmitStatus(null);
      }, 8000);
    }
  };

  // Configuration des liens sociaux
  const socialLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: 'https://facebook.com/ton-profil',
      color: 'hover:text-blue-500 hover:border-blue-500',
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: 'https://wa.me/241076446916',
      color: 'hover:text-green-500 hover:border-green-500',
    },
  ];

  return (
    <section
      id="contact"
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

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12 max-w-6xl mx-auto">
        {/* Titre de section */}
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f1f5fb] mb-4"
          >
            Me{' '}
            <span className="bg-gradient-to-r from-[#c5fb67] to-[#9ed854] bg-clip-text text-transparent">
              Contacter
            </span>
          </h2>
          <p className="text-[#cccccc] text-lg max-w-2xl mx-auto">
            Vous avez un projet en tête ? N'hésitez pas à me contacter.
          </p>
        </div>

        {/* Contenu */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Informations de contact */}
          <div ref={infoRef} className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-[#f1f5fb] mb-4">
                Discutons de votre projet
              </h3>
              <p className="text-[#cccccc] leading-relaxed">
                Je suis toujours ouvert aux nouvelles opportunités et aux
                collaborations intéressantes. Contactez-moi directement par email,
                WhatsApp ou via ce formulaire.
              </p>
            </div>

            {/* Détails de contact */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#c5fb67]/10 flex items-center justify-center text-[#c5fb67]">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-[#cccccc] text-sm">Email</p>
                  <a
                    href="mailto:mathaschrist@gmail.com?subject=Contact depuis Portfolio&body=Bonjour,"
                    className="text-[#f1f5fb] hover:text-[#c5fb67] transition-colors"
                  >
                    mathaschrist@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#c5fb67]/10 flex items-center justify-center text-[#c5fb67]">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-[#cccccc] text-sm">Localisation</p>
                  <p className="text-[#f1f5fb]">Libreville, Gabon</p>
                </div>
              </div>
            </div>

            {/* Réseaux sociaux */}
            <div>
              <p className="text-[#cccccc] text-sm mb-4">
                Retrouvez-moi sur les réseaux
              </p>
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`social-icon w-12 h-12 rounded-full bg-[#1c1c1c] border border-[#404040] flex items-center justify-center text-[#cccccc] ${social.color} transition-all duration-300 hover:scale-110 hover:rotate-6`}
                    title={social.name}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Info WhatsApp rapide */}
            <div className="bg-[#1c1c1c] rounded-lg p-4 border border-[#404040]">
              <p className="text-[#cccccc] text-sm flex items-center gap-2">
                <MessageCircle size={16} className="text-green-500" />
                <span>
                  WhatsApp rapide :{' '}
                  <a 
                    href="https://wa.me/241076446916" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#c5fb67] hover:underline"
                  >
                    +241 076 44 69 16
                  </a>
                </span>
              </p>
            </div>
          </div>

          {/* Formulaire avec protection honeypot */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="bg-[#1c1c1c] rounded-xl p-6 lg:p-8 border border-[#404040]"
          >
            <div className="space-y-6">
              {/* AJOUT : Champ honeypot caché (piège pour bots) */}
              {/* Ce champ est invisible pour les humains mais les bots le remplissent */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Site web (ne pas remplir)</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                />
              </div>
              {/* FIN AJOUT */}

              {/* Champ Nom */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-[#cccccc] text-sm mb-2"
                >
                  Nom
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#050505] border border-[#404040] rounded-lg text-[#f1f5fb] placeholder-[#cccccc]/50 focus:border-[#c5fb67] focus:outline-none transition-colors duration-300"
                  placeholder="Votre nom"
                />
              </div>

              {/* Champ Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-[#cccccc] text-sm mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#050505] border border-[#404040] rounded-lg text-[#f1f5fb] placeholder-[#cccccc]/50 focus:border-[#c5fb67] focus:outline-none transition-colors duration-300"
                  placeholder="votre@email.com"
                />
              </div>

              {/* Champ Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-[#cccccc] text-sm mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-[#050505] border border-[#404040] rounded-lg text-[#f1f5fb] placeholder-[#cccccc]/50 focus:border-[#c5fb67] focus:outline-none transition-colors duration-300 resize-none"
                  placeholder="Votre message..."
                />
              </div>

              {/* Bouton Envoyer */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-transparent border-2 border-[#c5fb67] text-[#c5fb67] rounded-lg font-semibold transition-all duration-300 hover:bg-[#c5fb67] hover:text-[#050505] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:shadow-[0_0_25px_rgba(197,251,103,0.4)]"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-[#c5fb67]/30 border-t-[#c5fb67] rounded-full animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    Envoyer
                    <Send size={18} />
                  </>
                )}
              </button>

              {/* Message de retour */}
              {submitMessage && (
                <div
                  className={`text-center text-sm animate-fade-in ${
                    submitStatus === 'success' ? 'text-[#c5fb67]' : 'text-red-500'
                  }`}
                >
                  {submitMessage}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;