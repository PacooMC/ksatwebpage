/** @type {import('tailwindcss').Config} */
    import plugin from 'tailwindcss/plugin';

    export default {
      content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
      theme: {
        extend: {
          // Keep existing extensions if needed
          colors: {
            // Define the specific dark colors from the design if needed
            'space-dark': '#0D1117', // Example main background
            'space-card': '#161B22', // Example card background
          },
          boxShadow: {
             // Add custom shadow for timeline dot glow
             'glow-cyan': '0 0 10px theme(colors.cyan.500)',
          }
        },
      },
      plugins: [
        // Keep existing plugins if needed
        plugin(function ({ addUtilities }) {
          addUtilities({
            '.perspective': { perspective: '1000px', },
            '.perspective-\\[1000px\\]': { perspective: '1000px', },
            '.transform-style-3d': { 'transform-style': 'preserve-3d', },
            '.backface-hidden': { 'backface-visibility': 'hidden', },
            // Add text shadow utility for neon effect (optional, can use inline style)
            '.text-shadow-cyan': { 'text-shadow': '0 0 8px theme(colors.cyan.500)' },
          })
        }),
      ],
      // Update safelist if new dynamic classes were introduced
      safelist: [
        // Add any potentially purged classes here
      ],
    };
