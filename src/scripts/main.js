import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const lenis = new Lenis({ lerp: 0.09, smoothWheel: true })
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)

ScrollTrigger.config({ ignoreMobileResize: true })

document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href')
    if (id && id.length > 1 && document.querySelector(id)) {
      e.preventDefault()
      lenis.scrollTo(id, { offset: -72, duration: 1.4 })
    }
  })
})

const nav = document.querySelector('.nav')
if (nav) {
  ScrollTrigger.create({
    start: 40,
    end: 'max',
    onToggle: (self) => nav.classList.toggle('scrolled', self.isActive)
  })
}

const navCta = document.querySelector('.nav-cta')
if (navCta && window.matchMedia('(hover: hover)').matches) {
  const moveX = gsap.quickTo(navCta, 'x', { duration: 0.5, ease: 'power3.out' })
  const moveY = gsap.quickTo(navCta, 'y', { duration: 0.5, ease: 'power3.out' })
  navCta.addEventListener('mousemove', (e) => {
    const rect = navCta.getBoundingClientRect()
    moveX((e.clientX - rect.left - rect.width / 2) * 0.35)
    moveY((e.clientY - rect.top - rect.height / 2) * 0.35)
  })
  navCta.addEventListener('mouseleave', () => {
    moveX(0)
    moveY(0)
  })
}

const intro = gsap.timeline({ delay: 0.15 })
  .fromTo('.hero-line .inner',
    { yPercent: 118 },
    { yPercent: 0, stagger: 0.14, duration: 1.2, ease: 'power4.out' }
  )
  .fromTo('.hero-fade',
    { y: 28, opacity: 0 },
    { y: 0, opacity: 1, stagger: 0.09, duration: 0.9, ease: 'power3.out' },
    0.35
  )
  .fromTo('.phone',
    { y: 70, opacity: 0, rotate: -10 },
    { y: 0, opacity: 1, rotate: -4, duration: 1.3, ease: 'power3.out' },
    0.55
  )

const pinWrap = document.querySelector('.phone-pin')
if (pinWrap) {
  const shots = gsap.utils.toArray('.phone-pin .shot')
  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: pinWrap,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.6
    }
  })
  shots.forEach((shot, i) => {
    if (i === 0) {
      tl.fromTo(shot, { opacity: 1, scale: 1, yPercent: 0 }, { opacity: 1, scale: 1, duration: 0.9 }, 0)
    } else {
      tl.fromTo(
        shot,
        { opacity: 0, yPercent: 8, scale: 0.98 },
        { opacity: 1, yPercent: 0, scale: 1, duration: 1 },
        i * 0.95
      )
      tl.to(shot, { opacity: 0, scale: 1.04, duration: 0.85 }, i * 0.95 + 1)
    }
  })
  gsap.set(shots, { opacity: 0 })
  gsap.set(shots[0], { opacity: 1 })
}

gsap.utils.toArray('[data-reveal]').forEach((el) => {
  gsap.fromTo(
    el,
    { y: 56, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%' }
    }
  )
})

gsap.fromTo(
  '.featured-visual',
  { clipPath: 'inset(12% 12% 12% 12%)', opacity: 0.6 },
  {
    clipPath: 'inset(0% 0% 0% 0%)',
    opacity: 1,
    duration: 1.4,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.featured-visual', start: 'top 80%' }
  }
)

if (document.querySelector('.tl-line')) {
  gsap.fromTo(
    '.tl-line',
    { '--tl-progress': 0 },
    {
      '--tl-progress': 1,
      ease: 'none',
      scrollTrigger: { trigger: '.timeline', start: 'top 72%', end: 'bottom 55%', scrub: 0.4 }
    }
  )
}

gsap.utils.toArray('[data-count]').forEach((el) => {
  const target = parseFloat(el.dataset.count)
  const suffix = el.dataset.suffix || ''
  const obj = { v: 0 }
  ScrollTrigger.create({
    trigger: el,
    start: 'top 88%',
    once: true,
    onEnter: () => {
      gsap.to(obj, {
        v: target,
        duration: 1.8,
        ease: 'power3.out',
        onUpdate: () => {
          const val = target % 1 === 0 ? Math.round(obj.v) : obj.v.toFixed(1)
          el.textContent = Number(val).toLocaleString('pt-BR') + suffix
        }
      })
    }
  })
})

gsap.fromTo(
  '.proj-card',
  { y: 48, opacity: 0 },
  {
    y: 0,
    opacity: 1,
    stagger: 0.12,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.proj-grid', start: 'top 85%' }
  }
)

gsap.fromTo(
  '.stack-grid',
  { y: 56, opacity: 0 },
  {
    y: 0,
    opacity: 1,
    duration: 1.1,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.stack-grid', start: 'top 85%' }
  }
)

function sourceLabel(referrer) {
  if (referrer.includes('linkedin.com')) return 'do linkedin'
  if (referrer.includes('github.com')) return 'do github'
  if (referrer.includes('wa.me') || referrer.includes('whatsapp')) return 'do whatsapp'
  if (referrer.includes('google.')) return 'de uma busca no google'
  if (referrer.includes('instagram.com')) return 'do instagram'
  if (referrer.includes('twitter.com') || referrer.includes('x.com')) return 'do x'
  return null
}

function timeOfDayMessage(hour) {
  if (hour < 6) return 'boa madrugada — ainda de pé codando?'
  if (hour < 12) return 'bom dia! bora tirar um projeto do papel?'
  if (hour < 18) return 'boa tarde — vamos falar de um projeto?'
  return 'boa noite — depois do expediente é quando a criatividade rende'
}

function buildDetectiveMessage() {
  const source = sourceLabel(document.referrer.toLowerCase())
  let isReturning = false
  try {
    isReturning = !!localStorage.getItem('mk_visited')
    localStorage.setItem('mk_visited', '1')
  } catch (e) {}

  let message
  if (isReturning && source) message = `voltou vindo ${source} de novo? 👀`
  else if (isReturning) message = 'você já esteve aqui — bem-vindo de volta 👋'
  else if (source) message = `vi que você veio ${source} 👀`
  else message = timeOfDayMessage(new Date().getHours())

  return message.charAt(0).toUpperCase() + message.slice(1)
}

const detective = document.querySelector('.detective')
if (detective) {
  const textEl = detective.querySelector('.detective-text')
  const message = buildDetectiveMessage()
  let i = 0
  const type = () => {
    textEl.textContent = message.slice(0, i)
    if (i < message.length) {
      i++
      setTimeout(type, 28)
    }
  }
  const hide = () => detective.classList.remove('is-visible')

  setTimeout(() => {
    detective.classList.add('is-visible')
    type()
    setTimeout(hide, 1200 + message.length * 28 + 6000)
  }, 2200)

  detective.addEventListener('click', hide)
}