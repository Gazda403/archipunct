"use client";

import {
  useRef,
  useState,
  useCallback,
  type MouseEvent as ReactMouseEvent,
} from "react";
import Image from "next/image";
import {
  m,
  useMotionValue,
  useSpring,
} from "framer-motion";

// ─── Spring presets ───────────────────────────────────────────────────────────
const SPRING_COPY    = { type: "spring", stiffness: 70,  damping: 14 } as const;
const SPRING_SMOOTH  = { type: "spring", stiffness: 40,  damping: 20 } as const;
const SPRING_SNAPPY  = { type: "spring", stiffness: 180, damping: 22 } as const;

// ─── Stagger helpers ──────────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.5 } },
};

const lineVariants = {
  hidden:  { y: "110%", opacity: 0 },
  visible: { y: "0%",   opacity: 1, transition: SPRING_COPY },
};

const fadeUp = {
  hidden:  { y: 24, opacity: 0 },
  visible: (delay: number) => ({
    y: 0, opacity: 1,
    transition: { ...SPRING_SMOOTH, delay },
  }),
};

// ─── Magnetic CTA Button ──────────────────────────────────────────────────────
function MagneticCTA() {
  const ref = useRef<HTMLButtonElement>(null);
  const [hovered, setHovered] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, SPRING_SNAPPY);
  const sy = useSpring(my, SPRING_SNAPPY);

  const handleMouseMove = useCallback(
    (e: ReactMouseEvent<HTMLButtonElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      mx.set((e.clientX - cx) * 0.38);
      my.set((e.clientY - cy) * 0.38);
    },
    [mx, my]
  );

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  return (
    <m.button
      ref={ref}
      id="cta-pogledajte"
      aria-label="Pogledajte naše projekte"
      style={{ x: sx, y: sy }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative overflow-hidden rounded-full bg-[#f5f4f0] px-8 py-3.5 text-[11px] font-semibold tracking-[0.18em] uppercase text-[#0a0a0a] select-none cursor-none transform-gpu will-change-transform"
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ ...SPRING_SMOOTH, delay: 1.3 }}
      whileTap={{ scale: 0.96 }}
    >
      {/* Sliding hover fill */}
      <m.span
        className="absolute inset-0 rounded-full bg-[#c89d4c] origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.42, ease: [0.4, 0, 0.2, 1] }}
      />
      <span
        className={`relative z-10 flex items-center gap-2 transition-colors duration-300 ${
          hovered ? "text-[#0a0a0a] font-bold" : "text-[#0a0a0a]"
        }`}
      >
        Pogledajte projekte
        <m.span
          animate={{ x: hovered ? 4 : 0 }}
          transition={SPRING_SNAPPY}
          aria-hidden="true"
        >
          →
        </m.span>
      </span>
    </m.button>
  );
}

// ─── Main Hero Section ────────────────────────────────────────────────────────
export default function HeroSection() {

  return (
    <section
      id="hero"
      aria-label="Archipunct Studio — Naslovna sekcija"
      className="relative w-full h-screen min-h-[640px] max-h-[1200px] overflow-hidden bg-[#0a0a0a]"
    >
      {/* ── NOISE TEXTURE OVERLAY ──────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="noise-overlay absolute inset-0 z-50 pointer-events-none opacity-40"
      />

      {/* ═══════════════════════════════════════════════════════════════════════
          Z-0 ── BACKGROUND LAYER: Full architectural photo with twilight sky
      ════════════════════════════════════════════════════════════════════════ */}
      <m.div
        aria-hidden="true"
        className="absolute inset-0 z-0 transform-gpu"
        initial={{ scale: 1.06, opacity: 0 }}
        animate={{ scale: 1,    opacity: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* ── Mobile / Tablet image ── */}
        <Image
          src="/images/archipunct/3web-1-1245x700.jpg"
          alt="Archipunct Studio — autorski dizajn enterijera i arhitektura"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center block lg:hidden"
          quality={92}
        />
        {/* ── Desktop / Laptop image ── */}
        <Image
          src="/images/archipunct/3web-1.jpg"
          alt="Archipunct Studio — autorski dizajn enterijera i arhitektura"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center hidden lg:block"
          quality={92}
        />
        {/* Subtle vignette — darkens edges without killing the sky */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/60 via-transparent to-transparent" />
      </m.div>

      {/* ═══════════════════════════════════════════════════════════════════════
          Z-10 ── Brand Typography:
                  Desktop / Laptop: "ARCHIPUNCT" display
                  Mobile / Tablet: "ARCHIPUNCT" overlay with studio tagline
      ════════════════════════════════════════════════════════════════════════ */}

      {/* ARCHIPUNCT — PC / Laptop only */}
      <m.div
        aria-hidden="true"
        className="absolute inset-x-0 z-10 hidden lg:flex items-center justify-center pointer-events-none select-none transform-gpu"
        style={{ top: "37%" }}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 0.28, y: 0 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      >
        <h2
          className="text-white leading-none select-none whitespace-nowrap uppercase"
          style={{
            fontFamily: "var(--font-chakra), sans-serif",
            fontWeight: 700,
            fontSize: "clamp(2rem, 6.2vw, 7.5rem)",
            letterSpacing: "0.38em",
            textShadow: "0 0 50px rgba(0,0,0,0.5)",
          }}
        >
          archipunct
        </h2>
      </m.div>

      {/* ARCHIPUNCT — Mobile / Tablet overlay */}
      <m.div
        aria-hidden="true"
        className="absolute inset-x-0 z-10 flex lg:hidden flex-col items-center justify-center pointer-events-none select-none transform-gpu px-4"
        style={{ top: "18%" }}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      >
        <h2
          className="text-white leading-none select-none whitespace-nowrap uppercase text-center"
          style={{
            fontFamily: "var(--font-chakra), sans-serif",
            fontWeight: 700,
            fontSize: "clamp(2.5rem, 12vw, 5.5rem)",
            letterSpacing: "0.08em",
            textShadow: "0 4px 30px rgba(0,0,0,0.7)",
          }}
        >
          ARCHIPUNCT
        </h2>
        <p
          className="text-[#c89d4c] uppercase tracking-[0.38em] font-medium mt-3 whitespace-nowrap text-center"
          style={{
            fontFamily: "var(--font-chakra), sans-serif",
            fontSize: "clamp(0.8rem, 3.5vw, 1.1rem)",
          }}
        >
          ARHITEKTURA &bull; ENTERIJERI &bull; PEJZAŽ
        </p>
      </m.div>

      {/* ═══════════════════════════════════════════════════════════════════════
          Z-30 ── FOREGROUND EDITORIAL ELEMENTS
      ════════════════════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-30 pointer-events-none">

        {/* ── "ARCHIPUNCT" secondary brand word ─────────────────────────────── */}
        <m.p
          aria-hidden="true"
          className="absolute pointer-events-none select-none font-light tracking-[0.38em] text-[#f5f4f0]/50 uppercase"
          style={{
            fontSize: "clamp(0.6rem, 1.1vw, 1rem)",
            right: "clamp(1.5rem, 5vw, 5rem)",
            top: "50%",
            writingMode: "vertical-rl",
            transform: "translateY(-50%) rotate(180deg)",
          }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...SPRING_SMOOTH, delay: 1.0 }}
        >
          ARCHIPUNCT
        </m.p>

        {/* ── Horizontal rule accent ───────────────────────────────────────── */}
        <m.div
          aria-hidden="true"
          className="absolute bottom-[clamp(8rem,14vh,12rem)] left-[clamp(1.5rem,5vw,5rem)] w-10 h-px bg-[#c89d4c]"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.9 }}
          style={{ transformOrigin: "left" }}
        />

        {/* ── Bottom-left editorial block ──────────────────────────────────── */}
        <m.div
          className="absolute pointer-events-auto"
          style={{
            bottom: "clamp(3rem, 7vh, 6rem)",
            left: "clamp(1.5rem, 5vw, 5rem)",
            maxWidth: "clamp(260px, 34vw, 520px)",
          }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Tagline — split-line masking reveal */}
          <div aria-label="ARHITEKTONSKO PROJEKTOVANJE I DIZAJN ENTERIJERA">
            {[
              "ARHITEKTONSKO PROJEKTOVANJE",
              "DIZAJN ENTERIJERA & PEJZAŽ",
              "BORIS DAČIĆ · NOVI SAD",
            ].map((line) => (
              <div key={line} className="clip-text overflow-hidden">
                <m.span
                  variants={lineVariants}
                  className="block text-[#f5f4f0] font-bold uppercase leading-[1.15]"
                  style={{ fontSize: "clamp(0.7rem, 1.3vw, 1.1rem)", letterSpacing: "0.06em" }}
                >
                  {line}
                </m.span>
              </div>
            ))}
          </div>

          {/* CTA — pointer events enabled */}
          <div className="mt-6 pointer-events-auto">
            <MagneticCTA />
          </div>
        </m.div>

        {/* ── Bottom-right stat widget ─────────────────────────────────────── */}
        <m.div
          className="absolute text-right"
          style={{
            bottom: "clamp(3rem, 7vh, 6rem)",
            right: "clamp(1.5rem, 5vw, 5rem)",
          }}
          custom={1.1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <p
            className="text-[#f5f4f0]/70 font-mono uppercase leading-relaxed"
            style={{ fontSize: "clamp(0.58rem, 0.75vw, 0.76rem)", letterSpacing: "0.18em" }}
          >
            Master inž. arh. Boris Dačić
            <br />
            <span className="text-[#c89d4c]">Rumenačka 19 · Novi Sad</span>
          </p>
        </m.div>

        {/* ── Top-right corner compass / indicator ────────────────────────── */}
        <m.div
          aria-hidden="true"
          className="absolute top-[90px] right-[clamp(1.5rem,5vw,5rem)] flex flex-col items-center gap-1.5"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING_SMOOTH, delay: 1.4 }}
        >
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-[#c89d4c]" />
          <span
            className="font-mono text-[#c89d4c] uppercase text-[10px]"
            style={{ letterSpacing: "0.25em" }}
          >
            ARCHIPUNCT
          </span>
        </m.div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          Z-40 ── BOTTOM SCROLL INDICATOR
      ════════════════════════════════════════════════════════════════════════ */}
      <m.div
        aria-label="Skrolujte nadole"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
      >
        <span
          className="font-mono text-[#f5f4f0]/25 uppercase"
          style={{ fontSize: "0.5rem", letterSpacing: "0.3em" }}
        >
          Scroll
        </span>
        <m.div
          className="w-px bg-[#f5f4f0]/20"
          style={{ transformOrigin: "top", height: 32 }}
          animate={{ scaleY: [1, 0.4, 1], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </m.div>
    </section>
  );
}
