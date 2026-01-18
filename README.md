# Vocemi - Voice AI Agency Website

A modern, responsive Next.js website for Vocemi, a Voice AI agency. Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **Modern Design**: Inspired by Xtract, Automatix, and Landio with a dark purple/teal color scheme
- **Fully Responsive**: Mobile-first design that works on all devices
- **Smooth Animations**: Framer Motion animations for scroll reveals and hover effects
- **SEO Optimized**: Proper meta tags, Open Graph, and Twitter cards
- **Fast Performance**: Built with Next.js 14 App Router for optimal performance

## Pages

- **Landing Page**: Hero section, services overview, benefits, testimonials, and CTA
- **Services Page**: Detailed service descriptions with features and integration options
- **FAQ Page**: Accordion-style FAQ section
- **Contact Page**: Contact form and booking information

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file in the root directory:
```bash
cp .env.local.example .env.local
```

3. Update the `.env.local` file with your calendar booking URL:
```
NEXT_PUBLIC_BOOK_CALL_URL=https://calendly.com/your-username/meeting
```

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
3. Add the `NEXT_PUBLIC_BOOK_CALL_URL` environment variable in Vercel dashboard
4. Deploy!

Vercel will automatically detect Next.js and configure everything for you.

### Other Platforms

The site can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Or any Node.js hosting service

## Customization

### Update Content

Edit `lib/config.ts` to update:
- Site information (name, tagline, description)
- Services
- Benefits
- FAQs
- Testimonials
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

