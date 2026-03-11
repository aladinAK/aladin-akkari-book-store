"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { BookOpen, ChevronDown, ExternalLink, Mail, Instagram } from "lucide-react";

// ─── Particles ────────────────────────────────────────────────────────────────

function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -(Math.random() * 0.5 + 0.15),
      r: Math.random() * 1.8 + 0.6,
      opacity: Math.random() * 0.45 + 0.15,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -4) { p.y = canvas.height + 4; p.x = Math.random() * canvas.width; }
        if (p.x < -4) p.x = canvas.width + 4;
        if (p.x > canvas.width + 4) p.x = -4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(196,30,58,${p.opacity})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeIn = {
  hidden: { opacity: 0, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

// ─── Utility: Section Wrapper ─────────────────────────────────────────────────

function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={stagger}
      className={`relative px-6 md:px-12 lg:px-24 ${className}`}
    >
      {children}
    </motion.section>
  );
}

// ─── Geometric Decorations ────────────────────────────────────────────────────

function SwordLine({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 2 200"
      className={`w-px ${className}`}
      preserveAspectRatio="none"
    >
      <line
        x1="1"
        y1="0"
        x2="1"
        y2="200"
        stroke="rgba(139,26,26,0.5)"
        strokeWidth="0.5"
      />
    </svg>
  );
}

function DiamondSeparator() {
  return (
    <div className="flex items-center gap-4 my-16">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-ruby/40" />
      <svg viewBox="0 0 20 20" className="w-3 h-3 flex-shrink-0">
        <polygon
          points="10,0 20,10 10,20 0,10"
          fill="none"
          stroke="rgba(196,30,58,0.7)"
          strokeWidth="0.5"
        />
      </svg>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-ruby/40" />
    </div>
  );
}

function GeometricOrb({
  size = 300,
  x = 0,
  y = 0,
  opacity = 0.15,
}: {
  size?: number;
  x?: number | string;
  y?: number | string;
  opacity?: number;
}) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{ left: x, top: y, width: size, height: size }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle
          cx="50"
          cy="50"
          r="49"
          fill="none"
          stroke={`rgba(139,26,26,${opacity})`}
          strokeWidth="0.3"
        />
        <circle
          cx="50"
          cy="50"
          r="35"
          fill="none"
          stroke={`rgba(139,26,26,${opacity * 0.6})`}
          strokeWidth="0.3"
        />
        <line
          x1="1"
          y1="50"
          x2="99"
          y2="50"
          stroke={`rgba(139,26,26,${opacity * 0.4})`}
          strokeWidth="0.3"
        />
        <line
          x1="50"
          y1="1"
          x2="50"
          y2="99"
          stroke={`rgba(139,26,26,${opacity * 0.4})`}
          strokeWidth="0.3"
        />
      </svg>
    </div>
  );
}

// ─── Sword Icon (fineline) ────────────────────────────────────────────────────

function SwordIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 46" className={className} fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Blade tip */}
      <path d="M 6 0 L 7.8 9 L 6 7 L 4.2 9 Z" fill="currentColor" />
      {/* Blade */}
      <line x1="6" y1="7" x2="6" y2="30" stroke="currentColor" strokeWidth="0.65" />
      {/* Crossguard */}
      <path d="M 0.5 30 C 3 29 9 29 11.5 30" stroke="currentColor" strokeWidth="0.75" fill="none" />
      {/* Grip */}
      <line x1="6" y1="31" x2="6" y2="39" stroke="currentColor" strokeWidth="1" />
      {/* Pommel */}
      <polygon points="6,41 9,43.5 6,46 3,43.5" fill="none" stroke="currentColor" strokeWidth="0.65" />
    </svg>
  );
}

// ─── Navigation ───────────────────────────────────────────────────────────────



// ─── Hero Section ─────────────────────────────────────────────────────────────

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -80]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background orbs */}
      <GeometricOrb size={600} x={-200} y={-100} opacity={0.12} />
      <GeometricOrb size={400} x="calc(100% - 200px)" y={200} opacity={0.08} />

      {/* Vertical sword line */}
      <div className="absolute left-1/2 top-0 h-[15vh] w-px bg-gradient-to-b from-transparent to-ruby/60" />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center max-w-5xl mx-auto px-6 pb-28"
      >
        {/* Pre-title */}
        <motion.p
          variants={fadeIn}
          className="text-xs tracking-[0.5em] text-ruby-bright mb-8 font-sans font-light"
        >
          ALADIN AKKARI · DARK FANTASY
        </motion.p>

        {/* Main title */}
        <motion.h1
          variants={fadeUp}
          className="font-serif text-center font-black leading-[0.85] text-parchment mb-6"
          style={{ fontSize: "clamp(4rem, 8vw, 7rem)" }}
        >
          LES
          <br />
          <span className="italic text-ruby-bright ruby-glow-text">CHRONIQUES</span>
          <br />
          DE JEZ
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          className="font-serif italic text-steel-mist text-lg md:text-2xl mt-8 mb-12 leading-relaxed"
        >
          Une épopée de guerre, de secrets
          <br className="hidden md:block" /> et de destinée brisée.
        </motion.p>

        {/* CTA */}
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="https://www.amazon.ca/Aladin-Akkari-ebook/dp/B0G3XJ9QHV/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ruby text-sm tracking-[0.3em] px-10 py-4 text-ruby-bright font-sans"
          >
            <span className="flex items-center gap-3">
              <BookOpen size={14} />
              LIRE LE TOME I
            </span>
          </a>
          <a
            href="#les-tomes"
            className="text-xs tracking-[0.3em] text-steel-mist hover:text-parchment transition-colors duration-300 font-sans border-b border-steel/40 pb-0.5"
          >
            DÉCOUVRIR LA SAGA
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.4em] text-steel font-sans">DÉROULER</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={14} className="text-steel" />
        </motion.div>
      </motion.div>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ruby/20 to-transparent" />
    </section>
  );
}

// ─── Les Tomes Section ────────────────────────────────────────────────────────

const tomes = [
  {
    number: "I",
    title: "L'Épée de la\nDernière Chance",
    resume:
      "Jez, un petit voleur sans histoire, dérobe une épée légendaire et se retrouve plongé malgré lui dans un complot qui le dépasse. Jeté en prison avec Marv, un guerrier brutal, l'arme semble posséder une volonté propre.",
    status: "Disponible",
    link: "https://www.amazon.ca/Aladin-Akkari-ebook/dp/B0G3XJ9QHV/",
  },
  {
    number: "II",
    title: "L'Épée des\nTrois Serments",
    resume:
      "En fuite à travers le royaume, Jez découvre que l'épée l'entraîne vers un destin royal dont il ne veut pas. Il s'allie avec Oslo, un capitaine déchu, alors que les flammes de la rébellion embrasent le pays.",
    status: "Disponible",
    link: "https://www.amazon.ca/-/fr/Aladin-Akkari-ebook/dp/B0GCK5T59R",
  },
  {
    number: "III",
    title: "L'Épée des\nMensonges Tissés",
    resume:
      "Le voyage mène le trio jusqu'à la cité d'Ara où les vérités éclatent : l'épée est le fruit d'un pacte démoniaque avec les dieux de la Mort. Jez doit accepter de devenir l'héritier d'une malédiction.",
    status: "Disponible",
    link: "https://www.amazon.ca/-/fr/Aladin-Akkari-ebook/dp/B0GRC8PPGC",
  },
  {
    number: "IV",
    title: "L'Épée des\nHéritages Brisés",
    resume:
      "Jez mène une guérilla sanglante contre l'usurpateur Elias, mais découvre avec horreur ses véritables origines. Choisir entre le pouvoir de l'épée démoniaque et son humanité — chaque victoire a un prix tragique.",
    status: "En préparation",
    link: null,
  },
];

function TomeCard({ tome, index }: { tome: (typeof tomes)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const isPrep = tome.status === "En préparation";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.9, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className={`tome-card relative flex flex-col p-8 md:p-10 ${isPrep ? "opacity-60" : ""}`}
      style={{
        border: "0.5px solid rgba(106,106,106,0.2)",
        background: "rgba(17,17,17,0.6)",
      }}
    >
      {/* Roman numeral */}
      <span
        className="absolute top-6 right-8 font-serif font-black text-6xl leading-none select-none pointer-events-none"
        style={{ color: "rgba(139,26,26,0.12)" }}
      >
        {tome.number}
      </span>

      {/* Status */}
      <span
        className={`text-[10px] tracking-[0.4em] font-sans mb-6 ${isPrep ? "text-steel" : "text-ruby-bright"}`}
      >
        {tome.status.toUpperCase()}
      </span>

      {/* Title */}
      <h3
        className="font-serif font-bold text-parchment mb-5 leading-tight"
        style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", whiteSpace: "pre-line" }}
      >
        {tome.title}
      </h3>

      {/* Fine separator */}
      <div className="w-8 h-px bg-ruby/50 mb-5" />

      {/* Summary */}
      <p className="font-sans text-sm leading-relaxed text-steel-mist flex-1">
        {tome.resume}
      </p>

      {/* Link */}
      {!isPrep && tome.link && (
        <a
          href={tome.link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ruby mt-8 inline-flex items-center gap-2 text-xs tracking-[0.25em] px-6 py-3 text-ruby-bright self-start"
        >
          <span className="flex items-center gap-2">
            <ExternalLink size={11} />
            AMAZON
          </span>
        </a>
      )}
      {isPrep && (
        <span className="mt-8 text-xs tracking-[0.25em] text-steel font-sans border border-steel/30 px-6 py-3 self-start inline-block">
          BIENTÔT
        </span>
      )}
    </motion.div>
  );
}

function LesTomes() {
  return (
    <Section id="les-tomes" className="py-32">
      <motion.div variants={fadeUp} className="mb-16">
        <p className="text-xs tracking-[0.5em] text-ruby-bright mb-4 font-sans">LA SAGA</p>
        <h2
          className="font-serif font-black text-parchment leading-none"
          style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
        >
          LES QUATRE
          <br />
          <span className="italic text-steel-mist">TOMES</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-steel/10">
        {tomes.map((tome, i) => (
          <TomeCard key={tome.number} tome={tome} index={i} />
        ))}
      </div>
    </Section>
  );
}

// ─── L'Univers Section ────────────────────────────────────────────────────────

function LUnivers() {
  return (
    <Section id="lunivers" className="py-32">
      <DiamondSeparator />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Text */}
        <div>
          <motion.p variants={fadeIn} className="text-xs tracking-[0.5em] text-ruby-bright mb-4 font-sans">
            L'UNIVERS
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-serif font-black text-parchment leading-tight mb-8"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            AROS
            <br />
            <span className="italic text-steel-mist">&amp; LETHRA</span>
          </motion.h2>

          <motion.div variants={fadeUp} className="space-y-5 text-steel-mist font-sans leading-relaxed">
            <p>
              Un continent partagé entre deux royaumes rivaux : <span className="text-parchment">Aros</span> et{" "}
              <span className="text-parchment">Lethra</span>. Des terres nées dans le sang et marquées par des
              guerres que les chroniqueurs peinent à dater.
            </p>
            <p>
              Dans ce monde médiéval-fantastique, la magie n'est pas spectacle — elle est{" "}
              <span className="text-parchment italic">pacte</span>, dette et malédiction. Les dieux de la Mort
              tendent des pièges aux vivants, et les épées légendaires ne sont jamais de simples armes.
            </p>
            <p>
              Ici, les monstres marins rôdent dans les détroits, les démons concluent des marchés éternels,
              et la boue des champs de bataille avale autant de héros que de lâches. L'honneur se paie en
              sang. La trahison, en âmes.
            </p>
          </motion.div>
        </div>

        {/* Geometric map illustration */}
        <motion.div variants={fadeIn} className="relative flex justify-center items-center">
          <svg viewBox="0 0 400 400" className="w-full max-w-md" style={{ opacity: 0.7 }}>
            {/* Outer frame */}
            <rect x="10" y="10" width="380" height="380" fill="none" stroke="rgba(139,26,26,0.3)" strokeWidth="0.5" />
            <rect x="20" y="20" width="360" height="360" fill="none" stroke="rgba(106,106,106,0.2)" strokeWidth="0.3" />

            {/* Continental divider — the divide between Aros and Lethra */}
            <path
              d="M 200 30 C 180 100, 220 150, 190 200 C 160 250, 210 300, 200 370"
              fill="none"
              stroke="rgba(139,26,26,0.5)"
              strokeWidth="0.8"
              strokeDasharray="4 3"
            />

            {/* AROS label zone */}
            <text x="90" y="180" fontFamily="serif" fontSize="28" fill="rgba(212,201,176,0.15)" fontWeight="900">AROS</text>

            {/* LETHRA label zone */}
            <text x="220" y="220" fontFamily="serif" fontSize="22" fill="rgba(212,201,176,0.15)" fontWeight="900" fontStyle="italic">LETHRA</text>

            {/* City markers */}
            

            {/* Sword silhouette (abstract) — vertical center */}
            <line x1="200" y1="30" x2="200" y2="370" stroke="rgba(196,30,58,0.08)" strokeWidth="2" />

            {/* Compass rose */}
            <g transform="translate(355, 45)">
              <line x1="0" y1="-15" x2="0" y2="15" stroke="rgba(106,106,106,0.4)" strokeWidth="0.5" />
              <line x1="-15" y1="0" x2="15" y2="0" stroke="rgba(106,106,106,0.4)" strokeWidth="0.5" />
              <text x="-3" y="-18" fontFamily="sans-serif" fontSize="6" fill="rgba(212,201,176,0.5)">N</text>
            </g>

            {/* Corner ornaments */}
            {[[10, 10], [390, 10], [10, 390], [390, 390]].map(([cx, cy], i) => (
              <g key={i}>
                <polygon
                  points={`${cx},${cy - 8} ${cx + 8},${cy} ${cx},${cy + 8} ${cx - 8},${cy}`}
                  fill="none"
                  stroke="rgba(139,26,26,0.4)"
                  strokeWidth="0.5"
                />
              </g>
            ))}
          </svg>
        </motion.div>
      </div>

      <DiamondSeparator />
    </Section>
  );
}

// ─── Personnages Section ──────────────────────────────────────────────────────

const personnages = [
  {
    initial: "J",
    name: "Jez",
    role: "L'Héritier Maudit",
    desc: "Un voleur des bas-fonds qui n'avait rien à perdre — jusqu'au jour où il touche quelque chose qu'il n'aurait pas dû. Depuis, chaque pas le rapproche d'un destin qu'il refuse, et d'une version de lui-même qu'il ne reconnaît plus.",
    color: "rgba(196,30,58,0.08)",
  },
  {
    initial: "M",
    name: "Marv",
    role: "Le Colosse Silencieux",
    desc: "Il parle peu. Il frappe fort. Derrière la masse et le silence se cache un homme qui a déjà tout donné une fois — et qui ne sait pas s'il lui reste assez pour recommencer.",
    color: "rgba(106,106,106,0.06)",
  },
  {
    initial: "O",
    name: "Oslo",
    role: "Le Capitaine Déchu",
    desc: "Il a servi, obéi, cru. Puis il a fait un choix que personne ne lui pardonnera — pas même lui. Ce qui lui reste, c'est un sens aigu de la stratégie et une dette impossible à solder.",
    color: "rgba(106,106,106,0.06)",
  },
  {
    initial: "E",
    name: "Elias",
    role: "L'Usurpateur",
    desc: "Il gouverne avec méthode, sans état d'âme apparent. Ceux qui l'ont sous-estimé ne sont plus là pour en parler. Comprendre ses motivations, c'est commencer à douter de qui est vraiment l'ennemi.",
    color: "rgba(139,26,26,0.04)",
  },
  {
    initial: "A",
    name: "Ava",
    role: "La Survivante",
    desc: "Les grandes guerres ont des noms gravés dans la pierre — rarement ceux des gens comme elle. Pourtant Ava est toujours là, debout, quand les autres sont tombés. Ce n'est pas un hasard.",
    color: "rgba(106,106,106,0.06)",
  },
];

function PersonnageCard({
  p,
  index,
}: {
  p: (typeof personnages)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30, filter: "blur(6px)" }}
      animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col p-8 overflow-hidden group"
      style={{
        border: "0.5px solid rgba(106,106,106,0.18)",
        background: p.color,
      }}
    >
      {/* Giant background initial */}
      <span
        className="absolute -bottom-4 -right-4 font-serif font-black leading-none select-none pointer-events-none transition-transform duration-700 group-hover:scale-110"
        style={{
          fontSize: "8rem",
          color: "rgba(212,201,176,0.04)",
          lineHeight: 1,
        }}
      >
        {p.initial}
      </span>

      {/* Content */}
      <span className="text-[10px] tracking-[0.4em] text-ruby-bright font-sans mb-3">
        {p.role.toUpperCase()}
      </span>
      <h3 className="font-serif font-bold text-parchment text-3xl mb-4">{p.name}</h3>
      <div className="w-6 h-px bg-ruby/40 mb-4" />
      <p className="font-sans text-sm text-steel-mist leading-relaxed relative z-10">
        {p.desc}
      </p>
    </motion.div>
  );
}

function LesPersonnages() {
  return (
    <Section id="personnages" className="py-32">
      <motion.div variants={fadeUp} className="mb-16">
        <p className="text-xs tracking-[0.5em] text-ruby-bright mb-4 font-sans">LE BESTIAIRE HUMAIN</p>
        <h2
          className="font-serif font-black text-parchment leading-none"
          style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
        >
          CEUX QUI
          <br />
          <span className="italic text-steel-mist">SAIGNENT</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-steel/10">
        {personnages.map((p, i) => (
          <PersonnageCard key={p.name} p={p} index={i} />
        ))}
      </div>
    </Section>
  );
}

// ─── L'Auteur Section ─────────────────────────────────────────────────────────

function LAuteur() {
  return (
    <Section id="lauteur" className="py-32">
      <DiamondSeparator />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Visual element */}
        <motion.div variants={fadeIn} className="relative flex justify-center order-2 lg:order-1">
          <div
            className="relative w-64 h-64 flex items-center justify-center"
            style={{ border: "0.5px solid rgba(106,106,106,0.2)" }}
          >
            {/* Corner marks */}
            {["-top-1 -left-1", "-top-1 -right-1", "-bottom-1 -left-1", "-bottom-1 -right-1"].map((pos, i) => (
              <div
                key={i}
                className={`absolute ${pos} w-4 h-4`}
                style={{
                  borderTop: i < 2 ? "0.5px solid rgba(196,30,58,0.6)" : "none",
                  borderBottom: i >= 2 ? "0.5px solid rgba(196,30,58,0.6)" : "none",
                  borderLeft: i % 2 === 0 ? "0.5px solid rgba(196,30,58,0.6)" : "none",
                  borderRight: i % 2 !== 0 ? "0.5px solid rgba(196,30,58,0.6)" : "none",
                }}
              />
            ))}

            {/* Stylized initials */}
            <div className="text-center">
              <p
                className="font-serif font-black text-parchment leading-none"
                style={{ fontSize: "5rem", opacity: 0.15 }}
              >
                AA
              </p>
              <p className="text-xs tracking-[0.4em] text-ruby-bright font-sans mt-2">AUTEUR</p>
            </div>

            {/* Decorative circles */}
            <div
              className="absolute inset-4"
              style={{ border: "0.5px solid rgba(139,26,26,0.15)", borderRadius: "50%" }}
            />
          </div>
        </motion.div>

        {/* Text */}
        <div className="order-1 lg:order-2">
          <motion.p variants={fadeIn} className="text-xs tracking-[0.5em] text-ruby-bright mb-4 font-sans">
            L'AUTEUR
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-serif font-black text-parchment leading-tight mb-8"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
          >
            ALADIN
            <br />
            <span className="italic text-steel-mist">AKKARI</span>
          </motion.h2>

          <motion.div variants={fadeUp} className="space-y-5 text-steel-mist font-sans leading-relaxed">
            <p>
              Auteur passionné et autodidacte, Aladin Akkari a commencé l'écriture des{" "}
              <span className="text-parchment italic">Chroniques de Jez</span> en apprenant "sur le tas". Ce qui
              n'était au départ qu'une simple passion est devenu une saga épique complète de quatre tomes.
            </p>
            <p>
              Dans ses récits, il explore l'évolution humaine face à l'adversité et au poids du destin, avec
              une volonté de{" "}
              <span className="text-parchment">réalisme émotionnel</span> au sein d'un univers fantastique
              impitoyable — où chaque choix laisse une cicatrice.
            </p>
            <p className="text-steel/70 text-xs italic">
              "L'héroïsme n'est pas l'absence de peur. C'est de savoir ce qu'on perd avant de choisir."
            </p>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="relative px-6 md:px-12 lg:px-24">
      <div className="h-px bg-gradient-to-r from-transparent via-ruby/20 to-transparent mb-5" />

      <div className="flex flex-col md:flex-row items-center justify-between gap-8">

        <div className="flex items-center gap-6">
          <a
            href="mailto:aladinakkari22@gmail.com"
            className="text-steel hover:text-ruby-bright transition-colors duration-300"
            aria-label="Contact"
          >
            <Mail size={16} />
          </a>
          
          <a
            href="https://www.amazon.ca/Aladin-Akkari-ebook/dp/B0G3XJ9QHV/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-steel hover:text-ruby-bright transition-colors duration-300"
            aria-label="Amazon"
          >
            <BookOpen size={16} />
          </a>
        </div>

        <p className="text-xs text-steel/50 font-sans tracking-[0.15em]">
          © {new Date().getFullYear()} ALADIN AKKARI
        </p>
      </div>

      {/* Bottom geometric accent */}
      <div className="mt-12 flex justify-center">
        <svg viewBox="0 0 120 20" className="w-32 h-5 opacity-30">
          <line x1="0" y1="10" x2="50" y2="10" stroke="rgba(139,26,26,0.5)" strokeWidth="0.5" />
          <polygon points="60,2 68,10 60,18 52,10" fill="none" stroke="rgba(139,26,26,0.5)" strokeWidth="0.5" />
          <line x1="70" y1="10" x2="120" y2="10" stroke="rgba(139,26,26,0.5)" strokeWidth="0.5" />
        </svg>
      </div>
    </footer>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Page() {
  return (
    <>
      <Particles />
      <main>
        <Hero />
        <LesTomes />
        <LUnivers />
        <LesPersonnages />
        <LAuteur />
      </main>
      <Footer />
    </>
  );
}
