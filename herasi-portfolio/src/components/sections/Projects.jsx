'use client'
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { content } from '@/data/content';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { SiHtml5, SiCss3, SiJavascript, SiReact, SiWordpress, SiTailwindcss, SiSass, SiGreensock } from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const { t, language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('All');
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  const projects = [
    {
      id: 1,
      name: 'Clone YouTube',
      nameES: 'Clone Educativo de YouTube',
      description: 'Educational design of a YouTube-like web page',
      descriptionES: 'Diseño educativo de una página web similar a YouTube',
      tech: ['HTML', 'CSS'],
      category: 'HTML/CSS',
      github: 'https://github.com/Hersil23/cloneducativoyoutube',
      demo: 'https://hersil23.github.io/cloneducativoyoutube/',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      icon: SiHtml5
    },
    {
      id: 2,
      name: 'Clone Netflix',
      nameES: 'Clone Educativo de Netflix',
      description: 'Educational Netflix clone to practice web styling',
      descriptionES: 'Diseño educativo de Netflix para practicar estilos web',
      tech: ['HTML', 'CSS', 'Sass'],
      category: 'HTML/CSS',
      github: 'https://github.com/Hersil23/cloneducativoSASS',
      demo: 'https://hersil23.github.io/cloneducativoSASS/',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      icon: SiSass
    },
    {
      id: 3,
      name: 'Clone Spotify',
      nameES: 'Clone Educativo de Spotify',
      description: 'Educational Spotify clone built with Tailwind',
      descriptionES: 'Diseño educativo de Spotify con Tailwind',
      tech: ['HTML', 'CSS', 'Tailwind'],
      category: 'HTML/CSS',
      github: 'https://github.com/Hersil23/ProyectoEducativoTailwind',
      demo: 'https://hersil23.github.io/ProyectoEducativoTailwind/',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      icon: SiTailwindcss
    },
    {
      id: 4,
      name: 'API Consumer',
      nameES: 'Consumo de API',
      description: 'Login/Register with LocalStorage and favorites page',
      descriptionES: 'Login/Register en LocalStorage con página de favoritos',
      tech: ['HTML', 'CSS', 'Tailwind', 'JavaScript'],
      category: 'JavaScript',
      github: 'https://github.com/Hersil23/Proyecto-final-JS',
      demo: 'https://hersil23.github.io/Proyecto-final-JS/',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      icon: SiJavascript
    },
    {
      id: 5,
      name: 'Weather App',
      nameES: 'App Clima Mundial',
      description: 'Real-time world weather app with geolocation',
      descriptionES: 'App del clima mundial con geolocalización en tiempo real',
      tech: ['React'],
      category: 'React',
      github: 'https://github.com/Hersil23/ClimaMundial',
      demo: 'https://clima-app-three-phi.vercel.app/',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      icon: SiReact
    },
    {
      id: 6,
      name: 'Voice Actor Portfolio',
      nameES: 'Portafolio de Locutor',
      description: 'Professional landing page for a voice actor with GSAP animations',
      descriptionES: 'Landing page profesional para locutor con animaciones GSAP',
      tech: ['HTML', 'CSS', 'Tailwind', 'JavaScript', 'GSAP'],
      category: 'JavaScript',
      github: 'https://github.com/Hersil23/Portfolio_locutor',
      demo: 'https://hersil23.github.io/Portfolio_locutor/',
      gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
      icon: SiGreensock
    },
    {
      id: 7,
      name: 'Twistpro Store',
      nameES: 'Tienda Online Twistpro',
      description: 'E-commerce online store built with WordPress',
      descriptionES: 'Tienda E-commerce online en WordPress',
      tech: ['WordPress'],
      category: 'WordPress',
      github: null,
      demo: 'http://www.twistpro.net',
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      icon: SiWordpress
    },
    {
      id: 8,
      name: 'NS Cleaning Services',
      nameES: 'NS Cleaning & Multiservices',
      description: 'Informational website with 4 pages',
      descriptionES: 'Sitio web informativo con 4 páginas',
      tech: ['WordPress'],
      category: 'WordPress',
      github: null,
      demo: 'http://www.nsmultiservices.net',
      gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      icon: SiWordpress
    }
  ];

  const filters = ['All', 'HTML/CSS', 'JavaScript', 'React', 'WordPress'];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);
    
  return (
    <section 
      id="projects"
      ref={sectionRef}
      className="projects-section"
    >
      <div className="projects-background" />

      <div className="projects-wrapper">
        
        {/* Title */}
        <h2 ref={titleRef} className="projects-title">
          {t(content.projects.title)}
        </h2>

        {/* Filters */}
        <div className="filters-container">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project) => {
            const Icon = project.icon;
            return (
              <div key={project.id} className="project-card">
                
                {/* Gradient Placeholder with Icon */}
                <div 
                  className="project-image"
                  style={{ background: project.gradient }}
                >
                  <Icon className="project-placeholder-icon" />
                </div>

                {/* Content */}
                <div className="project-content">
                  <h3 className="project-name">
                    {language === 'es' ? project.nameES : project.name}
                  </h3>
                  
                  <p className="project-description">
                    {language === 'es' ? project.descriptionES : project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="project-tech">
                    {project.tech.map((tech, index) => (
                      <span key={index} className="tech-badge">{tech}</span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="project-links">
                    {project.github && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        <FiGithub /> GitHub
                      </a>
                    )}
                    <a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-link demo"
                    >
                      <FiExternalLink /> Demo
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Styles */}
      <style jsx>{`
        .projects-section {
          min-height: 100vh;
          padding: 100px 24px;
          background: #151E2D;
          position: relative;
          overflow: hidden;
        }

        .projects-background {
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

        .projects-wrapper {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 10;
        }

        .projects-title {
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 800;
          color: #E5E7EB;
          text-align: center;
          margin-bottom: 60px;
        }

        .filters-container {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 60px;
        }

        .filter-btn {
          padding: 12px 28px;
          background: rgba(21, 30, 45, 0.6);
          border: 1px solid rgba(56, 189, 248, 0.2);
          border-radius: 8px;
          color: #9CA3AF;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .filter-btn:hover {
          border-color: #38BDF8;
          color: #38BDF8;
          transform: translateY(-2px);
        }

        .filter-btn.active {
          background: rgba(56, 189, 248, 0.2);
          border-color: #38BDF8;
          color: #38BDF8;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 20px;
        }

        .project-card {
          background: rgba(21, 30, 45, 0.6);
          border: 1px solid rgba(56, 189, 248, 0.2);
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: pointer;
          min-height: 400px;
          display: flex;
          flex-direction: column;
          opacity: 1;
          }

        .project-card:hover {
          transform: translateY(-10px);
          border-color: #38BDF8;
          box-shadow: 0 20px 40px rgba(56, 189, 248, 0.3);
        }

        .project-image {
          width: 100%;
          height: 150px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .project-placeholder-icon {
          font-size: 50px;
          color: rgba(255, 255, 255, 0.9);
          filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.3));
          transition: all 0.3s ease;
        }

        .project-card:hover .project-placeholder-icon {
          transform: scale(1.1) rotate(5deg);
        }

        .project-content {
          padding: 16px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .project-name {
          font-size: 18px;
          font-weight: 700;
          color: #E5E7EB;
          margin-bottom: 10px;
        }

        .project-description {
          font-size: 14px;
          color: #9CA3AF;
          line-height: 1.5;
          margin-bottom: 12px;
        }

        .project-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 16px;
        }

        .tech-badge {
          padding: 4px 10px;
          background: rgba(56, 189, 248, 0.1);
          border: 1px solid rgba(56, 189, 248, 0.3);
          border-radius: 6px;
          color: #38BDF8;
          font-size: 11px;
          font-weight: 500;
        }

        .project-links {
          display: flex;
          gap: 10px;
        }

        .project-link {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          background: rgba(56, 189, 248, 0.1);
          border: 1px solid rgba(56, 189, 248, 0.3);
          border-radius: 8px;
          color: #38BDF8;
          font-size: 13px;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .project-link:hover {
          background: rgba(56, 189, 248, 0.2);
          border-color: #38BDF8;
          transform: translateY(-2px);
        }

        .project-link.demo {
          background: #38BDF8;
          color: #0B1120;
          border-color: #38BDF8;
        }

        .project-link.demo:hover {
          background: #0EA5E9;
        }

        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }

          .filters-container {
            gap: 12px;
          }

          .filter-btn {
            padding: 10px 20px;
            font-size: 14px;
          }
        }
      `}</style>
    </section>
  );
}