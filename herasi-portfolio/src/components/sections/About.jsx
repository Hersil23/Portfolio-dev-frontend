'use client'
import { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { content } from '@/data/content';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const { t, language } = useLanguage();
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const skillsTitleRef = useRef(null);
  const skillsRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    // Animación de la imagen
    gsap.from(imageRef.current, {
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
      },
      opacity: 0,
      scale: 0.8,
      duration: 1.2,
      ease: 'back.out(1.4)'
    });

    // Animaciones del texto con GSAP
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
      }
    });

    tl.from(titleRef.current, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: 'power3.out'
    })
    .from(subtitleRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.7
    }, '-=0.4')
    .from(descriptionRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.7
    }, '-=0.3')
    .from(skillsTitleRef.current, {
      opacity: 0,
      x: -20,
      duration: 0.6
    }, '-=0.2')
    
  }, []);

  const skills = ['React', 'Next.js', 'Tailwind', 'GSAP', 'JavaScript', 'WordPress', 'HTML5', 'CSS3'];

  return (
    <section 
      id="about"
      ref={sectionRef}
      className="about-section"
    >
      {/* Background subtle grid */}
      <div className="about-background" />

      <div className="about-wrapper">
        <div className="about-container">
          
          {/* Content - Left Side */}
          <div className="about-content">
            <h2 ref={titleRef} className="about-title">
              {t(content.about.title)}
            </h2>

            <h3 ref={subtitleRef} className="about-subtitle">
              Frontend Developer 
              <span className="about-highlight"> → Full Stack</span>
            </h3>

            <p ref={descriptionRef} className="about-description">
              {t(content.about.description)}
            </p>

            <h4 ref={skillsTitleRef} className="skills-title">
              {language === 'en' ? 'Some Technologies I Use' : 'Algunas Tecnologías que Uso'}
            </h4>

            <div ref={skillsRef} className="about-skills">
              {skills.map((skill, index) => (
                <span key={skill + index} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Photo - Right Side */}
          <div ref={imageRef} className="about-image-wrapper">
            <div className="about-image-container">
              {/* Glow effect */}
              <div className="image-glow" />

              {/* Image */}
              <div className="image-frame">
                <Image
                  src="/images/herasi-photo.jpg"
                  alt="Herasi Silva"
                  width={400}
                  height={400}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    objectPosition: 'center 10%'
                  }}
                  priority
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* All Styles */}
      <style jsx>{`
        .about-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 100px 24px;
          background: #151E2D;
          position: relative;
          overflow: hidden;
        }

        .about-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: radial-gradient(circle at 1px 1px, rgba(56, 189, 248, 0.05) 1px, transparent 0);
          background-size: 40px 40px;
          opacity: 0.5;
          z-index: 1;
        }

        .about-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
          position: relative;
          z-index: 10;
        }

        .about-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .about-content {
          order: 1;
        }

        .about-title {
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 800;
          color: #E5E7EB;
          margin-bottom: 16px;
        }

        .about-subtitle {
          font-size: clamp(20px, 3vw, 28px);
          font-weight: 600;
          color: #9CA3AF;
          margin-bottom: 32px;
        }

        .about-highlight {
          color: #38BDF8;
          font-weight: 700;
        }

        .about-description {
          font-size: clamp(16px, 2vw, 18px);
          color: #CBD5E1;
          line-height: 1.8;
          margin-bottom: 40px;
        }

        .skills-title {
          font-size: clamp(18px, 2.5vw, 24px);
          font-weight: 700;
          color: #E5E7EB;
          margin-bottom: 20px;
        }

        .about-skills {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .skill-tag {
          padding: 10px 20px;
          background: rgba(56, 189, 248, 0.1);
          border: 1px solid rgba(56, 189, 248, 0.3);
          border-radius: 8px;
          color: #38BDF8;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-block;
        }

        .skill-tag:hover {
          background: rgba(56, 189, 248, 0.2);
          border-color: #38BDF8;
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(56, 189, 248, 0.3);
        }

        .about-image-wrapper {
          order: 2;
          display: flex;
          justify-content: center;
          animation: float 6s ease-in-out infinite;
        }

        .about-image-container {
          position: relative;
          width: 100%;
          max-width: 400px;
          aspect-ratio: 1/1;
        }

        .image-glow {
          position: absolute;
          inset: -20px;
          background: radial-gradient(circle, rgba(56, 189, 248, 0.3), transparent 70%);
          border-radius: 50%;
          filter: blur(30px);
          z-index: 0;
        }

        .image-frame {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          overflow: hidden;
          border: 4px solid rgba(56, 189, 248, 0.3);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          z-index: 1;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @media (max-width: 968px) {
          .about-container {
            grid-template-columns: 1fr;
            gap: 60px;
          }

          .about-image-wrapper {
            order: 1;
          }

          .about-content {
            order: 2;
            text-align: center;
          }

          .about-skills {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}