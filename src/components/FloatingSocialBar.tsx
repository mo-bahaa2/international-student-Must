import React from 'react';
import { 
  Search, 
  Linkedin, 
  Facebook, 
  Instagram 
} from 'lucide-react';

export function FloatingSocialBar() {
  const socialLinks = [
    { icon: Search, href: '#', label: 'Search' },
    { icon: Linkedin, href: 'https://www.linkedin.com/school/misr-university-for-science-and-technology/', label: 'LinkedIn' },
    { icon: Facebook, href: 'https://www.facebook.com/mustuni/', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/mustuni/', label: 'Instagram' },
  ];

  return (
    /* الحاوية الرئيسية: مثبتة في اليمين، منتصف الشاشة عمودياً */
    <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-[999] pointer-events-auto">
      {socialLinks.map(({ icon: Icon, href, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#00AC5C] flex items-center justify-center 
                     text-[#00AC5C] bg-white shadow-md
                     hover:shadow-[0_0_15px_#00AC5C]
                     hover:scale-110
                     hover:bg-[#00AC5C] hover:text-white
                     transition-all duration-300 ease-in-out group"
          aria-label={label}
        >
          <Icon className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-200 group-hover:scale-110" />
        </a>
      ))}
    </div>
  );
}