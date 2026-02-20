import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, MapPin, Phone, Github, Linkedin } from 'lucide-react';

const contactItems = [
  { icon: Mail, label: 'Email', value: 'licalvin2005@gmail.com', href: 'mailto:licalvin2005@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+1 (856) 818-8802', href: 'tel:+18568188802' },
  { icon: MapPin, label: 'Location', value: 'Philadelphia, PA' },
  { icon: Github, label: 'GitHub', value: 'github.com/calvinli1', href: 'https://github.com/calvinli1' },
  { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/calvinli-bu', href: 'https://www.linkedin.com/in/calvinli-bu/' },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-electric/30 to-transparent" />

      {/* Gradient Orb */}
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(30, 144, 255, 0.1) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-cyber-electric text-sm font-medium mb-4">
            Get in Touch
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <motion.div
          className="glass rounded-2xl p-6 sm:p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {contactItems.map((item, index) => {
              const Icon = item.icon;
              const content = (
                <motion.div
                  key={item.label}
                  className="flex items-center gap-4 p-5 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-cyber-electric/10 flex items-center justify-center group-hover:bg-cyber-electric/20 transition-colors flex-shrink-0">
                    <Icon className="w-5 h-5 text-cyber-electric" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-gray-500 text-xs uppercase tracking-wider">{item.label}</p>
                    <p className="text-white font-medium text-sm truncate">{item.value}</p>
                  </div>
                </motion.div>
              );

              if (item.href) {
                return (
                  <a key={item.label} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined} className="block">
                    {content}
                  </a>
                );
              }
              return content;
            })}
          </div>
        </motion.div>

        {/* Availability */}
        <motion.div
          className="mt-8 glass rounded-2xl p-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex items-center justify-center gap-3">
            <div className="w-3 h-3 rounded-full bg-cyber-lime animate-pulse" />
            <span className="text-gray-300 font-medium">Open to new opportunities</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}