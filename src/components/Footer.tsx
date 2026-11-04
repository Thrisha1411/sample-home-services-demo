
import { Home, ArrowUp } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="flex flex-col md:flex-row justify-between gap-10">

          <div>
            <a href="#home" className="flex items-center gap-2 mb-4">
              <Home className="text-orange-500" size={28} />
              <span className="text-xl font-bold">
                Sample <span className="text-orange-500">Home Services</span>
              </span>
            </a>

            <p className="text-slate-400 max-w-sm leading-relaxed">
              Professional home maintenance, small repairs and furniture
              assembly — all in one place.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>

            <nav className="flex flex-col gap-3 text-slate-400">
              <a href="#home" className="hover:text-orange-400">Home</a>
              <a href="#services" className="hover:text-orange-400">Services</a>
              <a href="#contact" className="hover:text-orange-400">Contact</a>
            </nav>
          </div>

          <a
            href="#home"
            className="flex items-center gap-2 text-orange-400 hover:text-orange-300"
          >
            Back to Top <ArrowUp size={18} />
          </a>

        </div>

        <div className="border-t border-slate-700 mt-10 pt-6 text-center text-sm text-slate-400">
          © {new Date().getFullYear()} Sample Home Services. All rights reserved.
        </div>

      </div>
    </footer>
  )
}
