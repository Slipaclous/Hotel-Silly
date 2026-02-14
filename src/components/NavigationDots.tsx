'use client';

import { useEffect, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';

export interface NavSection {
  id: string;
  label: string;
  isDark: boolean;
}

export default function NavigationDots() {
  const pathname = usePathname();
  const [sections, setSections] = useState<NavSection[]>([]);
  const [activeSection, setActiveSection] = useState('');
  const [isDarkBackground, setIsDarkBackground] = useState(false);

  // Découverte automatique des sections sur la page
  const discoverSections = useCallback(() => {
    // On cherche les éléments avec l'attribut data-nav-section (le label)
    const elements = document.querySelectorAll('[data-nav-section]');

    if (elements.length === 0) {
      setSections([]);
      return;
    }

    const discovered: NavSection[] = Array.from(elements).map((el) => {
      const id = el.id || `section-${Math.random().toString(36).substr(2, 9)}`;
      if (!el.id) el.id = id; // Assure que l'élément a un ID pour le scroll

      return {
        id: id,
        label: el.getAttribute('data-nav-section') || '',
        isDark: el.getAttribute('data-nav-is-dark') === 'true' ||
          el.classList.contains('bg-noir') ||
          el.classList.contains('bg-[#2c3840]')
      };
    });

    setSections(discovered);
    if (discovered.length > 0) {
      setActiveSection(discovered[0].id);
      setIsDarkBackground(discovered[0].isDark);
    }
  }, []);

  useEffect(() => {
    discoverSections();

    // On observe aussi les changements du DOM pour les contenus dynamiques
    const observer = new MutationObserver(() => {
      // On utilise un petit délai pour laisser React faire son rendu
      setTimeout(discoverSections, 100);
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [discoverSections, pathname]);

  useEffect(() => {
    if (sections.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px', // Marge plus grande pour être plus réactif
      threshold: 0,
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
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Ne pas afficher sur les pages d'administration
  if (pathname?.startsWith('/admin')) return null;

  if (sections.length <= 1) return null;

  return (
    <div className={`navigation-dots ${isDarkBackground ? 'dark-bg' : 'light-bg'}`}>
      {sections.map((section) => (
        <div
          key={section.id}
          className={`nav-dot ${activeSection === section.id ? 'active' : ''}`}
          onClick={() => scrollToSection(section.id)}
          title={section.label}
        >
          <span className="nav-label">{section.label}</span>
        </div>
      ))}
    </div>
  );
}
