import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { FaBolt, FaHeadphones, FaChartLine, FaGithub, FaTwitter } from 'react-icons/fa'

export default function Landing() {
  const [billing, setBilling] = useState('monthly') // 'monthly' | 'yearly'

  const features = [
    {
      title: 'Pronunciation',
      desc: 'Hear every character with native speech synthesis. Adjust speed to match your learning pace and train your ear.',
      icon: <FaHeadphones className="h-6 w-6 text-indigo-600" />,
      points: ['Native Japanese locale', 'Adjustable speed', 'Quick replay']
    },
    {
      title: 'Smart drills',
      desc: 'Practice by rows to build strong muscle memory. Immediate feedback keeps you focused and progressing.',
      icon: <FaBolt className="h-6 w-6 text-indigo-600" />,
      points: ['Targeted rows', 'Instant feedback', 'Lightweight animations']
    },
    {
      title: 'Progress',
      desc: 'Stay motivated with streaks and session stats. Keep an eye on your accuracy as you improve.',
      icon: <FaChartLine className="h-6 w-6 text-indigo-600" />,
      points: ['Streak indicator', 'Accuracy tracking', 'Session stats']
    }
  ]

  const testimonials = [
    { name: 'Aiko', role: 'Beginner Student', quote: 'I learned Hiragana in days, not weeks. The drills are addictive and the audio really helps!' },
    { name: 'Marco', role: 'Self-learner', quote: 'The clean UI and instant feedback keep me in the zone. My streaks keep growing.' },
    { name: 'Lena', role: 'Traveler', quote: 'Perfect for quick sessions. I practice on the train and feel more confident every day.' },
  ]

  const basePlans = [
    { name: 'Basic', monthly: 0, desc: 'Get started with core kana learning.', features: ['Charts with audio', 'Row tests', 'Basic progress'], cta: 'Start free' },
    { name: 'Pro', monthly: 5, desc: 'Level up with smarter practice.', features: ['All Basic', 'Advanced drills', 'Streak insights'], cta: 'Go Pro' },
    { name: 'Premium', monthly: 10, desc: 'Best for serious learners.', features: ['All Pro', 'Custom sets', 'Early features'], cta: 'Get Premium' },
  ]

  const priceLabel = (p) => {
    if (billing === 'monthly') return `$${p}`
    // Yearly = pay for 10 months (2 months free)
    return `$${p * 10}`
  }

  const periodLabel = billing === 'monthly' ? '/mo' : '/yr'

  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-50 via-white to-cyan-50" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-800">Learn Japanese Kana faster</h1>
              <p className="mt-4 text-lg text-slate-600">Practice Hiragana and Katakana with instant feedback and audio pronunciation. Built for speed and clarity.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/signup" className="inline-flex items-center rounded-md bg-indigo-600 px-5 py-3 text-white font-semibold shadow-sm hover:bg-indigo-500">Get started free</Link>
                <Link to="/login" className="inline-flex items-center rounded-md px-5 py-3 font-semibold text-indigo-700 ring-1 ring-inset ring-indigo-200 hover:bg-indigo-50">Sign in</Link>
              </div>
            </div>
            <div className="relative">
              <div className="mx-auto max-w-md bg-white/80 backdrop-blur rounded-2xl shadow-xl border border-gray-100 p-6">
                <div className="text-center">
                  <div className="text-6xl">あ ア</div>
                  <div className="mt-2 text-gray-600">Hiragana / Katakana</div>
                </div>
                <ul className="mt-6 space-y-2 text-sm text-slate-600">
                  <li>• Audio playback with adjustable speed</li>
                  <li>• Row-based drills with scoring</li>
                  <li>• Clean, responsive UI</li>
                </ul>
              </div>
            </div>
          </div>

          <div id="features" className="mt-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="group rounded-2xl bg-white p-8 min-h-[240px] shadow-sm ring-1 ring-gray-200 hover:shadow-md hover:ring-indigo-200 transition"
              >
                <div className="flex items-center gap-3">
                  {f.icon}
                  <h3 className="text-xl font-semibold text-slate-800">{f.title}</h3>
                </div>
                <p className="mt-3 text-slate-600">{f.desc}</p>
                <ul className="mt-4 space-y-1 text-slate-600 text-sm">
                  {f.points.map((p) => (
                    <li key={p}>• {p}</li>
                  ))}
                </ul>
                <div className="mt-4 h-1 w-0 bg-indigo-600 rounded-full group-hover:w-full transition-all" />
              </motion.div>
            ))}
          </div>

          <div className="mt-24 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-800">Why KanaLearn?</h2>
              <p className="mt-3 text-slate-600">We focus on a distraction-free learning experience: crisp typography, predictable controls, and performance that keeps you in the flow. Every interaction is tuned for fast feedback.</p>
              <ul className="mt-4 space-y-2 text-slate-600">
                <li>• Built with modern web tech for speed</li>
                <li>• Designed for mobile and desktop</li>
                <li>• No clutter, just learning</li>
              </ul>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200"
            >
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-extrabold text-indigo-600">2</div>
                  <div className="text-sm text-slate-600">Alphabets</div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-indigo-600">100+</div>
                  <div className="text-sm text-slate-600">Characters</div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-indigo-600">Fast</div>
                  <div className="text-sm text-slate-600">Feedback</div>
                </div>
              </div>
            </motion.div>
          </div>

          <div id="pricing" className="mt-24">
            <h2 className="text-center text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-800">Simple pricing</h2>
            <p className="mt-2 text-center text-slate-600">Start free. Upgrade any time.</p>

            <div className="mt-6 flex items-center justify-center gap-2">
              <button
                onClick={() => setBilling('monthly')}
                className={`rounded-full px-3 py-1 text-sm font-medium ${billing === 'monthly' ? 'bg-indigo-600 text-white' : 'ring-1 ring-inset ring-gray-300 text-gray-700 hover:bg-gray-50'}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBilling('yearly')}
                className={`rounded-full px-3 py-1 text-sm font-medium ${billing === 'yearly' ? 'bg-indigo-600 text-white' : 'ring-1 ring-inset ring-gray-300 text-gray-700 hover:bg-gray-50'}`}
              >
                Yearly <span className="ml-1 text-xs align-middle text-amber-600">(2 months free)</span>
              </button>
            </div>

            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {basePlans.map((p, i) => (
                <motion.div
                  key={p.name}
                  initial={{ y: 16, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className={`rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 ${p.name !== 'Basic' ? 'border-indigo-200' : ''}`}
                >
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-lg font-semibold text-slate-800">{p.name}</h3>
                    <div className="text-slate-500 text-sm">{p.desc}</div>
                  </div>
                  <div className="mt-3 flex items-end gap-1">
                    <div className="text-3xl font-extrabold text-slate-900">{priceLabel(p.monthly)}</div>
                    <div className="text-slate-500">{periodLabel}</div>
                  </div>
                  <ul className="mt-4 space-y-2 text-slate-600 text-sm">
                    {p.features.map((f) => (
                      <li key={f}>• {f}</li>
                    ))}
                  </ul>
                  <Link to={`/signup?plan=${p.name.toLowerCase()}${billing === 'yearly' ? '&billing=yearly' : ''}`} className={`mt-6 inline-flex w-full items-center justify-center rounded-md px-4 py-2 text-sm font-semibold shadow-sm ${p.name === 'Basic' ? 'ring-1 ring-inset ring-slate-200 text-slate-700 hover:bg-slate-50' : 'bg-indigo-600 text-white hover:bg-indigo-500'}`}>
                    {p.cta}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <div id="testimonials" className="mt-24">
            <h2 className="text-center text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-800">What learners say</h2>
            <div className="mt-8 grid md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <motion.figure
                  key={t.name}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200"
                >
                  <blockquote className="text-slate-700">“{t.quote}”</blockquote>
                  <figcaption className="mt-4 text-sm text-slate-500"><span className="font-medium text-slate-700">{t.name}</span> · {t.role}</figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-slate-600 text-sm">© {new Date().getFullYear()} KanaLearn. All rights reserved.</div>
            <div className="flex items-center gap-4 text-slate-600">
              <a href="#features" className="hover:text-indigo-600">Features</a>
              <a href="#pricing" className="hover:text-indigo-600">Pricing</a>
              <a href="#testimonials" className="hover:text-indigo-600">Testimonials</a>
              <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-indigo-600"><FaGithub /></a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="hover:text-indigo-600"><FaTwitter /></a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}