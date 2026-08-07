import { useState, useEffect } from 'react';
import { MessageCircle, Menu, X } from 'lucide-react';
import { WHATSAPP_URL } from '../data/content';

const navLinks = [
  { href: '#servicios', label: 'Servicios', route: false },
  { href: '/cursos', label: 'Cursos', route: true },
  { href: '#portafolio', label: 'Portafolio', route: false },
  { href: '#sobre-mi', label: 'Sobre mí', route: false },
  { href: '#contacto', label: 'Contacto', route: false },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHome, setIsHome] = useState(true);

  useEffect(() => {
    setIsHome(window.location.pathname === '/');
  }, []);

  const resolveHref = (link: (typeof navLinks)[number]) =>
    link.route ? link.href : isHome ? link.href : `/${link.href}`;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-bg/85 backdrop-blur-md border-b transition-all duration-300 ${
        scrolled ? 'border-border shadow-sm' : 'border-transparent'
      }`}
    >
      {/* Barra de progreso de scroll */}
      <div
        className="absolute -bottom-px left-0 h-0.5 bg-primary transition-[width] duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
      <nav className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#"
          className="font-display font-bold text-xl tracking-tight text-text hover:opacity-90 transition-opacity"
        >
          <span className="text-primary">Dav</span>Analyst
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={resolveHref(link)}
                className="text-muted hover:text-text text-sm font-medium transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        {/* WhatsApp CTA — desktop */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 bg-primary hover:bg-cyan text-bg text-sm font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
        >
          <MessageCircle size={15} />
          Escribir por WhatsApp
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex items-center justify-center min-h-11 min-w-11 text-muted hover:text-text transition-colors rounded-lg"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden grid transition-[grid-template-rows] duration-300 ease-out ${
          menuOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        } bg-bg/98 backdrop-blur-xl border-b border-border/60`}
      >
        <div className="overflow-hidden">
          <ul className="flex flex-col px-5 py-2">
            {navLinks.map((link) => (
              <li key={link.href} className="border-b border-border/40 last:border-b-0">
                <a
                  href={resolveHref(link)}
                  onClick={() => setMenuOpen(false)}
                  className="text-muted hover:text-text text-sm font-medium transition-colors block py-3"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="py-4">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-bg text-sm font-semibold px-4 py-3 rounded-lg"
              >
                <MessageCircle size={15} />
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
