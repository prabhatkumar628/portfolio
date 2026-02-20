# 🚀 Portfolio Website - Full-Stack Next.js Application

A modern, feature-rich portfolio website built with Next.js 14, featuring a complete admin dashboard, authentication, file uploads, and email notifications.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-green?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

### 🎨 **Frontend (Public)**
- **Modern UI/UX**: Dark theme with glassmorphism effects and smooth animations
- **Responsive Design**: Fully responsive across all devices (mobile, tablet, desktop)
- **Dynamic Projects Showcase**: Grid layout with live demo and GitHub links
- **Skills Section**: Organized skill categories with proficiency levels
- **Experience Timeline**: Professional experience display
- **Contact Form**: Direct messaging with email notifications
- **SEO Optimized**: Meta tags, Open Graph, and structured data
- **Performance**: Fast page loads with image optimization and lazy loading

### 🛡️ **Admin Dashboard**
- **Secure Authentication**: NextAuth.js with JWT and session management
- **Session Management**: Multi-device logout and token versioning
- **Project Management**: Full CRUD operations with image uploads
- **Skills Management**: Add, edit, delete skills with categories
- **Experience Management**: Timeline creation and editing
- **Message Inbox**: View and manage contact form submissions
- **Analytics Dashboard**: Project click tracking and visitor insights
- **Profile Settings**: Update personal info and change password
- **Real-time Updates**: Instant UI updates on data changes

### 🔐 **Security Features**
- **JWT Authentication**: Secure token-based authentication
- **Token Versioning**: Automatic logout on password change (all devices)
- **Protected Routes**: Middleware-based route protection
- **Role-based Access**: Admin-only dashboard access
- **CSRF Protection**: Built-in security measures
- **Secure Sessions**: HttpOnly cookies with encryption

### 📊 **Analytics & Tracking**
- **Click Analytics**: Track demo and GitHub link clicks
- **Device Detection**: Browser, OS, and device type tracking
- **Geo-location**: Country, city, and region data (Vercel headers)
- **Visitor Insights**: Real-time visitor statistics
- **Referrer Tracking**: Source of traffic analysis

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI, Lucide Icons
- **Forms**: React Hook Form + Zod validation
- **State Management**: React Context + Custom Hooks
- **Animations**: Framer Motion (optional)

### **Backend**
- **Runtime**: Node.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: NextAuth.js v4
- **File Storage**: Cloudinary
- **Email Service**: Nodemailer (SMTP)
- **API**: Next.js API Routes

### **DevOps & Tools**
- **Deployment**: Vercel
- **Version Control**: Git & GitHub
- **Package Manager**: npm/yarn/pnpm
- **Linting**: ESLint
- **Formatting**: Prettier

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- MongoDB database (local or Atlas)
- Cloudinary account
- Email service (Gmail SMTP or SendGrid)

### 1. Clone the repository
```bash
git clone https://github.com/prabhatkumar628/portfolio
cd portfolio
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-min-32-chars

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email (Nodemailer)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587

# Optional: Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 4. Run the development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio.

### 5. Build for production
```bash
npm run build
npm start
```

## 🗂️ Project Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   └── login/              # Login page
│   │   ├── (public)/
│   │   │   ├── page.tsx            # Home page
│   │   │   ├── projects/           # Projects showcase
│   │   │   └── contact-us/         # Contact form
│   │   ├── admin/
│   │   │   ├── dashboard/          # Admin dashboard
│   │   │   ├── projects/           # Project management
│   │   │   ├── skills/             # Skills management
│   │   │   ├── experience/         # Experience management
│   │   │   ├── messages/           # Message inbox
│   │   │   └── profile/            # Admin profile
│   │   └── api/
│   │       ├── auth/               # NextAuth endpoints
│   │       ├── admin/              # Protected admin APIs
│   │       └── public/             # Public APIs
│   ├── components/
│   │   └── ui/                     # Reusable UI components
│   ├── context/                    # React Context providers
│   ├── hooks/                      # Custom React hooks
│   ├── lib/
│   │   ├── dbConnect.ts            # MongoDB connection
│   │   └── cloudinary.ts           # Cloudinary config
│   ├── models/                     # Mongoose schemas
│   ├── schemas/                    # Zod validation schemas
│   └── types/                      # TypeScript types
├── public/
│   ├── icons/                      # Favicon & app icons
│   └── images/                     # Static images
└── .env.local                      # Environment variables
```

## 🔑 Admin Access

### First-time Setup
1. Create an admin user in MongoDB:
```javascript
{
  name: "Admin",
  email: "admin@example.com",
  password: "$2a$10$hashedPasswordHere", // Use bcrypt
  role: "admin",
  tokenVersion: 0
}
```

2. Login at `/login`
3. Default credentials (change after first login):
   - Email: `admin@example.com`
   - Password: Your hashed password

### Admin Routes
- **Dashboard**: `/admin/dashboard`
- **Projects**: `/admin/projects`
- **Skills**: `/admin/skills`
- **Experience**: `/admin/experience`
- **Messages**: `/admin/messages`
- **Profile**: `/admin/profile`

## 🎨 Customization

### Change Theme Colors
Edit `tailwind.config.ts`:
```typescript
theme: {
  extend: {
    colors: {
      purple: { /* your purple shades */ },
      pink: { /* your pink shades */ },
    }
  }
}
```

### Update Personal Info
Edit `src/config/site.ts`:
```typescript
export const siteConfig = {
  name: "Your Name",
  title: "Your Title",
  description: "Your Description",
  // ...
}
```

### Email Templates
Customize email templates in:
- `src/lib/emailTemplates/contactForm.ts`
- `src/lib/emailTemplates/welcomeEmail.ts`

## 📧 Email Configuration

### Gmail Setup
1. Enable 2FA on your Google account
2. Generate App Password: [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Use App Password in `.env.local`

### Other Providers
- **SendGrid**: Add API key
- **Mailgun**: Add API credentials
- **AWS SES**: Configure AWS credentials

## 🗄️ Database Schema

### User Model
```typescript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: "admin" | "user",
  tokenVersion: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Project Model
```typescript
{
  title: String,
  slug: String,
  description: String,
  thumbnail: { url, public_id },
  technologies: [{ name, highlight }],
  liveDemoLink: String,
  githubFrontendLink: String,
  githubBackendLink: String,
  githubMobileLink: String,
  category: Enum,
  featured: Boolean,
  status: Enum,
  clickStats: { /* analytics */ },
  views: Number,
  isPublished: Boolean
}
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/portfolio)

### Environment Setup on Vercel
- Go to Project Settings → Environment Variables
- Add all variables from `.env.local`
- Redeploy

### Custom Domain
1. Add domain in Vercel dashboard
2. Configure DNS records
3. Enable HTTPS (automatic)

## 📈 Performance Optimization

- ✅ **Image Optimization**: Next.js Image component + Cloudinary
- ✅ **Code Splitting**: Automatic route-based splitting
- ✅ **Lazy Loading**: Components and images
- ✅ **Caching**: Static page generation where possible
- ✅ **Compression**: Gzip enabled by default
- ✅ **Minification**: CSS and JS minified in production

## 🔒 Security Best Practices

- ✅ **Environment Variables**: Never commit `.env` files
- ✅ **Password Hashing**: Bcrypt with salt rounds
- ✅ **JWT Secrets**: Strong, random secrets (32+ chars)
- ✅ **HTTPS Only**: Force HTTPS in production
- ✅ **Rate Limiting**: Implement for public APIs
- ✅ **Input Validation**: Zod schemas on all inputs
- ✅ **XSS Protection**: React auto-escapes by default
- ✅ **CSRF Tokens**: Built into NextAuth

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Check MongoDB URI format
mongodb+srv://user:pass@cluster.mongodb.net/dbname

# Whitelist IP in MongoDB Atlas
# Add 0.0.0.0/0 for Vercel deployments
```

### Cloudinary Upload Fails
```bash
# Verify API credentials
# Check upload preset settings
# Ensure folder exists in Cloudinary
```

### Email Not Sending
```bash
# Gmail: Enable "Less secure app access"
# Or use App Password with 2FA enabled
# Check SMTP host and port
```

### Session Issues
```bash
# Clear cookies and cache
# Check NEXTAUTH_SECRET is set
# Verify NEXTAUTH_URL matches deployment URL
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👤 Author

**Your Name**
- Website: [yourwebsite.com](https://yourwebsite.com)
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [MongoDB](https://www.mongodb.com)
- [Cloudinary](https://cloudinary.com)
- [NextAuth.js](https://next-auth.js.org)

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

---

**Made with ❤️ and Next.js**