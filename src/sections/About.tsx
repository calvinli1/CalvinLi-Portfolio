import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Mail, GraduationCap, Wrench } from 'lucide-react';

export default function About() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    return (
        <section
            id="about"
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
                        Who I Am
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                        About <span className="gradient-text">Me</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Get to know the engineer behind the projects
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
                    {/* Photo Frame */}
                    <motion.div
                        className="lg:col-span-2 flex justify-center"
                        initial={{ opacity: 0, x: -40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="relative group">
                            {/* Glow effect behind the frame */}
                            <div className="absolute -inset-4 bg-gradient-to-br from-cyber-electric/20 to-cyber-lime/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Photo frame */}
                            <div className="relative glass rounded-2xl p-3 shadow-elevated-white">
                                <div className="relative overflow-hidden rounded-xl">
                                    {/* Placeholder - replace src with your photo */}
                                    <div className="aspect-[3/4] w-96 bg-gradient-to-br from-gray-800 to-gray-900 flex flex-col items-center justify-center">
                                        <img
                                            src="./assets/profile-photo.jpg"
                                            alt="Calvin Li"
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                // Fallback if image doesn't exist yet
                                                const target = e.target as HTMLImageElement;
                                                target.style.display = 'none';
                                                target.parentElement!.classList.add('flex', 'flex-col', 'items-center', 'justify-center');
                                                const placeholder = document.createElement('div');
                                                placeholder.innerHTML = `
                          <div class="text-center">
                            <div class="w-24 h-24 mx-auto mb-4 rounded-full bg-cyber-electric/20 flex items-center justify-center border-2 border-dashed border-cyber-electric/40">
                              <span class="text-4xl font-bold text-cyber-electric">CL</span>
                            </div>
                            <p class="text-gray-500 text-sm">Add your photo as</p>
                            <p class="text-cyber-electric text-sm font-mono">public/assets/profile-photo.jpg</p>
                          </div>
                        `;
                                                target.parentElement!.appendChild(placeholder);
                                            }}
                                        />
                                    </div>

                                    {/* Decorative border glow on hover */}
                                    <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-cyber-electric/40 transition-all duration-500" />
                                </div>

                                {/* Name badge */}
                                <motion.div
                                    className="mt-3 text-center"
                                    initial={{ opacity: 0 }}
                                    animate={isInView ? { opacity: 1 } : {}}
                                    transition={{ delay: 0.5 }}
                                >
                                    <h3 className="text-white font-bold text-xl">Calvin Li</h3>
                                    <p className="text-cyber-electric text-sm font-medium">Aspiring Software & Hardware Engineer</p>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Description & Details */}
                    <motion.div
                        className="lg:col-span-3 space-y-6"
                        initial={{ opacity: 0, x: 40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        {/* Bio */}
                        <div className="glass rounded-2xl p-6 glow-border">
                            <h4 className="font-bold text-white text-lg mb-3">About me</h4>
                            <p className="text-gray-300 leading-relaxed text-lg">
                                Hi! I'm a <span className="font-semibold">Boston University</span> Computer
                                Engineering student passionate about building custom hardware and the software that powers it.
                                When I'm not deep into a new project, you can usually find me spending time with family and friends.
                            </p>

                            <h4 className="font-bold text-white text-lg mt-6 mb-3">How it Started</h4>
                            <p className="text-gray-300 leading-relaxed text-lg">
                                My engineering career began with a burnt motherboard. When my first custom PC build went up in smoke,
                                it didn't deter me it ignited a passion for hardware. I spent my childhood poring over books about machinery and assembling desktop computers for
                                low-income communities. I believe the best way to understand technology is to take it apart,
                                figure out why it broke, and build it back better.
                            </p>
                        </div>

                        {/* Quick Info Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <motion.div
                                className="glass rounded-xl p-4 flex items-center gap-4 group hover:border-cyber-electric/30 transition-all duration-300"
                                whileHover={{ scale: 1.02, y: -2 }}
                            >
                                <div className="w-10 h-10 rounded-lg bg-cyber-electric/10 flex items-center justify-center group-hover:bg-cyber-electric/20 transition-colors">
                                    <GraduationCap className="w-5 h-5 text-cyber-electric" />
                                </div>
                                <div>
                                    <p className="text-white font-medium text-sm">Education</p>
                                    <p className="text-gray-500 text-xs">B.S. Engineering — Boston University</p>
                                </div>
                            </motion.div>

                            <motion.div
                                className="glass rounded-xl p-4 flex items-center gap-4 group hover:border-cyber-electric/30 transition-all duration-300"
                                whileHover={{ scale: 1.02, y: -2 }}
                            >
                                <div className="w-10 h-10 rounded-lg bg-cyber-electric/10 flex items-center justify-center group-hover:bg-cyber-electric/20 transition-colors">
                                    <MapPin className="w-5 h-5 text-cyber-electric" />
                                </div>
                                <div>
                                    <p className="text-white font-medium text-sm">Location</p>
                                    <p className="text-gray-500 text-xs">Boston, MA</p>
                                </div>
                            </motion.div>

                            <motion.div
                                className="glass rounded-xl p-4 flex items-center gap-4 group hover:border-cyber-electric/30 transition-all duration-300"
                                whileHover={{ scale: 1.02, y: -2 }}
                            >
                                <div className="w-10 h-10 rounded-lg bg-cyber-electric/10 flex items-center justify-center group-hover:bg-cyber-electric/20 transition-colors">
                                    <Wrench className="w-5 h-5 text-cyber-electric" />
                                </div>
                                <div>
                                    <p className="text-white font-medium text-sm">Focus Area</p>
                                    <p className="text-gray-500 text-xs">Embedded Systems & Firmware</p>
                                </div>
                            </motion.div>

                            <motion.div
                                className="glass rounded-xl p-4 flex items-center gap-4 group hover:border-cyber-electric/30 transition-all duration-300"
                                whileHover={{ scale: 1.02, y: -2 }}
                            >
                                <div className="w-10 h-10 rounded-lg bg-cyber-electric/10 flex items-center justify-center group-hover:bg-cyber-electric/20 transition-colors">
                                    <Mail className="w-5 h-5 text-cyber-electric" />
                                </div>
                                <div>
                                    <p className="text-white font-medium text-sm">Email</p>
                                    <p className="text-gray-500 text-xs">licalvin2005@gmail.com</p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
