import {
    MapPin,
    Phone,
    Mail,
    Facebook,
    Twitter,
    Instagram,
    Linkedin
} from 'lucide-react';

interface FooterProps {
    darkMode?: boolean;
}

export function Footer({ darkMode = false }: FooterProps) {
    return (
        <footer
            className={`pt-16 pb-8 border-t-4 border-[#00AC5C] mt-auto transition-colors duration-300 ${
                darkMode
                    ? 'bg-dark-surface text-white'
                    : 'bg-[#1C306E] text-white'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Logo */}
                <div className="flex justify-center mb-12">
                    <div
                        className={`w-28 h-28 rounded-full flex items-center justify-center overflow-hidden  ${
                            darkMode
                                ? 'border-2 border-dark-border'
                                : 'border-2 border-navy-400'
                        }`}
                    >
                        <img
                            src="/assists/muster.png"
                            alt="MUST"
                            className="w-full h-full object-contain p-2"
                        />
                    </div>
                </div>

                {/* Columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

                    {/* Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-[#00AC5C]">Links</h3>
                        <ul className={`space-y-2 text-sm ${darkMode ? 'text-gray-300' : 'text-navy-100'}`}>
                            {[
                                { label: 'Home', href: '/' },
                                { label: 'The University', href: 'https://must.edu.eg/about-must/board-of-trustees/' },
                                { label: 'Academics', href: 'https://must.edu.eg/academic_programs/undergraduate-studies/' },
                                { label: 'Life at MUST', href: 'https://must.edu.eg/about-must/board-of-trustees/' },
                                { label: 'Research & Centres', href: 'https://must.edu.eg/centers/' },
                                { label: 'Maps & Directions', href: 'https://must.edu.eg/centers/' },
                                { label: 'FAQs', href: 'https://must.edu.eg/faqs/' }
                            ].map(({ label, href }) => (
                                <li key={label}>
                                    <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-[#00AC5C]">
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* About */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-[#00AC5C]">
                            About University
                        </h3>
                        <ul className={`space-y-2 text-sm ${darkMode ? 'text-gray-300' : 'text-navy-100'}`}>
                            {[
                                { label: 'About MUST', href: 'https://must.edu.eg/about-must/board-of-trustees/' },
                                { label: 'History', href: 'https://must.edu.eg/history/' },
                                { label: 'Accreditation', href: '#' },
                                { label: 'Why MUST', href: 'https://must.edu.eg/why-must/' },
                                { label: 'Values', href: 'https://must.edu.eg/about-must/must-policies/' },
                                { label: 'Contact Us', href: 'https://must.edu.eg/contact/' },
                                { label: 'Privacy Policy', href: 'https://must.edu.eg/privacy-policy-2/' }
                            ].map(({ label, href }) => (
                                <li key={label}>
                                    <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-[#00AC5C]">
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Buzz */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-[#00AC5C]">
                            MUST Buzz
                        </h3>
                        <ul className={`space-y-2 text-sm ${darkMode ? 'text-gray-300' : 'text-navy-100'}`}>
                            {[
                                { label: 'MUST Events', href: '#' },
                                { label: 'MUST News', href: '#' },
                                { label: 'Blog', href: '#' },
                                { label: 'Announcement', href: '#' }
                            ].map(({ label, href }) => (
                                <li key={label}>
                                    <a href={href} className="hover:text-[#00AC5C]">
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-[#00AC5C]">
                            Contact Info
                        </h3>

                        <ul className={`space-y-4 text-sm ${darkMode ? 'text-gray-300' : 'text-navy-100'}`}>
                            <li className="flex gap-3">
                                <Phone className="w-5 h-5 text-[#00AC5C]" />
                                <span>16878</span>
                            </li>

                            <li className="flex gap-3">
                                <Mail className="w-5 h-5 text-[#00AC5C]" />
                                <a href="mailto:info@must.edu.eg">info@must.edu.eg</a>
                            </li>

                            <li className="flex gap-3">
                                <MapPin className="w-5 h-5 text-[#00AC5C]" />
                                <span>6th of October, Egypt</span>
                            </li>
                        </ul>

                        {/* Social */}
                        <div className="flex gap-4 mt-6">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <div
                                    key={i}
                                    className={`w-8 h-8 flex items-center justify-center rounded-full ${
                                        darkMode ? 'bg-dark-card' : 'bg-navy-600'
                                    }`}
                                >
                                    <Icon className="w-4 h-4" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div
                    className={`pt-8 border-t text-center text-sm ${
                        darkMode
                            ? 'border-dark-border text-gray-400'
                            : 'border-navy-400 text-navy-200'
                    }`}
                >
                    <p>
                        © MUST University {new Date().getFullYear()}
                    </p>
                </div>
            </div>
        </footer>
    );
}