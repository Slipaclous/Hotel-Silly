'use client';

import { useEffect, useState } from 'react';

interface Section {
  id: string;
  label: string;
  isDark: boolean; // Indique si la section a un fond sombre
}

const sections: Section[] = [
  { id: 'hero', label: 'Accueil', isDark: true },
  { id: 'about', label: 'À propos', isDark: false },
  { id: 'rooms', label: 'Chambres', isDark: false },
  { id: 'testimonials', label: 'Témoignages', isDark: true },
  { id: 'footer', label: 'Contact', isDark: true },
];

export default function NavigationDots() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isDarkBackground, setIsDarkBackground] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            setIsDarkBackground(section.isDark);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <div className={`navigation-dots ${isDarkBackground ? 'dark-bg' : 'light-bg'}`}>
      {sections.map((section) => (
        <div
          key={section.id}
          className={`nav-dot ${activeSection === section.id ? 'active' : ''}`}
          onClick={() => scrollToSection(section.id)}
          title={section.label}
        />
      ))}
    </div>
  );
} 