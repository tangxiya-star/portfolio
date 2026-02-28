
import React from 'react';

const Header: React.FC = () => {
  const isCaseStudyRoute = window.location.pathname.startsWith('/case-studies/');
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).toUpperCase();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 56;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: 'Work', id: 'work' },
    { label: 'About', id: 'about' },
    { label: 'Resume', href: '#' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[60] bg-[#FAF9F6] border-b border-black/12 h-14">
      <div className="max-w-6xl mx-auto h-full px-4 flex items-center justify-between">

        {/* LEFT: HT Monogram Logo */}
        <a
          href="/"
          className="flex items-center justify-center w-8 h-8 bg-[#111111] text-white font-mono text-[11px] font-bold tracking-[0.06em] hover:bg-[#FFC83D] hover:text-[#111111] transition-all duration-150 select-none shrink-0"
          aria-label="Holly Tang — Home"
          style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }}
        >
          HT
        </a>

        {/* CENTER: Nav links */}
        <nav className="flex items-center gap-0.5">
          {navItems.map((item) => {
            const baseClass =
              'font-mono text-[10px] uppercase tracking-[0.22em] text-[#111111] px-4 py-2 hover:bg-black/5 transition-colors duration-150 focus:outline-none';

            if (item.href) {
              return (
                <a key={item.label} href={item.href} className={baseClass}>
                  {item.label}
                </a>
              );
            }

            if (isCaseStudyRoute && item.id === 'work') {
              return (
                <a key={item.label} href="/#work" className={baseClass}>
                  {item.label}
                </a>
              );
            }

            return (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.id!)}
                className={baseClass}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* RIGHT: Date */}
        <div
          className="hidden md:block text-[9px] text-[#AAAAAA] tracking-[0.14em] uppercase select-none"
          style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }}
        >
          {today}
        </div>

      </div>
    </header>
  );
};

export default Header;
