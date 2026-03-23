import { useEffect, useState, useRef } from 'react';
import {
  Search,
  Bell,
  Menu,
  X,
  ChevronDown,
  User,
  Settings as SettingsIcon,
  LogOut,
  Globe,
  Sun,
  Moon
} from
  'lucide-react';
import type { PageType, Language } from '../App';
interface NavbarProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  language: Language;
  onToggleLanguage: (lang: Language) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}
export function Navbar({
  currentPage,
  onNavigate,
  language,
  onToggleLanguage,
  darkMode,
  onToggleDarkMode
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const navItems: {
    id: PageType;
    label: string;
  }[] = [
      {
        id: 'dashboard' as const,
        label: 'Home'
      },
      {
        id: 'academics' as const,
        label: 'Academics'
      },
      {
        id: 'questionnaires' as const,
        label: 'Questionnaires'
      },
      {
        id: 'resources' as const,
        label: 'Resources'
      },
      {
        id: 'announcements' as const,
        label: 'Announcements'
      },
      {
        id: 'contact-us' as const,
        label: 'Contact Us'
      }];

  const handleNavClick = (page: PageType) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };
  return (
    <header
      className={`sticky top-0 z-50 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300 ${darkMode ? 'bg-gray-900 border-gray-800 text-gray-100 shadow-2xl' : 'bg-white text-gray-900'}`}>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Brand */}
          <div
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => handleNavClick('dashboard')}>

            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0 overflow-hidden text-navy-500 font-bold text-xl">
              <img src="/assists/must_logo.png" alt="MUST" className="w-full h-full object-contain p-1" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-sm font-bold tracking-wide leading-tight">
                MISR UNIVERSITY FOR
              </h1>
              <h1 className="text-sm font-bold tracking-wide leading-tight">
                SCIENCE & TECHNOLOGY
              </h1>
              <p className="text-xs text-navy-200 mt-0.5">
                International Students Affairs
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) =>
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
className={`relative px-4 py-2 text-sm font-medium ${currentPage === item.id ? 'text-[#00AC5C] border-b-2 border-[#00AC5C]' : 'text-gray-700 dark:text-white'}`}>
                {item.label}
              </button>
            )}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1 sm:gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 text-navy-100 rounded-full"
              title={darkMode ? 'Light Mode' : 'Dark Mode'}>

              {darkMode ?
                <Sun className="w-5 h-5" /> :

                <Moon className="w-5 h-5" />
              }
            </button>

            {/* Language Switcher - Globe Dropdown */}
            <div className="relative hidden sm:block" ref={langRef}>
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="p-2 text-navy-100 hover:text-[#00AC5C] rounded-full transition-colors duration-200"
                title="Language">

                <Globe className="w-5 h-5" />
              </button>

              {isLangDropdownOpen &&
                <div
                  className={`absolute right-0 mt-2 w-40 rounded-xl shadow-lg border py-1 z-20 animate-fade-in ${darkMode ? 'bg-dark-card border-dark-border' : 'bg-white border-surface-200'}`}>

                  <button
                    onClick={() => {
                      onToggleLanguage('en');
                      setIsLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm font-medium flex items-center justify-between transition-colors duration-200 ${language === 'en' ? 'text-[#00AC5C]' : darkMode ? 'text-white hover:bg-dark-card-hover' : 'text-navy-600 hover:bg-surface-100'}`}>

                    English
                    {language === 'en' &&
                      <span className="w-2 h-2 rounded-full bg-[#00AC5C]"></span>
                    }
                  </button>
                  <button
                    onClick={() => {
                      onToggleLanguage('ar');
                      setIsLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm font-medium flex items-center justify-between transition-colors duration-200 ${language === 'ar' ? 'text-[#00AC5C]' : darkMode ? 'text-white hover:bg-dark-card-hover' : 'text-navy-600 hover:bg-surface-100'}`}>

                    العربية
                    {language === 'ar' &&
                      <span className="w-2 h-2 rounded-full bg-[#00AC5C]"></span>
                    }
                  </button>
                </div>
              }
            </div>

          <button className="p-2 text-navy-100 rounded-full">
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={() => handleNavClick('notifications')}
              className="p-2 text-navy-100 hover:text-[#00AC5C] rounded-full transition-colors duration-200 relative">

              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-status-rejected rounded-full border-2 border-navy-500"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-2 p-1 pr-2 rounded-full hover:bg-white/10 transition-colors duration-200 ml-1">

                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                  alt="Student"
                  className="w-8 h-8 rounded-full border border-navy-300 object-cover" />

                <ChevronDown className="w-4 h-4 text-navy-100 hidden sm:block" />
              </button>

              {isProfileDropdownOpen &&
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsProfileDropdownOpen(false)}>
                  </div>
                  <div
                    className={`absolute right-0 mt-2 w-48 rounded-xl shadow-lg border py-1 z-20 animate-fade-in ${darkMode ? 'bg-dark-card border-dark-border' : 'bg-white border-surface-200'}`}>

                    <div
                      className={`px-4 py-3 border-b ${darkMode ? 'border-dark-border' : 'border-surface-100'}`}>

                      <p
                        className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-navy-900'}`}>

                        Ahmed Hassan
                      </p>
                      <p
                        className={`text-xs ${darkMode ? 'text-gray-400' : 'text-navy-400'}`}>

                        ID: 20230145
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        handleNavClick('profile');
                        setIsProfileDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 transition-colors duration-200 ${darkMode ? 'text-white hover:bg-dark-card-hover' : 'text-navy-600 hover:bg-surface-100'}`}>

                      <User className="w-4 h-4" /> My Profile
                    </button>
                    <button
                      onClick={() => {
                        handleNavClick('settings');
                        setIsProfileDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 transition-colors duration-200 ${darkMode ? 'text-white hover:bg-dark-card-hover' : 'text-navy-600 hover:bg-surface-100'}`}>

                      <SettingsIcon className="w-4 h-4" /> Settings
                    </button>
                    <div
                      className={`border-t my-1 ${darkMode ? 'border-dark-border' : 'border-surface-100'}`}>
                    </div>
                    <button className="w-full text-left px-4 py-2 text-sm text-status-rejected hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 transition-colors duration-200">
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                </>
              }
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-navy-100 hover:text-[#00AC5C] rounded-md transition-colors duration-200 ml-1">

              {isMobileMenuOpen ?
                <X className="w-6 h-6" /> :

                <Menu className="w-6 h-6" />
              }
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen &&
        <div
          className={`lg:hidden border-t animate-slide-up ${darkMode ? 'bg-dark-card border-dark-border' : 'bg-navy-600 border-navy-400'}`}>

          <div className="px-4 pt-2 pb-4 space-y-1">
            {navItems.map((item) =>
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-3 py-3 rounded-md text-base font-medium transition-colors duration-200 ${currentPage === item.id ? 'text-[#00AC5C] bg-green-50 font-semibold border-l-4 border-[#00AC5C] pl-5' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`}>
                {item.label}
              </button>
            )}
            <div className="flex items-center gap-3 px-3 py-3">
              <button
                onClick={onToggleDarkMode}
                className="flex items-center gap-2 text-navy-100 hover:text-white text-base font-medium">

                {darkMode ?
                  <Sun className="w-5 h-5" /> :

                  <Moon className="w-5 h-5" />
                }
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
            <div className="flex items-center gap-3 px-3 py-3">
              <Globe className="w-5 h-5 text-gray-600" />
              <button
                onClick={() => onToggleLanguage('en')}
                className={`text-base font-medium transition-colors duration-200 ${language === 'en' ? 'text-[#00AC5C] font-semibold' : 'text-gray-700 hover:text-gray-900'}`}>

                EN
              </button>
              <span className="text-gray-400">|</span>
              <button
                onClick={() => onToggleLanguage('ar')}
                className={`text-base font-medium transition-colors duration-200 ${language === 'ar' ? 'text-[#00AC5C] font-semibold' : 'text-gray-700 hover:text-gray-900'}`}>

                AR
              </button>
            </div>
          </div>
        </div>
      }
    </header>);

}