import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Code2,
  Microchip,
  Cpu,
  Box,
  FileCode,
  Layers,
  Zap,
  Terminal,
  Settings
} from 'lucide-react';

const skillCategories = [
  {
    title: 'Programming Languages',
    skills: [
      { name: 'C/C++', icon: Code2, level: 95, color: '#1E90FF' },
      { name: 'Python', icon: Terminal, level: 90, color: '#39FF14' },
      { name: 'Java', icon: Microchip, level: 92, color: '#1E90FF' },
      { name: 'MATLAB', icon: Settings, level: 89, color: '#39FF14' },
    ],
  },
  {
    title: 'Hardware & Embedded',
    skills: [
      { name: 'Arduino', icon: Cpu, level: 95, color: '#39FF14' },
      { name: 'Microcontroller', icon: Zap, level: 88, color: '#1E90FF' },
      { name: 'Advanced Hardware', icon: Microchip, level: 85, color: '#39FF14' },
    ],
  },
  {
    title: 'Systems & Algorithms',
    skills: [
      { name: 'Assembly', icon: Box, level: 85, color: '#1E90FF' },
      { name: 'FPGA / Verilog', icon: Layers, level: 75, color: '#39FF14' },
      { name: 'Data Structures & Logic', icon: Box, level: 60, color: '#1E90FF' },
    ],
  },
  {
    title: 'Tools & Documentation',
    skills: [
      { name: 'VSCode', icon: FileCode, level: 88, color: '#39FF14' },
      { name: 'Git/GitHub', icon: Code2, level: 92, color: '#1E90FF' },
      { name: 'LaTeX', icon: Microchip, level: 78, color: '#39FF14' },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* Background Elements */}
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
            Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Skills & <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A comprehensive toolkit built through years of hands-on engineering experience
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className="glass rounded-2xl p-6 glow-border"
              variants={itemVariants}
            >
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyber-electric" />
                {category.title}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <SkillBadge
                    key={skill.name}
                    skill={skill}
                    index={skillIndex + categoryIndex * 10}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Row */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {[
            { value: '7+', label: 'Projects Completed' },
            { value: '2+', label: 'Years Experience' },
            { value: '8+', label: 'Technologies' },
            { value: '100%', label: 'Passion' },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              className="text-center glass rounded-xl p-6"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

interface SkillBadgeProps {
  skill: {
    name: string;
    icon: React.ElementType;
    level: number;
    color: string;
  };
  index: number;
}

function SkillBadge({ skill, index }: SkillBadgeProps) {
  const Icon = skill.icon;

  return (
    <motion.div
      className="group relative p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyber-electric/50 transition-all duration-300 cursor-default"
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {/* Glow Effect */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at center, ${skill.color}15 0%, transparent 70%)`,
        }}
      />

      <div className="relative flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110"
          style={{
            background: `${skill.color}20`,
            boxShadow: `0 0 20px ${skill.color}30`,
          }}
        >
          <Icon className="w-5 h-5" style={{ color: skill.color }} />
        </div>

        <div className="flex-1">
          <div className="text-white font-medium text-sm mb-1">{skill.name}</div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: skill.color }}
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
                viewport={{ once: true }}
              />
            </div>
            <span className="text-xs text-gray-500">{skill.level}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
