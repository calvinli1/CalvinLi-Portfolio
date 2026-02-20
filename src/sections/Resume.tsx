import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Download, FileText, Eye, X } from 'lucide-react';
import PdfViewer from '../components/PdfViewer';


export default function Resume() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [showResume, setShowResume] = useState(false);

  return (
    <section
      id="resume"
      ref={sectionRef}
      className="relative py-24 sm:py-32"
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
            Experience
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Resume & <span className="gradient-text">Background</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            My professional journey and academic foundation in engineering
          </p>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="glass rounded-2xl p-6 shadow-elevated-white">
            <div className="rounded-xl overflow-hidden mb-6 relative">
              {/* PDF rendered as canvas - fills container width */}
              <PdfViewer file="./assets/CalvinLiResume.pdf" className="rounded-xl" />
            </div>

            <div className="flex gap-3">
              <motion.button
                onClick={() => setShowResume(true)}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-cyber-electric text-white font-semibold rounded-xl pulse-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Eye className="w-5 h-5" />
                View Full Screen
              </motion.button>
              <motion.a
                href="./assets/CalvinLiResume.pdf"
                download
                className="flex items-center justify-center gap-2 px-4 py-4 border border-white/20 text-white rounded-xl hover:border-cyber-electric hover:text-cyber-electric transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Engineering Portfolio - moved outside grid for reliable clickability */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <div className="glass rounded-xl p-6 glow-border">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-cyber-electric/10 flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-cyber-electric" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold text-lg">Full Engineering Portfolio</h3>
                <p className="text-gray-500 text-sm">Detailed write-ups of all projects with schematics, CAD models, and analysis</p>
              </div>
              <div className="flex gap-3">
                <motion.button
                  onClick={() => setShowPortfolio(true)}
                  className="px-6 py-3 bg-cyber-electric text-white font-semibold rounded-xl hover:shadow-glow transition-all flex items-center gap-2"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Eye className="w-5 h-5" />
                  View
                </motion.button>
                <motion.a
                  href="./assets/CalvinLiEngineering.pdf"
                  download
                  className="px-5 py-3 border border-white/20 text-white font-semibold rounded-xl hover:border-cyber-electric hover:text-cyber-electric transition-all flex items-center gap-2"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Download className="w-5 h-5" />
                  Download
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Resume PDF Modal */}
      <AnimatePresence>
        {showResume && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
              onClick={() => setShowResume(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="relative w-full max-w-4xl h-[90vh] glass-strong rounded-2xl overflow-hidden flex flex-col"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-cyber-electric" />
                  <h3 className="text-white font-semibold">Resume</h3>
                </div>
                <div className="flex items-center gap-2">
                  <motion.a
                    href="./assets/CalvinLiResume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 text-sm text-white bg-cyber-electric rounded-lg hover:shadow-glow transition-all flex items-center gap-2"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Eye className="w-4 h-4" />
                    Open in New Tab
                  </motion.a>
                  <motion.a
                    href="./assets/CalvinLiResume.pdf"
                    download
                    className="px-3 py-1.5 text-sm text-white border border-white/20 rounded-lg hover:border-cyber-electric hover:text-cyber-electric transition-all flex items-center gap-2"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </motion.a>
                  <button
                    onClick={() => setShowResume(false)}
                    className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="flex-1 bg-gray-900">
                <iframe
                  src="./assets/CalvinLiResume.pdf#toolbar=0&view=FitH"
                  className="w-full h-full border-0"
                  title="Calvin Li Resume"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Engineering Portfolio PDF Modal */}
      <AnimatePresence>
        {showPortfolio && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
              onClick={() => setShowPortfolio(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="relative w-full max-w-5xl h-[90vh] glass-strong rounded-2xl overflow-hidden flex flex-col"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-cyber-electric" />
                  <h3 className="text-white font-semibold">Engineering Portfolio</h3>
                </div>
                <div className="flex items-center gap-2">
                  <motion.a
                    href="./assets/CalvinLiEngineering.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 text-sm text-white bg-cyber-electric rounded-lg hover:shadow-glow transition-all flex items-center gap-2"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Eye className="w-4 h-4" />
                    Open in New Tab
                  </motion.a>
                  <motion.a
                    href="./assets/CalvinLiEngineering.pdf"
                    download
                    className="px-3 py-1.5 text-sm text-white border border-white/20 rounded-lg hover:border-cyber-electric hover:text-cyber-electric transition-all flex items-center gap-2"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </motion.a>
                  <button
                    onClick={() => setShowPortfolio(false)}
                    className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="flex-1 bg-gray-900">
                <iframe
                  src="./assets/CalvinLiEngineering.pdf#toolbar=0&view=FitH"
                  className="w-full h-full border-0"
                  title="Calvin Li Engineering Portfolio"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
