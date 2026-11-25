import React from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Education from './components/Education.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import Experience from './components/Experience.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-[#FAF9F7] text-[#1C1C1A] font-sans selection:bg-[#EAE4D9] selection:text-[#1C1C1A]">
      {/* Sticky Responsive Header */}
      <Navbar />

      {/* Main Content Flow */}
      <main>
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      {/* Site Footer */}
      <Footer />
    </div>
  );
}
