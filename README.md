# AWS Cloud Club HITMS Website

A professional, modern website built with Next.js for the AWS Cloud Club at HITMS.

## 🚀 Live Development

The website is currently running on **http://localhost:3001**

## ✨ Features

- 7 Professional Pages (Home, About, Events, Gallery, Members, Join Us, Contact)
- Modern gradient design with AWS brand colors (#003181 and #2074d5)
- Smooth animations and transitions with Framer Motion
- Fully responsive design for mobile, tablet, and desktop
- Member registration with validation
- Contact form with email integration
- Event management with category filtering
- MongoDB integration for data persistence
- Resend email service for notifications

## 📁 Project Structure

```
awscc/
├── app/
│   ├── layout.tsx              # Root layout with nav & footer
│   ├── page.tsx                # Home page
│   ├── about/page.tsx          # About page
│   ├── events/page.tsx         # Events page
│   ├── gallery/page.tsx        # Gallery page
│   ├── members/page.tsx        # Members showcase
│   ├── join-us/page.tsx        # Join form
│   ├── contact/page.tsx        # Contact form
│   ├── api/
│   │   ├── members/join/route.ts  # Join API
│   │   └── contact/route.ts       # Contact API
│   └── globals.css             # Global styles
├── components/
│   ├── Navigation.tsx          # Navbar
│   ├── Footer.tsx              # Footer
│   └── Hero.tsx                # Hero section
├── models/
│   ├── Member.ts               # Member schema
│   └── Contact.ts              # Contact schema
├── lib/
│   └── mongodb.ts              # DB connection
├── public/
│   └── images/
│       └── logo.png            # AWS Club logo
├── tailwind.config.ts          # Tailwind config
├── next.config.js              # Next.js config
└── package.json                # Dependencies
```

## 🛠️ Setup Instructions

### 1. Install Dependencies
Already done! All packages are installed.

### 2. Configure Environment Variables

Edit `.env.local` and add your credentials:

```bash
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/awscc?retryWrites=true&w=majority

# Resend API Key (for email)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**How to get these:**
- **MongoDB**: Create free account at https://www.mongodb.com/cloud/atlas
- **Resend**: Sign up at https://resend.com

### 3. Run Development Server
```bash
npm run dev
```
Visit: http://localhost:3001

### 4. Build for Production
```bash
npm run build
npm start
```

## 🎨 Customization Guide

### Update Club Information

**Navbar & Footer:**
- Edit `components/Navigation.tsx` for navigation links
- Edit `components/Footer.tsx` for contact info and social links

**Home Page:**
- Edit `app/page.tsx` to change stats, features, and messaging

**About Page:**
- Update `app/about/page.tsx` with your team members and achievements

**Events:**
- Update hardcoded events in `app/events/page.tsx`
- Or connect to MongoDB for dynamic events

**Members:**
- Update member data in `app/members/page.tsx`

**Contact Information:**
- Update email address in `components/Footer.tsx`
- Update contact API in `app/api/contact/route.ts`

### Change Colors

Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: {
    DEFAULT: "#003181",      // Dark blue
    dark: "#001f4d",
    light: "#1a4fa8",
  },
  secondary: {
    DEFAULT: "#2074d5",      // Light blue
    dark: "#175ba3",
    light: "#4a94e4",
  },
}
```

### Add Your Logo

Replace logo at: `public/images/logo.png`

## 📝 Pages Details

### Home
- Hero section with CTA buttons
- Statistics cards
- Features showcase
- Join call-to-action

### About
- Mission & Vision statements
- Leadership team profiles
- Key achievements

### Events
- Dynamic event listings
- Category filtering
- Event details with registration button

### Gallery
- Photo gallery with category filtering
- Hover effects and animations

### Members
- Member showcase cards
- Role filtering
- Team statistics

### Join Us
- Registration form
- Benefits listing
- Form validation

### Contact
- Contact information cards
- Contact form
- Embedded map

## 🔗 API Endpoints

### POST /api/members/join
**Request:**
```json
{
  "fullName": "string",
  "email": "string",
  "phone": "string",
  "college": "string",
  "year": "string",
  "skills": "string",
  "experience": "string",
  "motivation": "string"
}
```

### POST /api/contact
**Request:**
```json
{
  "name": "string",
  "email": "string",
  "subject": "string",
  "message": "string"
}
```

## 📦 Dependencies

- **next**: React framework
- **react** & **react-dom**: UI library
- **tailwindcss**: Styling
- **framer-motion**: Animations
- **react-hook-form**: Form handling
- **mongoose**: MongoDB ORM
- **resend**: Email service

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Other Platforms
- Build: `npm run build`
- Start: `npm start`

## ✅ Checklist for Launch

- [ ] Update `.env.local` with MongoDB & Resend credentials
- [ ] Update club information in pages
- [ ] Replace logo with your club logo
- [ ] Add real events to database
- [ ] Update team member profiles
- [ ] Configure email notifications
- [ ] Test all forms
- [ ] Test on mobile devices
- [ ] Deploy to Vercel or your server

## 🤝 Support

For issues:
1. Check `.env.local` configuration
2. Verify MongoDB connection
3. Check browser console for errors
4. Review network requests in DevTools

## 📄 License

MIT - Feel free to use and modify

---

**Built with ❤️ using Next.js + Tailwind CSS**
