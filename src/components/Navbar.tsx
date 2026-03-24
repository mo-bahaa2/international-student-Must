import { useState } from 'react';
import {
    Bell,
    Menu,
    X,
    User,
    Sun,
    Moon,
    ChevronDown
} from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import type { Language } from '../App';

interface NavbarProps {
    language: Language;
    onToggleLanguage: (lang: Language) => void;
    darkMode: boolean;
    onToggleDarkMode: () => void;
}

export function Navbar({
                           language,
                           onToggleLanguage,
                           darkMode,
                           onToggleDarkMode
                       }: NavbarProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    const navItems = [
        { path: '/home', label: 'Home' },
        { path: '/academics', label: 'Academics' },
        { path: '/questionnaires', label: 'Questionnaires' },
        { path: '/resources', label: 'Resources' },
        { path: '/announcements', label: 'Announcements' },
        { path: '/contact-us', label: 'Contact Us' }
    ];

    return (
        <header
            className={`sticky top-0 z-50 border-b backdrop-blur-md transition-all duration-300 ${
                darkMode
                    ? 'bg-gray-900/90 border-gray-800 text-gray-100'
                    : 'bg-[#1C306E]/95 text-white'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-20">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3">
                        <img src="/assists/muster.png" className="w-14 h-14" />
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-2">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `px-4 py-2 text-sm font-medium relative transition-all duration-200 ${
                                        isActive
                                            ? 'text-[#00AC5C]'
                                            : 'text-white hover:text-[#00AC5C]'
                                    }`
                                }
                            >
                                {item.label}

                                {/* Active underline animation */}
                                <span
                                    className={`absolute left-0 bottom-0 h-[2px] bg-[#00AC5C] transition-all duration-300 ${
                                        location.pathname === item.path
                                            ? 'w-full'
                                            : 'w-0 group-hover:w-full'
                                    }`}
                                />
                            </NavLink>
                        ))}
                    </nav>

                    {/* Right Side */}
                    <div className="flex items-center gap-3">

                        {/* Dark Mode */}
                        <button
                            onClick={onToggleDarkMode}
                            className="p-2 rounded-full hover:bg-white/10 transition"
                        >
                            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        {/* Divider */}
                        <div className="h-5 w-px bg-white/30"></div>

                        {/* Language */}
                        <button
                            onClick={() =>
                                onToggleLanguage(language === 'en' ? 'ar' : 'en')
                            }
                            className="px-2 font-semibold hover:text-[#00AC5C] transition"
                        >
                            {language === 'en' ? 'ع' : 'EN'}
                        </button>

                        {/* Divider */}
                        <div className="h-5 w-px bg-white/30"></div>

                        {/* Notification */}
                        <Link
                            to="/notifications"
                            className="relative p-2 rounded-full hover:bg-white/10 transition"
                        >
                            <Bell size={20} />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </Link>

                        {/* Divider */}
                        <div className="h-5 w-px bg-white/30"></div>

                        {/* Profile */}
                        <div className="relative">
                            <button
                                onClick={() =>
                                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                                }
                                className="flex items-center gap-1 p-1 rounded-full hover:bg-white/10 transition"
                            >
                                <User size={20} />
                                <ChevronDown size={14} />
                            </button>

                            {isProfileDropdownOpen && (
                                <div className="absolute right-0 mt-3 w-48 bg-white text-black rounded-xl shadow-lg overflow-hidden">
                                    <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                                        Profile
                                    </Link>
                                    <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100">
                                        Settings
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Mobile */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 rounded-md hover:bg-white/10 transition"
                        >
                            {isMobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile */}
            {isMobileMenuOpen && (
                <div className="lg:hidden px-4 py-3 bg-white text-black space-y-2 shadow-md">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block py-2 px-2 rounded hover:bg-gray-100"
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </div>
            )}
        </header>
    );
}