import { motion } from 'framer-motion';

export default function AnimOverwhelmedFarmer() {
  return (
    <div className="relative w-full aspect-square max-w-[300px] mx-auto bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-3xl overflow-hidden flex items-center justify-center">
      <svg className="w-full h-full" viewBox="0 0 200 200">
        {/* Background Ground */}
        <path d="M0,150 Q100,140 200,160 L200,200 L0,200 Z" fill="#112318" />
        
        {/* Farmer Body Silhouette */}
        <g transform="translate(100, 140)">
          <path d="M-20,0 Q-25,-40 0,-60 Q25,-40 20,0 Z" fill="#1e293b" />
          <circle cx="0" cy="-70" r="16" fill="#334155" />
          
          {/* Eyes (Overwhelmed) */}
          <path d="M-6,-72 L-2,-68 M6,-72 L2,-68" stroke="#030a06" strokeWidth="2" strokeLinecap="round" />
          <path d="M-4,-62 Q0,-65 4,-62" stroke="#030a06" strokeWidth="1.5" fill="none" />
          
          {/* Arm and Tablet */}
          <path d="M-10,-45 Q-20,-20 -5,-15" fill="none" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
          <rect x="-15" y="-20" width="16" height="24" rx="2" fill="#0f172a" transform="rotate(-15 -7 -8)" />
          
          {/* Glowing Red Tablet Screen */}
          <motion.rect 
            x="-13" y="-18" width="12" height="20" rx="1" fill="#ef4444" 
            transform="rotate(-15 -7 -8)"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
          />
        </g>

        {/* Floating Confusing Icons */}
        {[
          { text: '?', x: 70, y: 70, delay: 0 },
          { text: '₹', x: 120, y: 50, delay: 1.5 },
          { text: '32%', x: 60, y: 40, delay: 0.8 },
          { text: '🌧️', x: 130, y: 80, delay: 2.2 },
          { text: '?', x: 90, y: 30, delay: 1.2 },
        ].map((item, i) => (
          <motion.text
            key={i}
            x={item.x}
            y={item.y}
            fill="var(--accent-gold)"
            fontSize="14"
            fontWeight="bold"
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