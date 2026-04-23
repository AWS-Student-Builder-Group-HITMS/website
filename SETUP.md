# AWS Cloud Club HITMS Website - Setup Guide

## Project Overview
A professional, modern Next.js website for AWS Cloud Club at HITMS featuring:
- 7 main pages (Home, About, Events, Join Us, Gallery, Contact, Members)
- Modern blue color theme (#003181, #2074d5)
- Responsive design with smooth animations
- API integration ready for MongoDB and Resend email

## Technologies Used
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom colors
- **Animations**: Framer Motion
- **Forms**: React Hook Form
- **Backend**: Node.js with API routes
- **Database**: MongoDB + Mongoose (optional)
- **Email**: Resend (optional)

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Visit `http://localhost:3000` to see your website.

### 3. Build for Production
```bash
npm run build
npm start
```

## Project Structure

```
awscc/
├── app/
│   ├── layout.tsx              # Root layout with nav & footer
│   ├── page.tsx                # Home page
│   ├── api/                    # API routes
│   │   ├── contact/route.ts    # Contact form handler
│   │   ├── join/route.ts       # Join form handler
│   │   ├── events/route.ts     # Events API
│   │   └── members/route.ts    # Members API
│   ├── about/page.tsx          # About page
│   ├── events/page.tsx         # Events page
│   ├── join-us/page.tsx        # Join Us page
│   ├── gallery/page.tsx        # Gallery page
│   ├── contact/page.tsx        # Contact page
│   └── members/page.tsx        # Members page
├── components/
│   ├── Navigation.tsx          # Top navigation
│   ├── Footer.tsx              # Footer with links
│   └── Hero.tsx                # Hero section component
├── public/
│   └── images/
│       └── logo.png            # Your AWS Club logo
├── globals.css                 # Global styles
├── tailwind.config.ts          # Tailwind configuration with custom colors
└── next.config.js              # Next.js configuration
```

## Features

### 1. **Responsive Navigation**
- Mobile-first design
- Animated hamburger menu
- Smooth hover effects

### 2. **Hero Section Component**
- Reusable across all pages
- Gradient background with custom colors

### 3. **Dynamic Pages**
- Home: Features, stats, CTA
- About: Mission, vision, achievements
- Events: Filterable event grid with categories
- Join Us: Sign-up form with benefits list
- Gallery: Image gallery with category filter
- Contact: Contact form and contact information
- Members: Team members grid with roles

### 4. **API Routes**
- Contact form submission handler
- Join Us form handler
- Events listing
- Members listing

### 5. **Design System**
- Custom colors: Dark blue (#003181) and medium blue (#2074d5)
- Gradient backgrounds
- Smooth animations
- Hover effects and transitions

## Next Steps for Setup

### Option 1: Database Integration (MongoDB)

1. **Create MongoDB Account**: https://mongodb.com
2. **Create Cluster**: Set up a free MongoDB Atlas cluster
3. **Get Connection String**: Copy your connection string
4. **Create `.env.local`**:
```
MONGODB_URI=your_mongodb_connection_string
```

5. **Install Models** (databases models)

### Option 2: Email Service (Resend)

1. **Create Resend Account**: https://resend.com
2. **Get API Key**: Copy your API key from the dashboard
3. **Add to `.env.local`**:
```
NEXT_PUBLIC_RESEND_API_KEY=your_resend_api_key
```

### Option 3: Update Content

1. **Home Page**: Edit `app/page.tsx`
   - Update features and stats
   - Add club-specific content

2. **About Page**: Edit `app/about/page.tsx`
   - Update mission, vision, and achievements
   - Add club history

3. **Events**: Edit `app/events/page.tsx`
   - Add real events to the events array
   - Connect to MongoDB for dynamic events

4. **Members**: Edit `app/members/page.tsx`
   - Update default members list
   - Add member photos

5. **Gallery**: Edit `app/gallery/page.tsx`
   - Add your event photos
   - Update image sources

6. **Contact Info**: Edit `app/contact/page.tsx`
   - Update email, location, office hours
   - Add social media links

7. **Footer**: Edit `components/Footer.tsx`
   - Update links and information

## Customization Guide

### Change Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: {
    DEFAULT: "#003181",      // Change this
    dark: "#001f4d",
    light: "#1a4fa8",
  },
  secondary: {
    DEFAULT: "#2074d5",      // Or this
    dark: "#175ba3",
    light: "#4a94e4",
  },
}
```

### Add New Pages
```bash
# Create new directory
mkdir -p app/new-page

# Create page.tsx
cat > app/new-page/page.tsx << 'EOF'
"use client"
import Hero from "@/components/Hero"

export default function NewPage() {
  return (
    <>
      <Hero title="Page Title" subtitle="Page subtitle" />
      {/* Your content here */}
    </>
  )
}
EOF
```

### Update Logo
Replace `public/images/logo.png` with your logo file.

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Alternative Hosting
- Netlify
- AWS Amplify
- GitHub Pages

## Environment Variables
Create `.env.local` with:
```
NEXT_PUBLIC_RESEND_API_KEY=your_key
MONGODB_URI=your_connection_string
NEXT_PUBLIC_APP_URL=your_domain
```

## Support & Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion)
- [AWS Cloud Club Community](https://aws.amazon.com/education/awseducate)

## Performance Optimization Tips

1. **Image Optimization**: Compress images before adding to gallery
2. **Load Time**: Use `next/image` for optimized images
3. **Analytics**: Add Google Analytics for tracking
4. **SEO**: Update meta descriptions for each page
5. **Forms**: Validate on both client and server side

## Support
For issues or questions, check the setup guide or contact your team lead.

Happy coding! 🚀
