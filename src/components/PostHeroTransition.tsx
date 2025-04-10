import { motion } from 'framer-motion';
import { Zap } from 'lucide-react'; // Changed icon to Zap/Lightning

export function PostHeroTransition() {
  return (
    <motion.div
      key="post-hero"
      className="fixed inset-0 z-40 flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3, ease: 'easeIn' } }}
    >
      {/* Inherits body background */}
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 150 }}
        >
          <Zap className="w-16 h-16 text-cyan-400 mx-auto" style={{ filter: 'drop-shadow(0 0 10px theme(colors.cyan.500))' }}/>
        </motion.div>
        {/* Updated Text */}
        <p className="mt-4 text-lg text-cyan-200/80 tracking-widest font-semibold">ENGAGING HYPERDRIVE...</p>
      </div>
    </motion.div>
  );
}
