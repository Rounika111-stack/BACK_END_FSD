import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading.jsx';
import { GraduationCap, Award, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Education() {
  const scores = [
    {
      metric: '9.96',
      unit: '/ 10',
      label: 'First Year SGPA',
      sublabel: 'Consolidated B.Tech Year 1',
      highlight: true,
    },
    {
      metric: '9.91',
      unit: '/ 10',
      label: 'Semester 1',
      sublabel: 'First Semester Performance',
      highlight: false,
    },
    {
      metric: '10.00',
      unit: '/ 10',
      label: 'Semester 2',
      sublabel: 'Perfect 10.0 SGPA',
      highlight: true,
    },
    {
      metric: '95.5',
      unit: '%',
      label: 'Class XII',
      sublabel: 'Senior Secondary Board',
      highlight: false,
    },
    {
      metric: '97.0',
      unit: '%',
      label: 'Class X',
      sublabel: 'Secondary School Board',
      highlight: false,
    },
  ];

  return (
    <section id="education" className="py-20 md:py-28 bg-[#F5F3EC]/50 border-t border-[#E8E5DD]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          <SectionHeading
            eyebrow="Academic Background"
            title="Education & Academic Achievements"
            description="A strong academic foundation marked by consistency, discipline, and dedication to excellence."
          />
        </motion.div>

        {/* Primary University Card */}
        <motion.div
          className="bg-white rounded-2xl border border-[#E8E5DD] p-8 sm:p-10 mb-10 shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#F0ECE4]">
            <div className="flex items-start gap-4">
              <div className="p-3.5 rounded-xl bg-[#FAF9F7] border border-[#E8E5DD] text-[#A86B4C]">
                <GraduationCap size={28} />
              </div>
              <div>
                <span className="inline-block text-[11px] font-semibold tracking-wider uppercase text-[#A86B4C] mb-1">
                  Undergraduate Degree
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#1C1C1A]">
                  ABES Engineering College
                </h3>
                <p className="text-[#64625A] text-sm sm:text-base font-medium mt-1">
                  B.Tech — Computer Science &amp; Engineering
                </p>
              </div>
            </div>

            <div className="flex flex-wrap md:flex-col items-start md:items-end gap-3 text-xs text-[#8A877E]">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF9F7] border border-[#EDEAE2]">
                <Calendar size={13} className="text-[#A86B4C]" />
                <span className="font-medium text-[#1C1C1A]">2025 – 2029</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF9F7] border border-[#EDEAE2]">
                <MapPin size={13} className="text-[#A86B4C]" />
                <span>Ghaziabad / Greater Noida, India</span>
              </div>
            </div>
          </div>

          {/* Academic Highlights Summary */}
          <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-[#64625A]">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 size={16} className="text-[#A86B4C] shrink-0" />
              <span>Rigorous coursework in Data Structures, Algorithms, Programming &amp; Engineering Mathematics</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 size={16} className="text-[#A86B4C] shrink-0" />
              <span>Ranked among the top academic performers in the department</span>
            </div>
          </div>
        </motion.div>

        {/* Minimal Academic Statistics Cards */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
          }}
        >
          {scores.map((item, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              className={`p-6 rounded-xl border transition-all duration-200 ${
                item.highlight
                  ? 'bg-white border-[#D9D5CC] shadow-[0_4px_16px_rgba(0,0,0,0.03)]'
                  : 'bg-white/80 border-[#E8E5DD] hover:bg-white'
              }`}
            >
              <div className="flex items-baseline gap-1 mb-2">
                <span className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-[#1C1C1A]">
                  {item.metric}
                </span>
                <span className="text-xs font-medium text-[#A86B4C]">
                  {item.unit}
                </span>
              </div>
              <div className="font-medium text-xs sm:text-sm text-[#1C1C1A] mb-1">
                {item.label}
              </div>
              <div className="text-[11px] text-[#8A877E] leading-snug">
                {item.sublabel}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
