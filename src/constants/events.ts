export const EVENTS_CONTENT = {
  title: 'Space Community Engagement',
  subtitle: 'Connecting Through Innovation',
  upcomingEvents: [
    {
      title: 'International Astronautical Congress',
      date: 'April 2024',
      location: 'Paris, France',
      description: 'Presenting our latest research on reconfigurable space communications',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80',
      enabled: true,
      registrationUrl: 'https://www.iafastro.org/events/iac/',
      details: {
        venue: 'Paris Convention Centre',
        schedule: 'April 15-19, 2024',
        presentation: 'SDR-based CubeSat Communications',
        abstract: 'Presentation of our innovative approach to software-defined radio implementation in CubeSats, focusing on dynamic protocol reconfiguration and cost reduction strategies.'
      }
    },
    {
      title: 'Space Tech Expo 2024',
      date: 'March 2024',
      location: 'Málaga, Spain',
      description: 'Showcasing our latest satellite communication innovations',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112c37f11f?auto=format&fit=crop&q=80',
      enabled: false,
      details: {
        venue: 'FYCMA Málaga',
        schedule: 'March 10-12, 2024',
        booth: 'Coming Soon',
        presentation: 'KSAT Platform Demo'
      }
    },
    {
      title: 'Space Innovation Forum',
      date: 'April 2024',
      location: 'Madrid, Spain',
      description: 'Leading workshop on open-source space technologies',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80',
      enabled: true,
      registrationUrl: 'https://spaceinnovation.es/forum2024',
      details: {
        venue: 'Madrid Congress Center',
        schedule: 'April 5-6, 2024',
        workshop: 'Open Source in Space',
        topics: ['SDR Implementation', 'COTS Integration', 'Cost Reduction Strategies']
      }
    }
  ],
  pastEvents: [
    {
      title: 'ActInSpace Hackathon',
      date: 'December 2023',
      achievement: 'Grand Prize Winner',
      description: 'Developed innovative space debris tracking solution',
      image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80',
      publicationUrl: 'https://www.actinspace.org/winners2023',
      details: {
        solution: 'DebrisTrack: ML-powered space debris monitoring system',
        impact: 'Selected for ESA Business Incubation Program',
        team: ['José Pulido', 'Paco Muro', 'Diego Toledo'],
        media: 'Featured in Space News Weekly'
      }
    },
    {
      title: 'International Space Hackathon 2023',
      date: 'October 2023',
      achievement: 'First Prize',
      description: 'Developed innovative SDR-based communication system concept',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80',
      publicationUrl: 'https://spaceapps.nasa.gov/winners-2023',
      details: {
        project: 'KSAT Communication Protocol',
        recognition: 'NASA Space Apps Challenge Global Finalist',
        implementation: 'Currently being integrated into KSAT platform',
        team: ['Candela Ríos', 'Matías López', 'Fernando Moya']
      }
    },
    {
      title: 'Space Tech Summit',
      date: 'September 2023',
      achievement: 'Best Innovation Award',
      description: 'Showcased our CubeSat platform and ground station development',
      image: 'https://images.unsplash.com/photo-1446776858070-70c3d5ed6758?auto=format&fit=crop&q=80',
      publicationUrl: 'https://spacetechsummit.com/awards2023',
      details: {
        presentation: 'Next-Gen CubeSat Communications',
        impact: 'Partnership opportunities with major space companies',
        recognition: 'Featured in Space Industry Report 2023',
        team: ['Sergio Fortes', 'Rafael Godoy']
      }
    }
  ]
};
