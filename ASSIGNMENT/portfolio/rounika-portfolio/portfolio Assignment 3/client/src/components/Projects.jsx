import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading.jsx';
import { ExternalLink, Github, ShoppingBag, Search, Check, Star, ArrowUpRight, Sparkles } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// Extensible project data array - easily add new projects here
const PROJECTS = [
  {
    id: 'amazon-clone',
    title: 'Amazon Clone',
    badge: 'Featured Frontend Project',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    description:
      'Developed a frontend clone inspired by Amazon, recreating key e-commerce interface components and the overall shopping experience.',
    features: [
      'Structured navigation with search and quick category filters',
      'Dynamic product showcase sections with pricing and rating indicators',
      'Realistic shopping interface layouts including cart counter',
      'Responsive styling tailored across mobile, tablet, and desktop viewports',
    ],
    // Only link to real repositories/links, no fabricated deployment URLs
    githubUrl: 'https://github.com/Rounika111-stack',
    liveUrl: null, // Set when an actual deployment URL is configured
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 md:py-28 bg-[#F5F3EC]/50 border-t border-[#E8E5DD]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          <SectionHeading
            eyebrow="Selected Work"
            title="Projects & Practical Applications"
            description="Hands-on software and frontend implementations exploring web architecture, responsive layouts, and intuitive user experiences."
          />
        </motion.div>

        <div className="space-y-12">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={fadeUp}
              className="bg-white rounded-3xl border border-[#E8E5DD] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.02)] grid grid-cols-1 lg:grid-cols-12"
            >
              {/* Left Column: Interactive UI Visual Representation */}
              <div className="lg:col-span-7 bg-[#FAF9F7] p-6 sm:p-10 border-b lg:border-b-0 lg:border-r border-[#E8E5DD] flex flex-col justify-center">
                {/* Browser Mockup Shell */}
                <div className="rounded-2xl border border-[#E2DFD7] bg-white overflow-hidden shadow-sm">
                  {/* Browser Bar */}
                  <div className="bg-[#F0ECE4] px-4 py-2.5 flex items-center justify-between border-b border-[#E2DFD7]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#E5B5A1]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#E7D6A3]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#BBD6B8]" />
                    </div>
                    <div className="px-4 py-0.5 rounded-md bg-white/80 border border-[#E2DFD7] text-[10px] font-mono text-[#8A877E] max-w-[200px] truncate">
                      amazon-clone / index.html
                    </div>
                    <div className="w-8" />
                  </div>

                  {/* Amazon Mockup View */}
                  <div className="p-4 sm:p-5 bg-white text-[#1C1C1A]">
                    {/* Mock Nav */}
                    <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#F0ECE4] text-xs">
                      <div className="font-serif font-bold text-base tracking-tight text-[#1C1C1A]">
                        amazon<span className="text-[#A86B4C]">.clone</span>
                      </div>
                      <div className="flex-1 max-w-[240px] hidden sm:flex items-center bg-[#FAF9F7] border border-[#E8E5DD] rounded-md px-2 py-1 text-[11px] text-[#8A877E]">
                        <Search size={12} className="mr-1.5 text-[#8A877E]" />
                        <span>Search products...</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-medium text-[#64625A]">
                        <span>Cart</span>
                        <span className="px-1.5 py-0.5 bg-[#FAF9F7] border border-[#E8E5DD] rounded-full text-[10px] font-bold text-[#A86B4C]">
                          2
                        </span>
                      </div>
                    </div>

                    {/* Mock Category Bar */}
                    <div className="flex items-center gap-3 py-2 text-[10px] text-[#8A877E] font-medium border-b border-[#F5F3EC] overflow-x-hidden">
                      <span className="text-[#1C1C1A]">All</span>
                      <span>Today's Deals</span>
                      <span>Electronics</span>
                      <span>Computers</span>
                      <span>Books</span>
                    </div>

                    {/* Mock Banner */}
                    <div className="mt-3.5 p-4 rounded-xl bg-[#F6F3EC] border border-[#EDE8DE] flex flex-col justify-between">
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-[#A86B4C] mb-1">
                        Featured Showcase
                      </div>
                      <div className="font-serif text-lg sm:text-xl font-medium text-[#1C1C1A] leading-tight mb-2">
                        Explore Modern Hardware &amp; Accessories
                      </div>
                      <span className="text-[11px] text-[#64625A]">
                        Responsive grid &amp; checkout layout components
                      </span>
                    </div>

                    {/* Mock Product Cards */}
                    <div className="mt-3.5 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {[
                        { title: 'Wireless Keyboard', price: '$49.99' },
                        { title: 'Ergonomic Mouse', price: '$29.99' },
                        { title: 'USB-C Display Hub', price: '$39.99' },
                      ].map((prod, i) => (
                        <div
                          key={i}
                          className="p-2.5 rounded-lg border border-[#F0ECE4] bg-[#FAF9F7] text-left"
                        >
                          <div className="w-full h-12 bg-white rounded border border-[#EDEAE2] mb-2 flex items-center justify-center text-[#B0ABA0]">
                            <ShoppingBag size={14} />
                          </div>
                          <div className="text-[11px] font-medium text-[#1C1C1A] truncate">
                            {prod.title}
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-[10px] font-semibold text-[#A86B4C]">
                              {prod.price}
                            </span>
                            <div className="flex text-[#D19B4C]">
                              <Star size={9} fill="currentColor" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Project Details */}
              <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.16em] uppercase text-[#A86B4C] mb-3">
                    <Sparkles size={12} />
                    <span>{project.badge}</span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#1C1C1A] mb-4">
                    {project.title}
                  </h3>

                  <p className="text-sm sm:text-[15px] text-[#64625A] leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Key Features List */}
                  <div className="mb-6 space-y-2.5">
                    <span className="block text-xs font-semibold uppercase tracking-wider text-[#1C1C1A]">
                      Key Highlights:
                    </span>
                    {project.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-[#64625A]">
                        <Check size={14} className="text-[#A86B4C] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-md bg-[#FAF9F7] border border-[#E8E5DD] text-xs font-medium text-[#1C1C1A]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Links */}
                <div className="pt-6 border-t border-[#F0ECE4] flex flex-wrap items-center gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1C1C1A] text-[#FAF9F7] text-xs font-medium hover:bg-[#33322E] transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1C1C1A]/40"
                    >
                      <Github size={14} />
                      <span>Explore Repository</span>
                    </a>
                  )}

                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-[#D9D5CC] text-[#1C1C1A] text-xs font-medium hover:bg-[#FAF9F7] transition-all"
                    >
                      <span>Live Demo</span>
                      <ExternalLink size={13} />
                    </a>
                  ) : (
                    <span className="text-xs text-[#8A877E] italic">
                      Client-side clone implementation
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scalability indicator for future projects */}
        <div className="mt-10 text-center">
          <p className="text-xs text-[#8A877E] font-medium tracking-wide">
            Additional full-stack and React projects currently in active development.
          </p>
        </div>
      </div>
    </section>
  );
}
