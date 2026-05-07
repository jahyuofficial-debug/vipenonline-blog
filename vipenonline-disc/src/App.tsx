import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';

const RotatingDisc = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics for "gravity/pressure" feel
  const springConfig = { damping: 25, stiffness: 120 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [18, -18]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-18, 18]), springConfig);
  
  // Reflection shift based on tilt
  const lightX = useSpring(useTransform(x, [-0.5, 0.5], [0, 100]), springConfig);
  const lightY = useSpring(useTransform(y, [-0.5, 0.5], [0, 100]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Normalize coordinates from -0.5 to 0.5
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const cursorOpacity = useTransform(x, (val: number) => val === 0 ? 0 : 0.4);

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-80 h-80 md:w-[600px] md:h-[600px] flex items-center justify-center perspective-[1500px]"
      id="disc-interactive-container"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-white/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Tilt Wrapper with 3D Transform */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full flex items-center justify-center p-4 cursor-none"
      >
        {/* Main Disc with Continuous Rotation */}
        <motion.div
          initial={{ 
            rotate: 0,
            scale: 0.9,
            opacity: 0 
          }}
          animate={{ 
            rotate: 360,
            scale: 1, 
            opacity: 1 
          }}
          transition={{ 
            rotate: { duration: 15, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, ease: "circOut" },
            opacity: { duration: 1.5, ease: "easeOut" }
          }}
          className="relative w-full h-full rounded-full overflow-hidden shadow-[0_120px_240px_-60px_rgba(0,0,0,1)]"
          style={{
            transformStyle: "preserve-3d",
            background: '#0a0a0a'
          }}
        >
          {/* Machined Metal Base with Dark Hub */}
          <div className="absolute inset-0" 
            style={{
              background: `radial-gradient(circle at center, #050505 0%, #050505 15%, #444 15.5%, #111 75%, #050505 100%)`
            }}
          />

          {/* Diffused Anisotropic Reflection - Avoiding "Quadrant" look */}
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-100%] opacity-20 mix-blend-color-dodge"
            style={{
              background: `conic-gradient(from 0deg at 50% 50%, #000, #fff 5deg, #000 10deg, #fff 100deg, #000 110deg, #fff 210deg, #000 220deg, #fff 310deg, #000)`,
              filter: 'blur(35px)'
            }}
          />

          {/* 30% Radius Inlaid Structural Ring - Sharp & Technical */}
          <div className="absolute inset-0 rounded-full pointer-events-none" 
            style={{
              background: `radial-gradient(circle at center, transparent 29.5%, rgba(0,0,0,0.6) 30%, rgba(255,255,255,0.08) 30.5%, transparent 31%)`
            }}
          />

          {/* Raised Outer Rim (Bevel) - Solid Edge */}
          <div className="absolute inset-0 rounded-full border-[10px] border-zinc-900/80 shadow-[inset_0_2px_4px_rgba(255,255,255,0.05),inset_0_-2px_6px_rgba(0,0,0,0.8)] pointer-events-none z-20" />
          
          {/* Subtle Surface Texture */}
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='f'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23f)'/%3E%3C/svg%3E")`
            }}
          />

          {/* Focal Specular Glare */}
          <motion.div 
             style={{
               left: useTransform(lightX, [0, 100], ['-20%', '40%']),
               top: useTransform(lightY, [0, 100], ['10%', '50%']),
             }}
             className="absolute w-full h-full bg-gradient-to-br from-white/20 via-transparent to-transparent blur-[100px] rounded-full pointer-events-none mix-blend-screen -rotate-[30deg]" 
          />

          {/* Center Hollow Hub Area with Carved Circular Logo */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <div className="relative w-[30%] h-[30%] rounded-full flex items-center justify-center">
               
                   {/* Internal Shadow for Depth */}
               <div className="absolute inset-0 rounded-full shadow-[inset_0_12px_24px_rgba(0,0,0,1)]" />
               
               {/* Center Glow Hub Background */}
               <div className="absolute inset-x-0 top-0 h-full w-full rounded-full bg-radial from-white/5 to-transparent pointer-events-none" />

               {/* Circular Carved Text Logo */}
               <div className="absolute inset-0 flex items-center justify-center">
                 <svg viewBox="0 0 200 200" className="w-full h-full">
                   <defs>
                     <filter id="metallic-inlay" x="-10%" y="-10%" width="120%" height="120%">
                       {/* Simulate surface relief with higher contrast */}
                       <feGaussianBlur in="SourceAlpha" stdDeviation="0.15" result="blur" />
                       <feSpecularLighting in="blur" surfaceScale="12" specularConstant="2.5" specularExponent="35" lightingColor="#fff" result="specular">
                         <feDistantLight azimuth="45" elevation="55" />
                       </feSpecularLighting>
                       <feComposite in="specular" in2="SourceAlpha" operator="in" result="specular-clip" />
                       
                       {/* Very subtle grain */}
                       <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" result="noise" />
                       <feComposite in="noise" in2="SourceAlpha" operator="in" result="noise-clip" />
                       <feColorMatrix in="noise-clip" type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.1 0" result="noise-faded" />
                       
                       <feMerge>
                         <feMergeNode in="SourceGraphic" />
                         <feMergeNode in="specular-clip" />
                         <feMergeNode in="noise-faded" />
                       </feMerge>
                     </filter>
                   </defs>
                   <path
                     id="curve"
                     fill="transparent"
                     d="M 100, 100 m -45, 0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0"
                   />
                   {/* Carved Base (Darker/Deeper) */}
                   <text className="font-signature fill-black text-[18px] tracking-[0.5px]">
                     <textPath xlinkHref="#curve" startOffset="50%" textAnchor="middle">
                       Vipenonline
                     </textPath>
                   </text>
                   {/* Metal Edge Highlight (Maximum Visibility Inlay) */}
                   <text 
                     className="font-signature fill-white text-[18px] tracking-[0.5px] opacity-[0.6]"
                     filter="url(#metallic-inlay)"
                     style={{ dominantBaseline: 'middle' }}
                   >
                     <textPath xlinkHref="#curve" startOffset="50%" textAnchor="middle">
                       Vipenonline
                     </textPath>
                   </text>
                   {/* Top Specular for extra "pop" */}
                   <text 
                     className="font-signature fill-white text-[18px] tracking-[0.5px] opacity-[0.36] blur-[0.2px] translate-x-[-0.2px] translate-y-[-0.3px]"
                     style={{ dominantBaseline: 'middle' }}
                   >
                     <textPath xlinkHref="#curve" startOffset="50%" textAnchor="middle">
                       Vipenonline
                     </textPath>
                   </text>
                 </svg>
               </div>

               {/* Inner Hollow Center (The axis hole) */}
               <div className="absolute w-[35%] h-[35%] rounded-full bg-[#010101] shadow-[inset_0_4px_8px_rgba(0,0,0,1)] border border-white/5 flex items-center justify-center">
                 <div className="relative">
                   {/* Carved Base Shadow */}
                   <span className="absolute inset-0 font-signature text-[12px] text-black select-none translate-y-[0.5px]">Jah72</span>
                   {/* Metal Inlay Text */}
                   <span 
                     className="relative font-signature text-[12px] text-zinc-300 opacity-[0.48] select-none"
                     style={{ 
                       filter: 'url(#metallic-inlay)',
                       textShadow: '0.5px 0.5px 1px rgba(255,255,255,0.06)'
                     }}
                   >
                     Jah72
                   </span>
                 </div>
               </div>
             </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Interactive Cursor Glow */}
      <motion.div
        style={{
          x: useTransform(x, [-0.5, 0.5], [-300, 300]),
          y: useTransform(y, [-0.5, 0.5], [-300, 300]),
          opacity: cursorOpacity,
        }}
        className="absolute w-20 h-20 bg-white blur-3xl rounded-full pointer-events-none mix-blend-overlay pointer-events-none"
      />
    </div>
  );
};

export default function App() {
  return (
    <main className="min-h-screen bg-[#000000] flex flex-col items-center justify-center p-4 overflow-hidden selection:bg-white/5 font-sans relative">
      {/* Carbon Fiber Background */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundColor: '#050505',
          backgroundImage: `
            radial-gradient(circle at center, transparent 10%, #000 80%),
            repeating-linear-gradient(45deg, #181818 25%, transparent 25%, transparent 75%, #181818 75%, #181818),
            repeating-linear-gradient(45deg, #181818 25%, #0a0a0a 25%, #0a0a0a 75%, #181818 75%, #181818)
          `,
          backgroundPosition: '0 0, 0 0, 4px 4px',
          backgroundSize: '100% 100%, 8px 8px, 8px 8px'
        }}
      />

      {/* Cinematic Fog / Grain */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none overflow-hidden z-0">
        <div className="absolute w-[200%] h-[200%] top-[-50%] left-[-50%] animate-pulse" 
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
        />
      </div>

      <div className="flex flex-col items-center gap-12 md:gap-20 relative z-10 w-full max-w-7xl">
        <RotatingDisc />
      </div>

      {/* Interface Labels */}
      <div className="fixed bottom-12 left-12 flex flex-col gap-3">
        <div className="h-[1px] w-8 bg-white/10" />
        <div className="text-[9px] font-mono text-zinc-700 tracking-[0.5em] uppercase">
          Sys.CORE_FLAT
        </div>
      </div>
      
      <div className="fixed top-12 right-12 flex flex-col items-end gap-3 text-right">
        <div className="text-[9px] font-mono text-zinc-700 tracking-[0.5em] uppercase">
          P00.INTERCEPT
        </div>
        <div className="h-[1px] w-8 bg-white/10" />
      </div>
    </main>
  );
}
