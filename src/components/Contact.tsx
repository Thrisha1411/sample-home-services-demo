import { useRef, useState } from 'react'
import type { FormEvent, ChangeEvent } from 'react'
import { Mail, Phone, MapPin, Send, LoaderCircle } from 'lucide-react'
import { supabase } from '../lib/supabase'

type ContactForm = {
  name: string
  email: string
  message: string
  website: string
}

type FormErrors = {
  name?: string
  email?: string
  message?: string
}

export default function Contact() {
  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    message: '',
    website: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const requestIdRef = useRef<string | null>(null)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }))

    setStatusMessage('')
    setIsSuccess(false)
  }

  const validate = () => {
    const newErrors: FormErrors = {}

    const name = form.name.trim()
    const email = form.email.trim()
    const message = form.message.trim()

    if (name.length < 2 || name.length > 80) {
      newErrors.name = 'Name must be between 2 and 80 characters.'
    }

    if (
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      newErrors.email = 'Please enter a valid email address.'
    }

    if (message.length < 10 || message.length > 1000) {
      newErrors.message = 'Message must be between 10 and 1000 characters.'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isSubmitting || !validate()) return

    // Honeypot protection
    if (form.website.trim()) {
      setStatusMessage('Unable to process this submission.')
      setIsSuccess(false)
      return
    }

    // Keep the same ID when retrying a failed request.
    if (!requestIdRef.current) {
      requestIdRef.current = crypto.randomUUID()
    }

    setIsSubmitting(true)
    setStatusMessage('')
    setIsSuccess(false)

    try {
      const { data, error } = await supabase.functions.invoke(
        'contact-submit',
        {
          body: {
            request_id: requestIdRef.current,
            name: form.name.trim(),
            email: form.email.trim(),
            message: form.message.trim(),
            website: '',
          },
        }
      )

      if (error) {
        throw error
      }

      // Only show success after the Edge Function confirms storage.
      if (
        data?.status !== 'received' ||
        data?.request_id !== requestIdRef.current
      ) {
        throw new Error(
          'The server did not confirm successful storage.'
        )
      }

      setStatusMessage(
        'Your message was submitted successfully!'
      )
      setIsSuccess(true)

      setForm({
        name: '',
        email: '',
        message: '',
        website: '',
      })

      setErrors({})
      requestIdRef.current = null
    } catch (error) {
      console.error('Contact submission failed:', error)

      setStatusMessage(
        'We could not submit your message. Please try again.'
      )
      setIsSuccess(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-12">
          <p className="text-orange-500 font-bold uppercase tracking-wider mb-3">
            Get in Touch
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Contact Our Team
          </h2>

          <p className="text-slate-600">
            Have a question? Send us a message using the form below.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 bg-white rounded-2xl shadow-sm p-8 md:p-12">

          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-6">
              We'd Love to Hear From You
            </h3>

            <p className="text-slate-600 mb-8">
              Complete the contact form and share your inquiry with us.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Mail className="text-orange-500" />
                <span className="text-slate-700">
                  Contact form support
                </span>
              </div>

              <div className="flex items-center gap-4">
                <Phone className="text-orange-500" />
                <span className="text-slate-700">
                  Home Services Demo
                </span>
              </div>

              <div className="flex items-center gap-4">
                <MapPin className="text-orange-500" />
                <span className="text-slate-700">
                  Demonstration website
                </span>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="space-y-5"
          >

            <div>
              <label
                htmlFor="name"
                className="block font-medium text-slate-700 mb-2"
              >
                Full Name
              </label>

              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                minLength={2}
                maxLength={80}
                required
                aria-invalid={!!errors.name}
                className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your name"
              />

              {errors.name && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block font-medium text-slate-700 mb-2"
              >
                Email Address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                maxLength={254}
                required
                aria-invalid={!!errors.email}
                className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your email"
              />

              {errors.email && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="message"
                className="block font-medium text-slate-700 mb-2"
              >
                Message
              </label>

              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                minLength={10}
                maxLength={1000}
                required
                rows={5}
                aria-invalid={!!errors.message}
                className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Tell us how we can help..."
              />

              {errors.message && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Invisible honeypot field */}
            <div
              aria-hidden="true"
              className="absolute w-px h-px overflow-hidden opacity-0 pointer-events-none"
            >
              <label htmlFor="website">
                Leave this field empty
              </label>

              <input
                id="website"
                name="website"
                value={form.website}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white py-4 rounded-lg font-semibold"
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle
                    size={18}
                    className="animate-spin"
                  />
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Contact Us
                </>
              )}
            </button>

            {statusMessage && (
              <p
                role="status"
                aria-live="polite"
                className={`text-sm ${
                  isSuccess ? 'text-green-700' : 'text-red-600'
                }`}
              >
                {statusMessage}
              </p>
            )}

          </form>
        </div>
      </div>
    </section>
  )
}