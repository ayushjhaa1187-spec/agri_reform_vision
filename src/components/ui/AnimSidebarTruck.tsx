import { motion } from 'framer-motion';

export default function AnimSidebarTruck({ isActive }: { isActive: boolean }) {
  return (
    <div className="w-full h-20 bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-subtle)] overflow-hidden relative mt-4 mb-4">
      <svg className="w-full h-full" viewBox="0 0 120 80">
        <rect width="120" height="80" fill="var(--bg-primary)" />
        
        {/* Ground */}
        <path d="M0,60 L120,60 L120,80 L0,80 Z" fill="#166534" />
        
        {/* Moving Truck Container */}
        <motion.g
          initial={{ x: -40 }}
          animate={isActive ? { x: [ -40, 140 ] } : { x: 40 }}
          transition={{ duration: 6, repeat: isActive ? Infinity : 0, ease: "linear" }}
          transform="translate(0, 48)"
        >
          {/* Truck Cab */}
          <path d="M20,-15 L30,-15 L35,-5 L35,5 L20,5 Z" fill="#3b82f6" />
          {/* Truck Window */}
          <rect x="25" y="-12" width="6" height="6" fill="#bfdbfe" />
          {/* Truck Bed */}
          <rect x="0" y="-10" width="20" height="15" fill="#1e293b" />
          {/* Wheels */}
          <motion.circle 
            animate={isActive ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            cx="5" cy="5" r="4" fill="#0f172a" stroke="#475569" strokeWidth="1" 
          />
          <motion.circle 
            animate={isActive ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            cx="28" cy="5" r="4" fill="#0f172a" stroke="#475569" strokeWidth="1" 
          />
          
          {/* Floating Wheat Bundle */}
          <motion.text
            x="5" y="-15"
            fontSize="12"
            animate={isActive ? { y: [-15, -18, -15] } : { y: -15 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            🌾
          </motion.text>
        </motion.g>
      </svg>
    </div>
  );
}