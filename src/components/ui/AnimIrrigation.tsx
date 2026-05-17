import { motion } from 'framer-motion';

export default function AnimIrrigation() {
  return (
    <div className="w-full h-32 bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-subtle)] overflow-hidden relative mb-4">
      <svg className="w-full h-full" viewBox="0 0 200 100">
        {/* Sky */}
        <rect width="200" height="100" fill="#0f172a" />
        
        {/* Ground transitioning from brown to green */}
        <motion.path 
          d="M0,60 Q100,50 200,60 L200,100 L0,100 Z" 
          animate={{ fill: ['#78350f', '#78350f', '#166534', '#166534', '#78350f'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Cracks in dry earth */}
        <motion.g
          animate={{ opacity: [1, 1, 0, 0, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M40,70 L50,80 L45,90 M150,75 L140,85 L160,95" stroke="#451a03" strokeWidth="1.5" fill="none" />
        </motion.g>

        {/* Crops growing */}
        <motion.g
          animate={{ scaleY: [0.2, 0.2, 1, 1, 0.2], opacity: [0, 0, 1, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "0px 60px" }}
        >
          <path d="M50,65 Q50,40 40,30 M50,65 Q50,40 60,30" stroke="#4ade80" strokeWidth="2" fill="none" />
          <path d="M150,65 Q150,40 140,30 M150,65 Q150,40 160,30" stroke="#4ade80" strokeWidth="2" fill="none" />
        </motion.g>

        {/* Water Drops */}
        {[
          { x: 50, delay: 0.5 },
          { x: 100, delay: 0.7 },
          { x: 150, delay: 0.6 }
        ].map((drop, i) => (
          <motion.path
            key={i}
            d={`M${drop.x},10 Q${drop.x - 3},15 ${drop.x},20 Q${drop.x + 3},15 ${drop.x},10 Z`}
            fill="#3b82f6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: [0, 1, 0], y: [-20, 30, 40] }}
            transition={{ duration: 1.5, delay: drop.delay, repeat: Infinity, ease: "easeIn" }}
          />
        ))}

        {/* Farmer Crouching */}
        <g transform="translate(90, 50)">
          <path d="M0,0 Q-10,-20 10,-20 Q15,0 0,0" fill="#334155" />
          <circle cx="5" cy="-25" r="6" fill="#64748b" />
          <path d="M5,-20 Q15,-10 15,10" fill="none" stroke="#475569" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
}