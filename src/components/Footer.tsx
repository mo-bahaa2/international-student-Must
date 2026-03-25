
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin } from
'lucide-react';
interface FooterProps {
  darkMode?: boolean;
}
export function Footer({ darkMode = false }: FooterProps) {
  return (
    <footer
      className={`pt-16 pb-8 border-t-4 border-[#00AC5C] mt-auto transition-colors duration-300 ${darkMode ? 'bg-dark-surface text-white' : 'bg-navy-500 text-white'}`}>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Center Logo */}
        <div className="flex justify-center mb-12">
          <div
            className={`w-28 h-28 rounded-full flex items-center justify-center overflow-hidden shadow-lg border-4 transition-colors duration-300 ${darkMode ? 'bg-white border-dark-border' : 'bg-white border-navy-400'}`}>
            <img src="/must_logo.png" alt="MUST" className="w-full h-full object-contain p-2" />
          </div>
        </div>

        {/* 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#00AC5C]">Links</h3>
            <ul
              className={`space-y-2 text-sm ${darkMode ? 'text-gray-300' : 'text-navy-100'}`}>
              
{[
                { label: 'University Link', href: 'https://must.edu.eg/about-must/board-of-trustees/' },
                { label: 'Academics', href: 'https://must.edu.eg/academic_programs/undergraduate-studies/' },
                { label: 'Life at MUST', href: 'https://must.edu.eg/about-must/board-of-trustees/' },
                { label: 'Research & Centres', href: 'https://must.edu.eg/centers/' },
                { label: 'Maps & Directions', href: 'https://must.edu.eg/centers/' },
                { label: 'FAQs', href: 'https://must.edu.eg/faqs/' }
              ].map(({ label, href }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer"
                    className="hover:text-[#00AC5C] transition-colors duration-200">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: About */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#00AC5C]">
              About University
            </h3>
            <ul
              className={`space-y-2 text-sm ${darkMode ? 'text-gray-300' : 'text-navy-100'}`}>
              
{[
                { label: 'About MUST', href: 'https://must.edu.eg/about-must/board-of-trustees/' },
                { label: 'History', href: 'https://must.edu.eg/history/' },
                { label: 'Why MUST', href: 'https://must.edu.eg/why-must/' },
                { label: 'Values & Principles', href: 'https://must.edu.eg/about-must/must-policies/' },
                { label: 'Contact Us', href: 'https://must.edu.eg/contact/' },
                { label: 'Privacy Policy', href: 'https://must.edu.eg/privacy-policy-2/' }
              ].map(({ label, href }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer"
                    className="hover:text-[#00AC5C] transition-colors duration-200">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: MUST Buzz */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#00AC5C]">
              MUST Buzz
            </h3>
            <ul
              className={`space-y-2 text-sm ${darkMode ? 'text-gray-300' : 'text-navy-100'}`}>
              
{[
                { label: 'MUST Events', href: '#' },
                { label: 'MUST News', href: '#' },
                { label: 'Blog', href: '#' },
                { label: 'Announcement', href: '#' }
              ].map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="hover:text-[#00AC5C] transition-colors duration-200">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#00AC5C]">
              Contact Info
            </h3>
            <ul
              className={`space-y-4 text-sm ${darkMode ? 'text-gray-300' : 'text-navy-100'}`}>
              
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#00AC5C] shrink-0 mt-0.5" />
                <span>16878</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#00AC5C] shrink-0 mt-0.5" />
                <a
                  href="mailto:info@must.edu.eg"
                  className="hover:text-[#00AC5C] transition-colors duration-200">
                  
                  info@must.edu.eg
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#00AC5C] shrink-0 mt-0.5" />
<a href="https://www.google.com/maps/search/?api=1&query=Al+Motamayez+District%2C+6th+of+October%2C+Egypt" target="_blank" rel="noopener noreferrer" className="hover:text-[#00AC5C] transition-colors duration-200">
                  Al Motamayez District
                  <br />
                  6th of October
                  <br />
                  Egypt
                </a>
              </li>
            </ul>

          </div>
        </div>


        {/* Bottom Bar */}
        <div
          className={`pt-8 border-t text-center text-sm ${darkMode ? 'border-dark-border text-gray-400' : 'border-navy-400 text-navy-200'}`}>
          
          <p>
            Copyright All Rights Reserved © MUST University{' '}
            {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>);

}