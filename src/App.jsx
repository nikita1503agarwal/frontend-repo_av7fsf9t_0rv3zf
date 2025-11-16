import React, { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, Sparkles, MessageCircle, Phone, Instagram, ChevronDown, CheckCircle2, ShieldCheck, Clock, Infinity as InfinityIcon, Stars } from 'lucide-react'

const Section = ({ id, children, className = '' }) => (
  <section id={id} className={`relative py-20 sm:py-24 ${className}`}>
    <div className="container mx-auto px-6 max-w-7xl">{children}</div>
  </section>
)

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/40 bg-white/50 border-b border-black/10">
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-2 group">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition" />
          <div className="leading-tight">
            <p className="text-slate-900 font-semibold tracking-wide">CloudeLab</p>
            <p className="text-xs text-slate-600">Code. Cloud. Create.</p>
          </div>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-700">
          <a href="#servicios" className="hover:text-slate-900 transition">Servicios</a>
          <a href="#industrias" className="hover:text-slate-900 transition">Industrias</a>
          <a href="#proyectos" className="hover:text-slate-900 transition">Proyectos</a>
          <a href="#testimonios" className="hover:text-slate-900 transition">Testimonios</a>
          <a href="#faq" className="hover:text-slate-900 transition">FAQ</a>
        </nav>
        <div className="flex items-center gap-3">
          <a href="#contacto" className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white hover:bg-white/90 text-slate-900 border border-black/10 transition">
            <MessageCircle size={16} /> Contacto
          </a>
          <a href="#cotizar" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-violet-500 text-slate-900 font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition">
            Cotizar <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </header>
  )
}

// Robot interactivo que sigue el cursor (ojos, inclinación y brillo)
const RobotLook = () => {
  const containerRef = useRef(null)
  const [bounds, setBounds] = useState({ left: 0, top: 0, width: 1, height: 1 })

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const update = () => {
      const rect = el.getBoundingClientRect()
      setBounds({ left: rect.left, top: rect.top, width: rect.width, height: rect.height })
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [ -0.5, 0.5 ], [ 10, -10 ]), { stiffness: 120, damping: 15 })
  const ry = useSpring(useTransform(mx, [ -0.5, 0.5 ], [ -10, 10 ]), { stiffness: 120, damping: 15 })
  const glow = useTransform(mx, [-0.5, 0, 0.5], ['rgba(34,211,238,0.35)', 'rgba(168,85,247,0.35)', 'rgba(34,211,238,0.35)'])

  const handleMouseMove = (e) => {
    const x = (e.clientX - bounds.left) / bounds.width - 0.5
    const y = (e.clientY - bounds.top) / bounds.height - 0.5
    mx.set(Math.max(-0.5, Math.min(0.5, x)))
    my.set(Math.max(-0.5, Math.min(0.5, y)))
  }

  // Pupilas limitadas dentro del ojo
  const eyeX = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 })
  const eyeY = useSpring(useTransform(my, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 })

  // Brillo respirando
  const breathe = {
    boxShadow: [
      '0 30px 80px rgba(0,0,0,0.08)',
      '0 50px 120px rgba(0,0,0,0.10)'
    ],
    transition: { duration: 3, repeat: Infinity, repeatType: 'reverse' }
  }

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden"
    >
      <motion.div style={{ rotateX: rx, rotateY: ry }} className="relative h-full w-full">
        <motion.div className="absolute inset-0" style={{ background: glow }} />
        <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/40 to-white/10" />
        {/* Cuerpo del robot */}
        <motion.div animate={breathe} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[70%] w-[70%] rounded-3xl bg-white/80 border border-black/10 backdrop-blur-md" />

        {/* Cabeza */}
        <motion.div style={{ x: useTransform(mx, v => v * 10), y: useTransform(my, v => v * 6) }} className="absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/2 h-[34%] w-[58%] rounded-2xl bg-white border border-black/10 shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
          {/* Banda visor */}
          <div className="absolute left-3 right-3 top-1/2 -translate-y-1/2 h-16 rounded-xl bg-gradient-to-b from-slate-900 to-slate-800 border border-slate-900/60">
            {/* Ojo izquierdo */}
            <div className="absolute left-[18%] top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-slate-950/80 border border-cyan-400/30 flex items-center justify-center">
              <motion.div style={{ x: eyeX, y: eyeY }} className="h-4 w-4 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.8)]" />
            </div>
            {/* Ojo derecho */}
            <div className="absolute right-[18%] top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-slate-950/80 border border-violet-400/30 flex items-center justify-center">
              <motion.div style={{ x: eyeX, y: eyeY }} className="h-4 w-4 rounded-full bg-violet-300 shadow-[0_0_20px_rgba(168,85,247,0.8)]" />
            </div>
          </div>
          {/* Antenas */}
          <motion.div style={{ y: useTransform(my, v => v * 4) }} className="absolute -top-5 left-8 h-6 w-6 rounded-full bg-cyan-300/90 shadow-[0_0_20px_rgba(34,211,238,0.6)]" />
          <motion.div style={{ y: useTransform(my, v => v * 4) }} className="absolute -top-6 right-10 h-8 w-8 rounded-full bg-violet-300/90 shadow-[0_0_24px_rgba(168,85,247,0.6)]" />
        </motion.div>

        {/* Brazos decorativos */}
        <motion.div style={{ x: useTransform(mx, v => v * -12), y: useTransform(my, v => v * 8) }} className="absolute left-[12%] bottom-[18%] h-24 w-24 rounded-2xl bg-white/70 border border-black/10" />
        <motion.div style={{ x: useTransform(mx, v => v * 12), y: useTransform(my, v => v * -6) }} className="absolute right-[12%] bottom-[18%] h-24 w-24 rounded-2xl bg-white/70 border border-black/10" />

        {/* Partículas */}
        <div className="pointer-events-none">
          {[...Array(14)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: [0.2, 0.5, 0.2], scale: [0.8, 1, 0.8] }}
              transition={{ duration: 2 + (i % 5), repeat: Infinity, delay: i * 0.12 }}
              className="absolute h-2 w-2 rounded-full"
              style={{
                left: `${10 + (i * 6) % 80}%`,
                top: `${20 + (i * 8) % 60}%`,
                background: i % 2 ? 'rgba(34,211,238,0.8)' : 'rgba(168,85,247,0.8)',
                boxShadow: i % 2 ? '0 0 16px rgba(34,211,238,0.7)' : '0 0 16px rgba(168,85,247,0.7)'
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

const Hero = () => {
  return (
    <div className="relative min-h-[92vh] pt-24">
      <div className="absolute inset-0 -z-10">
        {/* Fondo más claro y fresco */}
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_-10%,rgba(255,255,255,0.9),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_70%_at_100%_0%,rgba(0,255,255,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_70%_at_0%_0%,rgba(168,85,247,0.12),transparent_60%)]" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl grid lg:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-black/10 text-xs text-slate-700 mb-5">
            <Sparkles size={14} className="text-cyan-500" /> Innovación Web + Cloud
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900">
            Un look más claro y un robot que te sigue con la mirada
          </h1>
          <p className="mt-5 text-slate-600 text-lg leading-relaxed max-w-xl">
            Experiencia interactiva avanzada, microanimaciones y una estética luminosa con gradientes cyan→violeta.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#cotizar" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 text-slate-900 font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition">
              Solicitar Cotización <ArrowRight size={18} />
            </a>
            <a href="#servicios" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-white/90 text-slate-900 border border-black/10">
              Ver Más Servicios
            </a>
          </div>

          <div className="mt-10 grid grid-cols-4 sm:grid-cols-4 gap-3 text-center">
            <Stat label="En la Nube" value="100%" icon={<CloudBadge />} />
            <Stat label="Disponibilidad" value="24/7" icon={<Clock className="text-cyan-500" size={16} />} />
            <Stat label="Posibilidades" value="∞" icon={<InfinityIcon className="text-violet-500" size={16} />} />
            <Stat label="SEO Ready" value="Top" icon={<Stars className="text-amber-500" size={16} />} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative rounded-2xl overflow-hidden ring-1 ring-black/10 bg-white"
        >
          <RobotLook />
        </motion.div>
      </div>

      <a href="#servicios" className="absolute left-1/2 -translate-x-1/2 bottom-4 hidden sm:flex flex-col items-center text-slate-600">
        <ChevronDown className="animate-bounce" />
      </a>
    </div>
  )
}

const CloudBadge = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 18a5 5 0 1 1 1.9-9.62A7 7 0 0 1 21 11a4 4 0 0 1-1 7H7z" stroke="currentColor" className="text-cyan-500" strokeWidth="1.5"/>
  </svg>
)

const Stat = ({ value, label, icon }) => (
  <div className="group rounded-xl bg-white border border-black/10 px-3 py-4 shadow-sm">
    <div className="flex items-center justify-center gap-2 text-slate-900">
      <span className="text-xl font-semibold">{value}</span>
      <span className="opacity-80">{icon}</span>
    </div>
    <p className="text-[11px] mt-1.5 text-slate-600 tracking-wide">{label}</p>
  </div>
)

const TechStack = () => {
  const tech = [
    'React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Node.js', 'PostgreSQL'
  ]
  return (
    <Section className="">
      <motion.h2 initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-center text-3xl sm:text-4xl font-bold text-slate-900">
        Stack Tecnológico de Vanguardia
      </motion.h2>
      <p className="mt-3 text-center text-slate-600 max-w-2xl mx-auto">
        Utilizamos tecnologías modernas para garantizar rendimiento, escalabilidad y mantenibilidad.
      </p>
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {tech.map((t, i) => (
          <motion.div
            key={t}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="text-center rounded-xl bg-white border border-black/10 py-4 text-slate-900"
          >
            {t}
          </motion.div>
        ))}
      </div>
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Badge icon={<ShieldCheck size={16} className="text-emerald-500"/>} title="Código Limpio" subtitle="100% documentado" />
        <Badge icon={<Stars size={16} className="text-amber-500"/>} title="SEO" subtitle="Optimizado" />
        <Badge icon={<InfinityIcon size={16} className="text-violet-500"/>} title="Escalabilidad" subtitle="Sin límites" />
        <Badge icon={<Clock size={16} className="text-cyan-500"/>} title="Uptime" subtitle="99.9%" />
      </div>
    </Section>
  )
}

const Badge = ({ icon, title, subtitle }) => (
  <div className="rounded-xl bg-white border border-black/10 p-4 shadow-sm">
    <div className="flex items-center gap-2 text-slate-900">
      {icon}
      <p className="font-medium">{title}</p>
    </div>
    <p className="text-slate-600 text-sm mt-1">{subtitle}</p>
  </div>
)

const Services = () => {
  const items = [
    {
      title: 'Páginas Web Corporativas',
      desc: 'Sitios profesionales que reflejan tu marca con diseño moderno y navegación intuitiva.',
      bullets: ['Diseño responsive', 'SEO optimizado', 'Carga ultrarrápida', 'CMS personalizado'],
    },
    {
      title: 'E-commerce & Tiendas Online',
      desc: 'Plataformas de comercio electrónico completas con gestión de inventario y pagos seguros.',
      bullets: ['Pasarelas de pago', 'Gestión de productos', 'Carrito inteligente', 'Panel admin'],
    },
    {
      title: 'Portales Empresariales',
      desc: 'Sistemas web para gestión interna, CRM, ERP y soluciones a medida.',
      bullets: ['Dashboards interactivos', 'Gestión de usuarios', 'Reportes en tiempo real', 'Integraciones API'],
    },
    {
      title: 'Progressive Web Apps (PWA)',
      desc: 'Aplicaciones web que funcionan como apps nativas con acceso offline y push.',
      bullets: ['Instalable', 'Funciona offline', 'Push notifications', 'App-like experience'],
    },
  ]
  return (
    <Section id="servicios">
      <motion.h2 initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-center text-3xl sm:text-4xl font-bold text-slate-900">
        Desarrollo Web Profesional
      </motion.h2>
      <p className="mt-3 text-center text-slate-600 max-w-3xl mx-auto">
        Creamos páginas y aplicaciones modernas que impulsan tu negocio.
      </p>
      <div className="mt-10 grid md:grid-cols-2 gap-5">
        {items.map((item, idx) => (
          <motion.div key={idx} initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:idx*0.05}}
            className="rounded-2xl p-6 bg-white border border-black/10 hover:shadow-lg transition group">
            <h3 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500"/> {item.title}
            </h3>
            <p className="text-slate-600 mt-2">{item.desc}</p>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {item.bullets.map((b) => (
                <li key={b} className="text-sm text-slate-700 flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-cyan-500"/> {b}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

const Industries = () => {
  const cards = [
    {
      title: 'Contabilidad & Finanzas',
      bullets: ['Software contable (Plus Contable)', 'Gestión de facturas y DTE', 'Reportes en tiempo real', 'Integración SII y bancos'],
      example: 'Ejemplo: Plus Contable',
    },
    {
      title: 'E-commerce & Retail',
      bullets: ['Tiendas con carrito y checkout', 'Inventario en tiempo real', 'Webpay y Flow', 'Admin completo'],
      example: 'Ejemplo: Tienda Virtual Completa',
    },
    {
      title: 'Salud & Bienestar',
      bullets: ['Agendamiento online', 'Gestión de pacientes', 'Recordatorios WhatsApp', 'Telemedicina'],
      example: 'Ejemplo: Sistema de Agenda Médica',
    },
    {
      title: 'Educación & Capacitación',
      bullets: ['LMS', 'Gestión de cursos', 'Evaluaciones y certificados', 'Portales de estudiantes'],
      example: 'Ejemplo: Plataforma Educativa',
    },
    {
      title: 'Logística & Delivery',
      bullets: ['Tracking en tiempo real', 'Gestión de rutas', 'Notificaciones a clientes', 'Dashboard operativo'],
      example: 'Ejemplo: Sistema de Delivery',
    },
    {
      title: 'Servicios Profesionales',
      bullets: ['Gestión de clientes y proyectos', 'Horas y contratos', 'Portal de clientes', 'CRM a medida'],
      example: 'Ejemplo: CRM para Servicios',
    },
  ]
  return (
    <Section id="industrias">
      <motion.h2 initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-center text-3xl sm:text-4xl font-bold text-slate-900">
        Soluciones por Industria
      </motion.h2>
      <p className="mt-3 text-center text-slate-600 max-w-3xl mx-auto">
        Creamos herramientas digitales para cualquier rubro: si puedes describirlo, podemos construirlo.
      </p>
      <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((c, idx) => (
          <motion.div key={c.title} initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:idx*0.04}}
            className="rounded-2xl p-6 bg-white border border-black/10 hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-slate-900">{c.title}</h3>
            <ul className="mt-3 space-y-1.5">
              {c.bullets.map((b) => (
                <li key={b} className="text-slate-700 text-sm flex gap-2"><span className="text-cyan-500">•</span>{b}</li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-slate-500">{c.example}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

const FeaturedPlusContable = () => {
  const features = [
    { title: 'Declaraciones F29', desc: 'Cálculo automático de IVA, PPM, honorarios' },
    { title: 'Declaraciones F22', desc: 'Gestión completa de declaraciones de impuestos' },
    { title: 'Control de Honorarios', desc: 'Seguimiento mensual y gestión de estados' },
    { title: 'Recursos Humanos', desc: 'Fichas y registro online' },
    { title: 'Cotizaciones Previsionales', desc: 'Control mensual automatizado' },
    { title: 'Agenda de Clientes', desc: 'Gestión de clientes y documentos' },
  ]

  const tech = [
    { title: 'Seguridad y Acceso', points: ['Roles y permisos', 'Datos encriptados', 'Auth segura', 'Backups automáticos'] },
    { title: 'Datos en Tiempo Real', points: ['UF diaria', 'UTM mensual', 'Dólar observado', 'Tasas SII'] },
    { title: 'Gestión Documental', points: ['PDFs seguros', 'Organización por período', 'Exportación de reportes'] },
  ]

  return (
    <Section id="proyectos">
      <motion.div initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-black/10 text-xs text-slate-700 mb-3">
          <Stars size={14} className="text-amber-500"/> Proyecto Estrella - En Beta
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Plus Contable</h2>
        <p className="mt-3 text-slate-600 max-w-3xl mx-auto">
          Sistema integral de gestión administrativa, tributaria y RR.HH. diseñado para la normativa chilena.
        </p>
      </motion.div>

      <div className="mt-8 grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 rounded-2xl p-6 bg-white border border-black/10 shadow-sm">
          <h3 className="text-slate-900 font-semibold">Módulos</h3>
          <div className="mt-4 grid sm:grid-cols-2 gap-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-xl p-4 bg-white border border-black/10">
                <p className="text-slate-900 font-medium">{f.title}</p>
                <p className="text-slate-600 text-sm mt-1">{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl p-4 bg-gradient-to-r from-cyan-400/10 to-violet-500/10 border border-black/10">
            <p className="text-slate-900 font-medium">Sistema de Notificaciones Inteligente</p>
            <p className="text-slate-600 text-sm mt-1">Recordatorios automáticos de fechas importantes (F29, F22, cotizaciones, etc.) con prioridad visual según urgencia.</p>
          </div>
        </div>
        <div className="space-y-4">
          {tech.map((t) => (
            <div key={t.title} className="rounded-2xl p-5 bg-white border border-black/10 shadow-sm">
              <p className="text-slate-900 font-semibold">{t.title}</p>
              <ul className="mt-2 space-y-1.5 text-sm text-slate-700">
                {t.points.map((p) => (
                  <li key={p} className="flex gap-2"><span className="text-cyan-500">•</span>{p}</li>
                ))}
              </ul>
            </div>
          ))}
          <a href="#contacto" className="inline-flex w-full items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 text-slate-900 font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition">
            Solicitar Demo
          </a>
          <p className="text-center text-slate-500 text-sm">Próximamente disponible para nuevos usuarios</p>
        </div>
      </div>
    </Section>
  )
}

const IPTVPlus = () => (
  <Section>
    <motion.h2 initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-center text-3xl sm:text-4xl font-bold text-slate-900">
      Proyecto Destacado: IPTV Plus
    </motion.h2>
    <p className="mt-3 text-center text-slate-600 max-w-3xl mx-auto">
      Sistema completo para resellers de IPTV y servicios streaming con panel administrativo, portal cliente y gestión automatizada.
    </p>
    <div className="mt-10 grid md:grid-cols-2 gap-5">
      {[
        'Operación integral con base de datos compartida',
        'Portal cliente + alertas y tickets',
        'Gestión de servicios (Netflix, Disney+, HBO)',
        'Pagos (Mercado Pago) y WhatsApp integrables',
        'Identidad visual inmediata y autogestión reseller',
        'Seguridad con roles y control de accesos',
        'Datos en tiempo real y notificaciones',
        'Automatización de cobros y recordatorios',
      ].map((t) => (
        <div key={t} className="rounded-2xl p-5 bg-white border border-black/10 text-slate-700 flex gap-3">
          <CheckCircle2 size={18} className="text-cyan-500 mt-0.5"/> {t}
        </div>
      ))}
    </div>
    <div className="mt-6 text-center">
      <a href="#contacto" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-white/90 text-slate-900 border border-black/10">
        Solicitar Demo de IPTV Plus
      </a>
    </div>
  </Section>
)

const Differentiators = () => (
  <Section>
    <motion.h2 initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-center text-3xl sm:text-4xl font-bold text-slate-900">
      ¿Por Qué Elegir CloudeLab?
    </motion.h2>
    <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {[
        {
          title: '100% Enfoque Chileno',
          bullets: ['SII integrado', 'Libro de remuneraciones', 'AFP y Salud automático'],
        },
        {
          title: 'Desarrollo Participativo',
          bullets: ['Sprints semanales', 'Mejoras continuas', 'Soporte personalizado'],
        },
        {
          title: 'Tecnología de Vanguardia',
          bullets: ['Stack moderno', 'Auto-escalado', '99.9% uptime'],
        },
        {
          title: 'Seguridad Empresarial',
          bullets: ['Encriptación end-to-end', 'Backups diarios', 'Certificación SSL'],
        },
        {
          title: 'Equipo Comprometido',
          bullets: ['Soporte 24/7', 'Capacitación', 'Actualizaciones'],
        },
        {
          title: 'Precios Beta Exclusivos',
          bullets: ['Descuentos early-bird', 'Sin costos de setup', 'Primer mes gratis'],
        },
      ].map((card) => (
        <div key={card.title} className="rounded-2xl p-6 bg-white border border-black/10 shadow-sm">
          <p className="text-slate-900 font-semibold">{card.title}</p>
          <ul className="mt-2 space-y-1.5 text-sm text-slate-700">
            {card.bullets.map((b) => (
              <li key={b} className="flex gap-2"><span className="text-cyan-500">•</span>{b}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </Section>
)

const Testimonials = () => (
  <Section id="testimonios">
    <motion.h2 initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-center text-3xl sm:text-4xl font-bold text-slate-900">
      Lo Que Dicen Nuestros Usuarios
    </motion.h2>
    <p className="mt-3 text-center text-slate-600">Usuarios beta de Plus Contable que están transformando su gestión.</p>
    <div className="mt-10 grid md:grid-cols-3 gap-5">
      {[
        {
          quote: 'Plus Contable ha transformado completamente nuestra forma de trabajar. La automatización nos mantiene al día con todos los vencimientos.',
          stat: '5 horas ahorradas diariamente',
          name: 'María González', role: 'Contadora Senior', company: 'Estudio Contable MG', initials: 'MG',
        },
        {
          quote: 'El módulo de remuneraciones con cálculo automático eliminó errores y nos da tranquilidad. El soporte es excelente.',
          stat: '100% reducción de errores',
          name: 'Roberto Silva', role: 'Director Financiero', company: 'Comercial del Sur', initials: 'RS',
        },
        {
          quote: 'Ser beta nos permitió ser parte del desarrollo. Es una solución 100% chilena que entiende nuestra realidad.',
          stat: 'Gestión unificada',
          name: 'Andrea Morales', role: 'Gerente General', company: 'PyME Innovadora', initials: 'AM',
        },
      ].map((t) => (
        <div key={t.name} className="rounded-2xl p-6 bg-white border border-black/10 shadow-sm">
          <p className="text-slate-700">“{t.quote}”</p>
          <p className="mt-3 text-cyan-600 text-sm font-medium">{t.stat}</p>
          <div className="mt-5 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center text-slate-900 font-semibold">{t.initials}</div>
            <div>
              <p className="text-slate-900 font-medium">{t.name}</p>
              <p className="text-slate-600 text-sm">{t.role} • {t.company}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
    <p className="mt-6 text-center text-slate-500 text-sm">Estos testimonios provienen de usuarios reales en fase beta.</p>
  </Section>
)

const FAQ = () => (
  <Section id="faq">
    <motion.h2 initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-center text-3xl sm:text-4xl font-bold text-slate-900">
      Resolvemos Tus Dudas
    </motion.h2>
    <div className="mt-8 grid md:grid-cols-2 gap-5">
      {[
        '¿Qué es Plus Contable y para quién es ideal?',
        '¿Cómo funciona el proceso de implementación?',
        '¿Mis datos están seguros en la nube?',
        '¿Qué significa que Plus Contable esté en fase beta?',
        '¿Puedo integrar sus soluciones con mis sistemas actuales?',
        '¿Qué soporte técnico ofrecen?',
        '¿Cuánto tiempo toma desarrollar una solución personalizada?',
        '¿Cuál es la inversión necesaria?',
      ].map((q) => (
        <div key={q} className="rounded-2xl p-5 bg-white border border-black/10 text-slate-700 flex items-center justify-between hover:shadow-md transition">
          <span>{q}</span>
          <ChevronDown className="text-slate-500" />
        </div>
      ))}
    </div>
    <p className="mt-6 text-center text-slate-600 text-sm">
      ¿No encuentras la respuesta que buscas? <a href="#contacto" className="text-cyan-600 hover:text-cyan-500 underline">Contáctanos por WhatsApp →</a>
    </p>
  </Section>
)

const Contact = () => (
  <Section id="contacto" className="pb-28">
    <div className="grid lg:grid-cols-2 gap-8">
      <div>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Hablemos de tu Proyecto</h2>
        <p className="mt-3 text-slate-600">Contáctanos por WhatsApp y cuéntanos qué necesitas.</p>
        <div className="mt-6 space-y-3">
          <a href="https://wa.me/56972739105" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 text-slate-900 font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition">
            <MessageCircle size={18}/> Contactar por WhatsApp
          </a>
          <div className="flex items-center gap-3 text-slate-700">
            <Phone size={16} className="text-cyan-600"/> <span>+56 9 7273 9105</span>
          </div>
          <div className="flex items-center gap-3 text-slate-700">
            <Instagram size={16} className="text-pink-500"/> <span>@cloudelab</span>
          </div>
        </div>
      </div>
      <div className="rounded-2xl p-6 bg-white border border-black/10 shadow-sm">
        <form onSubmit={(e) => e.preventDefault()} className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-slate-700">Nombre</label>
            <input className="mt-1 w-full rounded-lg bg-white border border-black/10 px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/40" placeholder="Tu nombre"/>
          </div>
          <div>
            <label className="text-sm text-slate-700">Email</label>
            <input type="email" className="mt-1 w-full rounded-lg bg-white border border-black/10 px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/40" placeholder="tucorreo@dominio.com"/>
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm text-slate-700">Mensaje</label>
            <textarea rows={4} className="mt-1 w-full rounded-lg bg-white border border-black/10 px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/40" placeholder="Cuéntanos tu proyecto"/>
          </div>
          <button className="sm:col-span-2 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-white/90 text-slate-900 border border-black/10">
            Enviar (pronto disponible)
          </button>
        </form>
      </div>
    </div>
  </Section>
)

const Footer = () => (
  <footer className="relative mt-10 py-10 border-t border-black/10 bg-white/60 backdrop-blur">
    <div className="container mx-auto px-6 max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500" />
        <div className="text-slate-900">
          <p className="font-semibold">CloudeLab</p>
          <p className="text-xs text-slate-600">Code. Cloud. Create. 🚀</p>
        </div>
      </div>
      <div className="text-slate-600 text-sm flex flex-wrap items-center gap-4">
        <a href="#" className="hover:text-slate-900">Plus Contable</a>
        <a href="#contacto" className="hover:text-slate-900">Contacto</a>
        <a href="https://instagram.com/cloudelab" target="_blank" rel="noreferrer" className="hover:text-slate-900">Instagram</a>
      </div>
      <p className="text-slate-600 text-sm">© 2025 CloudeLab. Todos los derechos reservados.</p>
    </div>
  </footer>
)

function App() {
  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_800px_at_50%_-10%,rgba(255,255,255,1),rgba(255,255,255,0.8))] text-slate-900">
      {/* Grid claro + gradientes */}
      <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_90%_-10%,rgba(34,211,238,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_10%_-10%,rgba(168,85,247,0.12),transparent_50%)]" />
      </div>

      <Header />
      <main>
        <Hero />
        <TechStack />
        <Services />
        <Industries />
        <FeaturedPlusContable />
        <IPTVPlus />
        <Differentiators />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
