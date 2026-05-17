import { motion } from 'framer-motion';

export default function ImpactBanner() {
  return (
    <div className="w-full aspect-[4/1] md:aspect-[16/4] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-3xl overflow-hidden relative mb-16 flex items-center justify-center">
      {/* Background Sky & Sun */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/40 via-purple-900/20 to-[var(--bg-elevated)]"></div>
      <motion.div 
        animate={{ opacity: [0.6, 0.8, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 right-1/4 w-64 h-64 bg-yellow-500/20 rounded-full blur-[80px]"
      ></motion.div>

      {/* SVG Canvas */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMax slice" viewBox="0 0 1600 400">
        <defs>
          <linearGradient id="fieldGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent-green)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="var(--bg-primary)" stopOpacity="1" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Field Ground */}
        <path d="M0,350 Q400,320 800,340 T1600,350 L1600,400 L0,400 Z" fill="url(#fieldGrad)" />
        <path d="M0,370 Q600,340 1000,360 T1600,370 L1600,400 L0,400 Z" fill="var(--bg-surface)" />

        {/* Tree */}
        <g transform="translate(300, 360)">
          {/* Trunk */}
          <path d="M-10,0 Q-15,-60 -5,-120 L5,-120 Q15,-60 10,0 Z" fill="#2d3748" />
          {/* Leaves */}
          <motion.g 
            animate={{ rotate: [-1, 1, -1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "0px -120px" }}
          >
            <circle cx="0" cy="-140" r="60" fill="var(--bg-elevated)" stroke="var(--border-subtle)" strokeWidth="2" />
            <circle cx="-40" cy="-110" r="40" fill="var(--bg-elevated)" stroke="var(--border-subtle)" strokeWidth="2" />
            <circle cx="40" cy="-110" r="40" fill="var(--bg-elevated)" stroke="var(--border-subtle)" strokeWidth="2" />
          </motion.g>
        </g>

        {/* Farmer */}
        <g transform="translate(380, 350)">
          {/* Body */}
          <path d="M-15,0 Q-15,-30 0,-40 Q15,-30 15,0 Z" fill="#475569" />
          {/* Head */}
          <circle cx="0" cy="-50" r="12" fill="#94a3b8" />
          {/* Arm holding tablet */}
          <path d="M0,-35 Q20,-30 25,-20" fill="none" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
          {/* Tablet */}
          <rect x="20" y="-25" width="8" height="12" rx="2" fill="#1e293b" transform="rotate(15 24 -19)" />
          {/* Tablet Screen Glow */}
          <motion.circle 
            cx="24" cy="-19" r="6" 
            fill="var(--accent-green)" 
            filter="url(#glow)"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </g>

        {/* AI Brain Hologram from Tablet */}
        <motion.g 
          transform="translate(420, 290)"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Connecting Line */}
          <path d="M-16,41 L0,15" stroke="var(--accent-green)" strokeWidth="1" strokeDasharray="2 2" opacity="0.3" />
          
          <motion.path 
            d="M0,-10 C-15,-10 -20,5 -10,15 C-5,20 5,20 10,15 C20,5 15,-10 0,-10 Z M-5,-5 C-10,-5 -10,0 -5,5 M5,-5 C10,-5 10,0 5,5" 
            fill="none" 
            stroke="var(--accent-green)" 
            strokeWidth="2" 
            filter="url(#glow)"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.g>

        {/* Floating Data Bubbles */}
        {[
          { x: 500, y: 250, text: '32% 💧', delay: 0 },
          { x: 580, y: 200, text: '65% 🌧️', delay: 1 },
          { x: 450, y: 150, text: '4.2T 📈', delay: 2 },
          { x: 650, y: 280, text: '12% 🛡️', delay: 1.5 },
        ].map((bubble, i) => (
          <motion.g 
            key={i} 
            transform={`translate(${bubble.x}, ${bubble.y})`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: [0, 1, 1, 0], y: [20, 0, -20, -40] }}
            transition={{ duration: 6, delay: bubble.delay, repeat: Infinity, ease: "linear" }}
          >
            <rect x="-30" y="-15" width="60" height="30" rx="15" fill="var(--bg-surface)" stroke="var(--border-subtle)" strokeWidth="1" />
            <text x="0" y="4" textAnchor="middle" fill="var(--text-primary)" fontSize="12" fontWeight="bold" fontFamily="monospace">
              {bubble.text}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}