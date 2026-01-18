# Quick Setup Instructions

## Option 1: View Static Preview (No Installation Needed)

You can open `visual-mockup.html` directly in your browser to see a preview of the design.

**To view:**
1. Navigate to the `vocemi` folder
2. Double-click `visual-mockup.html`
3. It will open in your default browser

## Option 2: Run the Full Next.js Website (Recommended)

To see the full website with all animations and features, you'll need to install Node.js first.

### Step 1: Install Node.js

1. **Download Node.js:**
   - Go to https://nodejs.org/
   - Download the LTS (Long Term Support) version (recommended: v20.x or v18.x)
   - Run the installer and follow the setup wizard
   - Make sure to check "Add to PATH" during installation

2. **Verify Installation:**
   - Open a new PowerShell or Command Prompt window
   - Run: `node --version`
   - Run: `npm --version`
   - Both should show version numbers

### Step 2: Install Dependencies

Once Node.js is installed:

```bash
cd d:\code\vocemi
npm install
```

### Step 3: Set Up Environment Variable

1. Copy `.env.local.example` to `.env.local`
2. Edit `.env.local` and add your calendar booking URL:
   ```
   NEXT_PUBLIC_BOOK_CALL_URL=https://calendly.com/your-username/meeting
   ```
   (Replace with your actual Google Calendar or Calendly link)

### Step 4: Run Development Server

```bash
npm run dev
```

The website will be available at: **http://localhost:3000**

Open this URL in your browser to see the full website with all features!

## Need Help?

If you encounter any issues:
- Make sure you opened a NEW terminal window after installing Node.js
- Verify Node.js is in your PATH by running `node --version`
- If npm install fails, try deleting `node_modules` folder and `package-lock.json` (if exists), then run `npm install` again

