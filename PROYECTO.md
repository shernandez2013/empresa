# NovaTech Solutions — Landing Page

Landing page profesional para empresa de tecnología/consultoría IT. Construida con Next.js 15, React, TypeScript y Tailwind CSS. Orientada a generación de leads B2B.

## Stack

- Next.js 16 (App Router) + Turbopack
- React + TypeScript
- Tailwind CSS v4
- lucide-react (iconos)
- Resend (envío de emails)
- Fuente: Inter (Google Fonts)

## Estructura

```
app/
  layout.tsx              — metadata SEO, Schema.org JSON-LD, fuente Inter
  page.tsx                — ensambla todos los componentes en orden
  globals.css             — animaciones globales (float, fade-in-up, card-hover, tech-item)
  api/
    contact/
      route.ts            — POST /api/contact: recibe el formulario y envía email via Resend

components/
  Navbar.tsx              — fija al scroll, se torna blanca con blur, mobile menu
  Hero.tsx                — fondo con grid + glow blobs, code mockup animado, 3 métricas
  Services.tsx            — 6 tarjetas (Soft, Web, APIs, Cloud, IA, Soporte)
  WhyUs.tsx               — 2 columnas: texto+stats / 6 razones con íconos
  Technologies.tsx        — carrusel infinito de 2 filas animadas en direcciones opuestas
  CaseStudies.tsx         — 3 casos (Fintech, Retail, Salud) con métricas de resultado
  Process.tsx             — timeline de 6 pasos con íconos y duración estimada
  Testimonials.tsx        — 3 testimonios en sección oscura con estrellas
  CTA.tsx                 — banner azul degradado con llamada a acción principal
  Contact.tsx             — formulario controlado + llamada real a /api/contact + estado de éxito/error
  Footer.tsx              — 4 columnas + redes sociales (SVG inline) + copyright
```

## Paleta y estilo

| Token | Valor |
|---|---|
| Dark | `#0F172A` |
| Primary | `#2563EB` |
| Light blue | `#3B82F6` |
| Background | `#F8FAFC` |
| White | `#FFFFFF` |

Diseño mobile-first, bordes suaves (`rounded-xl`, `rounded-2xl`), sombras sutiles, hover con `translateY(-6px)`.

## Variables de entorno

Crear archivo `.env.local` en la raíz del proyecto (ver `.env.local.example`):

```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxx   # API Key de resend.com
CONTACT_EMAIL=siheca2013@gmail.com    # Correo donde llegan las cotizaciones
```

> El archivo `.env.local` nunca se sube a Git (está en `.gitignore`).

## Flujo del formulario de contacto

1. Usuario llena el formulario en la sección **Contacto**
2. El frontend hace `POST /api/contact` con los datos
3. `app/api/contact/route.ts` valida los campos requeridos (nombre, email, mensaje)
4. Resend envía un email HTML profesional a `CONTACT_EMAIL`
5. El email incluye todos los datos del solicitante y un botón **Responder** con `replyTo` apuntando al correo del cliente
6. El formulario muestra mensaje de éxito o error según la respuesta del API

## Comandos

```bash
npm install      # instalar dependencias
npm run dev      # servidor de desarrollo → http://localhost:3000
npm run build    # build de producción
npm run start    # servidor de producción
```

## Branches

| Branch | Descripción |
|---|---|
| `master` | Código base inicial |
| `develop` | Rama de integración |
| `feature/tech-carousel` | Rediseño de sección Tecnologías con carrusel infinito |
| `feature/contact-email` | Integración de email con Resend en formulario de contacto |

## Personalización rápida

- **Nombre empresa**: buscar y reemplazar `NovaTech` / `NovaTech Solutions` en todos los archivos
- **Correo destino**: cambiar `CONTACT_EMAIL` en `.env.local`
- **Dominio del remitente**: en `app/api/contact/route.ts` cambiar `onboarding@resend.dev` por `web@tudominio.com` (requiere dominio verificado en Resend)
- **Colores**: cambiar en `globals.css` y clases Tailwind (`blue-600`, `slate-900`)
- **Contenido de secciones**: cada componente tiene sus datos como arrays/objetos al inicio del archivo
- **SEO**: `layout.tsx` → objeto `metadata` y `jsonLd`

## Secciones (en orden de aparición)

1. Navbar
2. Hero — métricas: +50 proyectos, +20 clientes, 99.9% uptime
3. Servicios — 6 tarjetas con color por categoría
4. ¿Por qué elegirnos? — 6 ventajas + stats globales
5. Tecnologías — carrusel infinito de 2 filas (izq→der y der→izq)
6. Casos de éxito — Fintech / Retail / Salud
7. Nuestro proceso — 6 pasos con duración
8. Testimonios — sección oscura con 3 clientes
9. CTA — banner de conversión
10. Contacto — formulario real con integración Resend
11. Footer

## Notas técnicas

- Todos los componentes son `"use client"` donde usan hooks o eventos
- El scroll suave entre secciones usa `element.scrollIntoView({ behavior: "smooth" })`
- La Navbar detecta scroll con `window.addEventListener("scroll", ...)` y limpia en unmount
- El carrusel de tecnologías usa `@keyframes` con `translateX(-50%)` sobre arrays duplicados para loop perfecto
- El API Route valida campos requeridos y devuelve errores descriptivos al frontend
- Los iconos de redes sociales en el Footer son SVG inline (lucide-react no los incluye)
- Build limpio: 0 errores TypeScript, 0 errores ESLint
