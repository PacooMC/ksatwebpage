import { motion, AnimatePresence } from 'framer-motion';
import { Navigation } from '../components/Navigation';
import { ArrowLeft, ExternalLink, Calendar, MapPin, Award, X } from 'lucide-react';
import { Link } from 'react-router-dom'; // Import Link
import { EVENTS_CONTENT } from '../constants/events';
import { AnimatedSection } from '../components/AnimatedSection';
import { useState } from 'react';

type EventDetails = typeof EVENTS_CONTENT.upcomingEvents[0] | typeof EVENTS_CONTENT.pastEvents[0];

export function Events() {
  const [selectedEvent, setSelectedEvent] = useState<EventDetails | null>(null);

  // --- Animation Variants ---
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.85, filter: 'blur(10px)', y: 30 },
    visible: { opacity: 1, scale: 1, filter: 'blur(0px)', y: 0, transition: { type: "spring", damping: 25, stiffness: 250 } },
    exit: { opacity: 0, scale: 0.85, filter: 'blur(10px)', y: -30, transition: { duration: 0.2 } }
  };
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3, delay: 0.1 } }
  };
  const cardItemVariant = {
    hidden: { y: 20, opacity: 0, scale: 0.95 },
    visible: { y: 0, opacity: 1, scale: 1, transition: { type: "spring", stiffness: 180, damping: 15 } }
  };

  // --- Event Card Component ---
  const EventCard = ({ event, isPast = false }: { event: EventDetails; isPast?: boolean }) => (
    <motion.div
      variants={cardItemVariant}
      layout
      onClick={() => setSelectedEvent(event)}
      className="group relative p-px rounded-xl overflow-hidden cursor-pointer h-full flex flex-col" // Added h-full, flex, flex-col
    >
      {/* Glow Border */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/40 via-transparent to-purple-500/40 opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute inset-px rounded-xl bg-space-card"></div> {/* Inner background */}

      {/* Card Content */}
      <div className="relative bg-transparent p-6 flex flex-col flex-grow h-full"> {/* Added flex-grow, h-full */}
        {/* Image */}
        {event.image && (
          <div className="aspect-video rounded-lg overflow-hidden mb-4 border border-cyan-500/10">
            <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
          </div>
        )}

        {/* Title */}
        <h3 className="text-lg font-semibold text-white mb-2 flex-grow">{event.title}</h3> {/* Added flex-grow */}

        {/* Date & Location */}
        <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
          <span className="inline-flex items-center gap-1.5">
            <Calendar size={14} className="text-cyan-400/80" /> {event.date}
          </span>
          {event.location && (
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} className="text-cyan-400/80" /> {event.location}
            </span>
          )}
        </div>

        {/* Description or Achievement */}
        <p className="text-sm text-gray-300 mb-4">
          {isPast && 'achievement' in event ? (
            <span className="inline-flex items-center gap-1.5 font-medium text-amber-400">
              <Award size={14} /> {event.achievement}
            </span>
          ) : (
            event.description
          )}
        </p>

        {/* Read More / View Details Button */}
        <div className="mt-auto pt-3 border-t border-cyan-500/10"> {/* Pushes button to bottom */}
          <button className="text-xs font-medium text-cyan-300 hover:text-cyan-200 transition-colors">
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen text-gray-300">
      <Navigation isVisible={true} />
      <main className="pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4">
           {/* Back Link - Points to /#content */}
           <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="mb-8">
            <Link to="/#content" className="group inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-cyan-300 border border-cyan-500/40 rounded-full hover:bg-cyan-500/10 hover:border-cyan-500/70 transition-all duration-200">
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 duration-300" /> Back to Home
            </Link>
          </motion.div>

          <AnimatedSection>
            {/* Header */}
            <div className="text-center mb-16">
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent"> {EVENTS_CONTENT.title} </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-lg text-gray-400 max-w-3xl mx-auto"> {EVENTS_CONTENT.subtitle} </motion.p>
            </div>

            {/* Upcoming Events */}
            <section className="mb-16">
              <h2 className="text-3xl font-semibold mb-8 text-white border-l-4 border-cyan-400 pl-4"> Upcoming Events </h2>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              >
                {EVENTS_CONTENT.upcomingEvents.map((event) => ( <EventCard key={event.title} event={event} /> ))}
              </motion.div>
            </section>

            {/* Past Events */}
            <section>
              <h2 className="text-3xl font-semibold mb-8 text-white border-l-4 border-cyan-400 pl-4"> Past Events </h2>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              >
                {EVENTS_CONTENT.pastEvents.map((event) => ( <EventCard key={event.title} event={event} isPast /> ))}
              </motion.div>
            </section>
          </AnimatedSection>
        </div>
      </main>

      {/* Event Detail Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            key="event-modal-overlay"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayVariants}
            onClick={() => setSelectedEvent(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              key="event-modal-content"
              variants={modalVariants}
              className="relative bg-space-card p-8 rounded-2xl border border-cyan-500/30 max-w-2xl w-full shadow-2xl shadow-cyan-900/40"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glow */}
              <div className="absolute -inset-1 bg-gradient-to-br from-cyan-700/20 to-purple-700/20 rounded-2xl blur-xl opacity-50 -z-10"></div>

              {/* Close Button */}
              <motion.button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:bg-cyan-500/10 hover:text-cyan-300 transition-all z-20"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close modal"
              >
                <X size={20} />
              </motion.button>

              {/* Modal Content */}
              <div>
                <motion.h3 className="text-2xl font-bold mb-2 text-white" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                  {selectedEvent.title}
                </motion.h3>

                {/* Date & Location */}
                <motion.div className="flex items-center gap-4 text-sm text-gray-400 mb-4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar size={14} className="text-cyan-400/80" /> {selectedEvent.date}
                  </span>
                  {selectedEvent.location && (
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={14} className="text-cyan-400/80" /> {selectedEvent.location}
                    </span>
                  )}
                </motion.div>

                {/* Achievement (if past event) */}
                {'achievement' in selectedEvent && selectedEvent.achievement && (
                  <motion.div className="mb-4 p-3 rounded-lg bg-amber-900/20 border border-amber-500/30" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <p className="inline-flex items-center gap-2 font-medium text-amber-300 text-sm">
                      <Award size={16} /> Achievement: {selectedEvent.achievement}
                    </p>
                  </motion.div>
                )}

                {/* Description */}
                <motion.p className="text-gray-300 mb-6 text-base leading-relaxed" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
                  {selectedEvent.description}
                </motion.p>

                {/* Details Section (if available) */}
                {'details' in selectedEvent && selectedEvent.details && (
                  <motion.div className="mb-6 space-y-3 border-t border-cyan-500/10 pt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                    <h4 className="text-lg font-semibold text-cyan-300 mb-2">Details</h4>
                    {Object.entries(selectedEvent.details).map(([key, value]) => (
                      <div key={key} className="text-sm">
                        <span className="font-medium text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}: </span>
                        <span className="text-gray-300">{value}</span>
                      </div>
                    ))}
                  </motion.div>
                )}

                {/* External Links */}
                <motion.div className="flex flex-wrap gap-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
                  {'registrationUrl' in selectedEvent && selectedEvent.registrationUrl && selectedEvent.enabled && (
                    <a href={selectedEvent.registrationUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-cyan-300 border border-cyan-500/50 rounded-full px-4 py-1.5 hover:bg-cyan-500/10 hover:text-cyan-200 hover:border-cyan-500/80 transition-all duration-200 group">
                      Register <ExternalLink size={14} className="transition-transform group-hover:translate-x-0.5" />
                    </a>
                  )}
                  {'publicationUrl' in selectedEvent && selectedEvent.publicationUrl && (
                    <a href={selectedEvent.publicationUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 border border-gray-600/50 rounded-full px-4 py-1.5 hover:bg-gray-500/10 hover:text-gray-300 hover:border-gray-500/80 transition-all duration-200 group">
                      Read More <ExternalLink size={14} className="transition-transform group-hover:translate-x-0.5" />
                    </a>
                  )}
                </motion.div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
