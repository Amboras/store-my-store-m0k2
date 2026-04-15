'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import {
  ArrowRight,
  CheckCircle2,
  Zap,
  Target,
  TrendingUp,
  Lock,
  Download,
  Star,
  Clock,
  Users,
  ShieldCheck,
  Sparkles,
  BarChart3,
  Brain,
  Calendar,
} from 'lucide-react'
import { trackMetaEvent } from '@/lib/meta-pixel'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&q=80'
const LIFESTYLE_IMAGE = 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=80'
const LIFESTYLE_IMAGE_2 = 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=1200&q=80'

const features = [
  {
    icon: Target,
    title: 'Goal Tracking System',
    desc: 'Set daily, weekly, and monthly goals with smart progress indicators that keep you on course.',
  },
  {
    icon: Brain,
    title: 'Mindset Journal',
    desc: 'Built-in reflection prompts and gratitude sections designed by behavioral scientists.',
  },
  {
    icon: BarChart3,
    title: 'Life Stats Dashboard',
    desc: 'Visualize every area of your life — health, finances, relationships, growth — in one view.',
  },
  {
    icon: Calendar,
    title: 'Habit Streaks',
    desc: 'Track streaks across 20+ life categories with automated reminders and milestone rewards.',
  },
  {
    icon: TrendingUp,
    title: 'Progress Analytics',
    desc: 'Weekly review templates and monthly performance reports to measure your real growth.',
  },
  {
    icon: Zap,
    title: 'Instant Access',
    desc: 'Download immediately after purchase. Compatible with Notion, PDF, and Google Sheets.',
  },
]

const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Entrepreneur',
    text: '3 months in and I have completely transformed my mornings. The habit streaks alone changed everything for me.',
    stars: 5,
  },
  {
    name: 'James R.',
    role: 'Software Engineer',
    text: 'I tried 6 different planners before this one. Nothing comes close. The life stats dashboard is a game changer.',
    stars: 5,
  },
  {
    name: 'Priya K.',
    role: 'Fitness Coach',
    text: 'I recommend this to every one of my clients now. It is the missing piece between wanting change and living it.',
    stars: 5,
  },
]

const stats = [
  { value: '47,000+', label: 'Lives Transformed' },
  { value: '89%', label: 'Report Habit Consistency' },
  { value: '4.9/5', label: 'Average Rating' },
  { value: '21 Days', label: 'To Build a New Habit' },
]

export default function HomePage() {
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [countdown, setCountdown] = useState({ hours: 11, minutes: 47, seconds: 23 })

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        let { hours, minutes, seconds } = prev
        seconds--
        if (seconds < 0) { seconds = 59; minutes-- }
        if (minutes < 0) { minutes = 59; hours-- }
        if (hours < 0) { return { hours: 11, minutes: 47, seconds: 23 } }
        return { hours, minutes, seconds }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const pad = (n: number) => String(n).padStart(2, '0')

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail.trim()) return
    trackMetaEvent('Lead', { content_name: 'newsletter_signup', status: 'submitted' })
    setNewsletterEmail('')
  }

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="hero-gradient text-white overflow-hidden">
        <div className="container-custom grid lg:grid-cols-2 gap-12 items-center py-20 lg:py-28">
          {/* Left: Copy */}
          <div className="space-y-8 animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5">
              <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-widest text-lime-300">
                Digital Download — Instant Access
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold leading-[1.08] text-balance">
              Build Habits That
              <br />
              <span className="text-lime-400">Actually Stick.</span>
            </h1>

            <p className="text-lg text-white/70 max-w-lg leading-relaxed">
              The all-in-one digital habit tracker and life system used by 47,000+ high performers.
              Track every dimension of your life — and finally become the person you intend to be.
            </p>

            {/* Proof points */}
            <ul className="space-y-2.5">
              {[
                'Covers 20+ life categories: health, sleep, finances, mindset & more',
                'Compatible with Notion, Google Sheets, and printable PDF',
                'Behavioral science-backed prompts and weekly review system',
              ].map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-white/80">
                  <CheckCircle2 className="h-4 w-4 text-lime-400 mt-0.5 flex-shrink-0" />
                  {point}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/products"
                className="inline-flex items-center gap-2.5 bg-lime-400 hover:bg-lime-300 text-gray-900 font-bold px-8 py-4 text-sm uppercase tracking-wide transition-all rounded-sm shadow-lg shadow-lime-400/30"
              >
                Get Instant Access
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 border border-white/30 hover:border-white/60 text-white/80 hover:text-white px-8 py-4 text-sm uppercase tracking-wide transition-all rounded-sm"
              >
                See How It Works
              </Link>
            </div>

            {/* Social proof micro */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex -space-x-2">
                {['bg-pink-400', 'bg-blue-400', 'bg-amber-400', 'bg-teal-400'].map((c, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full border-2 border-white/20 ${c} flex items-center justify-center text-[10px] font-bold text-white`}>
                    {['SM', 'JR', 'PK', 'AL'][i]}
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex text-lime-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
                </div>
                <span className="text-xs text-white/60">Trusted by 47,000+ high performers</span>
              </div>
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative animate-fade-in">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src={HERO_IMAGE}
                alt="Habit Tracker System — Planning and goal tracking in action"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-white text-gray-900 rounded-xl px-5 py-4 shadow-xl flex items-center gap-4 border border-gray-100 max-w-[220px]">
              <div className="w-10 h-10 bg-lime-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="h-5 w-5 text-lime-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Habit Streak</p>
                <p className="text-sm font-bold text-gray-900">47 Days Running</p>
              </div>
            </div>
            {/* Top badge */}
            <div className="absolute -top-4 -right-4 bg-lime-400 text-gray-900 rounded-full w-20 h-20 flex flex-col items-center justify-center shadow-lg shadow-lime-400/40">
              <span className="text-xl font-black leading-none">$27</span>
              <span className="text-[9px] font-bold uppercase tracking-wide">One Time</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── COUNTDOWN BANNER ─────────────────────────────────────────────── */}
      <section className="bg-lime-400">
        <div className="container-custom py-4 flex flex-col sm:flex-row items-center justify-center gap-4 text-gray-900">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="text-sm font-bold uppercase tracking-wide">Launch Sale Ends In:</span>
          </div>
          <div className="flex items-center gap-2 font-mono font-black text-2xl">
            <div className="bg-gray-900 text-white rounded px-2.5 py-0.5 text-lg">{pad(countdown.hours)}</div>
            <span className="text-gray-900">:</span>
            <div className="bg-gray-900 text-white rounded px-2.5 py-0.5 text-lg">{pad(countdown.minutes)}</div>
            <span className="text-gray-900">:</span>
            <div className="bg-gray-900 text-white rounded px-2.5 py-0.5 text-lg">{pad(countdown.seconds)}</div>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 bg-gray-900 text-white text-xs font-bold uppercase tracking-wide px-5 py-2 rounded-sm hover:bg-gray-800 transition-colors"
          >
            Claim Discount <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────────────────── */}
      <section className="border-b py-12 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-heading font-bold text-gray-900">{s.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs uppercase tracking-[0.25em] text-lime-600 font-semibold mb-3">Everything You Need</p>
            <h2 className="text-4xl font-heading font-bold text-gray-900 text-balance">
              One System. Every Dimension of Life.
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Most habit trackers track one thing. LifeTrack Pro tracks everything — and connects the dots between your habits, mindset, and results.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="group p-7 border border-gray-100 rounded-xl bg-gray-50 hover:bg-white hover:border-lime-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-lime-50 group-hover:bg-lime-100 rounded-xl flex items-center justify-center mb-5 transition-colors">
                  <f.icon className="h-6 w-6 text-lime-600" />
                </div>
                <h3 className="font-heading font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIFESTYLE SPLIT SECTION ──────────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="container-custom grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={LIFESTYLE_IMAGE}
              alt="Person planning and journaling their goals and habits"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
          <div className="space-y-7">
            <p className="text-xs uppercase tracking-[0.25em] text-lime-600 font-semibold">The Method</p>
            <h2 className="text-4xl font-heading font-bold text-gray-900 text-balance">
              Designed Around How Humans Actually Change
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Most habit apps fail because they ignore the psychology of lasting change. LifeTrack Pro is built on the science of habit loops, identity-based behavior, and progress momentum — so small daily actions compound into radical transformation.
            </p>
            <ul className="space-y-4">
              {[
                { label: 'Identity-first habit design', desc: 'Become the person who does the thing, not the person trying to do it.' },
                { label: 'Context stacking', desc: 'Anchor new habits to existing routines with our built-in stacking planner.' },
                { label: 'Progress momentum', desc: 'Visual streaks and milestone rewards keep motivation high through the dips.' },
              ].map((item) => (
                <li key={item.label} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-lime-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-gray-900" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-gray-900 text-white font-semibold px-7 py-3.5 text-sm uppercase tracking-wide hover:bg-gray-800 transition-colors rounded-sm"
            >
              Start Your Journey
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHAT'S INSIDE ────────────────────────────────────────────────── */}
      <section className="py-24 hero-gradient text-white">
        <div className="container-custom grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-lime-300 font-semibold mb-3">What Is Inside</p>
              <h2 className="text-4xl font-heading font-bold text-white text-balance">
                Everything Delivered Instantly
              </h2>
              <p className="mt-4 text-white/60 leading-relaxed">
                One purchase. Lifetime access. All formats included.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { icon: Download, label: 'Notion Template', desc: 'Full interactive system ready to duplicate' },
                { icon: Download, label: 'Google Sheets Version', desc: 'Works on any device, no app needed' },
                { icon: Download, label: 'Printable PDF Planner', desc: '100-page guided PDF for analog fans' },
                { icon: Sparkles, label: 'Habit Science Masterclass', desc: '45-minute video crash course included free' },
                { icon: Sparkles, label: 'Monthly Review Templates', desc: '12 pre-built reflection and review pages' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4 bg-white/8 border border-white/10 rounded-xl px-5 py-4">
                  <div className="w-10 h-10 bg-lime-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-5 w-5 text-lime-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{item.label}</p>
                    <p className="text-xs text-white/50">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <Image
              src={LIFESTYLE_IMAGE_2}
              alt="Organized goal planning and notebook setup"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-5 py-4">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-lime-400" />
                <div>
                  <p className="text-sm font-semibold text-white">47,000+ downloads</p>
                  <p className="text-xs text-white/60">Join the community of high performers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.25em] text-lime-600 font-semibold mb-3">Real Results</p>
            <h2 className="text-4xl font-heading font-bold text-gray-900">
              What High Performers Are Saying
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-gray-50 border border-gray-100 rounded-xl p-7 space-y-4">
                <div className="flex text-lime-500">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed text-sm">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-2">
                  <div className="w-9 h-9 rounded-full bg-lime-100 flex items-center justify-center text-xs font-bold text-lime-700">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ────────────────────────────────────────────────────── */}
      <section className="border-y py-10 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Lock, title: 'Secure Checkout', desc: '256-bit SSL encryption' },
              { icon: Download, title: 'Instant Download', desc: 'Access within 60 seconds' },
              { icon: ShieldCheck, title: '30-Day Guarantee', desc: 'Full refund if not satisfied' },
              { icon: Users, title: '24/7 Support', desc: 'Help whenever you need it' },
            ].map((t) => (
              <div key={t.title} className="flex items-center gap-4 justify-center md:justify-start">
                <div className="w-10 h-10 bg-lime-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <t.icon className="h-5 w-5 text-lime-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t.title}</p>
                  <p className="text-xs text-muted-foreground">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container-custom max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-lime-600 font-semibold mb-4">Start Today</p>
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-gray-900 text-balance mb-6">
            One Decision Away From a Different Life
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-10 max-w-xl mx-auto">
            The habits you build in the next 90 days will determine where you are in 5 years. Start today — instant download, no waiting.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2.5 bg-lime-400 hover:bg-lime-300 text-gray-900 font-bold px-10 py-4 text-sm uppercase tracking-wide transition-all rounded-sm shadow-xl shadow-lime-400/30"
          >
            Get LifeTrack Pro Now — $27
            <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-4 text-xs text-muted-foreground">30-day money back guarantee. No questions asked.</p>
        </div>
      </section>

      {/* ── NEWSLETTER ───────────────────────────────────────────────────── */}
      <section className="py-16 border-t bg-gray-50">
        <div className="container-custom max-w-lg text-center">
          <h2 className="text-2xl font-heading font-bold text-gray-900">Free Habit-Building Tips</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Weekly science-backed strategies delivered to your inbox. No fluff.
          </p>
          <form className="mt-7 flex gap-2" onSubmit={handleNewsletterSubmit}>
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 border border-gray-200 bg-white rounded-sm px-4 py-3 text-sm placeholder:text-muted-foreground focus:border-lime-500 focus:outline-none transition-colors"
            />
            <button
              type="submit"
              className="bg-gray-900 text-white px-6 py-3 text-sm font-semibold uppercase tracking-wide hover:bg-gray-800 transition-colors whitespace-nowrap rounded-sm"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
