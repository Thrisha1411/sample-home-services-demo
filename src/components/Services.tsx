
import { Wrench, Armchair, House } from 'lucide-react'

const services = [
  {
    icon: Wrench,
    title: 'Small Repairs',
    description:
      'Assistance with everyday household repairs and minor fixes.',
  },
  {
    icon: Armchair,
    title: 'Furniture Assembly',
    description:
      'Help assembling furniture and setting up household essentials.',
  },
  {
    icon: House,
    title: 'Home Maintenance',
    description:
      'General home upkeep and routine maintenance assistance.',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-orange-500 font-bold uppercase tracking-wider mb-3">
            Our Services
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Services Designed for Your Home
          </h2>

          <p className="text-slate-600 leading-relaxed">
            Professional assistance for everyday repairs, furniture
            assembly and home maintenance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon

            return (
              <article
                key={service.title}
                className="p-8 border border-slate-200 rounded-2xl bg-white shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                  <Icon size={28} className="text-orange-500" />
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {service.title}
                </h3>

                <p className="text-slate-600 leading-relaxed">
                  {service.description}
                </p>
              </article>
            )
          })}
        </div>

      </div>
    </section>
  )
}

