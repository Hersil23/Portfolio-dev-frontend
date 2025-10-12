'use client'
import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { content } from '@/data/content';
import { FiGlobe, FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const { language, toggleLanguage, t } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
        setMobileMenuOpen(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { id: 'home', label: t(content.nav.home), href: '#home' },
    { id: 'about', label: t(content.nav.about), href: '#about' },
    { id: 'tech', label: t(content.nav.tech), href: '#tech' },
    { id: 'projects', label: t(content.nav.projects), href: '#projects' },
    { id: 'contact', label: t(content.nav.contact), href: '#contact' },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
          opacity: isVisible ? 1 : 0,
          transition: 'all 0.5s ease'
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '16px 24px' }}>
          <div
            style={{
              background: 'rgba(21, 30, 45, 0.9)',
              backdropFilter: 'blur(16px)',
              borderRadius: '9999px',
              padding: '8px 24px',
              boxShadow: '0 10px 40px rgba(56, 189, 248, 0.1)',
              border: '1px solid rgba(56, 189, 248, 0.2)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              
              <div 
                onClick={() => scrollToSection('#home')}
                style={{ 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <img 
                  src="/images/herasi-logo.png" 
                  alt="Herasi Silva Logo"
                  className="logo-img"
                />
              </div>

              <ul style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '32px', 
                listStyle: 'none', 
                margin: 0, 
                padding: 0 
              }}
              className="desktop-menu"
              >
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setActiveSection(item.id);
                        scrollToSection(item.href);
                      }}
                      style={{
                        position: 'relative',
                        fontSize: '15px',
                        fontWeight: '500',
                        color: activeSection === item.id ? '#38BDF8' : '#9CA3AF',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'color 0.3s ease',
                        padding: '8px 0',
                        letterSpacing: '0.5px'
                      }}
                      onMouseEnter={(e) => e.target.style.color = '#38BDF8'}
                      onMouseLeave={(e) => e.target.style.color = activeSection === item.id ? '#38BDF8' : '#9CA3AF'}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                
                <div style={{ position: 'relative' }}>
                  <button
                    onClick={() => setShowLangMenu(!showLangMenu)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#9CA3AF',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'color 0.3s ease',
                      fontSize: '14px',
                      fontWeight: '500',
                      padding: '8px'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#38BDF8'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}
                  >
                    <FiGlobe style={{ fontSize: '20px' }} />
                    <span style={{ textTransform: 'uppercase' }} className="lang-text">{language}</span>
                  </button>

                  {showLangMenu && (
                    <div
                      style={{
                        position: 'absolute',
                        right: 0,
                        marginTop: '8px',
                        width: '140px',
                        background: '#151E2D',
                        border: '1px solid rgba(56, 189, 248, 0.2)',
                        borderRadius: '12px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                        overflow: 'hidden',
                        zIndex: 100
                      }}
                    >
                      <button
                        onClick={() => {
                          if (language !== 'en') toggleLanguage();
                          setShowLangMenu(false);
                        }}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          textAlign: 'left',
                          fontSize: '14px',
                          background: language === 'en' ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                          color: language === 'en' ? '#38BDF8' : '#9CA3AF',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'background 0.3s ease',
                          fontWeight: '500'
                        }}
                        onMouseEnter={(e) => e.target.style.background = 'rgba(56, 189, 248, 0.1)'}
                        onMouseLeave={(e) => e.target.style.background = language === 'en' ? 'rgba(56, 189, 248, 0.2)' : 'transparent'}
                      >
                        🇺🇸 English
                      </button>
                      <button
                        onClick={() => {
                          if (language !== 'es') toggleLanguage();
                          setShowLangMenu(false);
                        }}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          textAlign: 'left',
                          fontSize: '14px',
                          background: language === 'es' ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                          color: language === 'es' ? '#38BDF8' : '#9CA3AF',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'background 0.3s ease',
                          fontWeight: '500'
                        }}
                        onMouseEnter={(e) => e.target.style.background = 'rgba(56, 189, 248, 0.1)'}
                        onMouseLeave={(e) => e.target.style.background = language === 'es' ? 'rgba(56, 189, 248, 0.2)' : 'transparent'}
                      >
                        🇪🇸 Español
                      </button>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="mobile-menu-btn"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#38BDF8',
                    cursor: 'pointer',
                    padding: '8px'
                  }}
                >
                  {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <>
          <div
            onClick={() => setMobileMenuOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.7)',
              zIndex: 45,
              animation: 'fadeIn 0.3s ease'
            }}
          />
          
          <div
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '280px',
              maxWidth: '80vw',
              background: 'rgba(11, 17, 32, 0.98)',
              backdropFilter: 'blur(20px)',
              zIndex: 50,
              padding: '80px 32px 32px',
              borderLeft: '1px solid rgba(56, 189, 248, 0.2)',
              animation: 'slideInRight 0.3s ease',
              boxShadow: '-10px 0 50px rgba(0, 0, 0, 0.5)'
            }}
          >
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {navItems.map((item) => (
                <li key={item.id} style={{ marginBottom: '24px' }}>
                  <button
                    onClick={() => {
                      setActiveSection(item.id);
                      scrollToSection(item.href);
                    }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      fontSize: '20px',
                      fontWeight: '600',
                      color: activeSection === item.id ? '#38BDF8' : '#E5E7EB',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '12px 0',
                      transition: 'all 0.3s ease',
                      borderBottom: '1px solid rgba(56, 189, 248, 0.1)'
                    }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .logo-img {
          height: 70px;
          width: auto;
          object-fit: contain;
        }

        @media (max-width: 768px) {
          .logo-img {
            height: 60px;
          }
        }

        @media (min-width: 769px) {
          .desktop-menu {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
          .lang-text {
            display: inline !important;
          }
        }

        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
          .lang-text {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}