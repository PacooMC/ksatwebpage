import { motion } from 'framer-motion';
import { Mail, User, ArrowLeft } from 'lucide-react'; // Added User icon as placeholder
import { Navigation } from '../components/Navigation';
import { AnimatedSection } from '../components/AnimatedSection';
import { CONTACT_PAGE_CONTENT } from '../constants/contact'; // Use new constant
import { Link } from 'react-router-dom';

export function ContactPage() {
  return (
    <div className="min-h-screen text-gray-300">
      <Navigation isVisible={true} />
      <main className="pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4"> {/* Reduced max-width */}
           {/* Back Link - Points to /#content */}
           <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="mb-8">
            <Link to="/#content" className="group inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-cyan-300 border border-cyan-500/40 rounded-full hover:bg-cyan-500/10 hover:border-cyan-500/70 transition-all duration-200">
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 duration-300" /> Back to Home
            </Link>
          </motion.div>

          <AnimatedSection>
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
                {CONTACT_PAGE_CONTENT.title}
              </h1>
              <p className="text-lg text-cyan-300/90 max-w-xl mx-auto">
                {CONTACT_PAGE_CONTENT.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {CONTACT_PAGE_CONTENT.team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group relative flex flex-col h-full"
                >
                  {/* Subtle Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-br from-cyan-700/30 via-transparent to-purple-700/30 rounded-2xl blur-lg opacity-50 group-hover:opacity-70 transition duration-400 -z-10"></div>

                  {/* Card Background and Border */}
                  <div className="relative bg-space-card p-8 rounded-2xl h-full border border-cyan-500/20 hover:border-cyan-500/40 transition-colors duration-300 flex flex-col text-center items-center shadow-xl shadow-cyan-900/20">

                    {/* Placeholder Icon */}
                    <div className="relative mb-6 rounded-full p-5 bg-black/20 border-2 border-cyan-500/30 group-hover:border-cyan-500/60 transition-colors duration-300">
                       <User className="w-16 h-16 text-cyan-600/70" />
                       {/* Optional: Add a subtle inner glow */}
                       <div className="absolute inset-0 rounded-full border border-cyan-400/40 opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
                    </div>

                    {/* Text Content */}
                    <div className="flex-grow mb-5">
                      <h3 className="text-2xl font-semibold text-white mb-1">{member.name}</h3>
                      <p className="text-base text-cyan-400 mb-1">{member.title}</p>
                      <p className="text-sm text-gray-400">{member.specialty}</p>
                    </div>

                    {/* Email Link */}
                    <a
                      href={`mailto:${member.email}`}
                      className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-cyan-300 hover:text-cyan-200 transition-colors duration-200 group"
                    >
                      <Mail className="w-4 h-4 transition-transform group-hover:scale-110" />
                      <span>{member.email}</span>
                    </a>
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
