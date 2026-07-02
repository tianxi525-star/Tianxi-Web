import React, { useState, useEffect, useRef } from "react";
import { 
  ArrowLeft, 
  ArrowRight, 
  Compass, 
  Volume2, 
  MousePointerClick, 
  Plus, 
  X, 
  Check, 
  Copy, 
  Send,
  Sparkles,
  Info,
  Layers,
  Activity,
  Maximize2,
  Fingerprint,
  Presentation,
  FileSpreadsheet,
  FileText,
  Bot,
  Code2,
  Cpu,
  Briefcase,
  GraduationCap,
  Palette,
  Image,
  ExternalLink,
  Mail,
  Phone
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PROJECTS_DATA, BIOGRAPHY_DATA, Project } from "./data";

const SilhouettePlaceholder = () => (
  <svg viewBox="0 0 400 550" className="w-full h-full max-h-[500px] object-contain filter drop-shadow-[0_0_20px_rgba(147,51,234,0.3)]" fill="none" xmlns="http://www.w3.org/2000/svg" id="avatar-stencil-svg">
    <defs>
      <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1E1B4B" stopOpacity="0.8" />
        <stop offset="50%" stopColor="#4C1D95" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#0F0A21" stopOpacity="0.95" />
      </linearGradient>
      <linearGradient id="lineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#C084FC" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#6B21A8" stopOpacity="0.15" />
      </linearGradient>
    </defs>
    {/* Human outline style visual shadow */}
    <path 
      d="M 200 70 
         C 155 70, 145 115, 155 155 
         C 165 185, 155 205, 135 215 
         C 95 235, 65 275, 55 375 
         C 45 445, 40 515, 40 545 
         L 360 545 
         C 360 515, 355 445, 345 375 
         C 335 275, 305 235, 265 215 
         C 245 205, 235 185, 245 155 
         C 255 115, 245 70, 200 70 Z" 
      fill="url(#bodyGrad)" 
      stroke="url(#lineGrad)" 
      strokeWidth="2" 
    />
    <circle cx="200" cy="140" r="40" stroke="#C084FC" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
    <line x1="200" y1="80" x2="200" y2="200" stroke="#C084FC" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
    <line x1="140" y1="140" x2="260" y2="140" stroke="#C084FC" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
    
    <text x="200" y="310" fill="#C084FC" fontSize="11" fontFamily="monospace" textAnchor="middle" letterSpacing="4" fontWeight="bold">TIANXI PORTRAIT</text>
    <text x="200" y="330" fill="#9CA3AF" fontSize="9" fontFamily="monospace" textAnchor="middle" letterSpacing="2">PLACEHOLDER ZONE</text>
    <text x="200" y="350" fill="#6B7280" fontSize="8" fontFamily="monospace" textAnchor="middle" letterSpacing="1">[REPLACE WITH PNG OWN PORTRAIT]</text>
  </svg>
);

export default function App() {
  // Navigation & state management
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState("");
  const [loadingFinished, setLoadingFinished] = useState(false);
  
  // Premium Continuous Horizontal Wheel Controller Refs & State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const targetX = useRef(0);
  const currentX = useRef(0);

  // Touch & Drag state refs for ultra-smooth carousel swiping on mobile and desktop
  const isDragging = useRef(false);
  const startTouchX = useRef(0);
  const startTargetX = useRef(0);
  const preventClick = useRef(false);
  const dragDistance = useRef(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingFinished(true);
    }, 2600);
    return () => clearTimeout(timer);
  }, []);

  // Mouse coordinate tracker for absolute premium cursor-responsive ambient glow
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [smoothMousePos, setSmoothMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Smooth drift for cursor accent glow
  useEffect(() => {
    let animationFrameId: number;
    const updateSmoothPos = () => {
      setSmoothMousePos((prev) => ({
        x: prev.x + (mousePos.x - prev.x) * 0.08,
        y: prev.y + (mousePos.y - prev.y) * 0.08,
      }));
      animationFrameId = requestAnimationFrame(updateSmoothPos);
    };
    animationFrameId = requestAnimationFrame(updateSmoothPos);
    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePos]);

  // Buttery-smooth requestAnimationFrame continuous drift & inertial wheel scroller engine
  useEffect(() => {
    let animationId: number;
    
    const tick = () => {
      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track) {
        animationId = requestAnimationFrame(tick);
        return;
      }

      const singleSetWidth = track.scrollWidth / 2;
      if (singleSetWidth <= 0) {
        animationId = requestAnimationFrame(tick);
        return;
      }
      
      // If we are not hovered, perform a steady elegant cosmic drift
      if (!isHovered && !activeProject) {
        targetX.current -= 0.65; // quiet slow continuous crawl
      }
      
      // Beautiful seamless loops: mathematically wrap both targets and current translation coords
      if (targetX.current < -singleSetWidth) {
        targetX.current += singleSetWidth;
        currentX.current += singleSetWidth;
      }
      if (targetX.current > 0) {
        targetX.current -= singleSetWidth;
        currentX.current -= singleSetWidth;
      }
      
      // Interpolate for ultra-premium deceleration ease
      currentX.current += (targetX.current - currentX.current) * 0.088;
      
      // Apply translation to container
      track.style.transform = `translate3d(${currentX.current}px, 0, 0)`;
      
      // Sync indicator dots & index label seamlessly
      const cardWidth = singleSetWidth / PROJECTS_DATA.length;
      const calcIndex = Math.round(Math.abs(currentX.current) / cardWidth) % PROJECTS_DATA.length;
      if (calcIndex !== currentIndex) {
        setCurrentIndex(calcIndex);
      }
      
      animationId = requestAnimationFrame(tick);
    };
    
    animationId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationId);
  }, [isHovered, activeProject, currentIndex]);

  // Lock Page vertical scroll and translate wheel delta to track movements
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (isHovered && !activeProject && window.innerWidth >= 1024) {
        e.preventDefault(); // Lock page vertical scroll
        
        const delta = e.deltaY !== 0 ? e.deltaY : e.deltaX;
        // Moderate drag distance multiplier
        targetX.current -= delta * 1.25;
      }
    };

    // Note: passive must be false to allow scrolling prevention
    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [isHovered, activeProject]);

  const handleNext = () => {
    if (!trackRef.current) return;
    const singleSetWidth = trackRef.current.scrollWidth / 2;
    const cardWidth = singleSetWidth / PROJECTS_DATA.length;
    targetX.current -= cardWidth;
  };

  const handlePrev = () => {
    if (!trackRef.current) return;
    const singleSetWidth = trackRef.current.scrollWidth / 2;
    const cardWidth = singleSetWidth / PROJECTS_DATA.length;
    targetX.current += cardWidth;
  };

  // Touch event handlers for mobile gesture swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    startTouchX.current = e.touches[0].clientX;
    startTargetX.current = targetX.current;
    dragDistance.current = 0;
    preventClick.current = false;
    setIsHovered(true); // pauses auto scroll
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const currentTouchX = e.touches[0].clientX;
    const deltaX = currentTouchX - startTouchX.current;
    dragDistance.current = Math.abs(deltaX);
    
    if (Math.abs(deltaX) > 8) {
      preventClick.current = true;
    }
    
    // Smooth responsive gesture tracking
    targetX.current = startTargetX.current + deltaX * 1.5;
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    // Keep isHovered true for 1200ms after interaction to let drift settle gently
    setTimeout(() => {
      setIsHovered(false);
    }, 1200);
  };

  // Optional mouse drag handlers for desktop trackpad dragging feel
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only drag with left click
    if (e.button !== 0) return;
    isDragging.current = true;
    startTouchX.current = e.clientX;
    startTargetX.current = targetX.current;
    dragDistance.current = 0;
    preventClick.current = false;
    setIsHovered(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - startTouchX.current;
    dragDistance.current = Math.abs(deltaX);
    if (Math.abs(deltaX) > 8) {
      preventClick.current = true;
    }
    targetX.current = startTargetX.current + deltaX * 1.5;
  };

  const handleMouseUpOrLeave = () => {
    if (isDragging.current) {
      isDragging.current = false;
      setTimeout(() => {
        setIsHovered(false);
      }, 1200);
    }
  };

  const copyContact = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(""), 2200);
  };

  return (
    <div id="tianxi-portfolio-app" className="relative font-sans text-[#F5F5F7] overflow-x-hidden min-h-screen bg-[#050505] selection:bg-neutral-800 selection:text-white">
      {/* 0. Fullscreen Cinematic Loading Screen */}
      <AnimatePresence>
        {!loadingFinished && (
          <motion.div
            key="cinematic-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="fixed inset-0 bg-[#050505] z-[100] flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Ambient textures inside the loading screen to sustain visual consistency */}
            <div className="absolute inset-0 noise-bg opacity-[0.03] pointer-events-none" />
            <div className="absolute inset-0 scanline-overlay opacity-[0.12] pointer-events-none" />
            <div className="absolute top-[40%] left-[25%] w-[60vw] h-[60vw] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none animate-pulse" style={{ animationDuration: '4s' }} />
            
            <div className="relative flex flex-col items-center max-w-md px-6 text-center -translate-y-14 sm:translate-y-0">
              <motion.div
                initial={{ opacity: 0, letterSpacing: "0.2em", y: 15 }}
                animate={{ opacity: 1, letterSpacing: "0.6em", y: 0 }}
                transition={{ duration: 1.8, ease: "easeOut", delay: 0.2 }}
                className="text-4xl sm:text-5xl font-extrabold font-sans uppercase metal-sweep-text"
                style={{ textShadow: "0 0 20px rgba(168,85,247,0.15)" }}
              >
                TIANXI
              </motion.div>
              
              {/* Refined high-tech progress loading indicator trace */}
              <div className="mt-12 w-40 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
                <motion.div 
                  initial={{ left: "-100%" }}
                  animate={{ left: "100%" }}
                  transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
                  className="absolute top-0 bottom-0 w-20 bg-gradient-to-r from-transparent via-purple-400 to-transparent"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Film Grain and Carbon Fiber Textures */}
      <div className="noise-bg" id="noise-overlay" />
      <div className="carbon-pattern" id="carbon-texture" />
      <div className="scanline-overlay" id="screen-scanline" />

      {/* 2. High-end Atmospheric Light Effects (Clean Minimalism) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" id="ambient-glowing">
        {/* Top-Right high-end Blue focus light */}
        <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] max-w-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none animate-glow-pulse-1" />
        
        {/* Bottom-Left deep breathing purple focus light */}
        <div className="absolute bottom-[-10%] left-[-5%] w-[45vw] h-[45vw] max-w-[500px] bg-purple-500/8 rounded-full blur-[100px] pointer-events-none animate-glow-pulse-2" />
        
        {/* Secondary atmospheric deep core glow */}
        <div className="absolute top-[40%] left-[25%] w-[35vw] h-[35vw] bg-indigo-500/5 rounded-full blur-[130px] pointer-events-none animate-glow-pulse-3" />

        {/* Dynamic mouse-guided interactive glow cursor effect (Clean theme premium aura) */}
        <div 
          className="absolute hidden md:block w-[450px] h-[450px] rounded-full bg-radial from-purple-500/10 to-transparent blur-[90px] pointer-events-none"
          style={{
            left: `${smoothMousePos.x - 225}px`,
            top: `${smoothMousePos.y - 225}px`,
            transition: 'opacity 0.6s ease',
          }}
        />
      </div>

      {/* 3. Global Premium Header */}
      <header className="fixed top-0 left-0 w-full px-6 sm:px-12 py-6 sm:py-8 flex justify-between items-center z-40 bg-gradient-to-b from-[#050505]/95 to-transparent backdrop-blur-md md:backdrop-blur-none border-b border-white/5 md:border-b-0">
        <motion.div 
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4"
          id="logo-wrapper"
        >
          <span className="text-xl sm:text-2xl font-bold tracking-[0.3em] font-sans text-[#F5F5F7]">
            TIANXI / 田熙
          </span>
        </motion.div>
        
        <motion.nav 
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 sm:gap-10 text-[10px] uppercase tracking-[0.2em] font-sans font-medium text-neutral-400"
          id="navigation-links"
        >
          <a href="#about" className="hover:text-white transition-colors relative group py-1">
            ABOUT
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white/40 transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="#projects" className="hover:text-white transition-colors relative group py-1">
            PROJECTS
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white/40 transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="#contact" className="hover:text-white border-b border-white/20 pb-0.5 hover:border-white transition-colors py-1">
            CONTACT
          </a>
        </motion.nav>
      </header>

      {/* 4. Hero Section with responsive 3-column split layout and a glowing standing silhouette placeholder */}
      <section className="relative min-h-[96vh] flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-32 z-10 pt-28" id="hero-section">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
                 {/* Left: Biography Name & Header */}
          <div className="lg:col-span-4 flex flex-col justify-center text-left space-y-4" id="hero-intro-text">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="inline-flex items-center mb-2"
            >
              <span className="text-sm sm:text-[15px] uppercase tracking-[0.4em] text-purple-400 font-extrabold pb-1">
                HELLO, I'M / 你好，我是
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="font-sans font-extrabold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tighter leading-[0.95] text-white"
            >
              TIANXI
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="mt-4 border-l-2 border-purple-500/20 pl-4 max-w-sm"
            >
              <p className="font-serif italic text-base sm:text-lg text-neutral-200 leading-relaxed font-light">
                {BIOGRAPHY_DATA.philosophy}
              </p>
              <p className="font-sans text-[11px] text-[#8E8E93] leading-relaxed mt-2.5 uppercase tracking-wider font-medium">
                Brand Experience · Creative Marketing · Spatial Narrative
              </p>
            </motion.div>
          </div>

          {/* Middle: Portrait Showcase (Directly floating on ambient backing) */}
          <div className="lg:col-span-4 flex justify-center items-center relative py-6 max-w-full" id="hero-middle-portrait">
            <div className="relative flex justify-center items-center w-full max-w-[400px] lg:max-w-[450px] aspect-[4/5]" id="portrait-glow-container">
              {/* Vibrant interactive dark purple breathing aura directly behind standing space */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 5, 
                  ease: "easeInOut" 
                }}
                className="absolute w-[280px] h-[280px] rounded-full bg-purple-600/25 blur-[80px] pointer-events-none z-0" 
              />
              <motion.div 
                animate={{ 
                  scale: [1, 1.18, 1],
                  opacity: [0.4, 0.6, 0.4]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 6, 
                  ease: "easeInOut",
                  delay: 1.5
                }}
                className="absolute w-[220px] h-[220px] rounded-full bg-violet-500/20 blur-[55px] pointer-events-none z-0" 
              />

              {/* Character Photo Image styled as an elegant floating portrait */}
              <div className="relative z-10 w-full h-full flex justify-center items-end group select-none">
                <img 
                  src="https://i.postimg.cc/Yq2gWVwk/tian-xi.png"
                  alt="Tianxi - Portrait" 
                  referrerPolicy="no-referrer"
                  className="max-h-[115%] w-auto object-contain select-none hover:scale-[1.04] transition-all duration-1000 ease-out z-10 filter drop-shadow-[0_10px_40px_rgba(168,85,247,0.3)] brightness-[1.02]"
                  style={{
                    // Gradient mask to feather bottom cutout edges smoothly with the dark background
                    WebkitMaskImage: "linear-gradient(to top, transparent 0%, rgba(0,0,0,0.1) 1.5%, black 10%, black 100%)",
                    maskImage: "linear-gradient(to top, transparent 0%, rgba(0,0,0,0.1) 1.5%, black 10%, black 100%)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right: Rich creative experience description taglines */}
          <div className="lg:col-span-4 flex flex-col justify-center text-left lg:text-right" id="hero-interactive-badge">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.0, delay: 0.3 }}
              className="flex flex-col gap-6 md:gap-8 select-none relative"
            >
              {/* Backglow for the artistic words */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex flex-col gap-5 font-sans">
                {/* 1. 品牌营销 */}
                <motion.div 
                  whileHover={{ x: -6, scale: 1.02 }}
                  className="flex items-center lg:justify-end gap-3.5 group cursor-default"
                >
                  <span className="text-[10px] sm:text-xs font-mono text-purple-400/50 tracking-wider group-hover:text-purple-400/80 transition-colors uppercase">01 / BRAND MARKETING</span>
                  <span className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-sans uppercase">
                    品牌营销
                  </span>
                </motion.div>

                {/* 2. 发布会 */}
                <motion.div 
                  whileHover={{ x: -12, scale: 1.02 }}
                  className="flex items-center lg:justify-end gap-3.5 mr-0 lg:mr-8 group cursor-default"
                >
                  <span className="text-[10px] sm:text-xs font-mono text-fuchsia-400/50 tracking-wider group-hover:text-fuchsia-400/80 transition-colors uppercase">02 / PRODUCT LAUNCH</span>
                  <span className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400 font-sans uppercase">
                    发布会
                  </span>
                </motion.div>

                {/* 3. 展会 */}
                <motion.div 
                  whileHover={{ x: -4, scale: 1.02 }}
                  className="flex items-center lg:justify-end gap-3.5 mr-0 lg:mr-4 group cursor-default"
                >
                  <span className="text-[10px] sm:text-xs font-mono text-indigo-400/50 tracking-wider group-hover:text-indigo-400/80 transition-colors uppercase">03 / EXHIBITION</span>
                  <span className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-neutral-300 font-sans uppercase hover:text-white transition-colors">
                    展会
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </div>

        </div>
 
      </section>

      {/* 5. About Section with exquisite typographic layouts */}
      <section className="relative px-6 sm:px-12 md:px-20 lg:px-32 py-24 sm:py-32 border-t border-neutral-900 bg-neutral-950/20" id="about">
        <div className="max-w-7xl mx-auto">
          {/* Concept Header aligned cleanly like 1.5 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 sm:mb-20">
            <div className="md:col-span-12" id="about-title-box">
              <span className="text-xs font-mono tracking-[0.4em] text-neutral-500 block mb-2 uppercase">01 / CONCEPT ABOUT TIANXI</span>
              <h2 className="font-display font-extrabold text-2xl xs:text-3xl sm:text-4xl text-white tracking-wide uppercase break-words">
                ABOUT TIANXI
              </h2>
              <div className="mt-4 border-l-2 border-neutral-800 pl-4">
                <span className="font-serif italic text-lg sm:text-xl text-neutral-400 font-light leading-relaxed block max-w-4xl">
                  「让每一次相遇，都拥有被记住的理由。」
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Biography Bento Matrix */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch" id="bento-grid-about">
            {/* Main Long statement */}
            <motion.div 
              whileInView={{ opacity: [0, 1], y: [20, 0] }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-8 glass-panel p-8 sm:p-10 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-8 border-b border-white/5 pb-4">
                  <span className="font-mono text-xs text-neutral-500">ROLE SUMMARY</span>
                  <span className="px-2.5 py-1 rounded-full bg-white/5 text-[9px] font-mono text-white tracking-wider border border-white/10 uppercase">ACTIVE FIELD</span>
                </div>
                
                <h3 className="font-display font-semibold text-xl sm:text-2xl text-white tracking-wider mb-6">
                  Experience Director
                </h3>
                
                <div className="space-y-4 text-sm sm:text-base text-neutral-300 leading-relaxed font-light" id="biography-intro-paragraphs">
                  {(() => {
                    const paragraphs = BIOGRAPHY_DATA.intro.split('\n').filter(p => p.trim() !== "");
                    return paragraphs.map((para, pIdx) => {
                      const shouldIndent = paragraphs.length - pIdx > 3;
                      return (
                        <p key={pIdx} className={shouldIndent ? "indent-[2em]" : ""}>
                          {para}
                        </p>
                      );
                    });
                  })()}
                </div>
              </div>

              {/* Magnified High-End Core Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8 mt-12 pt-8 border-t border-white/5 items-start">
                <div className="flex flex-col min-w-0">
                  <div className="text-2xl sm:text-3xl lg:text-2xl xl:text-4xl font-display font-black text-white tracking-wider mb-1 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-fuchsia-300 whitespace-nowrap">8+</div>
                  <div className="text-[10px] xs:text-[11px] sm:text-xs text-neutral-300 font-sans tracking-wide leading-snug font-medium break-words">Selected Projects</div>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="text-2xl sm:text-3xl lg:text-2xl xl:text-4xl font-display font-black text-white tracking-wider mb-1 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-fuchsia-300 whitespace-nowrap">20+</div>
                  <div className="text-[10px] xs:text-[11px] sm:text-xs text-neutral-300 font-sans tracking-wide leading-snug font-medium break-words">Brands Served</div>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="text-2xl sm:text-3xl lg:text-2xl xl:text-4xl font-display font-black text-white tracking-wider mb-1 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-fuchsia-300 whitespace-nowrap">30+</div>
                  <div className="text-[10px] xs:text-[11px] sm:text-xs text-neutral-300 font-sans tracking-wide leading-snug font-medium break-words">Experiences Created</div>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="text-2xl sm:text-3xl lg:text-2xl xl:text-4xl font-display font-black text-white tracking-tight mb-1 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-fuchsia-300 whitespace-nowrap">
                    3 <span className="text-sm sm:text-lg lg:text-sm xl:text-xl font-normal text-neutral-300/90 ml-0.5">Years</span>
                  </div>
                  <div className="text-[10px] xs:text-[11px] sm:text-xs text-neutral-300 font-sans tracking-wide leading-snug font-medium break-words">Creative Journey</div>
                </div>
              </div>
            </motion.div>

            {/* Side capabilities details */}
            <motion.div 
              whileInView={{ opacity: [0, 1], y: [20, 0] }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="lg:col-span-4 flex flex-col gap-6 sm:gap-8 justify-between"
            >
              {/* Methodologies as Skill Showcase */}
              <div className="glass-panel p-6 sm:p-8 rounded-2xl flex-1 flex flex-col justify-between">
                <div>
                  <span className="font-sans text-[11px] text-purple-400 font-extrabold tracking-[0.2em] block mb-6 uppercase">我的技能</span>
                  <div className="space-y-4">
                    {/* PPT */}
                    <div className="group/skill">
                      <div className="flex justify-between items-center mb-1.5">
                        <div className="flex items-center gap-2.5">
                          <Presentation className="w-4 h-4 text-purple-400" />
                          <span className="text-xs sm:text-[13px] text-neutral-200 group-hover/skill:text-white font-medium transition-colors">PPT</span>
                        </div>
                        <span className="text-[10px] font-mono text-purple-400 font-semibold">90%</span>
                      </div>
                      <div className="h-[3px] bg-white/5 rounded-full overflow-hidden relative">
                        <div className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-purple-500 to-fuchsia-400 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.5)]" style={{ width: "90%" }} />
                      </div>
                    </div>

                    {/* EXCEL */}
                    <div className="group/skill">
                      <div className="flex justify-between items-center mb-1.5">
                        <div className="flex items-center gap-2.5">
                          <FileSpreadsheet className="w-4 h-4 text-purple-400" />
                          <span className="text-xs sm:text-[13px] text-neutral-200 group-hover/skill:text-white font-medium transition-colors font-mono">EXCEL</span>
                        </div>
                        <span className="text-[10px] font-mono text-purple-400 font-semibold">85%</span>
                      </div>
                      <div className="h-[3px] bg-white/5 rounded-full overflow-hidden relative">
                        <div className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-purple-500 to-fuchsia-400 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.5)]" style={{ width: "85%" }} />
                      </div>
                    </div>

                    {/* WORD */}
                    <div className="group/skill">
                      <div className="flex justify-between items-center mb-1.5">
                        <div className="flex items-center gap-2.5">
                          <FileText className="w-4 h-4 text-purple-400" />
                          <span className="text-xs sm:text-[13px] text-neutral-200 group-hover/skill:text-white font-medium transition-colors">WORD</span>
                        </div>
                        <span className="text-[10px] font-mono text-purple-400 font-semibold">85%</span>
                      </div>
                      <div className="h-[3px] bg-white/5 rounded-full overflow-hidden relative">
                        <div className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-purple-500 to-fuchsia-400 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.5)]" style={{ width: "85%" }} />
                      </div>
                    </div>

                    {/* CHATGTP */}
                    <div className="group/skill">
                      <div className="flex justify-between items-center mb-1.5">
                        <div className="flex items-center gap-2.5">
                          <Bot className="w-4 h-4 text-purple-400" />
                          <span className="text-xs sm:text-[13px] text-neutral-200 group-hover/skill:text-white font-medium transition-colors font-mono">CHATGTP</span>
                        </div>
                        <span className="text-[10px] font-mono text-purple-400 font-semibold">85%</span>
                      </div>
                      <div className="h-[3px] bg-white/5 rounded-full overflow-hidden relative">
                        <div className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-purple-500 to-fuchsia-400 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.5)]" style={{ width: "85%" }} />
                      </div>
                    </div>

                    {/* MIDJOURNEY */}
                    <div className="group/skill">
                      <div className="flex justify-between items-center mb-1.5">
                        <div className="flex items-center gap-2.5">
                          <Palette className="w-4 h-4 text-purple-400" />
                          <span className="text-xs sm:text-[13px] text-neutral-200 group-hover/skill:text-white font-medium transition-colors font-mono">MIDJOURNEY</span>
                        </div>
                        <span className="text-[10px] font-mono text-purple-400 font-semibold">80%</span>
                      </div>
                      <div className="h-[3px] bg-white/5 rounded-full overflow-hidden relative">
                        <div className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-purple-500 to-fuchsia-400 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.5)]" style={{ width: "80%" }} />
                      </div>
                    </div>

                    {/* Google aistudio */}
                    <div className="group/skill">
                      <div className="flex justify-between items-center mb-1.5">
                        <div className="flex items-center gap-2.5">
                          <Cpu className="w-4 h-4 text-purple-400" />
                          <span className="text-xs sm:text-[13px] text-neutral-200 group-hover/skill:text-white font-medium transition-colors font-mono">GOOGLE AISTUDIO</span>
                        </div>
                        <span className="text-[10px] font-mono text-purple-400 font-semibold">80%</span>
                      </div>
                      <div className="h-[3px] bg-white/5 rounded-full overflow-hidden relative">
                        <div className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-purple-500 to-fuchsia-400 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.5)]" style={{ width: "80%" }} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5 text-[10px] font-mono text-neutral-400 uppercase">
                  CRITICAL CAPABILITY: INTEGRATED EXPERTISE
                </div>
              </div>

              {/* Ambient micro visual widget */}
              <div className="glass-panel p-6 rounded-2xl flex items-center gap-4 border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-white/[0.01] rounded-full blur" />
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shrink-0 select-none">
                  <Activity className="w-5 h-5 text-white/70 animate-pulse" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-neutral-500 block leading-none">SYSTEM HEARTBEAT</span>
                  <span className="text-xs text-white font-mono mt-1 inline-block">PERCEPTION SIMULATOR ACTIVE</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5.5 My Work Experience Section (Experience & Education Timeline) */}
      <section className="relative px-6 sm:px-12 md:px-20 lg:px-32 py-24 sm:py-32 border-t border-neutral-900 bg-neutral-950/5 overflow-hidden" id="experience">
        {/* Dynamic decorative backdrop light specifically for qualification context */}
        <div className="absolute top-[30%] right-[10%] w-[35vw] h-[35vw] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto">
          {/* Section title */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 sm:mb-20">
            <div className="md:col-span-12" id="exp-title-box">
              <span className="text-xs font-mono tracking-[0.4em] text-neutral-500 block mb-2 uppercase">01.5 / QUALIFICATION MATRIX</span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-wide">
                MY WORK EXPERIENCE / <span className="font-serif italic text-2xl font-normal text-neutral-400">资历与教育背景</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Column: Work Experience */}
            <div className="space-y-8 relative">
              <div className="flex items-center gap-3 mb-6 pl-4">
                <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h3 className="font-sans font-bold text-xl sm:text-2xl text-white tracking-wider">Experience / 工作经历</h3>
              </div>

              {/* Vertical timeline connector track bar */}
              <div className="absolute left-[30px] sm:left-14 top-16 bottom-0 w-[1px] bg-gradient-to-b from-purple-500/30 via-purple-500/10 to-transparent pointer-events-none" />

              <div className="space-y-8 pl-4 sm:pl-12">
                {/* Exp Item 1 */}
                <motion.div 
                  whileInView={{ opacity: [0, 1], x: [-15, 0] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative group pl-10"
                >
                  {/* Timeline dot locator */}
                  <div className="absolute left-[10px] sm:left-[-11px] top-[26px] w-[9px] h-[9px] rounded-full bg-neutral-950 border-2 border-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)] z-10 group-hover:scale-130 transition-transform duration-300" />
                  
                  <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-purple-500/20 hover:shadow-[0_0_20px_rgba(168,85,247,0.06)] transition-all duration-300">
                    <span className="font-mono text-xs text-purple-400 font-semibold tracking-widest block mb-1">2024 - 2026</span>
                    <h4 className="font-sans font-bold text-base sm:text-lg text-white group-hover:text-purple-300 transition-colors uppercase">PROJECT MANAGER & CREATIVE PLANNER / 项目经理 · 策划</h4>
                    <p className="text-xs sm:text-sm text-neutral-400 font-semibold mt-1">SHANGHAI ZHIZHEN MARKETING PLANNING CO., LTD. / 上海轾臻市场营销策划有限公司</p>
                    <p className="text-xs sm:text-xs text-neutral-300 leading-relaxed font-light mt-3.5">
                      负责品牌活动从创意策划到项目落地的全流程管理，主导医美、金融、制造业、食品等多个行业项目执行。统筹方案策划、客户沟通、供应商管理与现场运营，逐步从项目执行转向品牌体验设计与创意表达。
                    </p>
                    
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <span className="text-[10px] text-purple-400 font-mono tracking-wider block mb-2 font-semibold">PARTICIPATED & MANAGED PROJECTS / 参与及负责项目包括：</span>
                      <ul className="text-xs text-[#8E8E93] leading-relaxed font-light space-y-1.5 text-left">
                        <li className="flex items-start gap-1.5"><span className="text-purple-500/75 mt-0.5">•</span><span>欣可丽集团酷雪新品发布会（2024-2026）</span></li>
                        <li className="flex items-start gap-1.5"><span className="text-purple-500/75 mt-0.5">•</span><span>科医人 Geneo X PRO GLAM 上市发布会</span></li>
                        <li className="flex items-start gap-1.5"><span className="text-purple-500/75 mt-0.5">•</span><span>中国甜品锦标赛（第四届、第五届）</span></li>
                        <li className="flex items-start gap-1.5"><span className="text-purple-500/75 mt-0.5">•</span><span>东方证券年度策略会（2024、2025）</span></li>
                        <li className="flex items-start gap-1.5"><span className="text-purple-500/75 mt-0.5">•</span><span>雄克中国新工厂开业典礼</span></li>
                        <li className="flex items-start gap-1.5"><span className="text-purple-500/75 mt-0.5">•</span><span>澎湃新闻年度活动</span></li>
                        <li className="flex items-start gap-1.5"><span className="text-purple-500/75 mt-0.5">•</span><span>艾恩摩尔专业乳品推广会（上海、哈尔滨、长沙、成都）</span></li>
                        <li className="flex items-start gap-1.5"><span className="text-purple-500/75 mt-0.5">•</span><span>远大健康西普会及双品会等品牌项目</span></li>
                      </ul>
                    </div>
                  </div>
                </motion.div>

                {/* Exp Item 2 */}
                <motion.div 
                  whileInView={{ opacity: [0, 1], x: [-15, 0] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="relative group pl-10"
                >
                  <div className="absolute left-[10px] sm:left-[-11px] top-[26px] w-[9px] h-[9px] rounded-full bg-neutral-950 border-2 border-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)] z-10 group-hover:scale-130 transition-transform duration-300" />
                  
                  <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-purple-500/20 hover:shadow-[0_0_20px_rgba(168,85,247,0.06)] transition-all duration-300">
                    <span className="font-mono text-xs text-purple-400 font-semibold tracking-widest block mb-1">2023 - 2024</span>
                    <h4 className="font-sans font-bold text-base sm:text-lg text-white group-hover:text-purple-300 transition-colors uppercase">EVENT EXECUTION SPECIALIST / 活动执行</h4>
                    <p className="text-xs sm:text-sm text-neutral-400 font-semibold mt-1">SHANGHAI ZHIZHEN MARKETING PLANNING CO., LTD. / 上海轾臻市场营销策划有限公司</p>
                    <p className="text-xs sm:text-xs text-neutral-300 leading-relaxed font-light mt-3.5">
                      负责大型会议、发布会及品牌活动现场执行管理，参与项目筹备、供应商协调、流程管控及现场运营支持。在高强度项目环境中积累项目统筹经验，建立完整活动执行逻辑与风险管理能力。
                    </p>
                    <p className="text-xs sm:text-xs text-purple-400 font-medium leading-relaxed mt-2 pl-2 border-l border-purple-500/50">
                      逐步完成从执行岗位向项目管理岗位的能力转型。
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right Column: Education Background */}
            <div className="space-y-8 relative">
              <div className="flex items-center gap-3 mb-6 pl-4">
                <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="font-sans font-bold text-xl sm:text-2xl text-white tracking-wider">Education / 教育背景</h3>
              </div>

              {/* Vertical timeline connector track bar */}
              <div className="absolute left-[30px] sm:left-14 top-16 bottom-0 w-[1px] bg-gradient-to-b from-purple-500/30 via-purple-500/10 to-transparent pointer-events-none" />

              <div className="space-y-8 pl-4 sm:pl-12">
                {/* Edu Item 1 */}
                <motion.div 
                  whileInView={{ opacity: [0, 1], x: [15, 0] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative group pl-10"
                >
                  <div className="absolute left-[10px] sm:left-[-11px] top-[26px] w-[9px] h-[9px] rounded-full bg-neutral-950 border-2 border-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)] z-10 group-hover:scale-130 transition-transform duration-300" />
                  
                  <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-purple-500/20 hover:shadow-[0_0_20px_rgba(168,85,247,0.06)] transition-all duration-300">
                    <span className="font-mono text-xs text-purple-400 font-semibold tracking-widest block mb-1">2019 - 2022</span>
                    <h4 className="font-sans font-bold text-base sm:text-lg text-white group-hover:text-purple-300 transition-colors uppercase">EXHIBITION PLANNING & MANAGEMENT / 会展策划与管理</h4>
                    <p className="text-xs sm:text-sm text-neutral-400 font-semibold mt-1">SHANGHAI XINGJIAN COLLEGE / 上海行健职业学院</p>
                    <p className="text-xs sm:text-xs text-purple-400 font-medium tracking-wide mt-2">担任班长、团支书。</p>
                    <p className="text-xs sm:text-xs text-neutral-300 leading-relaxed font-light mt-2">
                      系统学习会展策划、活动运营、项目管理、品牌传播及市场营销相关课程。期间多次参与校内外活动组织与策划实践，建立活动策划与资源协调能力，为后续进入品牌营销与活动行业奠定专业基础。
                    </p>
                  </div>
                </motion.div>

                {/* Edu Item 2 */}
                <motion.div 
                  whileInView={{ opacity: [0, 1], x: [15, 0] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="relative group pl-10"
                >
                  <div className="absolute left-[10px] sm:left-[-11px] top-[26px] w-[9px] h-[9px] rounded-full bg-neutral-950 border-2 border-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)] z-10 group-hover:scale-130 transition-transform duration-300" />
                  
                  <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-purple-500/20 hover:shadow-[0_0_20px_rgba(168,85,247,0.06)] transition-all duration-300">
                    <span className="font-mono text-xs text-purple-400 font-semibold tracking-widest block mb-1">2016 - 2019</span>
                    <h4 className="font-sans font-bold text-base sm:text-lg text-white group-hover:text-purple-300 transition-colors uppercase">BROADCASTING & HOSTING ARTS / 播音主持</h4>
                    <p className="text-xs sm:text-sm text-neutral-400 font-semibold mt-1">HUANGCANG HIGH SCHOOL ART DEPARTMENT / 皇仓中学艺术部</p>
                    <p className="text-xs sm:text-xs text-purple-400 font-medium tracking-wide mt-2">担任专业课代表、校园播音站站长。</p>
                    <p className="text-xs sm:text-xs text-neutral-300 leading-relaxed font-light mt-2">
                      接受系统播音主持训练，培养公众表达、现场控场、沟通协调与内容组织能力。长期参与校园活动主持及广播工作，形成较强的表达能力与舞台感知能力。
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Projects Section - Continuous Auto-scrolling Carousel Display */}
      <section className="relative py-24 sm:py-32 border-t border-neutral-900 overlay-glow-layer overflow-hidden" id="projects">
        {/* Visual Title Banner Row */}
        <div className="px-6 sm:px-12 md:px-20 lg:px-32 max-w-7xl mx-auto mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div id="projects-header-title">
            <span className="text-xs font-mono tracking-[0.4em] text-neutral-500 block mb-2 uppercase">02 / PORTFOLIO CASE STUDY</span>
            <h2 className="font-display font-extrabold text-2xl xs:text-3xl sm:text-4xl text-white tracking-wide uppercase break-words">
              SPATIAL EXPERIENCES (08)
            </h2>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center" id="carousel-info-actions">
            {/* Auto status info */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <span className={`w-1.5 h-1.5 rounded-full ${isHovered ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400 animate-pulse'}`} />
              <span className="font-mono text-[9px] tracking-wider text-neutral-400 uppercase">
                {isHovered ? 'AUTOPLAY: PAUSED (HOVERED)' : 'AUTOPLAY: CONTINUOUS DRIFT'}
              </span>
            </div>

            {/* Slider navigation controllers */}
            <div className="flex gap-2" id="slider-arrow-controls">
              <button 
                onClick={handlePrev}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-300 pointer-events-auto shadow-md"
                aria-label="Previous case"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={handleNext}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-300 pointer-events-auto shadow-md"
                aria-label="Next case"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Cinematic Auto-Scrolling Horizontal Track Container with Wheel-to-Scroll support */}
        <div 
          ref={containerRef}
          className="relative w-full py-4 overflow-hidden z-20 pointer-events-auto select-none touch-pan-y"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseUpOrLeave}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          id="carousel-outer-track"
        >
          {/* Main absolute sliding flex track */}
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32">
            <div className="relative overflow-visible" id="carousel-viewport">
              <div 
                ref={trackRef}
                className="flex gap-6 lg:gap-8 transition-transform duration-75 lg:transition-none"
                style={{
                  width: "max-content"
                }}
              >
                {[...PROJECTS_DATA, ...PROJECTS_DATA].map((project, idx) => {
                  const originalIndex = idx % PROJECTS_DATA.length;
                  const itemUniqueId = `${project.id}-dup-${idx}`;
                  return (
                    <div 
                      key={itemUniqueId} 
                      className="w-[85vw] sm:w-[500px] md:w-[600px] lg:w-[650px] shrink-0"
                    >
                      {/* The Interactive Premium Glass Card */}
                      <div 
                        className="relative w-full min-h-[500px] md:min-h-[550px] rounded-2xl overflow-hidden glass-panel border border-white/5 flex flex-col justify-between group cursor-pointer transition-all duration-500 hover:scale-[1.015] hover:border-purple-500/35 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]"
                        onClick={() => {
                          if (preventClick.current) {
                            preventClick.current = false;
                            return;
                          }
                          setActiveProject(project);
                        }}
                        onMouseEnter={() => setHoveredCardId(itemUniqueId)}
                        onMouseLeave={() => setHoveredCardId(null)}
                      >
                        {/* Premium Purple micro-pulse beacon on active focus hover */}
                        <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                          <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-500"></span>
                          </span>
                        </div>

                        {/* Interactive Abstract Ambient Background inside Card */}
                        <div className="absolute inset-0 bg-gradient-to-b from-[#0e0e13]/20 via-transparent to-[#050505]/95 z-0 pointer-events-none" />
                        
                        {/* Colored dynamic backdrop glow depending on item focus */}
                        <div 
                          className="absolute inset-x-0 top-0 h-[80%] opacity-15 transition-opacity duration-700 group-hover:opacity-25 z-0 pointer-events-none"
                          style={{
                            background: `radial-gradient(circle at 50% 10%, ${project.glowColor} 0%, transparent 70%)`
                          }}
                        />

                        {/* Moving glowing interactive gradient block inside card frame on card focus */}
                        <AnimatePresence>
                          {hoveredCardId === itemUniqueId && (
                            <motion.div 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="absolute -top-12 -left-12 w-64 h-64 bg-white/[0.015] rounded-full blur-2xl pointer-events-none"
                              style={{
                                transform: 'scale(1.5)',
                                background: `radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)`
                              }}
                            />
                          )}
                        </AnimatePresence>

                        {/* Layout Header Area */}
                        <div className="p-6 sm:p-10 z-10 flex justify-between items-start w-full">
                          <div>
                            <span className="font-mono text-xs text-neutral-500 tracking-wider">PROJECT {originalIndex + 1} / 8</span>
                            <span className="mx-2 text-neutral-700 font-light">|</span>
                            <span className="font-mono text-[10px] text-white/95 px-2 py-0.5 rounded bg-white/5 border border-white/10 tracking-widest uppercase">{project.year}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-[9px] text-neutral-400 tracking-widest hidden sm:inline">EXPLORE SYSTEMCASE</span>
                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white group-hover:text-black group-hover:scale-110 transition-all duration-300">
                              <Maximize2 className="w-3.5 h-3.5" />
                            </div>
                          </div>
                        </div>

                        {/* Display Area Center Accent Graphic */}
                        <div className="px-6 sm:px-10 z-10 flex-1 flex items-center justify-center py-6">
                          <div className="relative w-full max-w-xl h-64 sm:h-80 md:h-[350px] rounded-xl overflow-hidden glass-panel border border-white/10 bg-neutral-950 flex items-center justify-center group/panel shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                            {project.coverImage ? (
                              <>
                                {/* Blurred backdrop image to beautifully fill the aspect frame bounds */}
                                <img 
                                  src={project.coverImage} 
                                  alt=""
                                  referrerPolicy="no-referrer"
                                  className="absolute inset-0 w-full h-full object-cover opacity-20 blur-xl scale-110 pointer-events-none transition-transform duration-700 group-hover/panel:scale-125"
                                />
                                {/* Main image shown fully inside container (object-contain) to prevent any cutting/cropping */}
                                <img 
                                  src={project.coverImage} 
                                  alt={project.title}
                                  referrerPolicy="no-referrer"
                                  className="relative z-10 max-w-full max-h-full object-contain p-2.5 transition-transform duration-700 group-hover/panel:scale-[1.025]"
                                />
                              </>
                            ) : (
                              <div className="text-neutral-500 font-mono text-xs">NO COVER IMAGE</div>
                            )}
                            {/* Subtle premium light sweep overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60 pointer-events-none" />
                          </div>
                        </div>

                        {/* Display Info Footer Area */}
                        <div className="p-6 sm:p-10 z-10 w-full border-t border-white/[0.04] bg-gradient-to-t from-black/40 to-transparent">
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                            <div className="md:col-span-12">
                              <div className="flex items-center gap-2 mb-1.5">
                                <span className="px-2.5 py-1 rounded bg-purple-500/10 border border-purple-500/20 text-[10px] sm:text-xs font-mono tracking-widest text-purple-400 uppercase font-medium">{project.category}</span>
                              </div>
                              <h3 className="font-sans font-bold text-2xl sm:text-3xl text-white tracking-wide uppercase">{project.title}</h3>
                              {project.subtitle && (
                                <h4 className="font-serif italic text-sm sm:text-base text-neutral-300 font-light mt-1">{project.subtitle}</h4>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Visual Progress Steps indicators */}
        <div className="px-6 sm:px-12 md:px-20 lg:px-32 max-w-7xl mx-auto mt-10 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
          {/* Scroll progress line */}
          <div className="w-full sm:max-w-xs h-0.5 bg-neutral-900 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-neutral-400 rounded-full"
              animate={{ width: `${((currentIndex + 1) / PROJECTS_DATA.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Stepper text */}
          <div className="flex items-center gap-6 font-mono text-[11px] tracking-widest text-neutral-500">
            <span>INDEX CASE</span>
            <span className="text-white text-sm font-semibold">{String(currentIndex + 1).padStart(2, '0')}</span>
            <span className="text-neutral-800">/</span>
            <span>{String(PROJECTS_DATA.length).padStart(2, '0')}</span>
          </div>

          {/* Dot indices selector indicators */}
          <div className="flex gap-2" id="carousel-bullets">
            {PROJECTS_DATA.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (trackRef.current) {
                    const singleSetWidth = trackRef.current.scrollWidth / 2;
                    const cardWidth = singleSetWidth / PROJECTS_DATA.length;
                    targetX.current = -idx * cardWidth;
                  }
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-white scale-125' : 'bg-neutral-800 hover:bg-neutral-600'}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 7. Detailed Case Information Pop-Up / Modal Sheet for High-quality interaction */}
      <AnimatePresence>
        {activeProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 pointer-events-auto"
            id="case-modal"
          >
            {/* Dark background modal overlay */}
            <div 
              className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-zoom-out"
              onClick={() => setActiveProject(null)}
            />

            {/* Core Modal Box Sheet Document */}
            <motion.div 
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-panel-heavy rounded-3xl border border-white/10 shadow-2xl z-10 no-scrollbar pointer-events-auto"
            >
              {/* Colored dynamic background inside modal depending on project spec */}
              <div 
                className="absolute inset-x-0 top-0 h-[300px] opacity-10 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${activeProject.glowColor} 0%, transparent 70%)`
                }}
              />

              {/* High precision modal close */}
              <button 
                onClick={() => setActiveProject(null)}
                className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 z-10 shadow-lg"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Active project body presentation */}
              <div className="p-6 sm:p-10 md:p-14">
                {/* Meta details */}
                <span className="font-mono text-xs text-neutral-400 tracking-[0.4em] block mb-2 uppercase">
                  {activeProject.categoryEn}
                </span>

                <h3 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-white tracking-wide uppercase leading-tight">
                  {activeProject.title}
                </h3>
                
                {activeProject.subtitle ? (
                  <h4 className="font-serif italic text-lg sm:text-xl text-neutral-300 font-light mt-1.5 mb-8">
                    {activeProject.subtitle}
                  </h4>
                ) : (
                  <div className="mb-6" />
                )}

                {/* Cover Image in Modal */}
                {activeProject.coverImage && (
                  <div className="relative w-full h-64 sm:h-96 md:h-[450px] rounded-2xl overflow-hidden mb-8 border border-white/10 bg-neutral-950 shadow-2xl flex items-center justify-center group/modal-cover">
                    {/* Blurred backdrop image to beautifully fill the aspect frame bounds */}
                    <img 
                      src={activeProject.coverImage} 
                      alt=""
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover opacity-20 blur-xl scale-110 pointer-events-none"
                    />
                    {/* Main image shown fully inside container (object-contain) to prevent any cutting/cropping */}
                    <img 
                      src={activeProject.coverImage} 
                      alt={activeProject.title}
                      referrerPolicy="no-referrer"
                      className="relative z-10 max-w-full max-h-full object-contain p-2.5 transition-transform duration-700 hover:scale-[1.01]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none z-20" />
                  </div>
                )}

                {/* Subsystem design box */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-10 pb-10 border-b border-white/5">
                  
                  {/* Text columns */}
                  <div className="md:col-span-7 space-y-6">
                    <div>
                      <span className="text-xs font-mono text-neutral-500 tracking-widest block mb-2 uppercase">THE SPATIAL SCENARIO</span>
                      <p className="text-sm sm:text-base text-neutral-200 leading-relaxed font-light">
                        {activeProject.description}
                      </p>
                    </div>

                    <div className="pt-2">
                      <span className="text-xs font-mono text-purple-400 tracking-[0.2em] block mb-2.5 uppercase font-semibold">LIVE EXPERIENCE ALBUM / 直播云相册</span>
                      <a 
                        href={activeProject.albumUrl || "https://v.alltuu.com/"}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-4 px-5 py-4 rounded-xl bg-gradient-to-r from-purple-950/20 via-indigo-950/20 to-purple-950/10 border border-purple-500/25 hover:border-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] transition-all duration-300 group/link w-full text-left"
                      >
                        <div className="w-11 h-11 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/15 group-hover/link:scale-105 group-hover/link:bg-purple-500/15 transition-all duration-300">
                          <Image className="w-5 h-5 text-purple-300 group-hover/link:text-purple-100" />
                        </div>
                        <div className="flex-1">
                          <span className="text-[9px] font-mono text-purple-400 block tracking-widest leading-none font-semibold uppercase mb-1">PROJECT GALLERY</span>
                          <span className="text-sm text-white font-sans font-bold block tracking-wide">
                            点击进入官方·现场直播云相册 <ExternalLink className="inline-block w-3.5 h-3.5 ml-1 text-purple-400 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                          </span>
                        </div>
                      </a>
                    </div>
                  </div>

                  {/* Technical Spec attributes */}
                  <div className="md:col-span-5 space-y-6">
                    <div className="glass-panel p-5 rounded-xl border border-white/5 bg-white/[0.01]">
                      <span className="text-[10px] font-mono text-neutral-500 tracking-widest block mb-3 uppercase font-semibold">ELEMENT CHOREOGRAPHY</span>
                      <div className="flex flex-wrap gap-2">
                        {activeProject.tags.map((tag, tagIndex) => (
                          <div 
                            key={tagIndex} 
                            className="px-3 py-1 bg-white/5 border border-white/10 rounded-full flex items-center gap-1.5"
                          >
                            <span className="w-1 h-1 rounded-full bg-white/70" />
                            <span className="text-xs font-mono text-neutral-300">{tag}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="glass-panel p-4 rounded-xl border border-white/5 text-center">
                        <span className="text-[9px] font-mono text-neutral-500 tracking-widest block mb-1">DATE MATCH</span>
                        <span className="text-sm font-display font-semibold text-white tracking-widest">{activeProject.year} AD</span>
                      </div>
                      <div className="glass-panel p-4 rounded-xl border border-white/5 text-center">
                        <span className="text-[9px] font-mono text-neutral-500 tracking-widest block mb-1">CRAFT STATUS</span>
                        <span className="text-sm font-display font-semibold text-white tracking-widest">DEPLOYED</span>
                      </div>
                    </div>
                  </div>
                </div>


              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 8. Elegant Contact & Outreach Section with full chinese details */}
      <section className="relative px-6 sm:px-12 md:px-20 lg:px-32 py-24 sm:py-32 border-t border-neutral-900 bg-black/40 z-10" id="contact">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
            
            {/* Direct Outreach Copy Columns */}
            <div className="lg:col-span-6 space-y-8" id="contact-column-left">
              <div>
                <span className="text-xs font-mono tracking-[0.4em] text-neutral-500 block mb-2 uppercase">03 / COLLABORATION</span>
                <h2 className="font-display font-extrabold text-2xl xs:text-3xl sm:text-4xl text-white tracking-wide uppercase break-words">
                  LET'S BUILD THE UNIVERSE
                </h2>
              </div>

              <p className="text-sm text-neutral-400 leading-relaxed font-light max-w-md whitespace-pre-line">
                {`Let's create something worth remembering.
无论是一场发布会、
一次品牌体验，
还是一个新的故事开始。
期待与你共同完成下一次值得被记住的相遇。`}
              </p>


            </div>

            {/* Premium Outreach Terminal (Right side Interactive cards with Copy Triggers) */}
            <div className="lg:col-span-6 space-y-6" id="contact-outbox-cards">
              
              {/* Premium outreach card 1: Email */}
              <div 
                className="glass-panel p-6 sm:p-8 rounded-2xl flex items-center justify-between border border-white/5 hover:border-white/15 transition-all duration-300 group cursor-pointer"
                onClick={() => copyContact("tianxi525@gmail.com", "EMAIL")}
                id="contact-email-card"
              >
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-5 h-5 text-neutral-300 group-hover:text-white" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-neutral-500 block tracking-widest leading-none">PRIMARY WORKMAIL</span>
                    <span className="text-base sm:text-lg text-white font-serif italic mt-1.5 inline-block tracking-wide">tianxi525@gmail.com</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                  <span className="text-[9px] font-mono tracking-wider hidden sm:inline">COPY</span>
                  <Copy className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Premium outreach card 2: Phone */}
              <div 
                className="glass-panel p-6 sm:p-8 rounded-2xl flex items-center justify-between border border-white/5 hover:border-white/15 transition-all duration-300 group cursor-pointer"
                onClick={() => copyContact("16674314896", "PHONE")}
                id="contact-phone-card"
              >
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-5 h-5 text-neutral-300 group-hover:text-white" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-neutral-500 block tracking-widest leading-none">MOBILE PHONE / We chat</span>
                    <span className="text-base sm:text-lg text-white font-display font-medium mt-1.5 inline-block tracking-widest">16674314896</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                  <span className="text-[9px] font-mono tracking-wider hidden sm:inline">COPY</span>
                  <Copy className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Toast clipboard alert popup */}
              <AnimatePresence>
                {copiedText !== "" && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 rounded-xl bg-white text-black font-mono text-xs tracking-widest flex items-center justify-between shadow-2xl"
                  >
                    <span>{copiedText} SUCCESFULLY COPIED TO CLIPBOARD</span>
                    <Check className="w-4 h-4 text-emerald-600" />
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </div>

          {/* Page Footer system */}
          <div className="mt-24 sm:mt-32 pt-8 sm:pt-10 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6" id="footer-row">
            <div className="flex items-center gap-3">
              <span className="font-display font-extrabold text-[13px] tracking-widest text-neutral-300">TIANXI</span>
              <span className="text-neutral-700">|</span>
              <span className="text-[10px] font-mono text-neutral-500 tracking-wider">PREMIUM EXPERIENCE SYSTEM</span>
            </div>
            
            <div className="text-[10px] font-mono text-neutral-500 tracking-wider text-center sm:text-right">
              <span>© {new Date().getFullYear()} TIANXI. ALL BOUNDARIES EMBRIDLED.</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
