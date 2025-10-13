'use client'
import Navbar from '@/components/ui/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import TechStack from '@/components/sections/TechStack';
import Projects from '@/components/sections/Projects';

export default function Home() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Secciones temporales para probar el scroll */}
      <About />

      <TechStack />

     <Projects />

      <section id="contact" className="min-h-screen flex items-center justify-center">
        <h2 className="text-5xl font-bold text-accent-primary">CONTACT SECTION</h2>
      </section>
    </div>
  );
}