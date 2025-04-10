// Updated content to match the bullet points and icons in Layout V2
// Added placeholder image URLs
import { Link } from 'react-router-dom'; // Import Link

export const PROJECTS_CONTENT = [
      {
        title: 'Our Satellite',
        descriptionPoints: [
            '1U CubeSat Platform', // Slightly more descriptive
            'Software-Defined Radio Payload',
            'LoRa Communications Ready' // Changed wording
        ],
        icon: 'Box',
        link: '/satellite',
        // Placeholder image related to satellites/cubesats
        imageUrl: 'https://images.unsplash.com/photo-1614728894744-a8454a7dbb80?auto=format&fit=crop&q=80&w=600'
      },
      {
        title: 'E2E Laboratory',
        descriptionPoints: [
            'Ground Station Operations',
            'Payload Development & Testing', // Combined
            'End-to-End System Simulation' // Added detail
        ],
        icon: 'Target',
        link: '/laboratory',
        // Placeholder image related to labs/tech/antennas
        imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600'
      },
      {
        title: 'Events & Activities',
        descriptionPoints: [
            'Hackathons & Workshops', // Combined
            'Competitions & Achievements', // Combined
            'Community Outreach Programs' // Added detail
        ],
        icon: 'CalendarDays',
        link: '/events',
        // Placeholder image related to events/collaboration
        imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=600'
      }
    ];

    // Keep detailed content for subpages (can be refactored later if needed)
    export const SATELLITE_CONTENT = {
      title: 'KSAT: Space & Entrepreneurship',
      subtitle: 'Student-Driven 1U CubeSat Initiative',
      description: 'The students driven initiative, KSAT: Space & Entrepreneurship, presents a 1U communications CubeSat tailored for Low Earth Orbit. Leveraging software-defined radio (SDR) and a general-purpose processor, our platform employs virtualization technologies to host and rapidly reconfigure communication protocols and waveforms. By integrating LoRa as a reference link layer and using COTS components, we intend to demonstrate how an agile, SDR-driven approach can reduce development time and costs for space platforms.',
      features: [
        { title: 'SDR Platform', description: 'Flexible radio processing for diverse protocols.' },
        { title: 'Virtualization', description: 'Rapid deployment of communication stacks.' },
        { title: 'LoRa Integration', description: 'Long-range, low-power communication link.' }
      ],
      specifications: {
        size: '1U CubeSat (10x10x10 cm)',
        orbit: 'Low Earth Orbit (LEO)',
        processor: 'General Purpose Processor',
        radio: 'Software-Defined Radio (SDR)',
        linkLayer: 'LoRaWAN',
        components: 'COTS-based'
      },
      image: 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?auto=format&fit=crop&q=80' // Keep detailed image
    };
    export const LABORATORY_CONTENT = {
      title: 'End-to-End Space Laboratory',
      subtitle: 'Complete In-House Development Environment',
      description: 'Our comprehensive laboratory enables full-cycle development and testing of space technologies, from component design to system integration. We have built everything from scratch, combining open-source solutions with COTS hardware to create a complete space development ecosystem.',
      facilities: [
        { title: 'Ground Station', description: 'Full duplex communication setup.', components: ['SDR', 'Antennas', 'Tracking System'] },
        { title: 'Payload Development', description: 'Design and testing environment.', components: ['FPGA Boards', 'Microcontrollers', 'Sensors'] },
        { title: 'Integration Lab', description: 'Assembly and testing facilities.', components: ['Clean Bench', 'Test Equipment', 'Simulators'] }
      ],
      capabilities: [
        'SDR waveform development and testing',
        'Antenna design and characterization',
        'Payload integration and validation',
        'End-to-end communication link simulation',
        'Environmental testing preparation'
      ],
      image: 'https://images.unsplash.com/photo-1581094794329-c8112c37f11f?auto=format&fit=crop&q=80' // Keep detailed image
    };
    export const EVENTS_CONTENT = {
      title: 'Space Community Engagement',
      subtitle: 'Connecting Through Innovation',
      upcomingEvents: [ /* ... keep existing ... */ ],
      pastEvents: [ /* ... keep existing ... */ ]
    };
