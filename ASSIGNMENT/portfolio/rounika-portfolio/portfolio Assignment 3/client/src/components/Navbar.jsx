import React, { useState, useEffect } from 'react';
import { Menu, X, Download, ArrowUpRight } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF9F7]/90 backdrop-blur-md border-b border-[#E8E5DD] shadow-[0_2px_20px_rgba(0,0,0,0.03)]'
          : 'bg-[#FAF9F7]/60 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
        {/* Logo / Name */}
        <a
          href="#home"
          onClick={closeMenu}
          className="group flex items-center gap-2 text-[#1C1C1A] transition-colors focus:outline-none focus:ring-2 focus:ring-[#A86B4C]/40 rounded-sm"
          aria-label="Rounika Tiwari - Home"
        >
          <span className="font-serif text-2xl font-semibold tracking-tight">
            Rounika Tiwari
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#A86B4C] transition-transform duration-300 group-hover:scale-125" />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-[13px] font-medium text-[#64625A]">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-[#1C1C1A] relative py-1 focus:outline-none focus:ring-2 focus:ring-[#A86B4C]/40 rounded-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="/rounika-tiwari-resume.pdf"
            download="Rounika_Tiwari_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[13px] font-medium px-4 py-2 rounded-full border border-[#D9D5CC] text-[#1C1C1A] hover:bg-[#F2EFE8] hover:border-[#BFB9AD] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#A86B4C]/40"
          >
            <Download size={14} className="text-[#A86B4C]" />
            <span>Resume</span>
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium px-4 py-2 rounded-full bg-[#1C1C1A] text-[#FAF9F7] hover:bg-[#33322E] transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1C1C1A]/40"
          >
            <span>Let's Talk</span>
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-[#1C1C1A] hover:text-[#A86B4C] transition-colors focus:outline-none focus:ring-2 focus:ring-[#A86B4C]/40 rounded-lg"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-20 bg-[#FAF9F7] z-40 px-8 py-10 flex flex-col justify-between border-t border-[#E8E5DD] overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-6 text-lg font-serif text-[#1C1C1A]">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="py-2 border-b border-[#F0ECE4] flex items-center justify-between hover:text-[#A86B4C] transition-colors"
              >
                <span>{link.label}</span>
                <span className="text-xs font-sans text-[#8A877E] tracking-widest uppercase">
                  ↗
                </span>
              </a>
            ))}
          </nav>

          <div className="pt-8 flex flex-col gap-3">
            <a
              href="/rounika-tiwari-resume.pdf"
              download="Rounika_Tiwari_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl border border-[#D9D5CC] text-[#1C1C1A] text-sm font-medium hover:bg-[#F2EFE8] transition-colors"
            >
              <Download size={16} className="text-[#A86B4C]" />
              <span>Download Resume</span>
            </a>
            <a
              href="#contact"
              onClick={closeMenu}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#1C1C1A] text-[#FAF9F7] text-sm font-medium hover:bg-[#33322E] transition-colors shadow-sm"
            >
              <span>Get in Touch</span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
