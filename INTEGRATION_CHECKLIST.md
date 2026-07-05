# 🚀 Cloudinary + Resend Integration Checklist

## ✅ Completed Setup

### Backend Infrastructure
- [x] Created `/api/contact.ts` - Vercel serverless function
  - Validates contact form data with Zod
  - Sends admin notification email via Resend
  - Sends user confirmation email
  - CORS enabled for cross-origin requests
  - Rate limiting & input validation built-in

### Frontend Integration
- [x] Created `src/lib/cloudinary.ts` - Image CDN utilities
  - `getCloudinaryUrl()` - Generate optimized image URLs
  - `getResponsiveImage()` - Generate responsive image srcsets
  - `CLOUDINARY_IMAGES` - Centralized image path mapping
  - Auto-format, quality, and responsive transformations

- [x] Created `src/hooks/useContactForm.ts` - Form state management
  - Form submission handling
  - Error management
  - Loading states
  - Success feedback

- [x] Updated `src/routes/contact.tsx` - Contact page with form
  - Toggle between social links and contact form
  - Form validation with React Hook Form + Zod
  - Real-time error display
  - Success/error animations
  - Cloudinary image for WhatsApp QR

### Configuration Files
- [x] Created `SETUP_GUIDE.md` - Complete setup instructions
- [x] Created `.env.example` - Environment variables template
- [x] Updated `.env.local` - Local development settings

---

## 📋 Required Manual Steps

### Step 1: Cloudinary Account Setup
- [ ] Create account at https://cloudinary.com
- [ ] Get Cloud Name from dashboard
- [ ] Set `VITE_CLOUDINARY_CLOUD_NAME` in `.env.local`

**Example:**
```env
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

### Step 2: Upload Images to Cloudinary
- [ ] Create folder: `aws-sbg-hitms`
- [ ] Upload WhatsApp QR image
  - Public ID: `aws-sbg-hitms/whatsapp-qr`
- [ ] Upload team photos (optional)
  - Public IDs: `aws-sbg-hitms/team/captain`, etc.
- [ ] Upload event images (optional)

**Note:** Update paths in `src/lib/cloudinary.ts` if your structure is different

### Step 3: Resend Account Setup
- [ ] Create account at https://resend.com
- [ ] Get API key from dashboard
- [ ] Set `RESEND_API_KEY` in `.env.local`
- [ ] Set `RESEND_CONTACT_EMAIL` in `.env.local`

**Example:**
```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx
RESEND_CONTACT_EMAIL=your-email@example.com
```

### Step 4: Test Locally
- [ ] Install dependencies: `npm install`
- [ ] Run dev server: `npm run dev`
- [ ] Visit `http://localhost:8080/contact`
- [ ] Test contact form submission
- [ ] Check email inbox for test email

### Step 5: Deploy to Vercel
- [ ] Connect project to Vercel (if not done)
- [ ] Add environment variables in Vercel settings:
  - `VITE_CLOUDINARY_CLOUD_NAME`
  - `RESEND_API_KEY`
  - `RESEND_CONTACT_EMAIL`
- [ ] Deploy: `git push origin main`
- [ ] Test contact form on production

### Step 6: Production Email Setup (Optional)
- [ ] Add domain to Resend dashboard
- [ ] Verify DNS records (SPF, DKIM, DMARC)
- [ ] Update email from address in `api/contact.ts`
- [ ] Change from: `onboarding@resend.dev` to your domain

---

## 📦 What's Included

### Files Created/Modified
```
src/
  ├── lib/
  │   ├── cloudinary.ts          (NEW) CDN image utilities
  │   └── resend.ts              (NEW) Email service utilities
  ├── hooks/
  │   └── useContactForm.ts       (NEW) Form state hook
  └── routes/
      └── contact.tsx            (MODIFIED) Contact form page

api/
  └── contact.ts                 (NEW) Serverless email handler

.env.local                         (MODIFIED) Added Cloudinary config
.env.example                       (NEW) Environment template
SETUP_GUIDE.md                     (NEW) Setup instructions
```

### Key Features

**Cloudinary:**
- ✨ Auto-optimization (format, quality, sizing)
- 📱 Responsive images with srcsets
- 🌍 Global CDN delivery
- 💾 Bandwidth reduction (~40-60%)

**Resend:**
- 📧 Reliable email delivery
- ✅ Form validation and rate limiting
- 🔒 CORS security
- 📊 Email activity tracking
- 💌 Beautiful HTML email templates

**Contact Form:**
- 🎨 Beautiful, animated UI
- ✔️ Full form validation
- 🔄 Loading states
- ✨ Success animations
- 🚨 Error handling
- 📱 Mobile responsive

---

## 🔗 Integration Points

### Image Usage
Replace old image paths:
```tsx
// ❌ Old
<img src="/members/i
mages/photo.jpg" />

// ✅ New
import { getCloudinaryUrl } from "@/lib/cloudinary";
<img src={getCloudinaryUrl("aws-sbg-hitms/team/photo", { width: 400 })} />
```

### Form Submission
```tsx
import { useContactForm } from "@/hooks/useContactForm";

const { submitForm, isLoading, isSuccess, error } = useContactForm();
await submitForm({ name, email, subject, message });
```

### API Endpoint
```
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Partnership inquiry",
  "message": "I'm interested in collaborating..."
}
```

---

## 🧪 Testing Checklist

### Local Testing
- [ ] Form validation works (try empty fields)
- [ ] Email appears in inbox within 1 minute
- [ ] Confirmation email sent to user
- [ ] Success message displays after submission
- [ ] Images load from Cloudinary URLs

### Production Testing
- [ ] Deploy to Vercel successfully
- [ ] Environment variables set correctly
- [ ] Contact form works on production domain
- [ ] Emails received with correct branding
- [ ] Responsive design works on mobile

### Email Verification
- [ ] Admin email received from contact form
- [ ] User confirmation email received
- [ ] Email HTML renders correctly
- [ ] Links work properly
- [ ] No spam folder placement

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Images not loading | Check Cloud Name, verify public IDs, test URL directly |
| Contact form not sending | Check API key, verify endpoint accessible, check console errors |
| Emails in spam | Add SPF/DKIM records, verify domain, check sender reputation |
| Rate limiting errors | Resend has soft limits; they auto-recover after few minutes |
| CORS errors | Verify Origin header, check allowed domains in API route |

---

## 📊 Monitoring

### Cloudinary Dashboard
- Media Library - View all uploaded images
- Usage - See storage and bandwidth usage
- Quality - Image transformation metrics

### Resend Dashboard
- Email Activity - View all sent emails
- Bounces - Monitor failed deliveries
- API Usage - See request counts
- Logs - Debug email issues

---

## 🎯 Next Features to Implement

1. **Image Upload Widget** - Allow users to upload images
2. **Email Templates** - More email designs
3. **Contact Form Notifications** - Slack/Discord integration
4. **Image Gallery** - Showcase team photos
5. **Analytics** - Track form submissions and email opens

---

## 📚 Documentation Links

- [Cloudinary Docs](https://cloudinary.com/documentation)
- [Resend Docs](https://resend.com/docs)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)

---

**Last Updated:** 2026-07-05  
**Status:** ✅ Integration Complete - Awaiting Account Setup
