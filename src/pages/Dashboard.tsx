import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Calendar,
    FileText,
    ClipboardList,
    Megaphone,
    Building2,
    MessageSquare,
    Clock,
    BookOpen,
    GraduationCap,
    MapPin,
    CalendarDays
} from 'lucide-react';

interface DashboardProps {
    darkMode?: boolean;
}

export function Dashboard({ onNavigate, darkMode = false }: DashboardProps) {
    const [activeEventsTab, setActiveEventsTab] = useState<'events' | 'news'>('events');

    const containerVariants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 300, damping: 24 }
        }
    };

    const quickActions = [
        {
            id: 'schedule',
            icon: Calendar,
            title: 'View Schedule',
            desc: 'Check your weekly classes and exams',
            color: 'text-blue-500',
            bg: 'bg-blue-50',
            darkBg: 'bg-blue-500/10'
        },
        {
            id: 'submit-request',
            icon: FileText,
            title: 'Submit Request',
            desc: 'Apply for letters, transcripts, or visas',
            color: 'text-[#00AC5C]',
            bg: 'bg-academic-50',
            darkBg: 'bg-[#00AC5C]/10',
            hidden: true
        },
        {
            id: 'my-requests',
            icon: ClipboardList,
            title: 'My Requests',
            desc: 'Track your submitted applications',
            color: 'text-orange-500',
            bg: 'bg-orange-50',
            darkBg: 'bg-orange-500/10',
            hidden: true
        },
        {
            id: 'announcements',
            icon: Megaphone,
            title: 'Announcements',
            desc: 'Official news and important updates',
            color: 'text-purple-500',
            bg: 'bg-purple-50',
            darkBg: 'bg-purple-500/10'
        },
        {
            id: 'services',
            icon: Building2,
            title: 'Student Services',
            desc: 'Housing, medical, and library access',
            color: 'text-teal-500',
            bg: 'bg-teal-50',
            darkBg: 'bg-teal-500/10'
        },
        {
            id: 'chat',
            icon: MessageSquare,
            title: 'Contact Advisor',
            desc: 'Message your international advisor',
            color: 'text-pink-500',
            bg: 'bg-pink-50',
            darkBg: 'bg-pink-500/10'
        }
    ];

    const events = [
        {
            title: 'International Students Welcome Ceremony',
            location: 'Conference Hall A',
            time: '9:00 am – 11:00 am',
            date: '04 Feb 2026'
        },
        {
            title: 'Career Fair & Networking Event',
            location: 'Main Auditorium',
            time: '10:00 am – 3:00 pm',
            date: '12 Feb 2026'
        },
        {
            title: 'Academic Workshop: Research Methods',
            location: 'Building C - Room 201',
            time: '1:00 pm – 3:30 pm',
            date: '18 Feb 2026'
        }
    ];

    const news = [
        {
            title: 'MUST Ranks Among Top 50 Universities in Africa',
            location: 'University Press',
            time: 'Published today',
            date: '01 Feb 2026'
        },
        {
            title: 'New Scholarship Program for International Students',
            location: 'Financial Aid Office',
            time: 'Applications open',
            date: '28 Jan 2026'
        },
        {
            title: 'Campus Expansion: New Engineering Building',
            location: 'Campus Development',
            time: 'Construction begins Q2',
            date: '25 Jan 2026'
        }
    ];

    const activeItems = activeEventsTab === 'events' ? events : news;

    return (
        <div className="page-container space-y-8">
            {/* Welcome Banner */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`rounded-2xl p-8 text-white relative overflow-hidden shadow-lg ${
                    darkMode ? 'bg-dark-card' : 'bg-navy-500'
                }`}
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute bottom-0 right-32 w-40 h-40 bg-[#00AC5C] opacity-20 rounded-full translate-y-1/2"></div>
                <div className="relative z-10">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                        Welcome back, Ahmed!
                    </h1>
                    <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-navy-100'}`}>
                        International Students Affairs Portal
                    </p>
                </div>
            </motion.div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    {
                        label: 'Current GPA',
                        value: '3.45',
                        icon: GraduationCap,
                        color: 'text-[#00AC5C]',
                    },
                    {
                        label: 'Credits',
                        value: '78/140',
                        icon: BookOpen,
                        color: 'text-blue-500',
                    },
                    {
                        label: 'Semester',
                        value: 'Fall 2025',
                        icon: Calendar,
                        color: 'text-purple-500',
                    },
                    {
                        label: 'Pending Requests',
                        value: '2',
                        icon: Clock,
                        color: 'text-orange-500',
                    },
                ]
                    .filter(stat => stat.label !== 'Current GPA')
                    .map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="card p-5 flex items-center gap-4"
                        >
                            <div className={`p-3 rounded-xl ${stat.color} ${
                                darkMode ? 'bg-white/5' : 'bg-surface-100'
                            }`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <p className={`text-sm font-medium ${
                                    darkMode ? 'text-gray-400' : 'text-navy-300'
                                }`}>
                                    {stat.label}
                                </p>
                                <p className={`text-xl font-bold ${
                                    darkMode ? 'text-white' : 'text-navy-900'
                                }`}>
                                    {stat.value}
                                </p>
                            </div>
                        </motion.div>
                    ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Actions Grid */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className={`text-xl font-bold flex items-center gap-2 ${
                        darkMode ? 'text-white' : 'text-navy-900'
                    }`}>
                        Quick Actions
                    </h2>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                        {quickActions
                            .filter((action) => !action.hidden)
                            .map((action) => (
                                <motion.div
                                    key={action.id}
                                    variants={itemVariants}
                                    onClick={() => onNavigate(action.id as PageType)}
                                    className="card p-6 cursor-pointer card-hover group"
                                >
                                    <div className="flex items-start gap-4">
                                        <div
                                            className={`p-3 rounded-xl ${action.color} ${
                                                darkMode ? action.darkBg : action.bg
                                            } group-hover:scale-110 transition-transform duration-200`}
                                        >
                                            <action.icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3
                                                className={`font-semibold mb-1 group-hover:text-[#00AC5C] transition-colors duration-200 ${
                                                    darkMode ? 'text-white' : 'text-navy-900'
                                                }`}
                                            >
                                                {action.title}
                                            </h3>
                                            <p
                                                className={`text-sm ${
                                                    darkMode ? 'text-gray-400' : 'text-navy-400'
                                                }`}
                                            >
                                                {action.desc}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                    </motion.div>
                </div>

                {/* Right Sidebar - Upcoming Events Mini */}
                <div className="space-y-6">
                    <h2 className={`text-xl font-bold flex items-center gap-2 ${
                        darkMode ? 'text-white' : 'text-navy-900'
                    }`}>
                        <Calendar className="w-5 h-5 text-[#00AC5C]" />
                        Upcoming Events
                    </h2>
                    <div className="card p-5 space-y-4">
                        {events.slice(0, 3).map((event, idx) => (
                            <div key={idx} className="space-y-2">
                                <div className="flex items-start gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-[#00AC5C]/10 flex flex-col items-center justify-center text-[#00AC5C] font-bold shrink-0">
                                        <span className="text-xs">{event.date.split(' ')[0]}</span>
                                        <span className="text-sm leading-4">{event.date.split(' ')[1]}</span>
                                    </div>
                                    <div>
                                        <h4 className={`font-semibold text-sm ${
                                            darkMode ? 'text-white' : 'text-navy-900'
                                        }`}>
                                            {event.title}
                                        </h4>
                                        <p className={`text-xs ${
                                            darkMode ? 'text-gray-400' : 'text-navy-400'
                                        }`}>
                                            {event.time}
                                        </p>
                                    </div>
                                </div>
                                {idx < 2 && (
                                    <hr className={`my-2 ${
                                        darkMode ? 'border-dark-border' : 'border-surface-200'
                                    }`} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ============ EVENTS & NEWS SECTION ============ */}
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-4"
            >
                {/* Section Header */}
                <div className="mb-8">
                    <p className="text-[#00AC5C] font-semibold text-sm tracking-widest uppercase mb-2">
                        Events & News
                    </p>
                    <h2 className={`text-2xl md:text-3xl font-bold leading-tight ${
                        darkMode ? 'text-white' : 'text-navy-900'
                    }`}>
                        Students Live Their Days In
                        <br />
                        The <span className="text-[#00AC5C]">Best Environment.</span>
                    </h2>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 mb-8">
                    {(['events', 'news'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveEventsTab(tab)}
                            className={`px-6 py-2.5 rounded-full text-sm font-semibold capitalize transition-all duration-300 ${
                                activeEventsTab === tab
                                    ? 'bg-[#00AC5C] text-white shadow-lg shadow-[#00AC5C]/25'
                                    : darkMode
                                        ? 'bg-dark-card text-gray-400 hover:text-white'
                                        : 'bg-surface-200 text-navy-500 hover:bg-surface-300'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Two-Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left: Featured Image */}
                    <motion.div
                        key={activeEventsTab}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="rounded-2xl overflow-hidden shadow-lg h-80 lg:h-auto relative group"
                    >
                        <img
                            src={
                                activeEventsTab === 'events'
                                    ? 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                                    : 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                            }
                            alt={
                                activeEventsTab === 'events'
                                    ? 'Campus Events'
                                    : 'University News'
                            }
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute bottom-6 left-6 right-6">
                            <span className="bg-[#00AC5C] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                {activeEventsTab === 'events' ? 'Upcoming' : 'Latest'}
                            </span>
                        </div>
                    </motion.div>

                    {/* Right: Event/News Cards */}
                    <div className="space-y-4">
                        {activeItems.map((item, idx) => (
                            <motion.div
                                key={`${activeEventsTab}-${idx}`}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className={`card p-5 cursor-pointer group flex items-center gap-5 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5 ${
                                    darkMode ? 'hover:border-[#00AC5C]/30' : 'hover:border-[#00AC5C]/20'
                                }`}
                            >
                                {/* Card Content */}
                                <div className="flex-grow space-y-3">
                                    <h3
                                        className={`font-bold text-base group-hover:text-[#00AC5C] transition-colors duration-200 ${
                                            darkMode ? 'text-white' : 'text-navy-900'
                                        }`}
                                    >
                                        {item.title}
                                    </h3>
                                    <div
                                        className={`flex flex-wrap gap-x-4 gap-y-1.5 text-xs ${
                                            darkMode ? 'text-gray-400' : 'text-navy-400'
                                        }`}
                                    >
                                        <span className="flex items-center gap-1.5">
                                            <MapPin className="w-3.5 h-3.5 text-[#00AC5C]" />
                                            {item.location}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <Clock className="w-3.5 h-3.5 text-[#00AC5C]" />
                                            {item.time}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <CalendarDays className="w-3.5 h-3.5 text-[#00AC5C]" />
                                            {item.date}
                                        </span>
                                    </div>
                                </div>

                                {/* Large Number */}
                                <div className="text-5xl font-extrabold text-[#00AC5C] opacity-20 group-hover:opacity-40 transition-opacity duration-300 select-none shrink-0 leading-none">
                                    {String(idx + 1).padStart(2, '0')}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Discover More Button */}
                <div className="flex justify-center mt-10">
                    <a
                        href="https://must.edu.eg/about-must/board-of-trustees/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-3 rounded-full border-2 border-[#00AC5C] text-[#00AC5C] font-semibold text-sm hover:bg-[#00AC5C] hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#00AC5C]/20"
                    >
                        Discover More
                    </a>
                </div>
            </motion.section>
        </div>
    );
}