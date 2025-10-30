import { FileText, Youtube, Globe, FileAudio, FileVideo, Icon } from 'lucide-react';
import type { ComponentType } from 'react';

export type ContentType = 'PDF' | 'YouTube' | 'URL' | 'Audio' | 'Video';

export type Content = {
  id: string;
  title: string;
  type: ContentType;
  source: string; // URL or filename
  description: string;
  fullText: string; // The content itself for AI flows
  createdAt: string; // Using string for simplicity, can be Date object
  icon: ComponentType<{ className?: string }>;
};

export const MOCK_CONTENT: Content[] = [
  {
    id: '1',
    title: 'Introduction to Photosynthesis',
    type: 'PDF',
    source: 'biology_notes.pdf',
    description: 'A comprehensive guide to understanding the process of photosynthesis in plants.',
    fullText: 'Photosynthesis is a process used by plants, algae, and certain bacteria to convert light energy into chemical energy, through a process that converts carbon dioxide and water into glucose (a sugar) and oxygen. This process is crucial for life on Earth as it produces most of the oxygen in the atmosphere. The chemical equation for photosynthesis is 6CO2 + 6H2O + Light Energy → C6H12O6 + 6O2.',
    createdAt: '2023-10-26T10:00:00Z',
    icon: FileText,
  },
  {
    id: '2',
    title: 'The History of Ancient Rome',
    type: 'YouTube',
    source: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    description: 'A video lecture series covering the rise and fall of the Roman Empire.',
    fullText: 'The history of Ancient Rome spans from its founding in the 8th century BC to the collapse of the Western Roman Empire in the 5th century AD. It is one of the most influential civilizations in world history, leaving a lasting legacy in law, language, architecture, and government. Key periods include the Roman Kingdom, the Roman Republic, and the Roman Empire, marked by figures like Julius Caesar, Augustus, and Constantine.',
    createdAt: '2023-10-25T14:30:00Z',
    icon: Youtube,
  },
  {
    id: '3',
    title: 'Quantum Mechanics Explained',
    type: 'URL',
    source: 'https://en.wikipedia.org/wiki/Quantum_mechanics',
    description: 'A Wikipedia article detailing the fundamental principles of quantum mechanics.',
    fullText: 'Quantum mechanics is a fundamental theory in physics that provides a description of the physical properties of nature at the scale of atoms and subatomic particles. It is the foundation of all quantum physics including quantum chemistry, quantum field theory, quantum technology, and quantum information science. Key concepts include quantization of energy, wave-particle duality, and the uncertainty principle.',
    createdAt: '2023-10-24T09:15:00Z',
    icon: Globe,
  },
  {
    id: '4',
    title: 'Podcast on Economic Theories',
    type: 'Audio',
    source: 'economics_podcast_ep1.mp3',
    description: 'An audio discussion on Keynesian vs. Classical economics.',
    fullText: 'This podcast episode explores the fundamental differences between Keynesian and Classical economic theories. Classical economics promotes laissez-faire policies, believing that the free market will self-regulate. In contrast, Keynesian economics, developed by John Maynard Keynes, argues for government intervention to manage economic cycles, particularly through fiscal policy during recessions.',
    createdAt: '2023-10-23T18:00:00Z',
    icon: FileAudio,
  },
  {
    id: '5',
    title: 'Documentary on Deep Sea Life',
    type: 'Video',
    source: 'deep_sea_documentary.mp4',
    description: 'A video exploring the fascinating creatures of the deep ocean.',
    fullText: 'The deep sea, the lowest layer of the ocean, is home to a wide array of unique species adapted to extreme conditions like high pressure, low temperatures, and the absence of sunlight. This documentary showcases bizarre and beautiful creatures such as the anglerfish, vampire squid, and giant tube worms, which thrive in this challenging environment, often relying on chemosynthesis rather than photosynthesis for energy.',
    createdAt: '2023-10-22T11:45:00Z',
    icon: FileVideo,
  },
];
