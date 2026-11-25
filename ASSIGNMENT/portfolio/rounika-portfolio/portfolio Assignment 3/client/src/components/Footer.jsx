import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FAF9F7] border-t border-[#E8E5DD] py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-[#F0ECE4]">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <a
              href="#home"
              className="font-serif text-2xl font-semibold tracking-tight text-[#1C1C1A] mb-2"
            >
              Rounika Tiwari<span className="text-[#A86B4C]">.</span>
            </a>
            <p className="text-xs text-[#64625A] max-w-sm">
              Computer Science and Engineering student at ABES Engineering College building thoughtful, accessible web experiences.
            </p>
          </div>

          {/* Socials & Back to Top */}
          <div className="flex items-center gap-6 text-[#64625A]">
            <a
              href="https://github.com/Rounika111-stack"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2.5 rounded-full bg-white border border-[#E8E5DD] hover:text-[#1C1C1A] hover:border-[#D9D5CC] transition-colors"
            >
              <Github size={16} />
            </a>

            <a
              href="https://www.linkedin.com/in/rounika-tiwari-a97559427/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2.5 rounded-full bg-white border border-[#E8E5DD] hover:text-[#1C1C1A] hover:border-[#D9D5CC] transition-colors"
            >
              <Linkedin size={16} />
            </a>

            <a
              href="mailto:rouni.tiwari2013@gmail.com"
              aria-label="Email"
              className="p-2.5 rounded-full bg-white border border-[#E8E5DD] hover:text-[#1C1C1A] hover:border-[#D9D5CC] transition-colors"
            >
              <Mail size={16} />
            </a>

            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1C1C1A] hover:text-[#A86B4C] transition-colors ml-2"
            >
              <span>Back to Top</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A877E] text-center sm:text-left">
          <p>© {currentYear} Rounika Tiwari. All rights reserved.</p>
          <p>
            Designed &amp; built with modern React, Tailwind CSS &amp; Node.js.
          </p>
        </div>
      </div>
    </footer>
  );
}
