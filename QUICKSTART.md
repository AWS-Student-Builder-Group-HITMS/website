# Quick Start Guide - AWS Cloud Club Website

## ⚡ Get Started in 3 Steps

### Step 1: Configure Environment Variables
Edit `.env.local` with your credentials:
```
MONGODB_URI=your_mongodb_connection_string
RESEND_API_KEY=your_resend_api_key
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: View Your Website
Open: **http://localhost:3001**

---

## 📋 What's Included

✅ **7 Professional Pages:**
- Home - with hero, stats, and features
- About - with mission, vision, and team
- Events - filterable event listings
- Gallery - image gallery with categories
- Members - team member showcase
- Join Us - member registration form
- Contact - contact form with email

✅ **Features:**
- Smooth animations (Framer Motion)
- Responsive design (mobile-first)
- Form validation (React Hook Form)
- Database integration (MongoDB)
- Email notifications (Resend)
- Beautiful gradient UI (#003181, #2074d5)

---

## 🎨 Quick Customizations

### Change Club Name
- Edit `components/Navigation.tsx` (line 36)
- Edit `components/Footer.tsx`
- Edit `app/page.tsx` titles

### Update Contact Email
- Edit `app/api/contact/route.ts` (line 21)
- Edit `components/Footer.tsx`

### Add Your Logo
1. Place your logo at: `public/images/logo.png`
2. The logo will automatically appear in navigation

### Change Colors
Edit `tailwind.config.ts`:
- `#003181` = Dark Blue (primary-dark)
- `#2074d5` = Light Blue (primary-light)

---

## 🗄️ Database Setup (Optional)

If you want to save member signups and contact messages:

1. **Create MongoDB Atlas Account**
   - Visit: https://www.mongodb.com/cloud/atlas
   - Create free cluster

2. **Add Connection String**
   - Copy connection URL from MongoDB
   - Paste into `.env.local` as `MONGODB_URI`

3. **Get Resend API Key**
   - Visit: https://resend.com
   - Create account and get API key
   - Paste into `.env.local` as `RESEND_API_KEY`

---

## 📦 Build for Production

```bash
npm run build
npm start
```

---

## 🚀 Deploy to Vercel

```bash
npm install -g vercel
vercel
```

---

## 🆘 Troubleshooting

**❌ "Port 3000 in use"**
- Server uses port 3001 instead (automatically)

**❌ Logo not showing**
- Make sure `public/images/logo.png` exists

**❌ Forms not working**
- Check `.env.local` has MongoDB URI
- Check MongoDB connection is active

**❌ Emails not sending**
- Check `.env.local` has Resend API key
- Verify Resend account is set up

---

## 📞 File Locations to Edit

| Change | File |
|--------|------|
| Club name | `components/Navigation.tsx` |
| Contact email | `app/api/contact/route.ts` |
| Home content | `app/page.tsx` |
| About content | `app/about/page.tsx` |
| Events | `app/events/page.tsx` |
| Members | `app/members/page.tsx` |
| Colors | `tailwind.config.ts` |
| Logo | `public/images/logo.png` |

---

**Website is ready! Now customize it for your club. 🎉**
