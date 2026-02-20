import { useMemo } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import type { Engine } from 'tsparticles-engine';

export default function ParticleBackground() {
  const particlesInit = async (engine: Engine) => {
    await loadSlim(engine);
  };

  // Use useMemo to prevent unnecessary re-renders
  const options = useMemo(
    () => ({
      fullScreen: {
        enable: true,
        zIndex: -1,
      },
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: '#1E90FF',
        },
        shape: {
          type: 'circle',
        },
        opacity: {
          value: 0.25,
          random: true,
          anim: {
            enable: true,
            speed: 0.5,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 2,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            size_min: 0.5,
            sync: false,
          },
        },
        links: {
          enable: true,
          distance: 150,
          color: '#1E90FF',
          opacity: 0.15,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.3,
          direction: 'none' as const,
          random: true,
          straight: false,
          outModes: {
            default: 'bounce' as const,
          },
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detectsOn: 'canvas' as const,
        events: {
          onHover: {
            enable: true,
            mode: 'grab',
          },
          onClick: {
            enable: false,
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 200,
            links: {
              opacity: 0.4,
              color: '#1E90FF',
            },
          },
          bubble: {
            distance: 400,
            size: 4,
            duration: 2,
            opacity: 0.3,
            speed: 3,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      detectRetina: true,
      background: {
        color: 'transparent',
        image: '',
        position: '50% 50%',
        repeat: 'no-repeat',
        size: 'cover',
      },
    }),
    []
  );

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={options}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: -1,
      }}
    />
  );
}
