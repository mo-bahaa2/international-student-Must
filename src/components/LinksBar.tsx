import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import type { PageType } from '../App';

interface LinksBarProps {
  onNavigate: (page: PageType) => void;
  className?: string;
}

export function LinksBar({ onNavigate, className = '' }: LinksBarProps) {
  const { t } = useLanguage();

  const links: Array<{ id: PageType; label: string }> = [
    { id: 'dashboard' as PageType, label: t('home') || 'Home' },
    { id: 'academics' as PageType, label: t('academics') || 'Academics' },
    { id: 'questionnaires' as PageType, label: t('questionnaires') || 'Questionnaires' },
    { id: 'resources' as PageType, label: t('resources') || 'Resources' },
    { id: 'announcements' as PageType, label: t('announcements') || 'Announcements' },
    { id: 'contact-us' as PageType, label: t('contactUs') || 'Contact Us' },
  ];

  return (
    <div className={`flex space-x-8 ${className}`}>
      {links.map((link) => (
        <button
          key={link.id}
          onClick={() => onNavigate(link.id)}
          className="text-white text-lg font-medium hover:text-green-400 transition-colors duration-300 px-4 py-2 border-none bg-transparent cursor-pointer no-underline"
        >
          {link.label}
        </button>
      ))}
    </div>
  );
}

