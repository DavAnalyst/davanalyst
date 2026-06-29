import { useState, useEffect } from 'react';
import { MessageCircle, Menu, X } from 'lucide-react';
import { WHATSAPP_URL } from '../data/content';

const navLinks = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#portafolio', label: 'Portafolio' },
  { href: '#sobre-mi', label: 'Sobre mí' },
  { href: '#contacto', label: 'Contacto' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-bg/80 backdrop-blur-md border-b border-border/60 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
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
                href={link.href}
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
          className="hidden md:flex items-center gap-2 bg-primary hover:bg-primary/80 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-[0_0_24px_rgba(99,102,241,0.45)]"
        >
          <MessageCircle size={15} />
          Escribir por WhatsApp
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-muted hover:text-text transition-colors p-2 rounded-lg"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        } bg-surface/95 backdrop-blur-md border-b border-border/60`}
      >
        <ul className="flex flex-col px-5 py-4 gap-5">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-muted hover:text-text text-sm font-medium transition-colors block"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-white text-sm font-semibold px-4 py-2 rounded-lg"
            >
              <MessageCircle size={15} />
              WhatsApp
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
