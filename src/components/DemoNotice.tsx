
import { Info } from 'lucide-react'

export default function DemoNotice() {
  return (
    <section className="bg-orange-50 border-y border-orange-200 py-5">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-center gap-3 text-center">
        <Info className="text-orange-600 shrink-0" size={22} />

        <p className="text-orange-900 font-semibold">
          Demonstration only - no services offered
        </p>
      </div>
    </section>
  )
}
