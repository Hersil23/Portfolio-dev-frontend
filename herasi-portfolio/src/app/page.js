'use client'
import { useLanguage } from '@/context/LanguageContext';
import { content } from '@/data/content';

export default function Home() {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      {/* Test del sistema de idiomas */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-accent-primary to-accent-glow bg-clip-text text-transparent">
            {t(content.hero.greeting)}
          </h1>
          
          <p className="text-2xl text-text-secondary mb-8">
            {t(content.hero.intro)}
          </p>

          <button 
            onClick={toggleLanguage}
            className="px-6 py-3 bg-accent-primary text-bg-primary font-semibold rounded-lg hover:bg-accent-secondary transition-all duration-300 shadow-lg hover:shadow-accent-glow/50"
          >
            🌐 Change Language ({language === 'en' ? 'ES' : 'EN'})
          </button>

          <div className="mt-12">
            <p className="text-text-muted">
              ✅ Next.js + Tailwind + GSAP Setup Complete!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}