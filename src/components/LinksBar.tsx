import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

interface LinksBarProps {
  className?: string;
}

export type MenuItem = {
  label: string;
  to: string;
  children?: MenuItem[];
};

export const STATIC_MENU_ITEMS: MenuItem[] = [
  { label: 'Home', to: '/' },
  {
    label: 'Academics',
    to: '/academics',
    children: [
      { label: 'Academic Staff', to: '/academics' },
      { label: 'Undergraduate Programs', to: '/undergraduate' },
      { label: 'Postgraduate Programs', to: '/postgraduate' },
      { label: 'Honor List', to: '/honor-list' },
      { label: 'Academic Advising', to: '/academic-advising' },
      { label: 'Registeration', to: '/Registeration' },
      { label: 'Schedules', to: '/schedules' },
      { label: 'Calendar', to: '/calendar' },
      { label: 'E-Learning', to: '/e-learning' },
      { label: 'How To Apply', to: '/how-to-apply' },
    ],
  },
  { label: 'Advising', to: '/advising' },
  {
    label: 'Activities',
    to: '/activities',
    children: [
      {
        label: 'Student Activity',
        to: '/activities',
        children: [
          { label: 'Cultural', to: '/cultural' },
          { label: 'Sports', to: '/sports' },
          { label: 'Art', to: '/art' },
        ],
      },
      { label: 'Student Clubs', to: '/student-clubs' },
    ],
  },
  { label: 'Facilities', to: '/facilities' },
  { label: 'News', to: '/news' },
  { label: 'Events', to: '/events' },
  { label: 'Important Links', to: '/important-links' },
  { label: 'Contact Us', to: '/contact-us' },
];

function DropdownNode({ item, closeMenu }: { item: MenuItem; closeMenu: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = !!item.children?.length;

  return (
    <div className="relative">
      <div
        className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold text-white cursor-pointer transition-colors hover:bg-white/10 hover:text-green-400"
        onClick={(e) => {
          if (hasChildren) {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
      >
        <Link
          to={item.to}
          className="flex-1 no-underline text-inherit"
          onClick={(e) => {
            if (hasChildren) {
              e.preventDefault();
            } else {
              closeMenu();
            }
          }}
        >
          {item.label}
        </Link>
        {hasChildren && (
          <svg
            className={`h-4 w-4 opacity-70 transition-transform duration-300 ${isOpen ? 'rotate-90 text-green-400 opacity-100' : ''}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        )}
      </div>

      {hasChildren && isOpen && (
        <div className="absolute left-full top-0 ml-1 min-w-[200px] rounded-xl border border-white/20 bg-[#1f3769]/95 p-2 shadow-xl backdrop-blur z-50">
          {item.children!.map((child) => (
            <DropdownNode key={child.label} item={child} closeMenu={closeMenu} />
          ))}
        </div>
      )}
    </div>
  );
}

export function LinksBar({ className = '' }: LinksBarProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <div className={`flex items-center gap-6 ${className}`} onMouseLeave={() => setOpenMenu(null)}>
      {STATIC_MENU_ITEMS.map((item) => {
        const hasDropdown = !!item.children?.length;
        const isOpen = openMenu === item.label;

        return (
          <div
            key={item.label}
            className="relative"
            onMouseEnter={() => hasDropdown && setOpenMenu(item.label)}
          >
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `text-white text-base font-bold transition-colors duration-300 px-3 py-2 no-underline ${
                  isActive ? 'text-green-400' : 'hover:text-green-400'
                }`
              }
            >
              {item.label}
            </NavLink>

            {hasDropdown && isOpen && (
              <div className="absolute left-0 top-full z-40 mt-2 min-w-[250px] rounded-xl border border-white/20 bg-[#1f3769]/95 p-2 shadow-xl backdrop-blur">
                {item.children?.map((child) => (
                  <DropdownNode
                    key={child.label}
                    item={child}
                    closeMenu={() => setOpenMenu(null)}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
