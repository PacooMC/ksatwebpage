import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { MENU_ITEMS, SECTION_IDS } from '../constants/navigation';

interface NavigationProps { isVisible: boolean; }
const navVariants = {
    hidden: { y: -80, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: 'easeInOut' } }
};

export function Navigation({ isVisible }: NavigationProps) {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleClick = (item: string) => {
    const sectionId = SECTION_IDS[item as keyof typeof SECTION_IDS];
    setIsMobileMenuOpen(false); // Close mobile menu regardless

    if (isHome && sectionId.startsWith('#')) {
      // Use timeout to ensure content is rendered before scrolling
      setTimeout(() => {
        const element = document.querySelector(sectionId);
        if (element) {
          const offset = 80; // Height of the fixed navbar
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
           // Optionally update hash after scroll
           // window.history.pushState(null, '', sectionId);
        }
      }, 0); // Timeout 0 allows the browser to process pending updates
    }
    // If it's not a hash link on the home page, the Link component handles navigation
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.nav key="main-navigation" variants={navVariants} initial="hidden" animate="visible" exit="hidden" className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-cyan-500/20">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex items-center justify-between h-20">
                {/* Logo */}
                <Link to={isHome ? "/#content" : "/"} onClick={() => setIsMobileMenuOpen(false)}> {/* Link logo to content on home */}
                  <motion.div className="flex items-center space-x-3" whileHover={{ scale: 1.03 }}>
                     <h1 className="text-lg font-semibold tracking-widest text-cyan-300" style={{ textShadow: '0 0 8px theme(colors.cyan.500)' }}> MALAGA SPACE TEAM </h1>
                  </motion.div>
                </Link>
                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                  {MENU_ITEMS.map((item) => {
                    const sectionId = SECTION_IDS[item as keyof typeof SECTION_IDS];
                    // Determine active state more robustly
                    const isActive = location.pathname === sectionId || (isHome && location.hash === sectionId);

                    if (item === 'Home') return null;

                    // Use Link for page navigation, button for hash scrolling on Home
                    if (isHome && sectionId.startsWith('#')) {
                       return (
                          <button key={item} onClick={() => handleClick(item)} className={`relative group ${isActive ? 'text-cyan-300' : 'text-cyan-100/70'} hover:text-cyan-300 transition-colors tracking-wide text-sm font-medium bg-transparent border-none`}>
                             <motion.span whileHover={{ scale: 1.05 }} className="relative py-1"> {item} {isActive && ( <motion.div layoutId="activeNavTab" className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" style={{ filter: 'drop-shadow(0 0 3px theme(colors.cyan.500))' }} /> )} <span className="absolute -bottom-1.5 left-0 w-full h-0.5 bg-cyan-400/50 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></span> </motion.span>
                          </button>
                       );
                    } else {
                       return (
                          <Link key={item} to={sectionId} onClick={() => handleClick(item)} className={`relative group ${isActive ? 'text-cyan-300' : 'text-cyan-100/70'} hover:text-cyan-300 transition-colors tracking-wide text-sm font-medium`}>
                             <motion.span whileHover={{ scale: 1.05 }} className="relative py-1"> {item} {isActive && ( <motion.div layoutId="activeNavTab" className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" style={{ filter: 'drop-shadow(0 0 3px theme(colors.cyan.500))' }} /> )} <span className="absolute -bottom-1.5 left-0 w-full h-0.5 bg-cyan-400/50 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></span> </motion.span>
                          </Link>
                       );
                    }
                  })}
                </div>
                {/* Mobile Menu Button */}
                <motion.button className="md:hidden text-cyan-200/80 hover:text-cyan-300 p-2 rounded-md hover:bg-cyan-500/10" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu"> {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />} </motion.button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isVisible && isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.2, ease: 'easeInOut' }} className="fixed inset-x-0 top-20 z-40 bg-black/95 backdrop-blur-xl border-b border-cyan-500/20 md:hidden shadow-lg">
            <div className="p-5 space-y-2">
              {MENU_ITEMS.map((item) => {
                const sectionId = SECTION_IDS[item as keyof typeof SECTION_IDS];
                const isActive = location.pathname === sectionId || (isHome && location.hash === sectionId);
                 // Use Link for page nav, button for hash scroll
                 if (isHome && sectionId.startsWith('#')) {
                    return (
                       <button key={item} onClick={() => handleClick(item)} className={`block w-full py-3 px-4 rounded-lg text-center font-medium ${ isActive ? 'bg-cyan-500/20 text-cyan-200' : 'text-cyan-100/80 hover:bg-cyan-500/10 hover:text-cyan-200' } transition-all duration-200`}>
                          {item}
                       </button>
                    );
                 } else {
                    return (
                       <Link key={item} to={sectionId} onClick={() => handleClick(item)} className={`block py-3 px-4 rounded-lg text-center font-medium ${ isActive ? 'bg-cyan-500/20 text-cyan-200' : 'text-cyan-100/80 hover:bg-cyan-500/10 hover:text-cyan-200' } transition-all duration-200`}>
                          {item}
                       </Link>
                    );
                 }
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
