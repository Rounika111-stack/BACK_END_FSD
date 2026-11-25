import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Download, Github, Linkedin, Mail, MapPin, Sparkles } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export default function Hero() {
  return (
    <section id="home" className="pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline and Actions */}
          <motion.div
            className="lg:col-span-7 flex flex-col justify-center"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            {/* Status Pill */}
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2.5 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#64625A]">
                Computer Science & Engineering · ABES EC
              </span>
            </motion.div>

            {/* Name & Headline */}
            <motion.div variants={fadeUp} className="mb-6">
              <span className="block text-sm font-medium text-[#8A877E] tracking-wider uppercase mb-2">
                Hello, I am
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-medium text-[#1C1C1A] leading-[1.08] tracking-tight mb-5">
                Rounika Tiwari
              </h1>
              <p className="font-serif italic text-2xl sm:text-3xl text-[#A86B4C] font-normal leading-snug">
                Computer Science Student &amp; Aspiring Full Stack Developer
              </p>
            </motion.div>

            {/* Supporting Description */}
            <motion.p
              variants={fadeUp}
              className="text-[#64625A] text-base sm:text-lg leading-relaxed max-w-xl mb-8"
            >
              I am a Computer Science and Engineering student passionate about building meaningful digital experiences, exploring web technologies, and solving real-world problems through technology.
            </motion.p>

            {/* Action Buttons */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 mb-10">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#1C1C1A] text-[#FAF9F7] text-sm font-medium hover:bg-[#33322E] transition-all duration-200 shadow-sm hover:translate-y-[-1px] focus:outline-none focus:ring-2 focus:ring-[#1C1C1A]/40"
              >
                <span>View Projects</span>
                <ArrowUpRight size={16} />
              </a>

              <a
                href="/rounika-tiwari-resume.pdf"
                download="Rounika_Tiwari_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-[#D9D5CC] bg-white/70 text-[#1C1C1A] text-sm font-medium hover:bg-white hover:border-[#BFB9AD] transition-all duration-200 shadow-sm hover:translate-y-[-1px] focus:outline-none focus:ring-2 focus:ring-[#A86B4C]/40"
              >
                <Download size={16} className="text-[#A86B4C]" />
                <span>Download Resume</span>
              </a>
            </motion.div>

            {/* Social & Contact Links */}
            <motion.div variants={fadeUp} className="flex items-center gap-6 pt-6 border-t border-[#E8E5DD] text-[#64625A]">
              <a
                href="https://github.com/Rounika111-stack"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="flex items-center gap-2 text-sm font-medium hover:text-[#1C1C1A] transition-colors"
              >
                <Github size={18} />
                <span className="hidden sm:inline">GitHub</span>
              </a>

              <a
                href="https://www.linkedin.com/in/rounika-tiwari-a97559427/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="flex items-center gap-2 text-sm font-medium hover:text-[#1C1C1A] transition-colors"
              >
                <Linkedin size={18} />
                <span className="hidden sm:inline">LinkedIn</span>
              </a>

              <a
                href="mailto:rouni.tiwari2013@gmail.com"
                aria-label="Send Email"
                className="flex items-center gap-2 text-sm font-medium hover:text-[#1C1C1A] transition-colors"
              >
                <Mail size={18} />
                <span className="hidden sm:inline">Email</span>
              </a>

              <div className="flex items-center gap-1.5 text-xs text-[#8A877E] ml-auto">
                <MapPin size={14} className="text-[#A86B4C]" />
                <span>Greater Noida, India</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Clean Editorial Visual Composition */}
          <motion.div
            className="lg:col-span-5 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative w-full max-w-[380px]">
              {/* Background Geometric Accent Rings */}
              <div className="absolute -inset-4 rounded-3xl border border-[#E8E5DD]/70 pointer-events-none -rotate-2" />
              <div className="absolute -inset-8 rounded-3xl border border-[#EDEAE2]/50 pointer-events-none rotate-3" />

              {/* Editorial Card */}
              <div className="relative bg-white rounded-2xl border border-[#E8E5DD] p-8 sm:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col justify-between min-h-[420px]">
                {/* Card Top */}
                <div className="flex items-center justify-between pb-6 border-b border-[#F0ECE4]">
                  <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#8A877E]">
                    STUDENT &amp; BUILDER
                  </span>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#A86B4C] font-medium">
                    <Sparkles size={14} />
                    <span>2025 – 2029</span>
                  </div>
                </div>

                {/* Card Center: Monogram & Philosophy */}
                <div className="my-8 text-center">
                  <div className="font-serif text-7xl font-semibold tracking-tighter text-[#1C1C1A] leading-none mb-4 select-none">
                    RT<span className="text-[#A86B4C]">.</span>
                  </div>
                  <h3 className="font-serif italic text-xl text-[#33322E] mb-2">
                    Curious Mind. Thoughtful Code.
                  </h3>
                  <p className="text-xs text-[#8A877E] leading-relaxed max-w-[240px] mx-auto">
                    Focused on crafting accessible, well-structured web applications with modern frontend and backend tools.
                  </p>
                </div>

                {/* Card Bottom Highlights */}
                <div className="pt-6 border-t border-[#F0ECE4] grid grid-cols-2 gap-4 text-center">
                  <div className="p-2.5 rounded-lg bg-[#FAF9F7] border border-[#EFECE5]">
                    <span className="block font-serif text-xl font-semibold text-[#1C1C1A]">9.96</span>
                    <span className="text-[10px] uppercase tracking-wider text-[#8A877E]">First Year SGPA</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#FAF9F7] border border-[#EFECE5]">
                    <span className="block font-serif text-xl font-semibold text-[#A86B4C]">10.00</span>
                    <span className="text-[10px] uppercase tracking-wider text-[#8A877E]">Sem 2 SGPA</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
