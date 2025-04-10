import { motion } from 'framer-motion';
import { SPONSORS_CONTENT } from '../constants/sponsors';
import { AnimatedSection } from './AnimatedSection';

export function Sponsors() {
  const sponsorsByTier = SPONSORS_CONTENT.sponsors.reduce((acc, sponsor) => {
    const tier = sponsor.tier || 'silver'; // Default to silver if tier is missing
    if (!acc[tier]) acc[tier] = [];
    acc[tier].push(sponsor);
    return acc;
  }, {} as Record<string, typeof SPONSORS_CONTENT.sponsors>);

  // Define the order and grid columns for tiers
  const tierOrder: { key: keyof typeof SPONSORS_CONTENT.tiers; cols: string }[] = [
    { key: 'platinum', cols: 'lg:grid-cols-2' },
    { key: 'gold', cols: 'lg:grid-cols-2' },
    { key: 'silver', cols: 'lg:grid-cols-1' }, // Silver takes full width on large screens
  ];

  return (
    // Section padding is handled in Home.tsx now
    <section id="sponsors" className="bg-transparent font-sans">
      <div className="max-w-4xl mx-auto px-4">
        <AnimatedSection>
          {/* Header */}
          {/* Reduced margin bottom (mb-10 md:mb-12) */}
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-4xl md:text-5xl font-semibold text-cyan-400 mb-3">
              {SPONSORS_CONTENT.title}
            </h2>
            <p className="text-lg text-gray-400/90 max-w-2xl mx-auto font-normal">
              {SPONSORS_CONTENT.subtitle}
            </p>
          </div>

          {/* Reduced spacing (space-y-10) */}
          <div className="space-y-10">
            {tierOrder.map(({ key: tierKey, cols }) => {
              const tierConfig = SPONSORS_CONTENT.tiers[tierKey];
              const sponsors = sponsorsByTier[tierKey];
              if (!sponsors || sponsors.length === 0) return null;

              return (
                // Reduced spacing (space-y-5)
                <div key={tierKey} className="space-y-5">
                  {/* Tier Title - Reduced margin bottom (mb-5) */}
                  <h3 className={`text-2xl font-medium ${tierConfig.textColor} mb-5`}>
                    {tierConfig.name}
                  </h3>

                  {/* Responsive Grid */}
                  {/* Reduced gap (gap-5) */}
                  <div className={`grid grid-cols-1 sm:grid-cols-2 ${cols} gap-5`}>
                    {sponsors.map((sponsor, index) => (
                      <motion.div
                        key={sponsor.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        // Reduced padding (p-6), reduced height (h-36)
                        className={`relative bg-space-card rounded-lg border ${tierConfig.borderColor} flex items-center justify-center p-6 h-36`}
                      >
                        {tierKey === 'platinum' && (
                          <div className="absolute -inset-0.5 rounded-lg bg-cyan-500 opacity-30 blur-md -z-10"></div>
                        )}
                        <div className="flex flex-col items-center justify-center text-center">
                          <img
                            src={sponsor.logo}
                            alt={`${sponsor.name} logo`}
                            // Reduced max-height (max-h-14), reduced margin (mb-2.5)
                            className={`max-h-14 object-contain mb-2.5 ${tierKey === 'platinum' ? '' : 'grayscale'}`}
                          />
                           <span className={`text-sm font-normal tracking-wide ${tierKey === 'platinum' ? 'text-gray-200' : 'text-gray-400'}`}>
                             {sponsor.name}
                           </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
