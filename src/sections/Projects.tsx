import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, Cpu, Zap, ChevronLeft, ChevronRight, FileText } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const projects = [
  {
    id: 1,
    title: 'Automated Water Dispenser System',
    description: 'Engineered a fully automated, touchless hydration station with a 12V DC pump, APDS-9960 IR proximity sensor, and custom T-shaped chassis. Features a finite state machine with 15-second auto-shutoff, emergency interrupt, and real-time LCD status updates.',
    image: './assets/project-img-1.png',
    tags: ['Arduino', 'C++', 'APDS-9960', 'L298N', 'SolidWorks'],
    portfolioUrl: './assets/CalvinLiEngineering.pdf',
    icon: Cpu,
    gallery: [
      './assets/project-img-1.png',
      './assets/project-img-2.png',
      './assets/project-img-3.png',
    ],
    codeSnippet: {
      language: 'cpp',
      code: `// Finite State Machine - Water Dispenser
void loop() {
  int proximity = readProximity();
  
  switch (state) {
    case READY:
      lcd.print("Ready");
      if (proximity > THRESHOLD) {
        state = DISPENSING;
        startTimer = millis();
        digitalWrite(PUMP_PIN, HIGH);
      }
      break;
    case DISPENSING:
      lcd.print("Dispensing...");
      if (millis() - startTimer > 15000) {
        state = READY; // 15s auto-shutoff
        digitalWrite(PUMP_PIN, LOW);
      }
      break;
    case PAUSED:
      lcd.print("Paused");
      delay(5000); // 5s cooldown
      state = READY;
      break;
  }
}`,
    },
  },
  {
    id: 2,
    title: 'Room Temperature Monitoring Box',
    description: 'Developed a standalone environmental monitoring unit that detects ambient thermal fluctuations with a TMP36 sensor. Triggers visual (LED) and audio (piezo buzzer) alarms when temperature exits the 70°F–75°F comfort zone. Custom ABS enclosure with precision laser-cut tolerances.',
    image: './assets/project-img-4.png',
    tags: ['Arduino', 'C++', 'TMP36', 'LCD 16x2', 'CAD'],
    portfolioUrl: './assets/CalvinLiEngineering.pdf',
    icon: Zap,
    gallery: [
      './assets/project-img-4.png',
      './assets/project-img-5.png',
    ],
    codeSnippet: {
      language: 'cpp',
      code: `// Temperature Monitoring & Alert System
void loop() {
  int sensorVal = analogRead(TEMP_PIN);
  float voltage = sensorVal * (5.0 / 1023.0);
  float tempC = (voltage - 0.5) * 100.0;
  float tempF = (tempC * 9.0 / 5.0) + 32.0;
  
  lcd.setCursor(0, 0);
  lcd.print("TempF=");
  lcd.setCursor(0, 1);
  lcd.print(tempF);
  
  if (tempF >= 70.0 && tempF <= 75.0) {
    digitalWrite(GREEN_LED, HIGH);
    digitalWrite(RED_LED, LOW);
    noTone(BUZZER);
  } else {
    digitalWrite(GREEN_LED, LOW);
    digitalWrite(RED_LED, HIGH);
    tone(BUZZER, 1000);
  }
  delay(1000);
}`,
    },
  },
];


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-electric/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-cyber-electric text-sm font-medium mb-4">
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Engineering <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A showcase of my hands-on work in embedded systems, firmware development, and mechanical design
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onViewDetails={() => setSelectedProject(project)}
            />
          ))}
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

interface ProjectCardProps {
  project: typeof projects[0];
  onViewDetails: () => void;
}

function ProjectCard({ project, onViewDetails }: ProjectCardProps) {
  const Icon = project.icon;

  return (
    <motion.div
      className="group relative glass rounded-2xl overflow-hidden project-card glow-border"
      variants={itemVariants}
    >
      {/* Image */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cyber-charcoal via-cyber-charcoal/50 to-transparent" />

        {/* Icon Badge */}
        <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-cyber-electric/20 backdrop-blur-sm flex items-center justify-center border border-cyber-electric/30">
          <Icon className="w-6 h-6 text-cyber-electric" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyber-electric transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 text-gray-300 border border-white/10"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <motion.button
            onClick={onViewDetails}
            className="flex-1 px-4 py-2.5 bg-cyber-electric text-white text-sm font-semibold rounded-lg hover:shadow-glow transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View Details
          </motion.button>
          <motion.a
            href={project.portfolioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 border border-white/20 text-white rounded-lg hover:border-cyber-electric hover:text-cyber-electric transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FileText className="w-5 h-5" />
          </motion.a>
        </div>
      </div>

      {/* Hover Glow Border */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl border-2 border-cyber-electric/50" />
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            boxShadow: 'inset 0 0 30px rgba(30, 144, 255, 0.1), 0 0 30px rgba(30, 144, 255, 0.2)',
          }}
        />
      </div>
    </motion.div>
  );
}

interface GalleryCarouselProps {
  images: string[];
  title: string;
}

function GalleryCarousel({ images, title }: GalleryCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((i) => (i + 1) % images.length);
  const prev = () => setCurrentIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <div className="relative mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
      <img
        src={images[currentIndex]}
        alt={`${title} - Image ${currentIndex + 1}`}
        className="w-full h-64 sm:h-80 object-contain bg-white/5"
      />
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${i === currentIndex ? 'bg-cyber-electric scale-125' : 'bg-white/40 hover:bg-white/60'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

interface ProjectModalProps {
  project: typeof projects[0];
  onClose: () => void;
}

function ProjectModal({ project, onClose }: ProjectModalProps) {
  const Icon = project.icon;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal Content */}
      <motion.div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-strong rounded-2xl"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Image */}
        <div className="relative h-64 sm:h-80">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cyber-charcoal via-cyber-charcoal/50 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-cyber-electric/20 backdrop-blur-sm flex items-center justify-center border border-cyber-electric/30">
                <Icon className="w-5 h-5 text-cyber-electric" />
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-white/10 text-white backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {/* Image Gallery */}
          {project.gallery && project.gallery.length > 1 && (
            <GalleryCarousel images={project.gallery} title={project.title} />
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">About the Project</h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <motion.a
                  href={project.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-cyber-electric text-white font-semibold rounded-lg hover:shadow-glow transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ExternalLink className="w-5 h-5" />
                  View Full Portfolio
                </motion.a>
              </div>
            </div>

            {/* Code Snippet */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Code Highlight</h3>
              <CodeBlock
                code={project.codeSnippet.code}
                language={project.codeSnippet.language}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

interface CodeBlockProps {
  code: string;
  language: string;
}

function CodeBlock({ code, language }: CodeBlockProps) {
  return (
    <div className="code-block">
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-xs text-gray-500 uppercase">{language}</span>
      </div>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: '1.5rem',
          background: 'transparent',
          fontSize: '0.8rem',
          lineHeight: '1.6',
        }}
        showLineNumbers
        lineNumberStyle={{
          color: '#555',
          paddingRight: '1rem',
          minWidth: '2.5rem',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
