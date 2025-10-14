'use client'
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiMail, FiGithub, FiInstagram, FiCopy, FiCheck } from 'react-icons/fi';
import { SiTiktok, SiWhatsapp } from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const canvasRef = useRef(null);

  const email = 'herasidesweb@gmail.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(56, 189, 248, 0.8)';
        ctx.fill();
      }
    }

    // Crear partículas
    const particleCount = window.innerWidth < 768 ? 30 : 60;
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const connectParticles = () => {
      const maxDistance = 150;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(56, 189, 248, ${1 - distance / maxDistance})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      connectParticles();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;

    if (!section || !title) return;

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

    gsap.from('.contact-subtitle', {
      scrollTrigger: {
        trigger: section,
        start: 'top 65%',
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out'
    });

    gsap.from('.contact-email', {
      scrollTrigger: {
        trigger: section,
        start: 'top 60%',
      },
      opacity: 0,
      scale: 0.9,
      duration: 0.8,
      ease: 'power3.out'
    });

    gsap.from('.social-btn', {
      scrollTrigger: {
        trigger: section,
        start: 'top 60%',
      },
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
      clearProps: 'all'
    });

  }, []);

  return (
    <section 
      id="contact"
      ref={sectionRef}
      className="contact-section"
    >
      
      {/* Canvas Background */}
      <canvas ref={canvasRef} className="constellation-canvas" />

      <div className="contact-wrapper">
        
        <h2 ref={titleRef} className="contact-title">
          {language === 'es' ? 'Conectemos' : "Let's Connect"}
        </h2>

        <p className="contact-subtitle">
          {language === 'es' 
            ? 'Estoy disponible para trabajar en nuevos proyectos. ¡Contáctame!' 
            : "I'm available for new projects. Get in touch!"}
        </p>

        <div className="contact-email">
          <FiMail className="email-icon" />
          <a href={`mailto:${email}`} className="email-link">{email}</a>
          <button onClick={copyEmail} className="copy-btn">
            {copied ? <FiCheck /> : <FiCopy />}
          </button>
        </div>

        <div className="social-buttons">
          
          <a href="https://github.com/Hersil23" target="_blank" rel="noopener noreferrer" className="social-btn">
            <FiGithub className="social-icon" />
            <span>GitHub</span>
          </a>

          <a href="https://www.instagram.com/herasi.dev" target="_blank" rel="noopener noreferrer" className="social-btn">
            <FiInstagram className="social-icon" />
            <span>Instagram</span>
          </a>

          <a href="https://www.tiktok.com/@herasi.dev" target="_blank" rel="noopener noreferrer" className="social-btn">
            <SiTiktok className="social-icon" />
            <span>TikTok</span>
          </a>

          <a href="https://wa.me/584145116337" target="_blank" rel="noopener noreferrer" className="social-btn">
            <SiWhatsapp className="social-icon" />
            <span>WhatsApp</span>
          </a>

        </div>

      </div>

      <style jsx>{`
        .contact-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 100px 24px;
          background: #0B1120;
          position: relative;
          overflow: hidden;
        }

        .constellation-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .contact-wrapper {
          max-width: 900px;
          margin: 0 auto;
          width: 100%;
          position: relative;
          z-index: 10;
          text-align: center;
        }

        .contact-title {
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 800;
          color: #E5E7EB;
          margin-bottom: 16px;
          background: linear-gradient(90deg, #E5E7EB, #38BDF8, #E5E7EB);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }

        @keyframes shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        .contact-subtitle {
          font-size: clamp(16px, 2vw, 20px);
          color: #9CA3AF;
          margin-bottom: 50px;
        }

        .contact-email {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px 24px;
          background: rgba(21, 30, 45, 0.8);
          border: 1px solid rgba(56, 189, 248, 0.2);
          border-radius: 12px;
          margin-bottom: 50px;
          backdrop-filter: blur(10px);
        }

        .email-icon {
          font-size: 22px;
          color: #38BDF8;
          flex-shrink: 0;
        }

        .email-link {
          font-size: 16px;
          color: #E5E7EB;
          font-weight: 500;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .email-link:hover {
          color: #38BDF8;
        }

        .copy-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          background: rgba(56, 189, 248, 0.1);
          border: 1px solid rgba(56, 189, 248, 0.3);
          border-radius: 8px;
          color: #38BDF8;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .copy-btn:hover {
          background: rgba(56, 189, 248, 0.2);
          border-color: #38BDF8;
          transform: scale(1.1);
        }

        .social-buttons {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          max-width: 500px;
          margin: 0 auto;
        }

        .social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 16px 20px;
          background: rgba(21, 30, 45, 0.8);
          border: 1px solid rgba(56, 189, 248, 0.2);
          border-radius: 10px;
          color: #9CA3AF;
          font-size: 16px;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.3s ease;
          cursor: pointer;
          opacity: 1 !important;
          backdrop-filter: blur(10px);
        }

        .social-btn:hover {
          border-color: #38BDF8;
          color: #38BDF8;
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(56, 189, 248, 0.3);
        }

        .social-icon {
          font-size: 20px;
        }

        @media (max-width: 768px) {
          .contact-email {
            flex-wrap: wrap;
            justify-content: center;
          }

          .social-buttons {
            grid-template-columns: 1fr;
            max-width: 300px;
          }
        }
      `}</style>
    </section>
  );
}