import { motion } from 'framer-motion';

export default function AnimAgentFarmer({ activeAgent }: { activeAgent: number }) {
  const crops = [
    { emoji: '🌾', label: 'Wheat', angle: 0 },
    { emoji: '🍚', label: 'Rice', angle: 120 },
    { emoji: '☁️', label: 'Cotton', angle: 240 },
  ];

  return (
    <div className="w-full max-w-[240px] mx-auto aspect-[4/3] bg-transparent relative flex items-center justify-center mb-10">
      <svg className="w-full h-full overflow-visible" viewBox="0 0 200 150">
        <defs>
          <filter id="glowGreen">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Farmer Thinking */}
        <g transform="translate(100, 110)">
          {/* Body sitting cross-legged */}
          <path d="M-20,20 Q0,0 20,20 Z" fill="#334155" />
          <path d="M-15,0 Q-15,-20 0,-30 Q15,-20 15,0 Z" fill="#1e293b" />
          {/* Head */}
          <circle cx="0" cy="-40" r="12" fill="#94a3b8" />
          {/* Thinking Arm */}
          <path d="M-10,-20 Q-25,-10 -15,0" fill="none" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
          <path d="M10,-20 Q20,-20 20,-10 Q10,-5 0,-35" fill="none" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
        </g>

        {/* Orbiting Crops */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "100px 40px" }}
        >
          {crops.map((crop, i) => {
            const isActive = activeAgent === i;
            const x = 100 + Math.cos((crop.angle * Math.PI) / 180) * 50;
            const y = 40 + Math.sin((crop.angle * Math.PI) / 180) * 20;

            return (
              <motion.g
                key={i}
                initial={{ x, y }}
                animate={{ 
                  scale: isActive ? 1.5 : 1,
                  opacity: isActive ? 1 : 0.5
                }}
                transition={{ duration: 0.5 }}
                // Counter-rotate to keep emojis upright
              >
                <motion.g
                  animate={{ rotate: -360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: "0px 0px" }}
                >
                  <circle cx="0" cy="0" r="14" fill={isActive ? 'var(--accent-green-glow)' : 'var(--bg-surface)'} stroke={isActive ? 'var(--accent-green)' : 'var(--border-subtle)'} strokeWidth="1" filter={isActive ? 'url(#glowGreen)' : ''} />
                  <text x="0" y="4" fontSize="14" textAnchor="middle">{crop.emoji}</text>
                </motion.g>
              </motion.g>
            );
          })}
        </motion.g>

      </svg>
    </div>
  );
}