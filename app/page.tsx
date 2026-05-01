"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [showSlides, setShowSlides] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isClient, setIsClient] = useState(false);
  
  const [showLogo, setShowLogo] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showFooter, setShowFooter] = useState(false);
  
  const [particles, setParticles] = useState<Array<any>>([]);

  const slides = [
    { text: "Aquí nada es por moda ", highlight: " moda", special: "strike" },
    { text: "Productos que realmente sirven o aportan a tu vida", highlight: null, special: null },
    { text: "Menos ruido. Más utilidad", highlight: "null", special: null },
    { text: "Elegimos por ti lo que vale la pena", highlight: null, special: null },
    { text: "Universaz. Inteligencia al comprar", highlight: "Universaz", special: "glow" },
  ];

  useEffect(() => {
    setShowLogo(true);
    const timer1 = setTimeout(() => setShowTitle(true), 200);
    const timer2 = setTimeout(() => setShowSubtitle(true), 400);
    const timer3 = setTimeout(() => setShowLoader(true), 600);
    const timer4 = setTimeout(() => setShowButton(true), 800);
    const timer5 = setTimeout(() => setShowFooter(true), 1000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, []);

  useEffect(() => {
    setIsClient(true);
    const newParticles = [];
    for (let i = 0; i < 30; i++) {
      const isRed = Math.random() > 0.6;
      newParticles.push({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: `${1 + Math.random() * 2.5}px`,
        height: `${1 + Math.random() * 2.5}px`,
        background: `radial-gradient(circle, ${isRed ? "rgb(255,42,36)" : "rgb(255,255,255)"} 0%, ${isRed ? "rgba(225,6,0,0.6)" : "rgba(255,255,255,0.5)"} 60%, transparent 100%)`,
        boxShadow: isRed ? "rgba(225,6,0,0.7) 0px 0px 8px" : "rgba(255,255,255,0.5) 0px 0px 6px",
        animation: `floatParticle ${8 + Math.random() * 20}s linear -${Math.random() * 30}s infinite normal none running`,
        dx: `${(Math.random() - 0.5) * 50}px`,
        op: 0.35 + Math.random() * 0.3,
      });
    }
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 80) {
          clearInterval(interval);
          return 80;
        }
        return prev + 1;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setDirection(1);
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleWheel = (e: WheelEvent) => {
    if (e.deltaY > 0) nextSlide();
    else if (e.deltaY < 0) prevSlide();
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") nextSlide();
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") prevSlide();
  };

  useEffect(() => {
    if (showSlides) {
      window.addEventListener("wheel", handleWheel);
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("wheel", handleWheel);
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [showSlides, currentSlide]);

  const slideVariants = {
    enter: (direction: number) => ({ y: direction > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { y: 0, opacity: 1 },
    exit: (direction: number) => ({ y: direction > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen w-full relative bg-black text-white overflow-hidden">
      {/* Partículas */}
      {isClient && (
        <div className="fixed inset-0 pointer-events-none z-5">
          <div className="absolute inset-0" style={{ opacity: 1 }}>
            {particles.map((particle) => (
              <span
                key={particle.id}
                className="absolute rounded-full"
                style={{
                  left: particle.left,
                  top: particle.top,
                  width: particle.width,
                  height: particle.height,
                  background: particle.background,
                  boxShadow: particle.boxShadow,
                  animation: particle.animation,
                  ["--dx" as string]: particle.dx,
                  ["--op" as string]: particle.op,
                } as React.CSSProperties}
              />
            ))}
          </div>
        </div>
      )}

      {/* Efectos de fondo */}
      <div className="fixed inset-0 pointer-events-none z-5">
        <div 
          className="absolute inset-0 pointer-events-none opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "100px",
          }}
        />
        <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] pointer-events-none" />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.3)_2px,rgba(0,0,0,0.3)_4px)] pointer-events-none" />
      </div>

      {/* Pantalla de carga */}
      {!showSlides && (
        <main className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center px-8 sm:px-12 md:px-16 py-12">
          
          {/* Glow radial detrás del logo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[58%] w-[680px] h-[680px] max-w-[95vw] max-h-[95vw] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(225,6,0,0.22) 0%, rgba(225,6,0,0.08) 38%, transparent 70%)", filter: "blur(40px)" }}
          />

          {/* Contenedor principal */}
          <div className="flex flex-col items-center text-center max-w-3xl w-full">
            
            {/* 1. LOGO */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate={showLogo ? "visible" : "hidden"}
              className="mb-10 sm:mb-12 md:mb-16"
            >
              <div className="animate-floatY">
                <Image
                  src="/LogoSinFondoTamanoGrande.png"
                  alt="Universaz"
                  width={200}
                  height={75}
                  className="w-40 sm:w-48 md:w-60 lg:w-72 select-none drop-shadow-[0_0_24px_rgba(225,6,0,0.55)]"
                  draggable={false}
                  priority
                />
              </div>
            </motion.div>

            {/* 2. TÍTULO PRINCIPAL */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate={showTitle ? "visible" : "hidden"}
              className="mb-12 sm:mb-16 md:mb-20"
            >
              <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight leading-[1.2]">
                ESTAMOS
              </h2>
              <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight leading-[1.2]">
                CONSTRUYENDO
              </h2>
              <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight leading-[1.2]">
                <span className="text-[#FF2A24]" style={{ textShadow: "0 0 15px #FF2A24, 0 0 30px rgba(255,42,36,0.5)" }}>
                  ALGO GRANDE
                </span>
              </h2>
              <div className="mx-auto mt-6 sm:mt-8 w-16 sm:w-20 h-[2px] bg-gradient-to-r from-transparent via-[#FF2A24] to-transparent" />
            </motion.div>
            <br></br>

            {/* 3. SUBTÍTULO */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate={showSubtitle ? "visible" : "hidden"}
              className="mb-16 sm:mb-20 md:mb-24"
            >
              <p className="text-xs sm:text-sm md:text-base tracking-[0.3em] sm:tracking-[0.45em] uppercase text-white/70">
                UNIVERSAZ ESTÁ LLEGANDO
              </p>
            </motion.div>
            <br></br>
            {/* 4. BARRA DE CARGA */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate={showLoader ? "visible" : "hidden"}
              className="w-full max-w-[280px] sm:max-w-sm md:max-w-md mb-12 sm:mb-16 md:mb-20"
            >
              <div className="flex w-full items-center justify-between text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.45em] uppercase text-white/55 mb-2">
                <span>CARGANDO...</span>
                <span className="text-[#FF6A66] font-medium tabular-nums">{progress}%</span>
              </div>
              <div className="relative w-full h-1.5 sm:h-2 rounded-full bg-white/[0.07] overflow-hidden ring-1 ring-white/5">
                <div
                  role="progressbar"
                  className="h-full rounded-full"
                  style={{
                    width: `${progress}%`,
                    background: "linear-gradient(90deg, rgb(122,3,0) 0%, rgb(225,6,0) 45%, rgb(255,42,36) 100%)",
                    boxShadow: "rgba(225,6,0,0.55) 0px 0px 12px, rgba(225,6,0,0.35) 0px 0px 30px",
                    transition: "width 80ms linear",
                  }}
                />
                <div 
                  className="absolute inset-0 w-full h-full"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                    transform: "translateX(-100%)",
                    animation: "shine 1.5s infinite",
                  }}
                />
              </div>
              <p className="text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] uppercase text-white/30 mt-3">
                PREPARANDO LA EXPERIENCIA
              </p>
            </motion.div>

            {/* 5. BOTÓN */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate={showButton ? "visible" : "hidden"}
            >
              <br></br>
              <button
                onClick={() => setShowSlides(true)}
                className="group relative rounded-full bg-transparent border border-white/30 text-white font-semibold tracking-wider text-sm sm:text-base transition-all duration-300 hover:bg-[#FF2A24] hover:border-[#FF2A24] hover:shadow-[0_0_30px_#FF2A24] flex items-center cursor-pointer"
                style={{ padding: "10px 28px", paddingLeft: "32px", paddingRight: "32px" }}
              >
                <span>Descubre más</span>
                <svg 
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-2 group-hover:translate-y-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </motion.div>
          </div>
          <br></br>
          <br></br>
          <br></br>

          {/* FOOTER */}
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: showFooter ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-4 left-0 right-0 text-center text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] uppercase text-white/40"
          >
            © UNIVERSAZ
          </motion.footer>
        </main>
      )}

      {/* Carrusel de slides */}
      <AnimatePresence mode="wait" custom={direction}>
        {showSlides && (
          <motion.section
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ y: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 sm:px-12 md:px-20 py-20"
            onClick={nextSlide}
          >
            <div className="absolute top-8 left-6 sm:left-8 flex items-center gap-2">
              <span className="text-red-500 font-bold text-base sm:text-lg">{(currentSlide + 1).toString().padStart(2, "0")}</span>
              <span className="text-gray-500 text-sm">/</span>
              <span className="text-gray-500 text-sm">{slides.length.toString().padStart(2, "0")}</span>
            </div>

            <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "100%",
                  height: "100%",
                  background: "radial-gradient(circle, rgba(255,42,36,0.4) 0%, rgba(255,42,36,0.15) 40%, transparent 70%)",
                  filter: "blur(50px)",
                  pointerEvents: "none",
                  borderRadius: "50%",
                }}
              />
              
              <motion.h2
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                style={{
                  fontSize: "clamp(1.5rem, 6vw, 3rem)",
                  fontWeight: "bold",
                  color: "white",
                  maxWidth: "90%",
                  lineHeight: 1.3,
                  whiteSpace: "pre-line",
                  position: "relative",
                  zIndex: 10,
                }}
              >
                {slides[currentSlide].special === "strike" && (
                  <>
                    Aquí nada es por 
                    <span style={{ color: "#FF2A24", textDecoration: "line-through", textDecorationThickness: "2px", textShadow: "0 0 10px #FF2A24, 0 0 20px #FF2A24, 0 0 40px #FF2A24" }}>
                      {slides[currentSlide].highlight}
                    </span>
                  </>
                )}
                {slides[currentSlide].special === "glow" && (
                  <>
                    <span style={{ color: "#FF2A24", textShadow: "0 0 10px #FF2A24, 0 0 20px #FF2A24, 0 0 40px #FF2A24" }}>
                      {slides[currentSlide].highlight}
                    </span>{" "}
                    inteligencia al comprar...
                  </>
                )}
                {!slides[currentSlide].special && slides[currentSlide].text}
              </motion.h2>
            </div>

            {currentSlide < slides.length - 1 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="absolute bottom-24 text-center">
                <p className="text-gray-500 text-xs tracking-wider mb-2">DESLIZA · RUEDA · FLECHAS</p>
                <svg className="w-5 h-5 mx-auto text-gray-400 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.div>
            )}

            <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setDirection(idx > currentSlide ? 1 : -1); setCurrentSlide(idx); }}
                  className={`transition-all duration-300 rounded-full ${idx === currentSlide ? "w-6 h-1 bg-red-500 shadow-[0_0_5px_red]" : "w-1 h-1 bg-gray-600"}`}
                />
              ))}
            </div>

            <p className="absolute bottom-8 text-gray-600 text-sm">(Haz clic para continuar)</p>
          </motion.section>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes floatParticle {
          0% { transform: translate3d(0, 0, 0); opacity: 0; }
          10% { opacity: var(--op, 0.4); }
          90% { opacity: var(--op, 0.4); }
          100% { transform: translate3d(var(--dx, 0px), -120vh, 0); opacity: 0; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(5px); }
        }
        @keyframes shine {
          100% { transform: translateX(100%); }
        }
        @keyframes floatY {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .animate-bounce {
          animation: bounce 1s infinite;
        }
        .animate-floatY {
          animation: floatY 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}