import { motion } from 'framer-motion';

export default function AnimDisease() {
  return (
    <div className="w-full h-32 bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-subtle)] overflow-hidden relative mb-4 flex items-center justify-center">
      <svg className="w-full h-full" viewBox="0 0 200 100">
        <rect width="200" height="100" fill="#0f172a" />
        
        {/* Leaf */}
        <g transform="translate(100, 60)">
          <path 
            d="M0,30 Q-60,0 0,-40 Q60,0 0,30" 
            fill="#166534" 
            stroke="#22c55e" 
            strokeWidth="2" 
          />
          <path d="M0,30 L0,-40" stroke="#22c55e" strokeWidth="1" />
          <path d="M0,-10 L20,-20 M0,0 L-20,-10 M0,10 L15,0" stroke="#22c55e" strokeWidth="1" />
          
          {/* Dark Spots (Disease) */}
          <motion.g
            animate={{ opacity: [0, 1, 1, 0, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <circle cx="-15" cy="-10" r="4" fill="#451a03" />
            <circle cx="10" cy="-5" r="5" fill="#451a03" />
            <circle cx="-5" cy="10" r="3" fill="#451a03" />
            <circle cx="15" cy="-20" r="3" fill="#451a03" />
          </motion.g>
        </g>

        {/* AI Shield */}
        <motion.g
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: [-50, 40, 40, -50], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <path 
            d="M85,30 L100,20 L115,30 L115,50 Q100,70 100,70 Q100,70 85,50 Z" 
            fill="var(--accent-blue)" 
            opacity="0.3"
            stroke="var(--accent-blue)"
            strokeWidth="2"
          />
          <path d="M100,35 L100,60" stroke="white" strokeWidth="2" opacity="0.8" />
          <path d="M90,45 L110,45" stroke="white" strokeWidth="2" opacity="0.8" />
        </motion.g>
      </svg>
    </div>
  );
}