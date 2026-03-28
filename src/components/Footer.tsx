import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface FooterProps {
  darkMode?: boolean;
}

export function Footer({ darkMode = false }: FooterProps) {
  return (
    <footer
      className={`pt-16 pb-0 border-t-4 border-[#1C306E] mt-auto transition-colors duration-300 ${
        darkMode ? 'bg-dark-surface text-white' : 'bg-[#1C306E] text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Logo Section */}
        <div className="flex justify-center mb-12">
          <div
            className={`w-28 h-28 rounded-full flex items-center justify-center overflow-hidden shadow-lg border-4 transition-colors duration-300 ${
              darkMode ? 'bg-white border-dark-border' : 'bg-white border-navy-400'
            }`}
          >
            <img
              src="/must_logo.png"
              alt="MUST"
              className="w-full h-full object-contain p-2"
            />
          </div>
        </div>

        {/* Columns Grid - 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#00AC5C]">Links</h3>
            <ul className={`space-y-2 text-sm ${darkMode ? 'text-gray-300' : 'text-navy-100'}`}>
              {[
                { label: 'Home', to: '/dashboard' },
                { label: 'The University', href: 'https://must.edu.eg/about-must/board-of-trustees/', external: true },
                { label: 'Academics', href: 'https://must.edu.eg/academic_programs/undergraduate-studies/', external: true },
                { label: 'Life at MUST', href: 'https://must.edu.eg/about-must/board-of-trustees/', external: true },
                { label: 'Research & Centres', href: 'https://must.edu.eg/centers/', external: true },
                { label: 'Maps & Directions', href: 'https://must.edu.eg/centers/', external: true },
                { label: 'FAQs', href: 'https://must.edu.eg/faqs/', external: true }
              ].map(({ label, href, to, external }) =>
                external ? (
                  <li key={label}>
                    <a href={href!} target="_blank" rel="noopener noreferrer" className="hover:text-[#00AC5C] transition-colors">{label}</a>
                  </li>
                ) : (
                  <li key={label}>
                    <NavLink to={to!} className="hover:text-[#00AC5C] transition-colors">{label}</NavLink>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Column 2: About University */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#00AC5C]">About University</h3>
            <ul className={`space-y-2 text-sm ${darkMode ? 'text-gray-300' : 'text-navy-100'}`}>
              {[
                { label: 'About MUST', href: 'https://must.edu.eg/about-must/board-of-trustees/', external: true },
                { label: 'History', href: 'https://must.edu.eg/history/', external: true },
                { label: 'Accreditation', to: '/academics' },
                { label: 'Why MUST', href: 'https://must.edu.eg/why-must/', external: true },
                { label: 'Values', href: 'https://must.edu.eg/about-must/must-policies/', external: true },
                { label: 'Contact Us', to: '/contact-us' },
                { label: 'Privacy Policy', href: 'https://must.edu.eg/privacy-policy-2/', external: true }
              ].map(({ label, href, to, external }) =>
                external ? (
                  <li key={label}>
                    <a href={href!} target="_blank" rel="noopener noreferrer" className="hover:text-[#00AC5C] transition-colors">{label}</a>
                  </li>
                ) : (
                  <li key={label}>
                    <NavLink to={to!} className="hover:text-[#00AC5C] transition-colors">{label}</NavLink>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Column 3: MUST Buzz */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#00AC5C]">MUST Buzz</h3>
            <ul className={`space-y-2 text-sm ${darkMode ? 'text-gray-300' : 'text-navy-100'}`}>
              {[
                { label: 'MUST Events', to: '/announcements' },
                { label: 'MUST News', to: '/announcements' },
                { label: 'Blog', to: '/resources' },
                { label: 'Announcement', to: '/announcements' }
              ].map(({ label, to }) => (
                <li key={label}>
                  <NavLink to={to} className="hover:text-[#00AC5C] transition-colors">{label}</NavLink>
                </li>
              ))}
            </ul>
          </div>

          
{/* Column 4: Contact Info */}
<div>
  <h3 className="text-lg font-semibold mb-4 text-[#00AC5C]">
    Contact Info
  </h3>

  <ul className={`space-y-3 text-sm ${darkMode ? 'text-gray-300' : 'text-navy-100'}`}>

    {/* Phone */}
    <li>
      <a
        href="tel:16878"
        className="text-sm text-inherit hover:text-[#00AC5C] transition-colors duration-300 cursor-pointer"
      >
        16878
      </a>
    </li>

    {/* Email */}
    <li>
      <a
        href="mailto:info@must.edu.eg"
        className="text-sm text-inherit hover:text-[#00AC5C] transition-colors duration-300 cursor-pointer"
      >
        info@must.edu.eg
      </a>
    </li>

    {/* Address */}
    <li className="text-sm leading-relaxed">
      Al Motamayez District – 6th of October, Egypt
    </li>

  </ul>
</div>
</div>
      </div>

     {/* Bottom Bar: Copyright Only */}
       <div className="w-full bg-white py-4 border-t border-gray-200">
    <p className="text-center text-sm text-gray-600">
      Copyright All Right Reserved @ MUST UNIVERSITY {new Date().getFullYear()}
    </p>
  </div>
  </footer>
  );
}