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
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px',
      threshold: 0.1,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          const section = sections.find(s => s.id === sectionId);
          if (section) {
            setActiveSection(sectionId);
            setIsDarkBackground(section.isDark);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
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