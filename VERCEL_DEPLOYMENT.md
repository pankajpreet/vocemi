# Vercel Deployment Guide for Vocemi

Follow these steps to deploy your Vocemi website to Vercel.

## Prerequisites

- ✅ Your code is ready (you're here!)
- ✅ GitHub account (create one at [github.com](https://github.com) if needed)
- ✅ Vercel account (we'll create this in step 2)

---

## Step 1: Push Code to GitHub

### If you don't have a GitHub repository yet:

1. **Initialize Git (if not already done):**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Vocemi website"
   ```

2. **Create a new repository on GitHub:**
   - Go to [github.com/new](https://github.com/new)
   - Repository name: `vocemi` (or your preferred name)
   - Choose Public or Private
   - **Don't** initialize with README, .gitignore, or license
   - Click "Create repository"

3. **Connect and push your code:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/vocemi.git
   git branch -M main
   git push -u origin main
   ```
   Replace `YOUR_USERNAME` with your GitHub username.

### If you already have a GitHub repository:

Just make sure your latest code is pushed:
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push
```

---

## Step 2: Deploy to Vercel

1. **Sign up / Log in to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Sign Up" or "Log In"
   - Sign up with your GitHub account (easiest option)

2. **Import your project:**
   - Click "Add New..." → "Project"
   - Find your `vocemi` repository in the list
   - Click "Import" next to it

3. **Configure project:**
   - **Framework Preset**: Vercel will auto-detect "Next.js" ✅
   - **Root Directory**: Leave as `./` (default)
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `.next` (auto-filled)
   - **Install Command**: `npm install` (auto-filled)

4. **Add Environment Variable:**
   - Scroll down to "Environment Variables"
   - Click "Add" or "Add Another"
   - **Name**: `NEXT_PUBLIC_BOOK_CALL_URL`
   - **Value**: Your calendar booking URL (e.g., `https://calendly.com/your-username/meeting`)
   - Click "Save"

5. **Deploy!**
   - Click the big "Deploy" button
   - Wait 2-3 minutes for the build to complete
   - ✅ Your site will be live at `vocemi-xxxxx.vercel.app`

---

## Step 3: Connect Your Custom Domain

### Option A: Add Domain in Vercel (Recommended)

1. **In Vercel Dashboard:**
   - Go to your project → "Settings" → "Domains"
   - Click "Add Domain"
   - Enter your domain: `vocemi.com` (or whatever your domain is)
   - Click "Add"
   - Also add `www.vocemi.com` if you want www subdomain

2. **Vercel will show you DNS records:**
   - Note the CNAME or A record values Vercel provides

3. **Update Cloudflare DNS:**
   - Go to [dash.cloudflare.com](https://dash.cloudflare.com)
   - Select your domain
   - Go to "DNS" → "Records"

   **For root domain (`@`):**
   - Type: `A` (if Vercel provides IP) OR `CNAME` (if supported)
   - Name: `@`
   - Target: The value Vercel provides
   - Proxy: **Proxied** (orange cloud) ✅
   - Click "Save"

   **For www subdomain:**
   - Type: `CNAME`
   - Name: `www`
   - Target: `cname.vercel-dns.com` (or what Vercel shows)
   - Proxy: **Proxied** (orange cloud) ✅
   - Click "Save"

4. **Wait for DNS propagation:**
   - Usually 5-15 minutes
   - Vercel will automatically provision SSL certificate

5. **Verify in Vercel:**
   - Check your project → Domains
   - Status should show "Valid Configuration" when ready

### Option B: Use Vercel's Auto Domain Setup

Some users prefer this method:
1. In Vercel → Domains → Add Domain
2. Vercel will auto-configure DNS if your domain is already on Cloudflare
3. Follow the prompts

---

## Step 4: Verify Deployment

1. **Check your live site:**
   - Visit your custom domain: `https://vocemi.com`
   - Visit Vercel URL: `https://vocemi-xxxxx.vercel.app`

2. **Test all pages:**
   - Homepage: `/`
   - Services: `/services`
   - FAQ: `/faq`
   - Contact: `/contact`

3. **Test environment variable:**
   - Click "Book a Call" button
   - Should open your calendar booking link

---

## Future Updates

### Automatic Deployments

Every time you push to GitHub, Vercel will automatically:
- ✅ Detect the changes
- ✅ Build your site
- ✅ Deploy to production

**Workflow:**
```bash
# Make changes to your code
git add .
git commit -m "Update website content"
git push
# Vercel automatically deploys! 🚀
```

### Update Environment Variables

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Edit or add variables
3. Redeploy: Deployments → Click "..." → "Redeploy"

---

## Troubleshooting

### Build Fails

**Error: "Module not found"**
- Make sure all dependencies are in `package.json`
- Run `npm install` locally to verify

**Error: "Build command failed"**
- Check build logs in Vercel dashboard
- Try building locally: `npm run build`

### Domain Not Working

**SSL Certificate Not Ready:**
- Wait 5-15 minutes after adding DNS records
- Check Vercel → Domains → SSL status

**DNS Not Propagated:**
- Check with `nslookup vocemi.com` (Windows) or `dig vocemi.com` (Mac/Linux)
- Cloudflare proxy status should be "Proxied" (orange cloud)

### Environment Variable Not Working

**Variable Not Available:**
- Ensure it's named `NEXT_PUBLIC_BOOK_CALL_URL` (must start with `NEXT_PUBLIC_`)
- After adding, redeploy the project
- Check Vercel → Settings → Environment Variables

---

## Quick Reference

| Item | Value |
|------|-------|
| Platform | Vercel (Free Tier) |
| Framework | Next.js 14 |
| Build Command | `npm run build` |
| Node Version | 18+ (auto-detected) |
| Environment Variable | `NEXT_PUBLIC_BOOK_CALL_URL` |
| Domain Management | Cloudflare DNS |

---

## Need Help?

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Vercel Support**: Check deployment logs in dashboard
- **Cloudflare Docs**: [developers.cloudflare.com](https://developers.cloudflare.com)

---

**You're all set! 🎉** Your Vocemi website will be live and automatically deploy on every Git push.

