import { useNavigate, Link } from 'react-router-dom'; // Import Link
    import { useState, useEffect } from 'react';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Box, Target, CalendarDays, Users, ArrowRight } from 'lucide-react'; // Added ArrowRight
    import { Navigation } from '../components/Navigation';
    import { Hero } from '../components/Hero';
    import { PostHeroTransition } from '../components/PostHeroTransition';
    import { Timeline } from '../components/Timeline';
    import { Sponsors } from '../components/Sponsors';
    import { ABOUT_CONTENT, PROJECTS_CONTENT } from '../constants';

    type TransitionPhase = 'hero' | 'exitingHero' | 'postHero' | 'mainContent';

    export function Home() {
      const navigate = useNavigate();
      const initialPhase = window.location.hash === '#content' ? 'mainContent' : 'hero';
      const [transitionPhase, setTransitionPhase] = useState<TransitionPhase>(initialPhase);

      const mainContentVariant = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5, delay: 0.2 } }
      };
      const sectionVariant = {
        hidden: { opacity: 0, y: 25 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } }
      };

      const handleExploreClick = () => {
         if (transitionPhase === 'hero') {
            setTransitionPhase('exitingHero');
            setTimeout(() => {
                setTransitionPhase('postHero');
                setTimeout(() => {
                    setTransitionPhase('mainContent');
                     setTimeout(() => {
                        window.history.replaceState(null, '', '/#content');
                        const aboutElement = document.getElementById('about');
                        if (aboutElement) {
                            const offset = 80;
                            const bodyRect = document.body.getBoundingClientRect().top;
                            const elementRect = aboutElement.getBoundingClientRect().top;
                            const elementPosition = elementRect - bodyRect;
                            const offsetPosition = elementPosition - offset;
                            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                        }
                     }, 100);
                }, 1000);
            }, 500);
         }
      };

      useEffect(() => {
        if (window.location.hash === '#content') {
          setTransitionPhase('mainContent');
        }
        if (transitionPhase === 'hero' || transitionPhase === 'postHero' || transitionPhase === 'exitingHero') {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
      }, [transitionPhase]);

      const getIconComponent = (iconName: string | undefined) => {
        if (!iconName) return null;
        const icons: { [key: string]: React.ComponentType<any> } = { Box, Target, CalendarDays, Users };
        return icons[iconName] || null;
      };

      return (
        <div className="text-gray-300 overflow-x-hidden">
          <Navigation isVisible={transitionPhase === 'postHero' || transitionPhase === 'mainContent'} />

          <AnimatePresence> {transitionPhase === 'hero' && <Hero key="hero-initial" onExploreClick={handleExploreClick} />} </AnimatePresence>
          <AnimatePresence> {transitionPhase === 'postHero' && <PostHeroTransition key="post-hero-view" />} </AnimatePresence>

          <AnimatePresence>
            {transitionPhase === 'mainContent' && (
                <motion.div key="main-content-area" initial="hidden" animate="visible" exit={{ opacity: 0 }} variants={mainContentVariant} className="pt-16">
                  {/* --- About Section --- */}
                  <motion.section id="about" className="relative z-10 py-12 md:py-16" variants={sectionVariant}>
                     <div className="max-w-6xl mx-auto px-4">
                       <div className="bg-space-card rounded-xl shadow-lg border border-cyan-500/20 relative overflow-hidden">
                         <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-900/30 rounded-full blur-3xl opacity-40"></div>
                         <div className="relative z-10 grid md:grid-cols-2 items-center gap-6 md:gap-10">
                           <div className="p-8 md:p-10">
                             <h2 className="text-4xl md:text-5xl font-bold text-white mb-4"> {ABOUT_CONTENT.title} </h2>
                             {ABOUT_CONTENT.description.map((p, i) => <p key={i} className="text-lg text-gray-400 leading-relaxed mb-4">{p}</p>)}
                             <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mt-6">
                               <div className="text-left sm:text-right">
                                 <p className="text-4xl font-bold text-cyan-400">{ABOUT_CONTENT.teamStats.memberCount.split(' ')[0]}</p>
                                 <p className="text-lg text-gray-400">{ABOUT_CONTENT.teamStats.memberCount.split(' ').slice(1).join(' ')}</p>
                               </div>
                               <motion.button onClick={() => navigate('/team')} whileHover={{ scale: 1.03, filter: 'brightness(1.2)', boxShadow: '0 0 15px theme(colors.cyan.500)' }} whileTap={{ scale: 0.97 }} className="px-6 py-2.5 border-2 border-cyan-400 text-cyan-300 rounded-full text-base font-semibold transition-all duration-200 hover:bg-cyan-400/10 hover:text-cyan-200 shadow-md shadow-cyan-500/20">
                                 {ABOUT_CONTENT.cta.text}
                               </motion.button>
                             </div>
                           </div>
                           <div className="aspect-w-4 aspect-h-3 md:aspect-w-1 md:aspect-h-1 overflow-hidden rounded-r-xl md:rounded-l-none md:rounded-r-xl">
                             <img src={ABOUT_CONTENT.image} alt="Malaga Space Team working" className="object-cover w-full h-full"/>
                           </div>
                         </div>
                       </div>
                     </div>
                  </motion.section>

                  {/* --- Core Missions Section --- */}
                  <motion.section id="projects" className="py-12 md:py-16" variants={sectionVariant}>
                     <div className="max-w-7xl mx-auto px-4">
                      <div className="text-center mb-10 md:mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">Our Core Missions</h2>
                        <p className="text-lg text-gray-400">Explore our key areas of focus.</p> {/* Updated subtitle */}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {PROJECTS_CONTENT.map((project, index) => {
                          const IconComponent = getIconComponent(project.icon);
                          return (
                            <motion.div
                              key={project.title}
                              variants={sectionVariant}
                              className="group relative bg-space-card rounded-xl border border-cyan-500/20 flex flex-col h-full transition-all duration-300 hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-900/30 hover:-translate-y-1 overflow-hidden"
                            >
                              {/* Image Section */}
                              {project.imageUrl && (
                                <div className="aspect-video w-full overflow-hidden rounded-t-xl">
                                  <img src={project.imageUrl} alt={project.title} className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" />
                                </div>
                              )}

                              {/* Content Section */}
                              <div className="relative z-10 p-6 flex flex-col flex-grow"> {/* Added flex-grow */}
                                {IconComponent && (
                                  <div className="mb-4 p-3 rounded-lg bg-cyan-900/30 border border-cyan-500/30 inline-block self-start" style={{ filter: 'drop-shadow(0 0 4px theme(colors.cyan.700))' }}>
                                    <IconComponent className="w-7 h-7 text-cyan-400" /> {/* Slightly smaller icon */}
                                  </div>
                                )}
                                <h3 className="text-2xl font-semibold text-white mb-3">{project.title}</h3>
                                <ul className="space-y-1.5 text-gray-400 flex-grow text-base mb-4"> {/* Added mb-4 */}
                                  {project.descriptionPoints?.map((point, i) => <li key={i} className="flex items-start"><span className="text-cyan-500 mr-2 mt-1 text-sm">•</span>{point}</li>)}
                                </ul>
                                {/* Read More Link */}
                                <Link to={project.link} className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors group/link self-start">
                                  Learn More
                                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" />
                                </Link>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.section>

                  {/* --- Timeline Section --- */}
                  <motion.div variants={sectionVariant} className="py-12 md:py-16">
                    <Timeline />
                  </motion.div>

                  {/* --- Sponsors Section --- */}
                  <motion.div className="relative z-10 py-12 md:py-16" variants={sectionVariant}>
                    <Sponsors />
                  </motion.div>

                </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }
