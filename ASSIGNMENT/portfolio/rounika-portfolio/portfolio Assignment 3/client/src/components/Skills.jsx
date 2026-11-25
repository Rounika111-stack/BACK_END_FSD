import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading.jsx';
import { Terminal, Globe, Layers, Cpu } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Skills() {
  // Categories strictly conforming to requirements:
  // 1. Programming Languages: Python, C++
  // 2. Web Technologies: HTML, CSS, JavaScript
  // 3. Frameworks & Runtime: React, Node.js
  // 4. Core Competencies: Frontend Development, Full-Stack Development, Problem Solving
  const skillCategories = [
    {
      category: 'Programming Languages',
      icon: Terminal,
      description: 'Foundational languages for systems logic and algorithmic problem solving.',
      skills: ['Python', 'C++'],
    },
    {
      category: 'Web Technologies',
      icon: Globe,
      description: 'Core building blocks of accessible, modern client-side interfaces.',
      skills: ['HTML', 'CSS', 'JavaScript'],
    },
    {
      category: 'Frameworks & Runtime',
      icon: Layers,
      description: 'Component architecture and scalable server-side execution.',
      skills: ['React', 'Node.js'],
    },
    {
      category: 'Core Competencies',
      icon: Cpu,
      description: 'End-to-end design, implementation, and critical computational thinking.',
      skills: ['Frontend Development', 'Full-Stack Development', 'Problem Solving'],
    },
  ];

  return (
    <section id="skills" className="py-20 md:py-28 border-t border-[#E8E5DD]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          <SectionHeading
            eyebrow="Technical Stack"
            title="Skills & Technical Toolkit"
            description="Technologies and computational competencies cultivated through academic coursework, independent study, and practical projects."
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {skillCategories.map((group, idx) => {
            const Icon = group.icon;
            return (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
                className="bg-white rounded-2xl border border-[#E8E5DD] p-7 sm:p-8 hover:border-[#D9D5CC] hover:shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3 rounded-xl bg-[#FAF9F7] border border-[#EDEAE2] text-[#A86B4C]">
                      <Icon size={20} />
                    </div>
                    <span className="text-[11px] font-mono font-medium text-[#8A877E] tracking-wider">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#1C1C1A] mb-2">
                    {group.category}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64625A] leading-relaxed mb-6">
                    {group.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F0ECE4] flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center px-3.5 py-1.5 rounded-lg bg-[#FAF9F7] border border-[#EDEAE2] text-xs font-medium text-[#1C1C1A] hover:border-[#D9D5CC] hover:bg-[#F4F1EA] transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
