export const SPONSORS_CONTENT = {
  title: 'Our Partners & Supporters', // Updated title
  subtitle: 'Pushing Space Innovation Together', // Updated subtitle
  sponsors: [
    {
      name: 'UNIVERSIDAD DE MÁLAGA', // Match casing in image
      tier: 'platinum',
      // Use a direct link to a known UMA logo if available, otherwise keep placeholder
      logo: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=400', // Placeholder
      description: 'Academic excellence and research support' // Kept for potential future use
    },
    {
      name: 'European Space Agency', // Match casing in image
      tier: 'platinum',
      // Use a direct link to a known ESA logo if available, otherwise keep placeholder
      logo: 'https://images.unsplash.com/photo-1636819488524-1f019c4e1c44?auto=format&fit=crop&q=80&w=400', // Placeholder
      description: 'Space mission guidance and technical expertise' // Kept for potential future use
    },
    {
      name: 'ETSIT', // Match casing in image
      tier: 'gold',
      logo: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400', // Placeholder
      description: 'Engineering facilities and technical support' // Kept for potential future use
    },
    {
      name: 'ETSI', // Match casing in image
      tier: 'gold',
      logo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=400', // Placeholder
      description: 'Industrial engineering expertise' // Kept for potential future use
    },
    {
      name: 'Link by UMA-ATECH', // Match casing in image
      tier: 'silver',
      logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=400', // Placeholder
      description: 'Entrepreneurship and innovation support' // Kept for potential future use
    }
  ],
  tiers: {
    platinum: {
      name: 'Platinum', // Match casing
      textColor: 'text-cyan-400', // Text color class
      borderColor: 'border-cyan-500' // Border color class
    },
    gold: {
      name: 'Gold', // Match casing
      textColor: 'text-yellow-400', // Text color class
      borderColor: 'border-gray-700' // Border color class (subtle)
    },
    silver: {
      name: 'Silver', // Match casing
      textColor: 'text-gray-400', // Text color class
      borderColor: 'border-gray-700' // Border color class (subtle)
    }
  }
};
