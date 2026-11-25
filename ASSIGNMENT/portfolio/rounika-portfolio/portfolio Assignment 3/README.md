# Rounika Tiwari — Full Stack Developer Portfolio

A production-ready personal developer portfolio built for **Rounika Tiwari**, Computer Science and Engineering student at ABES Engineering College. Crafted with a minimal, warm editorial aesthetic (`#FAF9F7`), charcoal typography, serif headings, Tailwind CSS, Framer Motion animations, and a secure Express.js contact API.

---

## 🌟 Key Features

- **Design Philosophy**: Minimal and editorial design with warm off-white background (`#FAF9F7`), charcoal typography, subtle secondary tones, and serif headings (`Playfair Display`) paired with clean sans-serif text (`Plus Jakarta Sans`).
- **Responsive Navigation**: Sticky header with backdrop blur on scroll, smooth section navigation, mobile slide-over menu, and one-click resume download CTA.
- **Hero Section**: Authentic introduction, official professional headline (*"Computer Science Student & Aspiring Full Stack Developer"*), call-to-actions, social handles, and editorial monogram art.
- **About Section**: Comprehensive narrative highlighting academic journey at ABES Engineering College, technical growth in Python, C++, HTML, CSS, JavaScript, React, Node.js, and involvement in problem-solving and entrepreneurship.
- **Academic Achievements**: Clean statistics showcasing First Year SGPA (9.96/10), Semester 1 (9.91), Semester 2 (10.00), Class XII (95.5%), and Class X (97%).
- **Technical Skills**: Structured categories without fabricated ratings: Programming Languages, Web Technologies, Frameworks & Runtime, and Core Competencies.
- **Projects Showcase**: Interactive browser mockup of the **Amazon Clone** (HTML, CSS, JavaScript) highlighting structured navigation, product sections, shopping layouts, responsive styling, and GitHub repository links. Extensible project data array.
- **Experience & Extracurriculars**: Professional timeline detailing contributions to **E-Cell, ABES Engineering College** (Events Team Member, EUREKA | IIT Bombay NEC, participant coordination).
- **Hackathons & Competitions**: Participation highlights for **Decode SIH** and **Smart India Hackathon** (internal selection rounds).
- **Certifications**: NPTEL (Artificial Intelligence: Knowledge Representation and Reasoning), HackerRank (Problem Solving), and Web Development (HTML, CSS & JavaScript).
- **Contact API & Form**: Validated contact form connected to the Express backend with rate limiting, input sanitization, Nodemailer SMTP transport, and graceful fallback notices when SMTP credentials are pending.
- **SEO & Accessibility**: Complete Open Graph metadata, semantic HTML5 landmarks, descriptive alt tags, and full `prefers-reduced-motion` support.

---

## 🏗️ Project Architecture

```text
rounika-portfolio/
├── client/
│   ├── public/
│   │   └── rounika-tiwari-resume.pdf       # Verified downloadable resume
│   ├── src/
│   │   ├── components/
│   │   │   ├── About.jsx                   # Academic story & core strengths
│   │   │   ├── Contact.jsx                 # Validated contact form & direct channels
│   │   │   ├── Education.jsx               # SGPA, Semester & Board statistics cards
│   │   │   ├── Experience.jsx              # E-Cell timeline, Hackathons & Certifications
│   │   │   ├── Footer.jsx                  # Footer with back-to-top and copyright
│   │   │   ├── Hero.jsx                    # Hero section with headline and CTAs
│   │   │   ├── Navbar.jsx                  # Sticky responsive navbar & mobile drawer
│   │   │   ├── Projects.jsx                # Extensible project showcase with Amazon Clone
│   │   │   ├── SectionHeading.jsx          # Reusable section title component
│   │   │   └── Skills.jsx                  # Categorized technical toolkit
│   │   ├── App.jsx                         # Main application layout
│   │   ├── main.jsx                        # React entry point
│   │   └── styles.css                      # Tailwind CSS v4 design tokens & theme setup
│   ├── index.html                          # Semantic HTML shell with fonts & SEO meta
│   ├── package.json                        # Client dependencies & scripts
│   ├── vite.config.js                      # Vite config with @tailwindcss/vite & API proxy
│   └── .env.example                        # Client environment variable template
├── server/
│   ├── src/
│   │   ├── middleware/
│   │   │   └── validateContact.js          # Input validation & sanitization
│   │   ├── routes/
│   │   │   └── contact.js                  # POST /api/contact handler with Nodemailer
│   │   └── index.js                        # Express app, Helmet, CORS, Rate Limiting
│   ├── test-contact-api.mjs                # Automated backend integration test suite
│   ├── .env.example                        # Server environment variable template
│   ├── .env                                # Local server environment configuration
│   └── package.json                        # Server dependencies & scripts
├── package.json                            # Monorepo workspaces & concurrent scripts
└── README.md                               # Project documentation
```

---

## 🛠️ Technology Stack

### Frontend
- **React.js (v18)** with **Vite (v6)**
- **JavaScript (JSX)**
- **Tailwind CSS (v4)** with `@tailwindcss/vite`
- **Framer Motion** for smooth scroll reveals and lightweight animations
- **Lucide React** for clean minimalist iconography
- **Google Fonts**: *Playfair Display* (Editorial Serif) & *Plus Jakarta Sans* (Body Sans)

### Backend
- **Node.js** & **Express.js**
- **Nodemailer** for SMTP email delivery
- **express-rate-limit** (5 requests per 15 minutes per IP on contact route)
- **Helmet** for HTTP security headers
- **CORS** configured for local development and client origin
- **No Database**: Pure API service adhering strictly to constraints (no MongoDB, MySQL, Firebase, etc.)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm (v9.0.0 or higher)

### 1. Install Dependencies
Run from the root directory to install both root and workspace dependencies:
```bash
npm install
```

### 2. Configure Environment Variables

**Backend (`server/.env`)**:
Copy the example file:
```bash
cp server/.env.example server/.env
```
Default configuration:
```env
PORT=5001
CLIENT_URL=http://localhost:5173

# Optional: Add SMTP credentials to deliver emails to rouni.tiwari2013@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

CONTACT_EMAIL=rouni.tiwari2013@gmail.com
CONTACT_FROM=Portfolio Contact <no-reply@rounikatiwari.dev>
```
> **Note on SMTP**: If SMTP credentials are empty or omitted, the API gracefully responds with HTTP 503 and a clear notice. The frontend contact form informs the user and provides a one-click button to open a pre-filled message directly in their default email client.

**Frontend (`client/.env`)**:
In development, Vite automatically proxies `/api` requests to the local backend port. No frontend `.env` is required unless deploying to separate domains.

### 3. Run the Development Servers
From the root directory, start both the client and server concurrently:
```bash
npm run dev
```
Or start them individually:
```bash
# Start backend API (http://localhost:5001)
npm run dev -w server

# Start frontend Vite server (http://localhost:5173)
npm run dev -w client
```

### 4. Build for Production
To build the production-ready frontend bundle:
```bash
npm run build
```

---

## 📡 API Endpoints

### 1. Health Check
- **Endpoint**: `GET /api/health`
- **Description**: Returns server status and uptime.
- **Response**:
```json
{
  "status": "ok",
  "service": "rounika-portfolio-api",
  "uptime": 120,
  "timestamp": "2026-11-24T21:00:00.000Z"
}
```

### 2. Contact Submission
- **Endpoint**: `POST /api/contact`
- **Rate Limit**: 5 submissions per 15 minutes per IP.
- **Request Body**:
```json
{
  "name": "Alex Mercer",
  "email": "alex@example.com",
  "subject": "Internship Inquiry",
  "message": "Hi Rounika, we would like to interview you for a developer role."
}
```
- **Validation**:
  - `name`: string, required, max 80 characters.
  - `email`: string, required, valid email format regex, max 120 characters.
  - `subject`: string, required, max 150 characters.
  - `message`: string, required, max 3000 characters.
- **Responses**:
  - `200 OK`: Message sent via Nodemailer.
  - `400 Bad Request`: Validation failure (empty field, invalid email format, or exceeded length).
  - `429 Too Many Requests`: Rate limit exceeded.
  - `503 Service Unavailable`: SMTP credentials unconfigured (graceful notice).

---

## 🧪 Testing

Run the automated backend test suite:
```bash
node server/test-contact-api.mjs
```
The test suite validates:
- Health check returns 200 and proper payload.
- Empty fields trigger 400 with descriptive error.
- Invalid email addresses are rejected with 400.
- Unconfigured SMTP states return 503 without crashing.
- Undefined routes return structured 404 JSON.

---

## 📄 License
This project is personal portfolio code for Rounika Tiwari. All rights reserved.
