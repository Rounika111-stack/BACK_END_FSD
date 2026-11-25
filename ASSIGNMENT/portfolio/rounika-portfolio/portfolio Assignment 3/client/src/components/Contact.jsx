import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading.jsx';
import { Mail, Linkedin, Github, MapPin, Send, ArrowUpRight, CheckCircle2, AlertCircle, ExternalLink, Copy, Check } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const INITIAL_FORM = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState({ type: null, message: '', isUnconfigured: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  // In dev, /api is proxied to :5000. In prod, VITE_API_URL can be set.
  const API_URL = import.meta.env.VITE_API_URL || '';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('rouni.tiwari2013@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: '', isUnconfigured: false });

    // Client-side quick check
    if (!form.name.trim() || !form.email.trim() || !form.subject.trim() || !form.message.trim()) {
      setStatus({
        type: 'error',
        message: 'Please fill in all required fields.',
        isUnconfigured: false,
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json().catch(() => ({}));

      if (response.status === 503 || data.status === 'unconfigured') {
        // SMTP unconfigured handling
        setStatus({
          type: 'notice',
          message:
            data.message ||
            'The contact service is not configured with SMTP credentials yet. Please contact Rounika directly via email.',
          isUnconfigured: true,
        });
      } else if (!response.ok) {
        throw new Error(data.message || `Request failed with status ${response.status}`);
      } else {
        setStatus({
          type: 'success',
          message: data.message || 'Thank you! Your message has been sent successfully.',
          isUnconfigured: false,
        });
        setForm(INITIAL_FORM);
      }
    } catch (err) {
      console.error('Contact submission error:', err);
      setStatus({
        type: 'error',
        message:
          err.message || 'Unable to deliver message right now. Please reach out directly by email.',
        isUnconfigured: false,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const mailtoFallbackUrl = `mailto:rouni.tiwari2013@gmail.com?subject=${encodeURIComponent(
    form.subject || 'Portfolio Inquiry'
  )}&body=${encodeURIComponent(
    `Hi Rounika,\n\n${form.message || ''}\n\nFrom,\n${form.name || ''}\n${form.email || ''}`
  )}`;

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#F5F3EC]/50 border-t border-[#E8E5DD]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          <SectionHeading
            eyebrow="Get In Touch"
            title="Let's start a conversation."
            description="Whether you have an opportunity, an idea, a question, or simply want to connect, feel free to reach out."
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Contact Info */}
          <motion.div
            className="lg:col-span-5 space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
          >
            <div>
              <h3 className="font-serif text-2xl font-medium text-[#1C1C1A] mb-3">
                Open to Opportunities &amp; Collaborations
              </h3>
              <p className="text-[#64625A] text-sm sm:text-[15px] leading-relaxed">
                I am actively exploring software development internships, open-source initiatives, and collaborative projects.
              </p>
            </div>

            {/* Contact Details List */}
            <div className="space-y-4">
              {/* Email */}
              <div className="p-4 rounded-xl bg-white border border-[#E8E5DD] flex items-center justify-between group hover:border-[#D9D5CC] transition-colors">
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-lg bg-[#FAF9F7] text-[#A86B4C]">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-semibold tracking-wider uppercase text-[#8A877E]">
                      Direct Email
                    </span>
                    <a
                      href="mailto:rouni.tiwari2013@gmail.com"
                      className="text-xs sm:text-sm font-medium text-[#1C1C1A] hover:text-[#A86B4C] transition-colors"
                    >
                      rouni.tiwari2013@gmail.com
                    </a>
                  </div>
                </div>
                <button
                  onClick={copyEmail}
                  className="p-2 text-[#8A877E] hover:text-[#1C1C1A] transition-colors"
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                >
                  {copied ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
                </button>
              </div>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/rounika-tiwari-a97559427/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-white border border-[#E8E5DD] flex items-center justify-between group hover:border-[#D9D5CC] transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-lg bg-[#FAF9F7] text-[#A86B4C]">
                    <Linkedin size={18} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-semibold tracking-wider uppercase text-[#8A877E]">
                      Professional Network
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-[#1C1C1A] group-hover:text-[#A86B4C] transition-colors">
                      linkedin.com/in/rounika-tiwari
                    </span>
                  </div>
                </div>
                <ExternalLink size={16} className="text-[#8A877E] group-hover:text-[#1C1C1A]" />
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/Rounika111-stack"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-white border border-[#E8E5DD] flex items-center justify-between group hover:border-[#D9D5CC] transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-lg bg-[#FAF9F7] text-[#A86B4C]">
                    <Github size={18} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-semibold tracking-wider uppercase text-[#8A877E]">
                      Code Repositories
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-[#1C1C1A] group-hover:text-[#A86B4C] transition-colors">
                      github.com/Rounika111-stack
                    </span>
                  </div>
                </div>
                <ExternalLink size={16} className="text-[#8A877E] group-hover:text-[#1C1C1A]" />
              </a>

              {/* Location */}
              <div className="p-4 rounded-xl bg-white border border-[#E8E5DD] flex items-center gap-3.5">
                <div className="p-2.5 rounded-lg bg-[#FAF9F7] text-[#A86B4C]">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="block text-[10px] font-semibold tracking-wider uppercase text-[#8A877E]">
                    Location
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-[#1C1C1A]">
                    Greater Noida, Uttar Pradesh, India
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            className="lg:col-span-7 bg-white rounded-2xl border border-[#E8E5DD] p-8 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.02)]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
          >
            <h3 className="font-serif text-2xl font-medium text-[#1C1C1A] mb-2">
              Send a Message
            </h3>
            <p className="text-xs sm:text-sm text-[#64625A] mb-8">
              Fill out the form below and your message will be forwarded directly to my inbox.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-semibold text-[#1C1C1A] uppercase tracking-wider mb-2"
                  >
                    Your Name <span className="text-[#A86B4C]">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    maxLength={80}
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Jane Doe"
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF9F7] border border-[#E2DFD7] text-sm text-[#1C1C1A] placeholder-[#9C9991] focus:bg-white focus:border-[#A86B4C] focus:ring-1 focus:ring-[#A86B4C] outline-none transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-semibold text-[#1C1C1A] uppercase tracking-wider mb-2"
                  >
                    Email Address <span className="text-[#A86B4C]">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    maxLength={120}
                    value={form.email}
                    onChange={handleChange}
                    placeholder="e.g. jane@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF9F7] border border-[#E2DFD7] text-sm text-[#1C1C1A] placeholder-[#9C9991] focus:bg-white focus:border-[#A86B4C] focus:ring-1 focus:ring-[#A86B4C] outline-none transition-all"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-xs font-semibold text-[#1C1C1A] uppercase tracking-wider mb-2"
                >
                  Subject <span className="text-[#A86B4C]">*</span>
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  required
                  maxLength={150}
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="What would you like to discuss?"
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF9F7] border border-[#E2DFD7] text-sm text-[#1C1C1A] placeholder-[#9C9991] focus:bg-white focus:border-[#A86B4C] focus:ring-1 focus:ring-[#A86B4C] outline-none transition-all"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-semibold text-[#1C1C1A] uppercase tracking-wider mb-2"
                >
                  Message <span className="text-[#A86B4C]">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  maxLength={3000}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Share details about your inquiry or opportunity..."
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF9F7] border border-[#E2DFD7] text-sm text-[#1C1C1A] placeholder-[#9C9991] focus:bg-white focus:border-[#A86B4C] focus:ring-1 focus:ring-[#A86B4C] outline-none transition-all resize-y"
                />
              </div>

              {/* Status Notice Alerts */}
              {status.type === 'success' && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start gap-3 text-xs leading-relaxed">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>{status.message}</span>
                </div>
              )}

              {status.type === 'notice' && (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 space-y-2 text-xs leading-relaxed">
                  <div className="flex items-start gap-2.5 font-medium">
                    <AlertCircle size={16} className="text-amber-700 shrink-0 mt-0.5" />
                    <span>{status.message}</span>
                  </div>
                  <div className="pt-2">
                    <a
                      href={mailtoFallbackUrl}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-800 text-amber-50 text-xs font-medium hover:bg-amber-900 transition-colors"
                    >
                      <span>Open Pre-filled Email</span>
                      <ArrowUpRight size={13} />
                    </a>
                  </div>
                </div>
              )}

              {status.type === 'error' && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-3 text-xs leading-relaxed">
                  <AlertCircle size={16} className="text-rose-600 shrink-0 mt-0.5" />
                  <span>{status.message}</span>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2 flex items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#1C1C1A] text-[#FAF9F7] text-sm font-medium hover:bg-[#33322E] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1C1C1A]/40"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                <span className="text-[11px] text-[#8A877E]">
                  Responds within 24–48 hours
                </span>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
