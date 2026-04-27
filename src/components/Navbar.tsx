import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon, ChevronRight } from 'lucide-react';

import type { Language } from '../App';

interface NavbarProps {
  language: Language;
  onToggleLanguage: (lang: Language) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

type NavDropdownItem = string | { label: string; subItems: string[] };

function DesktopNestedDropdown({ item, onNavClick }: { item: { label: string; subItems: string[] }; onNavClick: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 hover:text-[#00AC5C] flex justify-between items-center cursor-pointer">
        {item.label}
        <ChevronRight className="h-4 w-4" />
      </button>
      {isOpen && (
        <div className="absolute top-0 left-full ml-1 bg-white text-black rounded-lg shadow-lg min-w-[180px] z-[9999]">
          {item.subItems.map((sub, idx) => (
            <button
              key={idx}
              onClick={onNavClick}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 hover:text-[#00AC5C]"
            >
              {sub}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function MobileNestedDropdown({ item, onNavClick }: { item: { label: string; subItems: string[] }; onNavClick: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="pl-4">
      <button
        className="w-full text-left py-1 hover:text-[#00AC5C] flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {item.label}
        <ChevronRight className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
      </button>
      {isOpen && (
        <div className="pl-4 space-y-1 mt-1 text-sm border-l border-white/20">
          {item.subItems.map((sub, idx) => (
            <button
              key={idx}
              onClick={onNavClick}
              className="block w-full text-left py-1 hover:text-[#00AC5C]"
            >
              {sub}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function Navbar({
  language,
  onToggleLanguage,
  darkMode,
  onToggleDarkMode
}: NavbarProps) {
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navItems: { id: string; label: string; dropdown: NavDropdownItem[] }[] = [
    {
      id: 'university',
      label: 'The University',
      dropdown: [
        'About MUST',
        'Sectors',
        'Reports',
        'Policies',
        'Contact Us'
      ]
    },
    {
      id: 'academics',
      label: 'Academics',
      dropdown: [
        'Undergraduate Studies',
        'Postgraduate Studies',
        'Academic Calendar'
      ]
    },
    {
      id: 'admission',
      label: 'Admission',
      dropdown: []
    },
    {
      id: 'activities',
      label: 'Activities',
      dropdown: [
        { label: 'Student Activity', subItems: ['Cultural', 'Sports', 'Art'] },
        'Student Clubs'
      ]
    },
    {
      id: 'buzz',
      label: 'MUST Buzz',
      dropdown: ['News', 'Events', 'Blogs']
    },
    {
      id: 'centers',
      label: 'Centers',
      dropdown: ['Research Centers', 'Units']
    },
    {
      id: 'life',
      label: 'Life At MUST',
      dropdown: ['Campus Life', 'Clubs', 'Facilities']
    },
    {
      id: 'sdgs',
      label: 'SDGs',
      dropdown: []
    }
  ];

  const handleNavClick = (id: string) => {
    navigate(`/${id}`);
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1C306E] text-white shadow-xl">
      <div className="w-full flex items-center justify-between h-16 md:h-20 px-3 md:px-6">
        {/* LOGO */}
        <div className="flex items-center flex-shrink-0 ml-0 cursor-pointer" onClick={() => navigate('/')}>
          <img src="/must_logo.png" className="w-10 h-10 object-contain" alt="MUST Logo" />
        </div>

        {/* NAV */}
        <nav className="hidden lg:flex items-center gap-5 relative">
          {navItems.map((item) => (
            <div
              key={item.id}
              className="relative"
              onMouseEnter={() => item.dropdown.length && setActiveDropdown(item.id)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => handleNavClick(item.id)}
                className="px-3 py-2 hover:text-[#00AC5C] whitespace-nowrap"
              >
                {item.label}
              </button>

              {/* DROPDOWN ONLY IF EXISTS */}
              {activeDropdown === item.id && item.dropdown.length > 0 && (
                <div className="absolute top-full left-0 mt-2 bg-white text-black rounded-lg shadow-lg min-w-[220px] z-[9999] py-2">
                  {item.dropdown.map((d, i) => {
                    if (typeof d === 'string') {
                      return (
                        <button
                          key={i}
                          onClick={() => handleNavClick(item.id)}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 hover:text-[#00AC5C]"
                        >
                          {d}
                        </button>
                      );
                    } else {
                      return (
                        <DesktopNestedDropdown key={i} item={d} onNavClick={() => handleNavClick(item.id)} />
                      );
                    }
                  })}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-10">
          {/* DARK MODE */}
          <button onClick={onToggleDarkMode}>
            {darkMode ? <Sun /> : <Moon />}
          </button>

          {/* LANGUAGE */}
          <button
            onClick={() => onToggleLanguage(language === 'en' ? 'ar' : 'en')}
            className="text-lg font-bold hover:text-[#00AC5C]"
          >
            ع
          </button>

          {/* PROFILE */}
          <div className="relative">
            <button onClick={() => setIsProfileOpen(!isProfileOpen)}>
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
                className="w-8 h-8 rounded-full"
                alt="Profile"
              />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 bg-white text-black rounded-lg shadow-lg w-48 z-[9999] py-2">
                <button className="w-full px-4 py-2 text-left hover:bg-gray-100">
                  Profile
                </button>
                <button className="w-full px-4 py-2 text-left hover:bg-gray-100">
                  Settings
                </button>
                <button className="w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100">
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* MOBILE MENU */}
          <button className="lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU CONTENT */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#1C306E] text-white px-4 py-3 space-y-2 max-h-[80vh] overflow-y-auto">
          {navItems.map((item) => (
            <div key={item.id}>
              <button
                className="w-full text-left py-2 hover:text-[#00AC5C]"
                onClick={() => {
                  if (item.dropdown.length === 0) {
                    handleNavClick(item.id);
                  } else {
                    setActiveDropdown(activeDropdown === item.id ? null : item.id);
                  }
                }}
              >
                {item.label}
              </button>

              {activeDropdown === item.id && item.dropdown.length > 0 && (
                <div className="pl-4 space-y-1 text-sm border-l border-white/20">
                  {item.dropdown.map((d, i) => {
                    if (typeof d === 'string') {
                      return (
                        <button
                          key={i}
                          className="block w-full text-left py-1 hover:text-[#00AC5C]"
                          onClick={() => handleNavClick(item.id)}
                        >
                          {d}
                        </button>
                      );
                    } else {
                      return <MobileNestedDropdown key={i} item={d} onNavClick={() => handleNavClick(item.id)} />;
                    }
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}