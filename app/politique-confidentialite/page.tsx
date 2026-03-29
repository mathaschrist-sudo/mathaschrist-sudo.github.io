// app/politique-confidentialite/page.tsx
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Politique de Confidentialité | Portfolio',
  description: 'Politique de confidentialité du portfolio de MVOUALA MATHAS Desire L.C',
};

export default function PolitiqueConfidentialite() {
  return (
    <main className="min-h-screen bg-[#050505] text-[#f1f5fb] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-[#c5fb67] hover:text-[#9ed854] transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          Retour à l'accueil
        </Link>

        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-[#c5fb67] to-[#9ed854] bg-clip-text text-transparent">
          Politique de Confidentialité
        </h1>

        <div className="space-y-8 text-[#cccccc]">
          <section>
            <h2 className="text-2xl font-semibold text-[#f1f5fb] mb-4">1. Introduction</h2>
            <p className="leading-relaxed">
              Cette politique de confidentialité décrit comment je collecte, utilise et protège 
              vos informations personnelles lorsque vous utilisez mon portfolio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#f1f5fb] mb-4">2. Données collectées</h2>
            <p className="leading-relaxed mb-2">
              Je peux collecter les informations suivantes via le formulaire de contact :
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Nom et prénom</li>
              <li>Adresse email</li>
              <li>Contenu du message</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#f1f5fb] mb-4">3. Utilisation des données</h2>
            <p className="leading-relaxed">
              Ces informations sont utilisées uniquement pour répondre à vos messages et 
              éventuellement établir une collaboration professionnelle. Je ne partage 
              vos données avec aucun tiers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#f1f5fb] mb-4">4. Conservation des données</h2>
            <p className="leading-relaxed">
              Les messages reçus via le formulaire sont conservés pendant une durée de 
              1 an maximum, sauf obligation légale contraire.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#f1f5fb] mb-4">5. Vos droits</h2>
            <p className="leading-relaxed">
              Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, 
              de suppression et d'opposition concernant vos données personnelles. Pour 
              exercer ces droits, contactez-moi à :{' '}
              <a href="mailto:mathaschrist@gmail.com" className="text-[#c5fb67] hover:underline">
                mathaschrist@gmail.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#f1f5fb] mb-4">6. Cookies</h2>
            <p className="leading-relaxed">
              Ce site n'utilise pas de cookies de traçage. Seuls des cookies techniques 
              essentiels au fonctionnement du site peuvent être utilisés.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#f1f5fb] mb-4">7. Sécurité</h2>
            <p className="leading-relaxed">
              Je mets en œuvre des mesures de sécurité appropriées pour protéger vos 
              données contre tout accès non autorisé, altération ou destruction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#f1f5fb] mb-4">8. Contact</h2>
            <p className="leading-relaxed">
              Pour toutes questions concernant cette politique de confidentialité, contactez-moi à :{' '}
              <a href="mailto:mathaschrist@gmail.com" className="text-[#c5fb67] hover:underline">
                mathaschrist@gmail.com
              </a>
            </p>
          </section>

          <p className="text-sm text-[#666666] pt-8 border-t border-[#404040]">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
          </p>
        </div>
      </div>
    </main>
  );
}