# DeveloperJoy — Personal Portfolio

A modern, responsive, and professional developer portfolio built with Next.js, TypeScript, and Tailwind CSS. Showcasing my skills, services, projects, and experience as a WordPress Developer and Full-Stack Developer.

## 🚀 Live Website

[Visit DeveloperJoy](https://developer-joy.vercel.app/)

## ✨ Features

- Modern and responsive portfolio design
- Dark-themed user interface
- Responsive navigation with mobile menu
- Interactive animations and visual effects
- Professional hero section
- About Me and skills section
- Technology stack showcase
- Services and expertise section
- Portfolio and project showcase
- Client testimonials
- Frequently Asked Questions (FAQ)
- Contact form with email integration
- Gmail SMTP integration using Nodemailer
- Form validation and submission status
- SEO-friendly structure

## 🛠️ Tech Stack

**Frontend**
- Next.js
- React
- TypeScript
- Tailwind CSS
- Lucide React

**Backend & Email**
- Next.js API Routes
- Node.js
- Nodemailer
- Gmail SMTP

**Development Tools**
- Git
- GitHub
- VS Code
- npm

## 📁 Project Structure

```text
developerjoy/
├── public/
│   ├── images/
│   └── icons/
│
├── src/
│   └── app/
│       ├── api/
│       │   └── contact/
│       │       └── route.ts
│       │
│       ├── contact/
│       │   └── page.tsx
│       │
│       ├── layout.tsx
│       ├── page.tsx
│       └── globals.css
│
├── .env.local
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
```

### 2. Navigate to the Project

```bash
cd developerjoy
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory.

```env
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-google-app-password
```

**Important:** Use a Google App Password instead of your regular Gmail password.

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📧 Contact Form Integration

The contact form uses Next.js API Routes and Nodemailer to send messages through Gmail SMTP.

**API Endpoint:**

```text
POST /api/contact
```

**Form Fields:**
- Name
- Email Address
- Subject
- Service
- Project Details

**Features:**
- Required field validation
- Email format validation
- Gmail SMTP authentication
- Automatic email delivery
- Reply-to visitor email address
- Success and error notifications

## 🔐 Environment Variables

| Variable | Description |
|---|---|
| `EMAIL_USER` | Gmail account used to send emails |
| `EMAIL_PASS` | Google App Password |

Never commit `.env.local` or expose your email credentials in public repositories.

## 📱 Responsive Design

Designed to provide a consistent experience across:

- Desktop computers
- Laptops
- Tablets
- Mobile devices

## 👨‍💻 About Me

I'm a WordPress Developer specializing in Elementor, WooCommerce, custom WordPress development, website redesign, malware removal, and website optimization.

I also work with modern web technologies including React, Next.js, TypeScript, and Tailwind CSS.

## 📬 Contact

- **Email:** jewelsweb7@gmail.com
- **Phone:** +8801610186886
- **Location:** Noakhali, Bangladesh
- **Portfolio:** [developer-joy.vercel.app](https://developer-joy.vercel.app/)

## 📄 License

This project is created for my personal portfolio and professional showcase.
