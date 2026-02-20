import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart, Cpu, ArrowUp } from 'lucide-react';

/* Can put Twitter back in if I ever make an account */

const socialLinks = [
  { name: 'GitHub', icon: Github, href: 'https://github.com/calvinli1' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/calvinli-bu/' },
  /*{ name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },*/


  { name: 'Email', icon: Mail, href: 'mailto:licalvin2005@gmail.com' },
];


export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative py-16 overflow-hidden">
      {/* Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-electric/30 to-transparent" />

      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <motion.a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="flex items-center gap-2 group"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyber-electric to-cyber-lime flex items-center justify-center">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold text-xl">
                Calvin<span className="text-cyber-electric">.dev</span>
              </span>
            </motion.a>
            <p className="text-gray-400 text-sm max-w-xs">
              Firmware developer and embedded systems engineer passionate about building
              the future of hardware-software integration.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social) => (
                <SocialIcon key={social.name} {...social} />
              ))}
            </div>
          </div>
        </div>




        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by Calvin Li
          </p>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} All rights reserved.
          </p>

          {/* Scroll to Top */}
          <motion.button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}

interface SocialIconProps {
  name: string;
  icon: React.ElementType;
  href: string;
}

function SocialIcon({ name, icon: Icon, href }: SocialIconProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyber-electric hover:border-cyber-electric/50 transition-all duration-300"
      whileHover={{ scale: 1.15, y: -3 }}
      whileTap={{ scale: 0.95 }}
      aria-label={name}
    >
      <Icon className="w-5 h-5" />
    </motion.a>
  );
}
