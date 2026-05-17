import { motion } from 'framer-motion';

export default function AnimRelievedFarmer() {
  return (
    <div className="relative w-full aspect-square max-w-[300px] mx-auto bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-3xl overflow-hidden flex items-center justify-center">
      <svg className="w-full h-full" viewBox="0 0 200 200">
        <defs>
          <filter id="beamGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Background Lush Ground */}
        <path d="M0,150 Q100,140 200,160 L200,200 L0,200 Z" fill="var(--bg-surface)" />
        <path d="M0,160 Q100,150 200,170 L200,200 L0,200 Z" fill="var(--bg-elevated)" opacity="0.5" />
        
        {/* Farmer Body Silhouette */}
        <g transform="translate(100, 140)">
          <path d="M-20,0 Q-25,-40 0,-60 Q25,-40 20,0 Z" fill="#1e293b" />
          <circle cx="0" cy="-70" r="16" fill="#334155" />
          
          {/* Eyes (Relieved/Happy) */}
          <path d="M-6,-72 Q-4,-74 -2,-72 M6,-72 Q4,-74 2,-72" stroke="#030a06" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M-4,-62 Q0,-58 4,-62" stroke="#030a06" strokeWidth="1.5" fill="none" />
          
          {/* Arm and Tablet */}
          <path d="M-10,-45 Q-20,-20 -5,-15" fill="none" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
          <rect x="-15" y="-20" width="16" height="24" rx="2" fill="#0f172a" transform="rotate(-15 -7 -8)" />
          
          {/* AI Beam from Tablet */}
          <motion.path 
            d="M-5,-10 L-50,-100 L40,-100 Z" 
            fill="var(--accent-green)" 
            opacity="0.1"
            animate={{ opacity: [0.05, 0.15, 0.05] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Glowing Green Tablet Screen */}
          <motion.rect 
            x="-13" y="-18" width="12" height="20" rx="1" fill="var(--accent-green)" 
            transform="rotate(-15 -7 -8)"
            filter="url(#beamGlow)"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* AI Brain Icon on Tablet */}
          <path d="M-10,-12 Q-5,-15 -2,-12 Q-5,-5 -10,-12 Z" fill="#020617" transform="rotate(-15 -7 -8)" opacity="0.6" />
        </g>

        {/* Floating Resolved Icons */}
        {[
          { text: '✅', x: 70, y: 70, delay: 0 },
          { text: '💧', x: 120, y: 50, delay: 1.5 },
          { text: '🌱', x: 60, y: 40, delay: 0.8 },
          { text: '₹', x: 130, y: 80, delay: 2.2 },
          { text: '✅', x: 90, y: 30, delay: 1.2 },
        ].map((item, i) => (
          <motion.text
            key={i}
            x={item.x}
            y={item.y}
            fill="var(--accent-green)"
            fontSize="14"
            initial={{ opacity: 0, y: 10, scale: 0.5 }}
            animate={{ opacity: [0, 1, 1, 0], y: [-10, -30, -50], scale: [0.5, 1.2, 1] }}
            transition={{ duration: 4, delay: item.delay, repeat: Infinity, ease: "easeOut" }}
          >
            {item.text}
          </motion.text>
        ))}
      </svg>
    </div>
  );
}