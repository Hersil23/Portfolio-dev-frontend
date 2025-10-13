'use client'
import { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { content } from '@/data/content';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  SiHtml5, 
  SiCss3, 
  SiTailwindcss, 
  SiSass, 
  SiJavascript, 
  SiGreensock,
  SiReact, 
  SiNextdotjs, 
  SiWordpress 
} from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

export default function TechStack() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const sliderRef = useRef(null);
  const sliderInnerRef = useRef(null);

  const technologies = [
    { name: 'HTML5', Icon: SiHtml5, color: '#E34F26' },
    { name: 'CSS3', Icon: SiCss3, color: '#1572B6' },
    { name: 'Tailwind', Icon: SiTailwindcss, color: '#06B6D4' },
    { name: 'Sass', Icon: SiSass, color: '#CC6699' },
    { name: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E' },
    { name: 'GSAP', Icon: SiGreensock, color: '#88CE02' },
    { name: 'React', Icon: SiReact, color: '#61DAFB' },
    { name: 'Next.js', Icon: SiNextdotjs, color: '#FFFFFF' },
    { name: 'WordPress', Icon: SiWordpress, color: '#21759B' }
  ];

  // Duplicar para efecto infinito
  const duplicatedTechs = [...technologies, ...technologies];

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const sliderInner = sliderInnerRef.current;

    if (!section || !title || !sliderInner) return;

    // Animación del título
    gsap.from(title, {
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
      },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out'
    });

    
    // Slider infinito con GSAP
    const sliderWidth = sliderInner.offsetWidth / 2;
    
    const timeline = gsap.timeline({
      repeat: -1,
      defaults: { ease: 'none' }
    });

    timeline.to(sliderInner, {
      x: -sliderWidth,
      duration: 20,
      ease: 'linear'
    });

    // Pausa al hacer hover
    const slider = sliderRef.current;
    
    slider.addEventListener('mouseenter', () => {
      timeline.pause();
    });

    slider.addEventListener('mouseleave', () => {
      timeline.play();
    });

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <section 
      id="tech"
      ref={sectionRef}
      className="tech-section"
    >
      {/* Background animado */}
      <div className="tech-background" />

      <div className="tech-wrapper">
        
        {/* Título */}
        <h2 ref={titleRef} className="tech-title">
          {t(content.tech.title)}
        </h2>

        {/* Slider de tecnologías */}
        <div ref={sliderRef} className="tech-slider">
          <div ref={sliderInnerRef} className="tech-slider-inner">
            {duplicatedTechs.map((tech, index) => {
              const Icon = tech.Icon;
              return (
                <div 
                  key={`${tech.name}-${index}`} 
                  className="tech-card"
                >
                  <div className="tech-icon-wrapper">
                    <Icon 
                      className="tech-icon"
                      style={{ color: tech.color }}
                    />
                  </div>
                  <span className="tech-name">{tech.name}</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Estilos */}
      <style jsx>{`
        .tech-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 100px 24px;
          background: #0B1120;
          position: relative;
          overflow: hidden;
        }

        .tech-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            linear-gradient(rgba(56, 189, 248, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56, 189, 248, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: gridMove 20s linear infinite;
        }

        @keyframes gridMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }

        .tech-wrapper {
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
          position: relative;
          z-index: 10;
        }

        .tech-title {
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 800;
          color: #E5E7EB;
          text-align: center;
          margin-bottom: 80px;
          background: linear-gradient(90deg, #E5E7EB, #38BDF8, #E5E7EB);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }

        @keyframes shimmer {
          0% {
            background-position: 0% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        .tech-slider {
          width: 100%;
          overflow: hidden;
          position: relative;
          padding: 40px 0;
        }

        .tech-slider::before,
        .tech-slider::after {
          content: '';
          position: absolute;
          top: 0;
          width: 100px;
          height: 100%;
          z-index: 2;
          pointer-events: none;
        }

        .tech-slider::before {
          left: 0;
          background: linear-gradient(to right, #0B1120, transparent);
        }

        .tech-slider::after {
          right: 0;
          background: linear-gradient(to left, #0B1120, transparent);
        }

        .tech-slider-inner {
          display: flex;
          gap: 60px;
          width: fit-content;
        }

        .tech-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          min-width: 140px;
          padding: 30px;
          background: rgba(21, 30, 45, 0.6);
          border: 1px solid rgba(56, 189, 248, 0.2);
          border-radius: 16px;
          backdrop-filter: blur(10px);
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .tech-card:hover {
          transform: translateY(-15px) scale(1.05);
          border-color: #38BDF8;
          background: rgba(21, 30, 45, 0.9);
          box-shadow: 
            0 20px 40px rgba(56, 189, 248, 0.3),
            0 0 40px rgba(56, 189, 248, 0.2);
        }

        .tech-icon-wrapper {
          position: relative;
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .tech-card:hover .tech-icon-wrapper {
          animation: iconPulse 0.6s ease-in-out;
        }

        @keyframes iconPulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2) rotate(5deg);
          }
        }

        .tech-icon {
          font-size: 64px;
          filter: drop-shadow(0 0 20px currentColor);
          transition: all 0.3s ease;
        }

        .tech-card:hover .tech-icon {
          filter: drop-shadow(0 0 30px currentColor);
        }

        .tech-name {
          font-size: 16px;
          font-weight: 600;
          color: #9CA3AF;
          transition: color 0.3s ease;
        }

        .tech-card:hover .tech-name {
          color: #38BDF8;
        }

        @media (max-width: 768px) {
          .tech-slider-inner {
            gap: 40px;
          }

          .tech-card {
            min-width: 120px;
            padding: 24px;
          }

          .tech-icon {
            font-size: 48px;
          }

          .tech-icon-wrapper {
            width: 60px;
            height: 60px;
          }
        }
      `}</style>
    </section>
  );
}