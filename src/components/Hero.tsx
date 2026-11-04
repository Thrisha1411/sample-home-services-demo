
import { ArrowRight, ShieldCheck, Clock, Award } from 'lucide-react'

export default function Hero() {
  return (
    <section id="home" className="bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">

        <div>
          <p className="text-orange-500 font-bold uppercase tracking-wider mb-4">
            Sample Home Services
          </p>

          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight mb-6">
            Reliable Home Services Made Simple
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            Professional home maintenance, small repairs and furniture
            assembly — all in one place.
          </p>

          <a
            href="#services"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-7 py-4 rounded-lg font-semibold transition-colors"
          >
            Explore Services
            <ArrowRight size={20} />
          </a>

          <div className="flex flex-wrap gap-6 mt-10 text-slate-600">
            <span className="flex items-center gap-2">
              <ShieldCheck className="text-orange-500" />
              Reliable Service
            </span>

            <span className="flex items-center gap-2">
              <Clock className="text-orange-500" />
              Convenient Support
            </span>

            <span className="flex items-center gap-2">
              <Award className="text-orange-500" />
              Quality Care
            </span>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000"
            alt="Modern residential home"
            className="w-full h-[350px] md:h-[480px] object-cover"
          />
        </div>

      </div>
    </section>
  )
}

