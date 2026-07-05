# AWS SBG HITMS - Image Delivery & Email Setup Guide

## 📋 Overview

This guide walks you through setting up:
1. **Cloudinary** - Fast CDN image delivery
2. **Resend.dev** - Contact form email service

---

## 🖼️ Cloudinary Setup

### Why Cloudinary?
- **Fast delivery** - Global CDN for images
- **Auto-optimization** - Responsive images with auto-format/quality
- **Bandwidth savings** - ~40-60% smaller file sizes
- **Easy integration** - Single npm package

### Step 1: Create Cloudinary Account
1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up for free account
3. Verify email
4. Copy your **Cloud Name** from dashboard

### Step 2: Get Cloud Name
- Dashboard → Settings → Account
- Copy **Cloud Name** (looks like: `abc123def`)

### Step 3: Update .env.local
```env
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
```

### Step 4: Upload Images to Cloudinary
Option A: Upload via Cloudinary Dashboard
1. Media Library → Upload
2. Upload your images (WhatsApp QR, team photos, etc.)
3. Organize into folders (e.g., `aws-sbg-hitms/team/`)

Option B: Use Upload Widget (Recommended)
- See `src/lib/cloudinary.ts` for helper functions
- Create upload endpoints if needed

### Step 5: Update Image References

Currently your images are mapped in `src/lib/cloudinary.ts`:
```typescript
export const CLOUDINARY_IMAGES = {
  whatsappQR: "aws-sbg-hitms/whatsapp-qr",
  team: {
    captain: "aws-sbg-hitms/team/captain",
    // ... more images
  }
};
```

Update these to match your uploaded file paths.

### Step 6: Use Optimized Images in Components
```tsx
import { getCloudinaryUrl } from "@/lib/cloudinary";

// Simple usage
const imageUrl = getCloudinaryUrl("aws-sbg-hitms/whatsapp-qr", {
  width: 400,
  quality: "auto"
});

// Responsive images
const { src, srcSet, sizes } = getResponsiveImage("aws-sbg-hitms/hero");
<img src={src} srcSet={srcSet} sizes={sizes} alt="Hero" />
```

### Image Optimization Examples

**Original:** `public/members/images/photo.jpg` (800KB)  
**Optimized:** Cloudinary URL with format=auto, quality=auto (120KB) ✨

Transformations applied:
- Format: auto-detect (WebP for modern browsers)
- Quality: auto (intelligently compressed)
- Width: responsive (320px - 1280px)
- Lazy loading enabled

---

## 📧 Resend Setup

### Why Resend?
- **Developer-friendly** - Simple API, great docs
- **Reliable** - High delivery rate, excellent uptime
- **Affordable** - Free tier includes 100 emails/day
- **Built-in** - Works serverlessly on Vercel

### Step 1: Create Resend Account
1. Go to [resend.com](https://resend.com)
2. Sign up with email
3. Verify email

### Step 2: Get API Key
- Dashboard → API Keys
- Create new API key
- Copy the key (starts with `re_`)

### Step 3: Update .env.local
```env
RESEND_API_KEY=re_your_api_key_here
RESEND_CONTACT_EMAIL=contact@sbg-hitms.dev
```

### Step 4: Verify Domain (Optional but Recommended)
For production:
1. Go to Domains in Resend dashboard
2. Add your domain (e.g., `sbg-hitms.dev`)
3. Follow DNS verification steps
4. Update email from: `onboarding@resend.dev` → `hello@sbg-hitms.dev`

Update in `api/contact.ts`:
```typescript
from: "AWS SBG HITMS <hello@sbg-hitms.dev>",
```

### Step 5: Test Contact Form
1. Run dev server: `npm run dev`
2. Go to `/contact` page
3. Click "Send us a Message"
4. Fill form and submit
5. Check email for confirmation

### Step 6: Monitor Emails
- Resend Dashboard → Email Activity
- View delivery status, bounces, etc.

---

## 🔧 Local Development

### Install Dependencies
```bash
npm install
```

### Environment Variables
Create `.env.local` in root:
```env
# Cloudinary
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name

# Resend
RESEND_API_KEY=re_your_api_key
RESEND_CONTACT_EMAIL=contact@sbg-hitms.dev

# Optional
VITE_CONTACT_EMAIL=contact@sbg-hitms.dev
```

### Run Dev Server
```bash
npm run dev
```

### Test Contact Form
- Visit `http://localhost:8080/contact`
- Fill out form
- Check spam folder if confirmation email doesn't appear

---

## 🚀 Production Deployment

### Vercel Deployment

1. **Connect to Vercel**
   ```bash
   npm install -g vercel
   vercel login
   vercel
   ```

2. **Set Environment Variables in Vercel**
   - Go to Settings → Environment Variables
   - Add all variables from `.env.local`
   ```
   VITE_CLOUDINARY_CLOUD_NAME = your_cloud_name
   RESEND_API_KEY = re_your_api_key
   RESEND_CONTACT_EMAIL = contact@sbg-hitms.dev
   ```

3. **Deploy**
   ```bash
   git push origin main
   ```
   Vercel auto-deploys on push!

### Cloudinary CDN Benefits
- **Automatic HTTPS** - All images served over HTTPS
- **Global CDN** - Images served from nearest edge location
- **Caching** - Browser & proxy caching configured
- **Monitoring** - Analytics dashboard for usage

### Contact Form Security
- **Rate limiting** - Built-in request validation
- **Input validation** - Zod schema validation
- **CORS** - Properly configured for production domain
- **Email verification** - Resend handles bounce/complaint handling

---

## 📊 Usage Statistics

### Cloudinary
- Free tier: 25 GB transformations/month
- Free tier: 1 GB storage
- Good for: 100-500 images

### Resend
- Free tier: 100 emails/day
- Paid: $20/month (10,000 emails)
- Good for: Contact forms, notifications

---

## 🐛 Troubleshooting

### Images Not Loading
1. ✅ Check VITE_CLOUDINARY_CLOUD_NAME is correct
2. ✅ Verify public ID in CLOUDINARY_IMAGES matches uploaded file
3. ✅ Check image is public (not draft/pending)
4. ✅ Try URL directly in browser: `https://res.cloudinary.com/[CLOUD_NAME]/image/upload/[PUBLIC_ID]`

### Contact Form Not Sending
1. ✅ Check RESEND_API_KEY is valid
2. ✅ Verify RESEND_CONTACT_EMAIL is set
3. ✅ Check browser console for errors
4. ✅ Verify `/api/contact` endpoint is accessible
5. ✅ Check Resend dashboard for failures

### Emails Going to Spam
1. ✅ Domain not verified - Add SPF/DKIM records
2. ✅ Content too promotional - Keep messages professional
3. ✅ Too many unsubscribes - Monitor bounce rates

---

## 📚 Resources

- [Cloudinary Docs](https://cloudinary.com/documentation)
- [Resend Docs](https://resend.com/docs)
- [Vercel Deployment](https://vercel.com/docs)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)

---

## ✨ Next Steps

1. ✅ Set up Cloudinary account
2. ✅ Set up Resend account
3. ✅ Add environment variables
4. ✅ Upload images to Cloudinary
5. ✅ Test contact form locally
6. ✅ Deploy to Vercel
7. ✅ Verify domain with Resend (optional)
8. ✅ Monitor analytics

---

**Questions?** Check the specific tool documentation or enable verbose logging in `.env.local`:
```env
DEBUG=*
```
