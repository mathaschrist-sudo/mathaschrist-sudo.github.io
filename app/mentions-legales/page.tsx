// app/mentions-legales/page.tsx
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Mentions Légales | Portfolio',
  description: 'Mentions légales du portfolio de MVOUALA MATHAS Desire L.C',
};

export default function MentionsLegales() {
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
          Mentions Légales
        </h1>

        <div className="space-y-8 text-[#cccccc]">
          <section>
            <h2 className="text-2xl font-semibold text-[#f1f5fb] mb-4">1. Éditeur du site</h2>
            <p className="leading-relaxed">
              Ce site est édité par <strong className="text-[#c5fb67]">MVOUALA MATHAS Desire L.C</strong>, 
              développeur junior résidant à Libreville, Gabon.
            </p>
            <ul className="mt-2 space-y-1">
              <li>Email : mathaschrist@gmail.com</li>
              <li>Localisation : Libreville, Gabon</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#f1f5fb] mb-4">2. Hébergement</h2>
            <p className="leading-relaxed">
              Ce site est hébergé par [Nom de l'hébergeur] dont le siège social est situé à [Adresse].
              <br />
              Contact : [Email/contact hébergeur]
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#f1f5fb] mb-4">3. Propriété intellectuelle</h2>
            <p className="leading-relaxed">
              L'ensemble du contenu de ce site (textes, images, code, design) est la propriété exclusive 
              de MVOUALA MATHAS Desire L.C, sauf mention contraire. Toute reproduction, distribution 
              ou utilisation sans autorisation préalable est interdite.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#f1f5fb] mb-4">4. Responsabilité</h2>
            <p className="leading-relaxed">
              Les informations fournies sur ce site le sont à titre indicatif. L'éditeur ne peut 
              garantir l'exactitude, la complétude ou l'actualité des informations diffusées.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#f1f5fb] mb-4">5. Contact</h2>
            <p className="leading-relaxed">
              Pour toutes questions concernant ces mentions légales, vous pouvez me contacter à 
              l'adresse email : <a href="mailto:mathaschrist@gmail.com" className="text-[#c5fb67] hover:underline">mathaschrist@gmail.com</a>
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