'use client'
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">
          © {currentYear} Herasi Silva • {language === 'es' ? 'Desarrollador Frontend' : 'Frontend Developer'}
        </p>
        <p className="footer-subtext">
          {language === 'es' ? 'Todos los Derechos Reservados.' : 'All Rights Reserved.'} 
        </p>
      </div>

      <style jsx>{`
        .footer {
          background: #0B1120;
          border-top: 1px solid rgba(56, 189, 248, 0.1);
          padding: 32px 24px;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
        }

        .footer-text {
          color: #E5E7EB;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 8px;
        }

        .footer-subtext {
          color: #6B7280;
          font-size: 13px;
        }

        @media (max-width: 768px) {
          .footer {
            padding: 24px 16px;
          }

          .footer-text {
            font-size: 13px;
          }

          .footer-subtext {
            font-size: 12px;
          }
        }
      `}</style>
    </footer>
  );
}