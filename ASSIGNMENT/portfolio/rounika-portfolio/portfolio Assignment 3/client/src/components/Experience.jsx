import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading.jsx';
import { Users, Award, Trophy, Compass, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Experience() {
  const eCellPoints = [
    'Contributed to the planning and structured execution of entrepreneurship-focused collegiate events and workshops.',
    'Worked on EUREKA | IIT Bombay National Entrepreneurship Challenge (NEC), supporting institutional representation.',
    'Supported end-to-end event management, crowd logistics, and inter-college participant coordination.',
    'Actively participated in campus entrepreneurship initiatives, panel discussions, and competitive challenges.',
  ];

  const hackathons = [
    {
      title: 'Decode SIH',
      type: 'Competitive Problem-Solving Event',
      focus: 'Real-world Challenge Solution Development',
      description:
        'Participated in collaborative problem-solving, ideation, and rapid solution development geared toward addressing real-world problem statements.',
      tag: 'Problem Solving',
    },
    {
      title: 'Smart India Hackathon (SIH)',
      type: 'National Hackathon Initiative',
      focus: 'Institutional Internal Rounds',
      description:
        'Participated in internal selection and evaluation rounds, presenting technological proposals focused on practical application feasibility.',
      tag: 'Team Collaboration',
    },
  ];

  const certifications = [
    {
      issuer: 'NPTEL',
      title: 'Artificial Intelligence: Knowledge Representation and Reasoning',
      topic: 'Formal Logic, Ontologies & Reasoning Systems',
      highlight: 'Advanced AI Curriculum',
    },
    {
      issuer: 'HackerRank',
      title: 'Problem Solving',
      topic: 'Algorithms, Data Structures & Computational Logic',
      highlight: 'Core Competency',
    },
    {
      issuer: 'Web Development',
      title: 'HTML, CSS & JavaScript',
      topic: 'Frontend Foundations, DOM Manipulation & Modern Styling',
      highlight: 'Web Fundamentals',
    },
  ];

  return (
    <section id="experience" className="py-20 md:py-28 border-t border-[#E8E5DD]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          <SectionHeading
            eyebrow="Leadership & Involvement"
            title="Experience & Extracurricular Activities"
            description="Active contributions to campus initiatives, entrepreneurship programs, and competitive problem-solving platforms."
          />
        </motion.div>

        {/* E-Cell Timeline Experience */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          <motion.div
            className="lg:col-span-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
          >
            <div className="bg-white rounded-2xl border border-[#E8E5DD] p-8 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              {/* Timeline Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#F0ECE4]">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-[#FAF9F7] border border-[#EDEAE2] text-[#A86B4C]">
                    <Users size={24} />
                  </div>
                  <div>
                    <span className="inline-block text-[11px] font-semibold tracking-wider uppercase text-[#A86B4C] mb-1">
                      Extracurricular Leadership
                    </span>
                    <h3 className="font-serif text-2xl font-medium text-[#1C1C1A]">
                      E-Cell, ABES Engineering College
                    </h3>
                    <p className="text-[#64625A] text-sm font-medium mt-0.5">
                      Role: Member, Events Team
                    </p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF9F7] border border-[#EDEAE2] text-xs font-medium text-[#1C1C1A] self-start sm:self-auto">
                  <span>ABES EC Campus</span>
                </div>
              </div>

              {/* Responsibilities & Impact */}
              <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {eCellPoints.map((point, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#FAF9F7] border border-[#EFECE5] flex items-start gap-3"
                  >
                    <CheckCircle2 size={16} className="text-[#A86B4C] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-[#64625A] leading-relaxed">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Hackathons & Competitions Section */}
        <div className="mb-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-[#A86B4C] mb-2">
              <Trophy size={14} />
              <span>Competitions</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#1C1C1A]">
              Hackathons &amp; Problem Solving
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hackathons.map((hack, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
                className="bg-white rounded-2xl border border-[#E8E5DD] p-7 sm:p-8 hover:border-[#D9D5CC] transition-all shadow-[0_2px_16px_rgba(0,0,0,0.02)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-[#FAF9F7] border border-[#EDEAE2] text-[11px] font-medium text-[#A86B4C]">
                      {hack.tag}
                    </span>
                    <span className="text-xs font-mono text-[#8A877E]">0{idx + 1}</span>
                  </div>

                  <h4 className="font-serif text-xl sm:text-2xl font-medium text-[#1C1C1A] mb-1">
                    {hack.title}
                  </h4>
                  <div className="text-xs font-medium text-[#A86B4C] mb-3">
                    {hack.focus}
                  </div>
                  <p className="text-xs sm:text-sm text-[#64625A] leading-relaxed">
                    {hack.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications Section */}
        <div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-[#A86B4C] mb-2">
              <ShieldCheck size={14} />
              <span>Verified Knowledge</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#1C1C1A]">
              Certifications &amp; Courses
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certifications.map((cert, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={fadeUp}
                className="bg-white rounded-2xl border border-[#E8E5DD] p-7 hover:border-[#D9D5CC] transition-all shadow-[0_2px_16px_rgba(0,0,0,0.02)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded bg-[#FAF9F7] border border-[#EDEAE2] text-[#1C1C1A]">
                      {cert.issuer}
                    </span>
                    <span className="text-[11px] text-[#A86B4C] font-medium">
                      {cert.highlight}
                    </span>
                  </div>

                  <h4 className="font-serif text-lg font-medium text-[#1C1C1A] leading-snug mb-3">
                    {cert.title}
                  </h4>
                  <p className="text-xs text-[#64625A] leading-relaxed">
                    {cert.topic}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
