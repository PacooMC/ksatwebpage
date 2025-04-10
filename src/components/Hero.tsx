import { motion } from 'framer-motion';
import { HERO_CONTENT } from '../constants';
import SatelliteImage from '../satellite-png.png'; // Import the satellite image

interface HeroProps {
  onExploreClick: () => void;
}

// --- Animation Variants ---
const entryDuration = 0.7;
const entryEase = [0.25, 0.46, 0.45, 0.94]; // Smoother ease

// Entry Variants
const textContainerEntry = { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: entryDuration, ease: entryEase, staggerChildren: 0.15 } } };
const titleEntry = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const subtitleEntry = { hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } };
const buttonEntry = { hidden: { opacity: 0, y: 10, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1 } };

const satelliteContainerEntry = { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: entryDuration, delay: 0.2, ease: entryEase } } };
const satelliteImageEntry = { hidden: { opacity: 0, scale: 0.8, rotate: 10 }, visible: { opacity: 1, scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 100, damping: 15, delay: 0.3 } } };
const infoBoxEntry = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.5 } } };

// Exit Variants
const exitDuration = 0.4;
const exitEase = 'easeIn';
const textContainerExit = { opacity: 0, x: -100, transition: { duration: exitDuration, ease: exitEase } };
const satelliteContainerExit = { opacity: 0, x: 100, filter: 'blur(8px)', transition: { duration: exitDuration, ease: exitEase, delay: 0.1 } };
// --- End Variants ---

export function Hero({ onExploreClick }: HeroProps) {
  return (
    <motion.section
      key="hero-new-design" // New key for AnimatePresence
      className="relative h-screen overflow-hidden flex items-center justify-center px-4"
      exit="exit" // Reference the exit state for variants below
    >
      {/* Background is handled by body CSS */}

      {/* Content Wrapper - Grid for layout */}
      <div className="relative z-20 w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

        {/* Left Column: Text Content */}
        <motion.div
          className="flex flex-col items-center md:items-start text-center md:text-left"
          variants={{ hidden: textContainerEntry.hidden, visible: textContainerEntry.visible, exit: textContainerExit }}
          initial="hidden"
          animate="visible"
        >
          {/* Title */}
          <motion.h1
            className="text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight tracking-tight" // Adjusted size, weight, spacing
            variants={titleEntry}
          >
            MÁLAGA <br /> SPACE TEAM {/* Line break */}
          </motion.h1>

          {/* Subtitle */}
          <motion.h2
            className="text-lg md:text-xl text-cyan-300/90 mb-8" // Adjusted size, color
            variants={subtitleEntry}
          >
            {HERO_CONTENT.subtitle}
          </motion.h2>

          {/* Explore Button */}
          <motion.button
            onClick={onExploreClick}
            // Updated styling to match design (glow effect via shadow)
            className="relative inline-flex items-center justify-center px-8 py-2.5 text-base font-medium text-cyan-200 bg-transparent border border-cyan-400 rounded-md shadow-[0_0_15px_theme(colors.cyan.500/50)] transition-all duration-300 ease-in-out group overflow-hidden hover:bg-cyan-400/10 hover:shadow-[0_0_25px_theme(colors.cyan.500/70)] hover:text-white"
            variants={buttonEntry}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="relative z-10 tracking-wider">
              ENGAGE WARP DRIVE
            </span>
          </motion.button>
        </motion.div>

        {/* Right Column: Satellite Image & Info */}
        <motion.div
          className="relative flex flex-col items-center"
          variants={{ hidden: satelliteContainerEntry.hidden, visible: satelliteContainerEntry.visible, exit: satelliteContainerExit }}
          initial="hidden"
          animate="visible"
        >
          {/* Satellite Image */}
          <motion.img
            src={SatelliteImage}
            alt="KSAT Satellite Illustration"
            className="w-full max-w-md lg:max-w-lg mb-6" // Responsive width
            style={{ filter: 'drop-shadow(0 0 15px theme(colors.cyan.600/40))' }} // Subtle glow
            variants={satelliteImageEntry}
          />

          {/* Info Box */}
          <motion.div
            className="bg-black/30 backdrop-blur-sm border border-cyan-500/40 rounded-lg px-5 py-3 text-center shadow-lg shadow-cyan-900/20"
            variants={infoBoxEntry}
          >
            <p className="text-sm text-cyan-200 mb-0.5">KSAT Orbit: 420 km</p>
            <p className="text-xs text-cyan-400/80">Virtualized SDR - LoRa Ready</p>
          </motion.div>
        </motion.div>

      </div>
    </motion.section>
  );
}
