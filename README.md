# Vocemi - Voice AI Agency Website

A modern, responsive Next.js website for Vocemi, a Voice AI agency. Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **Modern Design**: Responsive marketing site with focused demo and booking paths
- **Fully Responsive**: Mobile-first design that works on all devices
- **Smooth Animations**: Framer Motion animations for scroll reveals and hover effects
- **SEO Optimized**: Proper meta tags, Open Graph, and Twitter cards
- **Fast Performance**: Built with Next.js 14 App Router for optimal performance

## Pages

- **Landing Page**: Hero, workflow, services, opportunity estimator, client workflows, FAQ, and CTAs
- **Services Pages**: Service hub plus detailed AI receptionist and lead-reactivation guides
- **FAQ Page**: Accordion-style FAQ section
- **Contact Page**: Server-validated email form and booking information
- **About Page**: Founder, location, and operating principles
- **Security Page**: Plain-language website provider and data-flow information

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Copy the tracked environment template:
```bash
cp .env.example .env.local
```

3. Add the services you use. At minimum, configure booking and contact-form
delivery:
```bash
NEXT_PUBLIC_BOOK_CALL_URL=https://cal.com/your-booking-link
RESEND_API_KEY=re_...
CONTACT_FROM_EMAIL=Vocemi Website <website@vocemi.com>
CONTACT_TO_EMAIL=business@vocemi.com
```

`CONTACT_FROM_EMAIL` must use a sender or domain verified in Resend.

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Build

Build the production version:

```bash
npm run build
npm start
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add the required values from `.env.example` in the Vercel dashboard
4. Set the successful-booking redirect in Cal.com to
   `https://www.vocemi.com/booking-confirmed`
5. Deploy

Vercel will automatically detect Next.js and configure everything for you.

### Other Platforms

The site can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Or any Node.js hosting service

## Customization

### Update Content

Edit `lib/config.ts`, `lib/homeContent.ts`, and `lib/serviceContent.ts` to update:
- Site information (name, tagline, description)
- Services
- Benefits
- FAQs
- Service guides
- Contact information

### Update Colors

Colors are defined in `tailwind.config.ts`. The current palette:
- Primary Dark: `#1A1A2E`
- Primary Accent: `#7D3CFE` (Purple)
- Secondary Accent: `#4DECE1` (Cyan)

### Update Calendar Booking Link

1. Update the `NEXT_PUBLIC_BOOK_CALL_URL` in `.env.local` for local development
2. Add the same environment variable in your hosting platform's dashboard

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Project Structure

```
vocemi/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Landing page
│   ├── services/          # Services page
│   ├── faq/               # FAQ page
│   ├── contact/           # Contact page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── ServiceCard.tsx
│   ├── FAQAccordion.tsx
│   ├── Testimonials.tsx
│   └── BookCallButton.tsx
├── lib/                   # Utilities and config
│   └── config.ts         # Site configuration
└── public/               # Static assets
```

## License

All rights reserved.
