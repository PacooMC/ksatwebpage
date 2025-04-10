import { motion } from 'framer-motion';
    import { TIMELINE_EVENTS } from '../constants';
    // Removed Rocket import as we now rely on image URLs primarily

    export function Timeline() {
      const sectionVariant = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
      };

      const itemVariant = {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
      };

      return (
        <section id="timeline" className="bg-transparent">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-10 md:mb-12">
              <motion.h2
                className="text-4xl md:text-5xl font-bold text-white mb-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
              >
                Our Journey
              </motion.h2>
              <motion.p
                className="text-lg text-gray-400"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Key Milestones and Achievements
              </motion.p> {/* Updated subtitle */}
            </div>

            <motion.div
              className="relative max-w-3xl mx-auto pl-8 md:pl-0"
              variants={sectionVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <div className="absolute left-4 top-2 bottom-2 w-1 bg-gradient-to-b from-cyan-500/0 via-cyan-500/60 to-cyan-500/0 md:left-1/2 md:-translate-x-1/2"></div>

              <div className="space-y-12">
                {TIMELINE_EVENTS.map((event, index) => {
                  // Prioritize event.image if it's a URL
                  const imageUrl = typeof event.image === 'string' && event.image.startsWith('http') ? event.image : null;
                  const isOdd = index % 2 !== 0;

                  return (
                    <motion.div
                      key={event.year + event.title} // More unique key
                      className={`relative flex items-start md:items-center ${isOdd ? 'md:flex-row-reverse' : 'md:flex-row'} md:w-1/2 ${isOdd ? 'md:ml-auto md:pl-12' : 'md:pr-12'}`}
                      variants={itemVariant}
                    >
                      {/* Dot */}
                      <div className="absolute left-4 top-1 -translate-x-1/2 w-5 h-5 bg-cyan-400 rounded-full border-4 border-[#0D1117] shadow-glow-cyan z-10 md:left-auto md:right-0 md:translate-x-1/2 md:top-1/2 md:-translate-y-1/2"></div>
                      {isOdd && <div className="hidden md:block absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-cyan-400 rounded-full border-4 border-[#0D1117] shadow-glow-cyan z-10"></div>}

                      {/* Content Block */}
                      <div className={`ml-8 md:ml-0 flex-1 group`}> {/* Added group for hover effect */}
                        <div className={`bg-space-card rounded-lg border border-cyan-500/20 flex flex-col md:flex-row gap-4 md:gap-5 items-center shadow-lg shadow-cyan-900/20 overflow-hidden transition-all duration-300 hover:border-cyan-500/40 hover:shadow-cyan-800/30 ${isOdd ? 'md:text-right' : 'md:text-left'}`}>
                           {/* Image Section */}
                           {imageUrl ? (
                             <div className={`w-full md:w-32 flex-shrink-0 ${isOdd ? 'md:order-last' : ''}`}>
                               <img src={imageUrl} alt={event.title} className="w-full h-32 md:h-full object-cover" />
                             </div>
                           ) : (
                             // Optional: Placeholder if no image
                             <div className={`w-full md:w-32 h-32 md:h-full flex-shrink-0 bg-gray-800/50 ${isOdd ? 'md:order-last' : ''}`}></div>
                           )}

                           {/* Text Content Section */}
                           <div className={`flex-1 p-5 ${isOdd ? 'md:text-right' : 'md:text-left'}`}>
                             <span className="block text-xl font-semibold text-cyan-400 mb-1">{event.year}</span>
                             <h3 className="text-lg md:text-xl font-semibold text-white mb-1.5">{event.title}</h3>
                             <p className="text-gray-400 text-sm leading-relaxed">{event.description}</p>
                           </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>
      );
    }
