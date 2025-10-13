'use client'
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { content } from '@/data/content';
import gsap from 'gsap';

export default function Hero() {
  const { t, language } = useLanguage();
  const [greeting, setGreeting] = useState('');
  const greetingRef = useRef(null);
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
    // Animaciones de entrada SOLO UNA VEZ
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.from(greetingRef.current, {
      opacity: 0,
      x: -30,
      duration: 0.8,
      delay: 0.3
    })
    
    .from(titleRef.current, {
      opacity: 0,
      scale: 0.9,
      y: 40,
      duration: 1,
      ease: 'back.out(1.4)'
    }, '-=0.4')
    
    .from(subtitleRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.8
    }, '-=0.5')
    
    .from(descriptionRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.8
    }, '-=0.5')
    
    .from(ctaRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
      ease: 'back.out(1.5)'
    }, '-=0.4');

    // Animación continua SOLO del gradiente del texto
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
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#0B1120'
      }}
    >
      {/* Grid 3D Background */}
      <div className="grid-3d-container">
        <div className="grid-3d"></div>
      </div>

      {/* Content - TODO CENTRADO */}
      <div style={{ 
        position: 'relative', 
        zIndex: 10,
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '100px 24px 0',
        width: '100%',
        textAlign: 'center'
      }}>
        
        {/* Greeting */}
        <p 
          ref={greetingRef}
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
          ref={subtitleRef}
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
            margin: '0 auto 40px',
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

      {/* Styles */}
      <style jsx>{`
        .grid-3d-container {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          perspective: 800px;
          overflow: hidden;
          z-index: 1;
        }

        .grid-3d {
          position: absolute;
          width: 300%;
          height: 300%;
          top: -100%;
          left: -100%;
          background-image: 
            linear-gradient(rgba(56, 189, 248, 0.3) 2px, transparent 2px),
            linear-gradient(90deg, rgba(56, 189, 248, 0.3) 2px, transparent 2px);
          background-size: 80px 80px;
          transform: rotateX(65deg) translateZ(-300px);
          animation: gridMove 25s linear infinite;
        }

        .grid-3d::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          background: radial-gradient(
            circle at center,
            rgba(56, 189, 248, 0.15) 0%,
            transparent 70%
          );
        }

        @keyframes gridMove {
          0% {
            transform: rotateX(65deg) translateZ(-300px) translateY(0);
          }
          100% {
            transform: rotateX(65deg) translateZ(-300px) translateY(80px);
          }
        }

        @media (max-width: 768px) {
          .grid-3d {
            background-size: 50px 50px;
            background-image: 
              linear-gradient(rgba(56, 189, 248, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(56, 189, 248, 0.2) 1px, transparent 1px);
          }
        }
      `}</style>
    </section>
  );
}