// components/Hero.tsx ou app/sections/Hero.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Sphere3D from './Sphere3D';
import { X } from 'lucide-react';

const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const profilePhotoRef = useRef<HTMLDivElement>(null);
  
  // AJOUT : État pour gérer l'ouverture du modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Animation du titre
    if (titleRef.current) {
      titleRef.current.style.opacity = '0';
      titleRef.current.style.transform = 'translateY(40px)';
      setTimeout(() => {
        titleRef.current!.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        titleRef.current!.style.opacity = '1';
        titleRef.current!.style.transform = 'translateY(0)';
      }, 300);
    }

    // Animation du sous-titre
    if (subtitleRef.current) {
      subtitleRef.current.style.opacity = '0';
      subtitleRef.current.style.transform = 'translateX(-30px)';
      setTimeout(() => {
        subtitleRef.current!.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        subtitleRef.current!.style.opacity = '1';
        subtitleRef.current!.style.transform = 'translateX(0)';
      }, 600);
    }

    // Animation de la photo de profil
    if (profilePhotoRef.current) {
      profilePhotoRef.current.style.opacity = '0';
      profilePhotoRef.current.style.transform = 'translateY(20px) scale(0.9)';
      setTimeout(() => {
        profilePhotoRef.current!.style.transition = 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
        profilePhotoRef.current!.style.opacity = '1';
        profilePhotoRef.current!.style.transform = 'translateY(0) scale(1)';
      }, 900);
    }
  }, []);

  // AJOUT : Fonction pour ouvrir le modal
  const openModal = () => {
    setIsModalOpen(true);
    // Empêcher le scroll du body quand le modal est ouvert
    document.body.style.overflow = 'hidden';
  };

  // AJOUT : Fonction pour fermer le modal
  const closeModal = () => {
    setIsModalOpen(false);
    // Réactiver le scroll du body
    document.body.style.overflow = 'unset';
  };

  // AJOUT : Fermer le modal avec la touche Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    if (isModalOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isModalOpen]);

  return (
    <>
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#050505',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Grille en arrière-plan */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(64, 64, 64, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(64, 64, 64, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 10,
            width: '100%',
            padding: '5rem 2rem',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '3rem',
              alignItems: 'center',
              maxWidth: '1400px',
              margin: '0 auto',
            }}
          >
            {/* Texte à gauche */}
            <div>
              <h1
                ref={titleRef}
                style={{
                  fontSize: 'clamp(1.8rem, 5vw, 4rem)',
                  fontWeight: 700,
                  color: '#f1f5fb',
                  lineHeight: 1.1,
                  marginBottom: '1.5rem',
                }}
              >
                Étudiant en{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #c5fb67 0%, #9ed854 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Génie Logiciel
                </span>
              </h1>

              <p
                ref={subtitleRef}
                style={{
                  fontSize: '1.25rem',
                  color: '#c5fb67',
                  marginBottom: '1rem',
                }}
              >
                Passionné par le développement web
              </p>

              <p
                style={{
                  fontSize: '1rem',
                  color: '#cccccc',
                  maxWidth: '500px',
                  marginBottom: '2rem',
                }}
              >
                Je conçois et développe des applications web modernes, alliant
                performance et expérience utilisateur.
              </p>

              <button
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: 'transparent',
                  border: '2px solid #c5fb67',
                  color: '#c5fb67',
                  borderRadius: '0.5rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onClick={() => {
                  const element = document.getElementById('projects');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#c5fb67';
                  e.currentTarget.style.color = '#050505';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#c5fb67';
                }}
              >
                Voir mes projets
              </button>

              {/* Photo de profil sous le bouton - MODIFIÉ avec onClick */}
              <div
                ref={profilePhotoRef}
                style={{
                  marginTop: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                {/* Container de la photo - MODIFIÉ avec onClick */}
                <div
                  style={{
                    position: 'relative',
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '2px solid rgba(197, 251, 103, 0.5)',
                    boxShadow: '0 0 20px rgba(197, 251, 103, 0.2)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                  }}
                  onClick={openModal} // AJOUT : Ouvre le modal au clic
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#c5fb67';
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 0 30px rgba(197, 251, 103, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(197, 251, 103, 0.5)';
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(197, 251, 103, 0.2)';
                  }}
                >
                  <img
                    src="/photo-profil.jpg"
                    alt="Photo de profil"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>

                {/* Texte à côté de la photo */}
                <div>
                  <p
                    style={{
                      color: '#f1f5fb',
                      fontWeight: 600,
                      fontSize: '0.95rem',
                    }}
                  >
                    MVOUALA MATHAS Desire L.C
                  </p>
                  <p
                    style={{
                      color: '#cccccc',
                      fontSize: '0.85rem',
                    }}
                  >
                    Développeur Junior
                  </p>
                </div>
              </div>
              {/* FIN AJOUT */}
            </div>

            {/* Sphère 3D à droite */}
            <div
              style={{
                width: '100%',
                aspectRatio: '1',
                maxWidth: '500px',
                margin: '0 auto',
              }}
            >
              <Sphere3D />
            </div>
          </div>
        </div>

        {/* Animation CSS pour le fade-in */}
        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        `}</style>
      </section>

      {/* AJOUT : MODAL POUR LA PHOTO EN GRAND */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(10px)',
            animation: 'fadeIn 0.3s ease',
          }}
          onClick={closeModal} // Ferme en cliquant sur le fond
        >
          {/* Conteneur de l'image */}
          <div
            style={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '90vh',
              animation: 'scaleIn 0.3s ease',
            }}
            onClick={(e) => e.stopPropagation()} // Empêche la fermeture quand on clique sur l'image
          >
            {/* Bouton fermer */}
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '-50px',
                right: '0',
                backgroundColor: 'transparent',
                border: 'none',
                color: '#c5fb67',
                cursor: 'pointer',
                padding: '0.5rem',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.color = '#f1f5fb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.color = '#c5fb67';
              }}
            >
              <X size={32} />
            </button>

            {/* Image en grand */}
            <img
              src="/photo-profil.jpg"
              alt="Photo de profil - Grand format"
              style={{
                maxWidth: '100%',
                maxHeight: '85vh',
                borderRadius: '12px',
                border: '2px solid rgba(197, 251, 103, 0.3)',
                boxShadow: '0 0 40px rgba(197, 251, 103, 0.2)',
              }}
            />

            {/* Légende */}
            <p
              style={{
                textAlign: 'center',
                color: '#cccccc',
                marginTop: '1rem',
                fontSize: '1rem',
              }}
            >
              MVOUALA MATHAS Desire L.C
            </p>
          </div>

          {/* Styles pour les animations */}
          <style jsx>{`
            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
            @keyframes scaleIn {
              from {
                opacity: 0;
                transform: scale(0.9);
              }
              to {
                opacity: 1;
                transform: scale(1);
              }
            }
          `}</style>
        </div>
      )}
    </>
  );
};

export default Hero;