
import { Home, Menu, X, Phone } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2" onClick={closeMenu}>
          <Home size={30} className="text-orange-500" />
          <span className="text-xl font-bold text-slate-900">
            Sample <span className="text-orange-500">Home Services</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-slate-700 font-medium">
          <a href="#home" className="hover:text-orange-500">Home</a>
          <a href="#services" className="hover:text-orange-500">Services</a>
          <a href="#contact" className="hover:text-orange-500">Contact</a>
        </nav>

        <a
          href="#contact"
          className="hidden md:flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-lg font-semibold"
        >
          <Phone size={18} />
          Contact Us
        </a>

        <button
          type="button"
          className="md:hidden text-slate-800"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {menuOpen && (
        <nav className="md:hidden border-t border-slate-200 px-6 py-4 flex flex-col gap-4 bg-white">
          <a href="#home" onClick={closeMenu}>Home</a>
          <a href="#services" onClick={closeMenu}>Services</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
          <a href="#contact" onClick={closeMenu} className="text-orange-600 font-semibold">
            Contact Us
          </a>
        </nav>
      )}
    </header>
  )
}

