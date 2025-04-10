import { motion } from 'framer-motion';
import { Navigation } from '../components/Navigation';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom'; // Import Link
import { LABORATORY_CONTENT } from '../constants/projects';
import { AnimatedSection } from '../components/AnimatedSection';

export function Laboratory() {
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
          {/* ... rest of the component ... */}
          <AnimatedSection>
            {/* Header */}
            <div className="text-center mb-16">
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent"> {LABORATORY_CONTENT.title} </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-lg text-gray-400 max-w-3xl mx-auto"> {LABORATORY_CONTENT.subtitle} </motion.p>
            </div>
            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
              <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }}>
                <p className="text-lg text-gray-300 mb-8 leading-relaxed"> {LABORATORY_CONTENT.description} </p>
                <h3 className="text-2xl font-semibold text-white mb-4 border-l-4 border-cyan-400 pl-3">Capabilities</h3>
                <div className="space-y-3">
                  {LABORATORY_CONTENT.capabilities.map((capability, index) => (
                    <motion.div key={index} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.3, delay: index * 0.05 }} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" /> <p className="text-gray-300">{capability}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }} className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-br from-cyan-600/50 to-purple-600/50 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition duration-500" />
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-cyan-500/20 shadow-2xl shadow-cyan-900/30">
                  <img src={LABORATORY_CONTENT.image} alt="Laboratory Facilities" className="object-cover w-full h-full" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </div>
              </motion.div>
            </div>
            {/* Facilities Section */}
             <h2 className="text-3xl font-semibold mb-10 text-white text-center"> Our Facilities </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {LABORATORY_CONTENT.facilities.map((facility, index) => (
                <motion.div key={facility.title} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.5, delay: index * 0.1 }} className="group relative h-full flex flex-col">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-600/30 to-purple-600/30 rounded-xl blur opacity-40 group-hover:opacity-70 transition duration-400" />
                  <div className="relative bg-space-card p-6 rounded-xl border border-cyan-500/10 hover:border-cyan-500/30 transition-colors duration-300 h-full flex flex-col shadow-lg shadow-cyan-900/10">
                    <h3 className="text-xl font-semibold mb-3 text-white">{facility.title}</h3>
                    <p className="text-gray-400 text-sm mb-4 flex-grow">{facility.description}</p>
                    <div className="mt-auto border-t border-cyan-500/10 pt-3">
                       <p className="text-xs text-cyan-400 mb-2 font-medium">Key Components:</p>
                       <ul className="space-y-1"> {facility.components.map((component, i) => ( <li key={i} className="text-gray-300 text-xs flex items-center gap-1.5"> <span className="w-1 h-1 rounded-full bg-cyan-500"></span> {component} </li> ))} </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </main>
    </div>
  );
}
