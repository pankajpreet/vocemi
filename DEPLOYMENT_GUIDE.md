# Deployment Guide for Vocemi

Since you're using Cloudflare for DNS management, here are your deployment options:

## Option 1: Vercel (Recommended for Next.js)

### Why Vercel?
- Built by the creators of Next.js - zero configuration needed
- Free tier with excellent performance
- Automatic HTTPS, CDN, and edge optimizations
- Easy environment variable management

### Setup Steps:

1. **Deploy to Vercel:**
   - Push your code to GitHub/GitLab/Bitbucket
   - Go to [vercel.com](https://vercel.com) and sign up/login
   - Click "New Project" and import your repository
   - Add environment variable: `NEXT_PUBLIC_BOOK_CALL_URL`
   - Deploy!

2. **Connect Custom Domain in Vercel:**
   - In Vercel dashboard, go to your project → Settings → Domains
   - Add your domain (e.g., `vocemi.com` and `www.vocemi.com`)
   - Vercel will show you DNS records to add

3. **Update Cloudflare DNS:**
   - Go to Cloudflare Dashboard → DNS → Records
   - Add CNAME record:
     - **Name**: `@` (for root domain) or `www`
     - **Target**: The value Vercel provides (usually `cname.vercel-dns.com`)
     - **Proxy status**: Proxied (orange cloud) ✅
   - For root domain (`@`), Vercel might also provide an A record IP - check Vercel dashboard

**Note**: If using Cloudflare proxy (orange cloud), Vercel's analytics might not show correct visitor IPs, but you'll get Cloudflare's DDoS protection.

---

## Option 2: Cloudflare Pages (Native Integration)

### Why Cloudflare Pages?
- Seamless integration with your existing Cloudflare setup
- Free tier with generous limits
- Global CDN included
- Automatic SSL certificates

### Setup Steps:

1. **Prepare for Cloudflare Pages:**
   ```bash
   npm install @cloudflare/next-on-pages --save-dev
   ```
   Update `package.json`:
   ```json
   "scripts": {
     "build": "next build",
     "pages:build": "@cloudflare/next-on-pages"
   }
   ```
   
   Update `next.config.js`:
   ```js
   const isDev = process.env.NODE_ENV === 'development';
   const isPages = process.env.CF_PAGES === '1';
   
   module.exports = {
     output: isPages ? 'export' : undefined,
     // OR use adapter for full Next.js features:
     // (requires @cloudflare/next-on-pages)
   };
   ```

2. **Deploy:**
   - Push code to GitHub
   - Go to Cloudflare Dashboard → Pages → Create a project
   - Connect your GitHub repository
   - Build command: `npm run build`
   - Build output directory: `.next`
   - Add environment variable: `NEXT_PUBLIC_BOOK_CALL_URL`
   - Deploy!

3. **Custom Domain:**
   - In Cloudflare Pages → your project → Custom domains
   - Add your domain - it auto-configures DNS!

---

## Option 3: Netlify

### Setup Steps:

1. **Deploy to Netlify:**
   - Push code to GitHub
   - Go to [netlify.com](https://netlify.com) → "New site from Git"
   - Configure:
     - Build command: `npm run build`
     - Publish directory: `.next`
   - Add environment variable: `NEXT_PUBLIC_BOOK_CALL_URL`

2. **Update Cloudflare DNS:**
   - Add CNAME record:
     - **Name**: `@` or `www`
     - **Target**: `your-site.netlify.app` (or custom Netlify domain)
     - **Proxy**: Proxied ✅

---

## Option 4: Other Platforms

- **AWS Amplify**: Good for AWS ecosystem integration
- **DigitalOcean App Platform**: Simple VPS deployment
- **Railway**: Modern PaaS with good Next.js support
- **Render**: Simple deployment platform

For all of these, you'll point Cloudflare DNS to their provided domain/IP.

---

## DNS Configuration Tips for Cloudflare

### Root Domain (`@`) Options:
1. **A Record**: Point to IP address (if provider gives one)
2. **CNAME Record**: Some providers support this (check their docs)

### Subdomain (e.g., `www`):
- Always use **CNAME** record
- Target: Provider's domain (e.g., `cname.vercel-dns.com`)

### Proxy Status:
- **Proxied (Orange Cloud)**: ✅ Recommended
  - DDoS protection
  - Cloudflare CDN
  - Visitor IPs show Cloudflare IPs
  
- **DNS Only (Gray Cloud)**: 
  - Direct to provider
  - Provider sees real visitor IPs
  - No Cloudflare CDN

---

## Recommended: Vercel + Cloudflare

**Best combination:**
- Deploy on Vercel (best Next.js experience)
- Use Cloudflare for DNS management only (DNS only mode)
- OR use Cloudflare full proxy for added protection

---

## Quick Start Checklist

- [ ] Push code to GitHub/GitLab
- [ ] Choose deployment platform
- [ ] Deploy and get deployment URL
- [ ] Add environment variables on platform
- [ ] Configure custom domain on platform
- [ ] Add DNS records in Cloudflare
- [ ] Wait for DNS propagation (usually 5-15 minutes)
- [ ] Test your live site!

---

## Troubleshooting

### SSL Certificate Issues:
- If using Cloudflare proxy, SSL is automatic
- If DNS only, ensure your deployment platform provides SSL

### Environment Variables Not Working:
- Ensure they're set in deployment platform dashboard
- For Next.js, `NEXT_PUBLIC_*` variables must be set before build
- Redeploy after adding variables

### DNS Propagation:
- Can take up to 48 hours (usually 5-15 minutes)
- Check with `nslookup` or `dig` command
- Clear DNS cache: `ipconfig /flushdns` (Windows) or `sudo dscacheutil -flushcache` (Mac)

