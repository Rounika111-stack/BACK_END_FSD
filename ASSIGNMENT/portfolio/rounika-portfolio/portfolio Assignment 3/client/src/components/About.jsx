import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading.jsx';
import { BookOpen, Code2, Compass, Rocket } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function About() {
  const highlights = [
    {
      icon: BookOpen,
      title: 'Academic Discipline',
      text: 'B.Tech in Computer Science & Engineering at ABES Engineering College with consistent academic rigor.',
    },
    {
      icon: Code2,
      title: 'Engineering Foundations',
      text: 'Practical experience spanning Python, C++, modern JavaScript, React, and server-side Node.js.',
    },
    {
      icon: Compass,
      title: 'Problem Solving Focus',
      text: 'Analytical mindset cultivated through algorithmic problem solving and hands-on coding challenges.',
    },
    {
      icon: Rocket,
      title: 'Initiative & Teamwork',
      text: 'Active participation in collegiate entrepreneurship cell initiatives and national-level hackathon rounds.',
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 border-t border-[#E8E5DD]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          <SectionHeading
            eyebrow="About Me"
            title="Curiosity driven by a builder's mindset."
            description="A glimpse into my background, interests, and approach to technology."
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Main Narrative Column */}
          <motion.div
            className="lg:col-span-7 space-y-6 text-[#64625A] text-[15px] sm:text-base leading-relaxed"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
          >
            <p className="font-serif text-xl sm:text-2xl text-[#1C1C1A] leading-snug font-normal">
              I am currently pursuing my Bachelor of Technology in Computer Science and Engineering at ABES Engineering College.
            </p>

            <p>
              My journey into software engineering is rooted in a natural curiosity about how complex digital systems work under the hood. I enjoy bridging the gap between clean visual design and robust software logic, developing an ever-growing interest in both frontend and full-stack development.
            </p>

            <p>
              Through structured coursework and independent projects, I have developed a strong foundation in core programming languages like <span className="text-[#1C1C1A] font-medium">Python</span> and <span className="text-[#1C1C1A] font-medium">C++</span>, alongside practical experience in web development using <span className="text-[#1C1C1A] font-medium">HTML, CSS, JavaScript, React</span>, and <span className="text-[#1C1C1A] font-medium">Node.js</span>.
            </p>

            <p>
              Beyond technical coursework, I am passionate about entrepreneurship, collaborative problem solving, and hackathons. Whether coordinating student events with E-Cell or collaborating under pressure in hackathon environments, I value continuous learning, clear communication, and the process of turning ideas into functional software.
            </p>
          </motion.div>

          {/* Highlights Grid */}
          <motion.div
            className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
          >
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="p-5 rounded-xl bg-white border border-[#E8E5DD] hover:border-[#D9D5CC] transition-all duration-200 shadow-[0_2px_12px_rgba(0,0,0,0.02)]"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-lg bg-[#FAF9F7] border border-[#EDEAE2] text-[#A86B4C]">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-semibold text-[#1C1C1A] mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#64625A] leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
