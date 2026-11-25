import React from 'react';

export default function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  return (
    <div className={`mb-12 md:mb-16 max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <span className="inline-block text-[11px] font-semibold tracking-[0.2em] uppercase text-[#A86B4C] mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#1C1C1A] leading-[1.18] mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-[15px] sm:text-base text-[#64625A] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
