import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';

const CONTACT_MEMBERS = [ /* ... */ ];

export function Contact() {
  return (
    // Ensure the section has the ID "contact"
    <section id="contact" className="py-24 bg-gradient-to-b from-[#0D1117] via-[#0D1117] to-black">
      <div className="max-w-7xl mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Contact Us
            </h2>
            <p className="text-lg text-gray-400 max-w-xl mx-auto">
              Reach out to our key team members directly.
            </p>
          </div>
          {/* ... rest of component ... */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {CONTACT_MEMBERS.map((member, index) => (
              <motion.div key={member.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.1 }} className="group relative flex flex-col h-full">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600/30 to-purple-600/30 rounded-2xl blur opacity-40 group-hover:opacity-70 transition duration-400" />
                <div className="relative bg-space-card p-6 rounded-2xl h-full border border-cyan-500/10 hover:border-cyan-500/30 transition-colors duration-300 flex flex-col text-center items-center shadow-lg shadow-cyan-900/10">
                  <div className="relative mb-5 rounded-full overflow-hidden w-32 h-32 border-2 border-cyan-500/30 group-hover:border-cyan-500/60 transition-colors duration-300">
                    <img src={member.image} alt={member.name} className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex-grow mb-4">
                    <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
                    <p className="text-sm text-cyan-400 mb-1">{member.title}</p>
                    <p className="text-sm text-gray-400">{member.specialty}</p>
                  </div>
                  <a href={`mailto:${member.email}`} className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-cyan-300 border border-cyan-500/50 rounded-full px-4 py-1.5 hover:bg-cyan-500/10 hover:text-cyan-200 hover:border-cyan-500/80 transition-all duration-200 group">
                    <Mail className="w-4 h-4 transition-transform group-hover:scale-110" /> <span>Contact</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
