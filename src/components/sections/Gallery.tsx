"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { labels } from "@/config/labels";

/* ─────────────────────────────────────────────────────────────
   Illustrated SVG scenes — drawn in brand palette
   These fill the gallery slots until real photos are supplied.
   ───────────────────────────────────────────────────────────── */

function LoungeSVG() {
  return (
    <svg viewBox="0 0 400 280" className="w-full h-full" aria-label="Common lounge area illustration">
      {/* Background & floor */}
      <rect width={400} height={280} fill="#06080C" />
      <rect y={210} width={400} height={70} fill="#0A0E14" />
      {/* Floor tiles */}
      {[0,1,2,3].map(i => (
        <line key={i} x1={i*100} y1={210} x2={i*100+50} y2={280} stroke="#1060C0" strokeWidth={0.4} opacity={0.25} />
      ))}
      {[0,1,2,3,4].map(i => (
        <line key={i} x1={0} y1={210+i*18} x2={400} y2={210+i*18} stroke="#1060C0" strokeWidth={0.3} opacity={0.15} />
      ))}

      {/* Back wall panels */}
      <rect x={0} y={0} width={45} height={212} fill="#08090F" />
      <rect x={355} y={0} width={45} height={212} fill="#08090F" />

      {/* Ceiling track */}
      <rect x={80} y={18} width={240} height={3} rx={1.5} fill="#1060C0" opacity={0.7} />
      {/* Pendant lights */}
      {[120,200,280].map((cx,i) => (
        <g key={i}>
          <line x1={cx} y1={18} x2={cx} y2={52} stroke="#3078B8" strokeWidth={1.5} />
          <ellipse cx={cx} cy={58} rx={14} ry={8} fill="#0A1830" stroke="#48A0C8" strokeWidth={1} />
          <ellipse cx={cx} cy={58} rx={10} ry={5} fill="#58B0E0" opacity={0.9} />
          {/* Glow */}
          <ellipse cx={cx} cy={80} rx={28} ry={18} fill="#48A0C8" opacity={0.07} />
        </g>
      ))}

      {/* Wall artwork — compass motif */}
      <rect x={288} y={38} width={72} height={58} rx={3} fill="#0A0E14" stroke="#3078B8" strokeWidth={1} />
      <circle cx={324} cy={67} r={20} fill="none" stroke="#48A0C8" strokeWidth={0.8} opacity={0.6} />
      <circle cx={324} cy={67} r={12} fill="none" stroke="#3078B8" strokeWidth={0.6} opacity={0.5} />
      {/* Compass points */}
      <polygon points="324,50 327,63 324,59 321,63" fill="#58B0E0" opacity={0.9} />
      <polygon points="324,84 321,71 324,75 327,71" fill="#3078B8" opacity={0.7} />
      <polygon points="307,67 320,64 316,67 320,70" fill="#3078B8" opacity={0.7} />
      <polygon points="341,67 328,70 332,67 328,64" fill="#58B0E0" opacity={0.9} />

      {/* Sofa */}
      {/* Back */}
      <rect x={62} y={120} width={185} height={42} rx={8} fill="#0A3570" />
      {/* Seat */}
      <rect x={54} y={155} width={200} height={48} rx={8} fill="#0E4090" />
      {/* Left armrest */}
      <rect x={46} y={128} width={22} height={68} rx={6} fill="#0A3060" />
      {/* Right armrest */}
      <rect x={240} y={128} width={22} height={68} rx={6} fill="#0A3060" />
      {/* Cushions on seat */}
      <rect x={60} y={157} width={85} height={38} rx={5} fill="#1060C0" />
      <rect x={152} y={157} width={82} height={38} rx={5} fill="#0A4DB0" />
      {/* Cushion crease lines */}
      <line x1={102} y1={158} x2={100} y2={194} stroke="#0A3070" strokeWidth={1} opacity={0.5} />
      <line x1={193} y1={158} x2={191} y2={194} stroke="#0A3070" strokeWidth={1} opacity={0.5} />
      {/* Back cushions */}
      <rect x={66} y={122} width={80} height={34} rx={5} fill="#1866C8" />
      <rect x={152} y={122} width={78} height={34} rx={5} fill="#1258B8" />
      {/* Throw pillow */}
      <rect x={218} y={134} width={30} height={28} rx={4} fill="#48A0C8" />
      <line x1={218} y1={148} x2={248} y2={148} stroke="#3078B8" strokeWidth={0.8} />
      {/* Sofa legs */}
      {[60,100,200,240].map(x => (
        <rect key={x} x={x} y={200} width={8} height={12} rx={2} fill="#061028" />
      ))}

      {/* Coffee table */}
      <rect x={95} y={196} width={115} height={6} rx={3} fill="#0A0E14" stroke="#3078B8" strokeWidth={1} />
      <rect x={105} y={202} width={4} height={10} fill="#061020" />
      <rect x={200} y={202} width={4} height={10} fill="#061020" />
      {/* Items on table */}
      <rect x={115} y={190} width={30} height={6} rx={1} fill="#1060C0" opacity={0.7} /> {/* book */}
      <circle cx={175} cy={193} r={4} fill="#48A0C8" opacity={0.6} /> {/* cup */}
      <rect x={167} y={193} width={16} height={4} rx={1} fill="#0A2040" stroke="#3078B8" strokeWidth={0.5} />

      {/* Floor plant (right) */}
      <rect x={318} y={178} width={22} height={28} rx={3} fill="#0A1820" stroke="#3078B8" strokeWidth={1} />
      <rect x={321} y={168} width={16} height={12} rx={1} fill="#0A1420" />
      {/* Leaves */}
      {[-12,-8,-4,0,4,8,12].map((dx, i) => (
        <ellipse key={i} cx={329+dx} cy={162-Math.abs(dx)*1.2} rx={8} ry={14} fill="#0A3028"
          transform={`rotate(${dx*5} ${329+dx} ${162-Math.abs(dx)*1.2})`} opacity={0.9} />
      ))}
      <ellipse cx={329} cy={148} rx={5} ry={9} fill="#1A4838" />

      {/* Floor lamp (left) */}
      <rect x={56} y={178} width={6} height={34} rx={2} fill="#0A1428" />
      <ellipse cx={59} cy={178} rx={16} ry={6} fill="#0A1428" stroke="#3078B8" strokeWidth={1} />
      <ellipse cx={59} cy={178} rx={10} ry={3.5} fill="#58B0E0" opacity={0.85} />
      <rect x={52} y={210} width={14} height={4} rx={2} fill="#0A1428" />
      {/* Glow */}
      <ellipse cx={59} cy={188} rx={22} ry={16} fill="#48A0C8" opacity={0.06} />

      {/* Notice board */}
      <rect x={46} y={38} width={64} height={52} rx={2} fill="#0A0C10" stroke="#3078B8" strokeWidth={1} />
      {/* Pin notes */}
      <rect x={50} y={42} width={26} height={16} rx={1} fill="#1060C0" opacity={0.7} />
      <rect x={80} y={42} width={22} height={10} rx={1} fill="#48A0C8" opacity={0.5} />
      <rect x={50} y={62} width={18} height={12} rx={1} fill="#3078B8" opacity={0.6} />
      <rect x={72} y={56} width={32} height={18} rx={1} fill="#1060C0" opacity={0.4} />
      {/* Pin dots */}
      <circle cx={63} cy={43} r={2} fill="#58B0E0" />
      <circle cx={91} cy={43} r={2} fill="#48A0C8" />
    </svg>
  );
}

function KitchenSVG() {
  return (
    <svg viewBox="0 0 400 280" className="w-full h-full" aria-label="Shared kitchen illustration">
      <rect width={400} height={280} fill="#06080C" />
      {/* Floor */}
      <rect y={240} width={400} height={40} fill="#0A0E14" />
      {/* Floor tiles */}
      {[0,1,2,3,4,5].map(i => (
        <rect key={i} x={i*68} y={240} width={66} height={38} fill="none" stroke="#1060C0" strokeWidth={0.4} opacity={0.2} />
      ))}

      {/* Back wall */}
      <rect width={400} height={242} fill="#08090F" />

      {/* Upper cabinets */}
      <rect x={20} y={30} width={360} height={80} rx={4} fill="#0A1428" stroke="#3078B8" strokeWidth={1} />
      {/* Cabinet doors */}
      {[0,1,2,3,4].map(i => (
        <g key={i}>
          <rect x={26+i*72} y={36} width={66} height={68} rx={2} fill="#0D1830" stroke="#3078B8" strokeWidth={0.8} />
          <rect x={26+i*72+4} y={40} width={58} height={60} rx={1} fill="#0A1220" />
          {/* Handle */}
          <rect x={26+i*72+20} y={72} width={26} height={4} rx={2} fill="#48A0C8" opacity={0.7} />
        </g>
      ))}
      {/* Items visible through glass on last cabinet */}
      <rect x={306} y={44} width={12} height={22} rx={2} fill="#1060C0" opacity={0.6} />
      <rect x={322} y={50} width={10} height={16} rx={2} fill="#3078B8" opacity={0.5} />
      <rect x={334} y={46} width={8} height={20} rx={2} fill="#48A0C8" opacity={0.4} />

      {/* Track lighting */}
      <rect x={20} y={18} width={360} height={4} rx={2} fill="#1060C0" opacity={0.6} />
      {[60,140,200,280,340].map(cx => (
        <g key={cx}>
          <circle cx={cx} cy={20} r={5} fill="#58B0E0" opacity={0.9} />
          <circle cx={cx} cy={20} r={12} fill="#48A0C8" opacity={0.06} />
        </g>
      ))}

      {/* Counter */}
      <rect x={20} y={160} width={360} height={12} rx={3} fill="#1060C0" opacity={0.4} />
      <rect x={20} y={172} width={360} height={68} rx={0} fill="#0A1428" />
      {/* Counter edge */}
      <rect x={20} y={158} width={360} height={4} rx={2} fill="#3078B8" opacity={0.5} />

      {/* Cabinet drawers below counter */}
      {[0,1,2,3,4].map(i => (
        <g key={i}>
          <rect x={24+i*72} y={176} width={66} height={60} rx={2} fill="#0D1830" stroke="#3078B8" strokeWidth={0.7} opacity={0.8} />
          <rect x={24+i*72+20} y={202} width={26} height={4} rx={2} fill="#48A0C8" opacity={0.6} />
        </g>
      ))}

      {/* Stove */}
      <rect x={130} y={130} width={140} height={30} rx={4} fill="#0A1020" stroke="#3078B8" strokeWidth={1} />
      {/* Burners */}
      {[150,170,260,280].map(cx => (
        <g key={cx}>
          <circle cx={cx} cy={145} r={12} fill="#08090F" stroke="#48A0C8" strokeWidth={1} />
          <circle cx={cx} cy={145} r={7} fill="#08090F" stroke="#3078B8" strokeWidth={0.8} />
          <circle cx={cx} cy={145} r={3} fill="#1060C0" />
        </g>
      ))}
      {/* Stove knobs */}
      {[145,165,250,270].map(cx => (
        <circle key={cx} cx={cx} cy={160} r={4} fill="#1060C0" stroke="#48A0C8" strokeWidth={0.7} />
      ))}

      {/* Sink */}
      <rect x={310} y={130} width={70} height={30} rx={4} fill="#08090F" stroke="#3078B8" strokeWidth={1} />
      <rect x={315} y={133} width={60} height={22} rx={3} fill="#06080C" />
      {/* Faucet */}
      <rect x={338} y={115} width={4} height={18} rx={2} fill="#48A0C8" opacity={0.8} />
      <rect x={330} y={115} width={20} height={3} rx={1.5} fill="#3078B8" opacity={0.9} />
      {/* Water shimmer */}
      <line x1={340} y1={133} x2={340} y2={155} stroke="#58B0E0" strokeWidth={1} opacity={0.4} />

      {/* Open shelving between cabinets and counter */}
      {/* Shelf 1 */}
      <rect x={20} y={118} width={108} height={4} rx={1} fill="#3078B8" opacity={0.5} />
      {/* Items on shelf */}
      <rect x={25} y={95} width={16} height={24} rx={2} fill="#1060C0" opacity={0.8} /> {/* jar */}
      <rect x={45} y={100} width={12} height={19} rx={2} fill="#3078B8" opacity={0.7} />
      <rect x={60} y={98} width={14} height={21} rx={2} fill="#48A0C8" opacity={0.6} />
      <rect x={78} y={104} width={10} height={15} rx={2} fill="#1060C0" opacity={0.5} />
      <rect x={92} y={96} width={12} height={23} rx={2} fill="#3078B8" opacity={0.8} />
      {/* Jar lids */}
      <rect x={25} y={93} width={16} height={4} rx={1} fill="#3078B8" opacity={0.9} />
      <rect x={45} y={98} width={12} height={4} rx={1} fill="#48A0C8" opacity={0.8} />

      {/* Microwave on right shelf */}
      <rect x={20} y={125} width={108} height={2} fill="#3078B8" opacity={0.3} />

      {/* Backsplash tiles */}
      {[0,1,2].map(row => (
        [0,1,2,3,4,5].map(col => (
          <rect key={`${row}-${col}`} x={20+col*60} y={118+row*14} width={58} height={12}
            fill="none" stroke="#3078B8" strokeWidth={0.4} opacity={0.2} />
        ))
      ))}

      {/* Cutting board and items on counter */}
      <rect x={38} y={148} width={60} height={10} rx={2} fill="#0D1A10" stroke="#3078B8" strokeWidth={0.7} opacity={0.8} />
      <rect x={48} y={144} width={40} height={6} rx={1} fill="#1060C0" opacity={0.5} /> {/* items */}
      {/* Bowl */}
      <ellipse cx={260} cy={153} rx={22} ry={7} fill="#0A1020" stroke="#48A0C8" strokeWidth={1} />
      <ellipse cx={260} cy={150} rx={18} ry={5} fill="#06080C" />
      {/* Fruit in bowl */}
      <circle cx={252} cy={148} r={4} fill="#1060C0" opacity={0.8} />
      <circle cx={262} cy={147} r={4} fill="#3078B8" opacity={0.7} />
      <circle cx={270} cy={149} r={3} fill="#48A0C8" opacity={0.6} />
    </svg>
  );
}

function BunkPodSVG() {
  return (
    <svg viewBox="0 0 400 280" className="w-full h-full" aria-label="Private bunk pod interior illustration">
      <rect width={400} height={280} fill="#06080C" />

      {/* Side panels (pod walls) */}
      <rect x={0} y={0} width={55} height={280} fill="#08090F" />
      <rect x={345} y={0} width={55} height={280} fill="#08090F" />

      {/* Back panel */}
      <rect x={55} y={0} width={290} height={280} fill="#0A0C12" />

      {/* LED strip at top */}
      <rect x={55} y={24} width={290} height={4} rx={2} fill="#48A0C8" opacity={0.9} />
      <rect x={55} y={24} width={290} height={12} rx={2} fill="#48A0C8" opacity={0.08} />

      {/* Ceiling */}
      <rect x={0} y={0} width={400} height={26} fill="#06080C" />

      {/* Mattress */}
      <rect x={55} y={160} width={290} height={80} rx={4} fill="#0D1525" />
      {/* Mattress texture */}
      {[0,1,2,3].map(i => (
        <rect key={i} x={60} y={162+i*19} width={280} height={17} rx={2} fill="#0E1830" opacity={0.5} />
      ))}
      {/* Mattress edge highlight */}
      <rect x={55} y={160} width={290} height={4} rx={2} fill="#3078B8" opacity={0.4} />
      <rect x={55} y={236} width={290} height={4} rx={2} fill="#1060C0" opacity={0.3} />

      {/* Pillow */}
      <rect x={64} y={163} width={95} height={52} rx={8} fill="#E8F0F8" opacity={0.85} />
      {/* Pillow indent */}
      <rect x={72} y={171} width={78} height={36} rx={6} fill="#D0DCF0" opacity={0.5} />

      {/* Blanket / duvet */}
      <rect x={160} y={163} width={178} height={72} rx={6} fill="#1060C0" opacity={0.75} />
      {/* Duvet stitching */}
      {[0,1,2].map(i => (
        <rect key={i} x={170+i*55} y={165} width={48} height={68} rx={4} fill="none" stroke="#3078B8" strokeWidth={1} opacity={0.5} />
      ))}
      {/* Folded duvet top edge */}
      <rect x={160} y={163} width={178} height={18} rx={6} fill="#1A70D0" opacity={0.6} />

      {/* Privacy curtain — partially open */}
      {/* Left curtain panel */}
      <rect x={55} y={30} width={75} height={132} rx={0} fill="#3078B8" opacity={0.5} />
      {/* Curtain folds */}
      {[0,1,2,3].map(i => (
        <rect key={i} x={55+i*18} y={30} width={10} height={132} fill="#1060C0" opacity={0.3} />
      ))}
      {/* Curtain bottom wave */}
      <path d="M55,162 Q65,168 75,162 Q85,156 95,162 Q105,168 115,162 Q122,156 130,162 L130,30 L55,30 Z"
        fill="#2868A8" opacity={0.4} />

      {/* Right curtain panel (mostly open/tied back) */}
      <rect x={330} y={30} width={15} height={90} rx={0} fill="#3078B8" opacity={0.4} />
      {/* Curtain tie */}
      <ellipse cx={330} cy={110} rx={6} ry={14} fill="#48A0C8" opacity={0.5} />
      <rect x={325} y={96} width={12} height={4} rx={2} fill="#58B0E0" opacity={0.6} />

      {/* Curtain track / rod */}
      <rect x={55} y={28} width={290} height={4} rx={2} fill="#48A0C8" opacity={0.5} />
      {/* Track rings */}
      {[0,1,2,3,4,5,6,7].map(i => (
        <circle key={i} cx={60+i*36} cy={30} r={3} fill="#3078B8" opacity={0.7} />
      ))}

      {/* Reading light (right wall) */}
      <rect x={330} y={130} width={14} height={3} rx={1.5} fill="#48A0C8" opacity={0.8} />
      <rect x={344} y={118} width={3} height={15} rx={1.5} fill="#3078B8" opacity={0.7} />
      {/* Lamp head */}
      <ellipse cx={344} cy={116} rx={12} ry={5} fill="#1060C0" stroke="#48A0C8" strokeWidth={1} />
      <ellipse cx={344} cy={116} rx={8} ry={3.5} fill="#58B0E0" opacity={0.95} />
      {/* Light cone */}
      <path d="M332,116 L290,175 L396,175 L356,116 Z" fill="#58B0E0" opacity={0.04} />
      {/* Glow on wall */}
      <ellipse cx={344} cy={130} rx={30} ry={20} fill="#48A0C8" opacity={0.06} />

      {/* Power socket + USB */}
      <rect x={62} y={150} width={32} height={20} rx={3} fill="#0A0C12" stroke="#3078B8" strokeWidth={1} />
      <rect x={66} y={154} width={10} height={7} rx={1} fill="#06080C" stroke="#3078B8" strokeWidth={0.7} />
      <rect x={80} y={154} width={10} height={7} rx={1} fill="#06080C" stroke="#3078B8" strokeWidth={0.7} />
      {/* USB icon hint */}
      <rect x={66} y={163} width={24} height={4} rx={1} fill="#1060C0" opacity={0.5} />

      {/* Phone hanging on hook */}
      <rect x={290} y={130} width={26} height={38} rx={4} fill="#0A0E14" stroke="#48A0C8" strokeWidth={1} />
      <rect x={294} y={134} width={18} height={26} rx={2} fill="#1060C0" opacity={0.6} />
      {/* Screen glow */}
      <rect x={294} y={134} width={18} height={26} rx={2} fill="#48A0C8" opacity={0.15} />
      {/* Hook */}
      <rect x={300} y={125} width={6} height={7} rx={1} fill="#3078B8" opacity={0.8} />
      <path d="M303,126 Q308,122 308,126" fill="none" stroke="#48A0C8" strokeWidth={1.5} strokeLinecap="round" />

      {/* Locker below bed */}
      <rect x={55} y={248} width={140} height={32} rx={3} fill="#0A1020" stroke="#3078B8" strokeWidth={1} />
      <rect x={60} y={252} width={62} height={24} rx={2} fill="#08090F" stroke="#3078B8" strokeWidth={0.7} />
      <rect x={128} y={252} width={62} height={24} rx={2} fill="#08090F" stroke="#3078B8" strokeWidth={0.7} />
      {/* Lock icons */}
      <circle cx={91} cy={262} r={4} fill="#1060C0" stroke="#48A0C8" strokeWidth={0.8} />
      <rect x={88} y={263} width={6} height={5} rx={1} fill="#3078B8" opacity={0.8} />
      <circle cx={159} cy={262} r={4} fill="#1060C0" stroke="#48A0C8" strokeWidth={0.8} />
      <rect x={156} y={263} width={6} height={5} rx={1} fill="#3078B8" opacity={0.8} />

      {/* Small label */}
      <text x={200} y={268} textAnchor="middle" fill="#48A0C8" fontSize={8} opacity={0.5} fontFamily="sans-serif">
        Personal Storage
      </text>

      {/* Ambient glow from LED strip */}
      <rect x={55} y={26} width={290} height={40} fill="url(#ledGlow)" opacity={0.15} />
      <defs>
        <linearGradient id="ledGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#48A0C8" />
          <stop offset="100%" stopColor="#48A0C8" stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   Gallery data
   ───────────────────────────────────────────────────────────── */
const galleryItems = [
  {
    id: 1, src: "/gallery/room-3a.webp", label: "The Voyager — 6-Bed Dorm",
    SVG: null,
  },
  {
    id: 2, src: "/gallery/room-2a.webp", label: "The Navigator — 4-Bed Dorm",
    SVG: null,
  },
  {
    id: 3, src: "/gallery/room-1a.webp", label: "The Explorer — 4-Bed Dorm",
    SVG: null,
  },
  {
    id: 4, src: null, label: "Common Lounge",
    SVG: LoungeSVG,
  },
  {
    id: 5, src: null, label: "Shared Kitchen",
    SVG: KitchenSVG,
  },
  {
    id: 6, src: null, label: "Your Private Pod",
    SVG: BunkPodSVG,
  },
];

export default function Gallery() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  function prev() {
    setLightboxIdx((i) => (i !== null ? (i - 1 + galleryItems.length) % galleryItems.length : 0));
  }
  function next() {
    setLightboxIdx((i) => (i !== null ? (i + 1) % galleryItems.length : 0));
  }

  return (
    <>
      <section id="gallery" className="py-24 px-4 sm:px-6 bg-ink">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 flex flex-col gap-3">
            <p className="text-xs tracking-[0.3em] uppercase text-odyssey-blue font-semibold">
              Look Around
            </p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-ice">
              {labels.gallery.heading}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {galleryItems.map((item, idx) => {
              const IllustrationSVG = item.SVG;
              return (
                <button
                  key={item.id}
                  onClick={() => setLightboxIdx(idx)}
                  className="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-ink hover:ring-2 hover:ring-odyssey-blue/50 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-odyssey-blue"
                  aria-label={`View ${item.label}`}
                >
                  {item.src ? (
                    <Image
                      src={item.src}
                      alt={item.label}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 400px"
                    />
                  ) : IllustrationSVG ? (
                    <div className="w-full h-full group-hover:scale-[1.02] transition-transform duration-500 overflow-hidden">
                      <IllustrationSVG />
                    </div>
                  ) : null}

                  {/* Hover label overlay */}
                  <div className="absolute inset-0 flex items-end p-3 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <span className="text-white text-xs font-medium">{item.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIdx !== null && (() => {
        const item = galleryItems[lightboxIdx];
        const IllustrationSVG = item.SVG;
        return (
          <div
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightboxIdx(null)}
          >
            <div
              className="relative w-full max-w-4xl aspect-[4/3] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {item.src ? (
                <Image src={item.src} alt={item.label} fill className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 900px" />
              ) : IllustrationSVG ? (
                <IllustrationSVG />
              ) : null}
              <div className="absolute bottom-4 left-4 text-white font-medium text-sm bg-black/60 px-4 py-2 rounded-full">
                {item.label}
              </div>
            </div>

            <button onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors" aria-label="Previous">
              <ChevronLeft size={20} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors" aria-label="Next">
              <ChevronRight size={20} />
            </button>
            <button onClick={() => setLightboxIdx(null)}
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors" aria-label="Close">
              <X size={20} />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {galleryItems.map((_, i) => (
                <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === lightboxIdx ? "bg-odyssey-blue" : "bg-white/30"}`} />
              ))}
            </div>
          </div>
        );
      })()}
    </>
  );
}
