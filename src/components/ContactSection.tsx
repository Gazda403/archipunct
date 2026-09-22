"use client";

import { m, Variants } from "framer-motion";

const itemVariants: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: (delay: number) => ({
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 70, damping: 18, delay },
  }),
};

const lineReveal: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { type: "spring", stiffness: 50, damping: 15 },
  },
};

export default function ContactSection() {
  return (
    <m.section
      id="kontakt"
      className="relative w-full bg-[#E2D6CC] text-[#0B0B0B] py-24 md:py-36 px-6 md:px-12 lg:px-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-20">

        {/* Section Header */}
        <div className="relative w-full">
          <m.div
            variants={lineReveal}
            className="h-[1px] bg-[#0B0B0B]/30 mb-6 md:mb-8 origin-left"
          />
          <div className="flex justify-between items-baseline">
            <div className="overflow-hidden pb-2">
              <m.h2
                variants={itemVariants}
                custom={0.1}
                className="text-3xl md:text-5xl lg:text-7xl font-black tracking-tighter uppercase"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                Kontaktirajte Nas
              </m.h2>
            </div>
            <div className="overflow-hidden pb-2">
              <m.span
                variants={itemVariants}
                custom={0.2}
                className="text-4xl md:text-6xl lg:text-8xl font-light tracking-widest"
              >
                05
              </m.span>
            </div>
          </div>
        </div>

        {/* Content Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">

          {/* Left: Big CTA Text & Address */}
          <m.div variants={itemVariants} custom={0.25} className="flex flex-col gap-10">
            <p
              className="text-2xl md:text-3xl lg:text-4xl font-light leading-snug"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Razgovarajmo o Vašem projektu — od koncepta i 3D vizuelizacije do unikatne realizacije.
            </p>
            <div className="flex flex-col gap-4">
              <div>
                <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#0B0B0B]/50 block mb-2">
                  Atelje / Studio
                </span>
                <p className="text-lg font-medium text-[#0B0B0B] leading-relaxed">
                  <span className="font-semibold block text-[#0B0B0B]">ARCHIPUNCT STUDIO</span>
                  Rumenačka 19<br />
                  21000 Novi Sad, Srbija
                </p>
              </div>
              <div className="w-full h-48 md:h-64 rounded-xl overflow-hidden shadow-sm border border-[#0B0B0B]/10">
                <iframe 
                  src="https://maps.google.com/maps?q=Rumena%C4%8Dka+19%2C+Novi+Sad%2C+Srbija&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Archipunct Studio Novi Sad lokacija"
                />
              </div>
            </div>
          </m.div>

          {/* Right: Contact Details */}
          <m.div variants={itemVariants} custom={0.4} className="flex flex-col gap-10">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#0B0B0B]/50">
                Email
              </span>
              <a
                href="mailto:office@archipunct.com"
                className="group inline-flex items-center gap-3 text-[#0B0B0B]"
              >
                <span
                  className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight border-b-2 border-[#0B0B0B] pb-1 group-hover:border-[#c89d4c] group-hover:text-[#c89d4c] transition-all duration-400"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  office@archipunct.com
                </span>
                <span className="text-2xl transition-transform duration-300 group-hover:translate-x-2">→</span>
              </a>
              <span className="text-sm text-[#0B0B0B]/60 mt-1">
                Arhitekta: <a href="mailto:boris@archipunct.com" className="font-medium underline hover:text-[#c89d4c]">boris@archipunct.com</a>
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#0B0B0B]/50">
                Telefon / Viber
              </span>
              <a
                href="tel:+381648032379"
                className="text-xl font-bold text-[#0B0B0B] hover:text-[#c89d4c] transition-colors duration-300"
              >
                +381 64 80 323 79
              </a>
              <span className="text-xs text-[#0B0B0B]/50">Konsultacije i pitanja telefonom, Viberom ili mejlom</span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#0B0B0B]/50">
                Radno Vreme
              </span>
              <p className="text-lg font-medium text-[#0B0B0B] leading-relaxed">
                Pon – Pet: 09:00 – 18:00
              </p>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-8 pt-4 border-t border-[#0B0B0B]/15">
              {[
                { name: "Website", url: "https://archipunct.com" },
                { name: "YouTube", url: "https://youtube.com/@Archipunct" },
                { name: "Viber", url: "viber://chat?number=%2B381648032379" }
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold tracking-[0.2em] uppercase text-[#0B0B0B]/60 hover:text-[#c89d4c] transition-colors duration-300"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </m.div>
        </div>

      </div>
    </m.section>
  );
}
