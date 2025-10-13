'use client'
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { content } from '@/data/content';
import gsap from 'gsap';

export default function Hero() {
  const { t, language } = useLanguage();
  const [greeting, setGreeting] = useState('');
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const ctaRef = useRef(null);
  
  useEffect(() => {
    // Obtener saludo según la hora
    const hour = new Date().getHours();
    let timeOfDay;
    
    if (hour >= 5 && hour < 12) {
      timeOfDay = 'morning';
    } else if (hour >= 12 && hour < 18) {
      timeOfDay = 'afternoon';
    } else if (hour >= 18 && hour < 22) {
      timeOfDay = 'evening';
    } else {
      timeOfDay = 'night';
    }
    
    setGreeting(content.hero.greeting[timeOfDay][language]);
  }, [language]);
  
  useEffect(() => {
    // Animaciones de entrada con GSAP
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.from(titleRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      delay: 0.2
    })
    .from(subtitleRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.8
    }, '-=0.5')
    .from(descriptionRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.8
    }, '-=0.5')
    .from(ctaRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.6
    }, '-=0.4');

    // Animación continua del gradiente
    gsap.to('.gradient-text', {
      backgroundPosition: '200% center',
      duration: 3,
      ease: 'linear',
      repeat: -1
    });
  }, []);

  const scrollToProjects = () => {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: '#0B1120'
      }}
    >
      {/* Animated Background */}
      <div className="animated-bg"></div>

      {/* Content */}
      <div style={{ 
        position: 'relative', 
        zIndex: 10,
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '30px 24px 0',
        width: '100%'
      }}>
        <div style={{ maxWidth: '900px' }}>
          
          {/* Greeting */}
          <p 
            ref={subtitleRef}
            style={{
              fontSize: '18px',
              fontWeight: '500',
              color: '#9CA3AF',
              marginBottom: '16px',
              letterSpacing: '1px'
            }}
          >
            👋 {greeting}
          </p>

          {/* Main Title with Gradient */}
          <h1 
            ref={titleRef}
            className="gradient-text"
            style={{
              fontSize: 'clamp(40px, 8vw, 80px)',
              fontWeight: '800',
              lineHeight: '1.1',
              marginBottom: '24px',
              background: 'linear-gradient(90deg, #38BDF8, #7DD3FC, #38BDF8)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            I'm Herasi Silva
          </h1>

          {/* Subtitle */}
          <h2
            style={{
              fontSize: 'clamp(24px, 4vw, 40px)',
              fontWeight: '700',
              color: '#E5E7EB',
              marginBottom: '24px'
            }}
          >
            {t(content.hero.title)}
            <span style={{ 
              color: '#38BDF8',
              fontWeight: '800'
            }}> → Full Stack</span>
          </h2>

          {/* Description */}
          <p 
            ref={descriptionRef}
            style={{
              fontSize: 'clamp(16px, 2vw, 20px)',
              color: '#9CA3AF',
              lineHeight: '1.7',
              maxWidth: '700px',
              marginBottom: '40px'
            }}
          >
            {t(content.hero.intro)}
          </p>

          {/* CTA Button */}
          <button
            ref={ctaRef}
            onClick={scrollToProjects}
            style={{
              padding: '16px 40px',
              fontSize: '16px',
              fontWeight: '600',
              color: '#0B1120',
              background: '#38BDF8',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 0 30px rgba(56, 189, 248, 0.3)',
              letterSpacing: '0.5px'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#0EA5E9';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 10px 40px rgba(56, 189, 248, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#38BDF8';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 0 30px rgba(56, 189, 248, 0.3)';
            }}
          >
            {t(content.hero.cta)} ↓
          </button>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .animated-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 50%, rgba(56, 189, 248, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(125, 211, 252, 0.1) 0%, transparent 50%);
          animation: pulse 8s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        @media (max-width: 768px) {
          .animated-bg {
            background: 
              radial-gradient(circle at 50% 30%, rgba(56, 189, 248, 0.15) 0%, transparent 60%);
          }
        }
      `}</style>
    </section>
  );
}