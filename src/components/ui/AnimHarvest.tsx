import { motion } from 'framer-motion';

export default function AnimHarvest() {
  return (
    <div className="w-full h-32 bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-subtle)] overflow-hidden relative mb-4">
      <svg className="w-full h-full" viewBox="0 0 200 100">
        <rect width="200" height="100" fill="#0f172a" />
        
        {/* Ground */}
        <path d="M0,60 Q100,50 200,60 L200,100 L0,100 Z" fill="#166534" />
        
        {/* Wheat Field */}
        <motion.g
          animate={{ opacity: [1, 1, 0, 0, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          <path d="M30,65 L30,40 M40,65 L40,35 M50,65 L50,45" stroke="#fbbf24" strokeWidth="2" />
          <path d="M30,40 Q25,35 30,30 Q35,35 30,40 M40,35 Q35,30 40,25 M50,45 Q45,40 50,35" fill="#fbbf24" />
        </motion.g>

        {/* Farmer swinging sickle */}
        <g transform="translate(60, 50)">
          {/* Body */}
          <path d="M0,0 Q-10,-20 5,-20 Q15,0 0,0" fill="#334155" />
          <circle cx="5" cy="-25" r="6" fill="#64748b" />
          {/* Arm with sickle */}
          <motion.g
            animate={{ rotate: [0, -45, 0, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "10px -15px" }}
          >
            <path d="M10,-15 L-10,-5" stroke="#475569" strokeWidth="2" />
            <path d="M-10,-5 Q-20,-15 -15,-25" fill="none" stroke="#e2e8f0" strokeWidth="1.5" />
          </motion.g>
        </g>

        {/* Truck entering and leaving */}
        <motion.g
          initial={{ x: 220 }}
          animate={{ x: [220, 120, 120, -80] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          transform="translate(0, 45)"
        >
          {/* Truck Cab */}
          <path d="M0,-10 L-10,-10 L-15,0 L-15,10 L0,10 Z" fill="#3b82f6" />
          {/* Truck Bed */}
          <rect x="0" y="-15" width="30" height="25" fill="#1e293b" />
          <circle cx="-10" cy="12" r="4" fill="#0f172a" stroke="#475569" />
          <circle cx="20" cy="12" r="4" fill="#0f172a" stroke="#475569" />
          
          {/* Wheat Loading into Truck */}
          <motion.path 
            d="M5,10 L5,5 M15,10 L15,5 M25,10 L25,5" 
            stroke="#fbbf24" strokeWidth="2" 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 1, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </motion.g>
      </svg>
    </div>
  );
}