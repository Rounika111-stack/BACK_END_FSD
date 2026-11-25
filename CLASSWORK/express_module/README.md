# MERN File Search Engine Application

A full-stack file search and exploration system built using Express.js (Node.js) and React (Vite). It provides deep recursive file discovery across nested directories with real-time keyword matching, extension filtering, instant document and image preview, and secure streaming downloads.

---

## 📁 Project Structure

```text
express module/
│
├── files/                       # Searchable storage directory
│   ├── documents/               # Nested documents (report.pdf, project-report.docx, notes.txt)
│   ├── images/                  # Nested image assets (presentation.jpg, project.png, architecture.svg)
│   ├── assignments/             # Academic assignments (report-final.pdf, fsd-assignment-1.pdf)
│   └── certificates/            # Certificate PDFs (css, html, javascript certificates)
│
├── backend/                     # Express 5 / Node.js API Server
│   ├── config/
│   │   └── env.js               # Environment config (PORT, FILE_DIRECTORY)
│   ├── controllers/
│   │   └── fileController.js    # Search, preview, download, stats handlers
│   ├── middleware/
│   │   └── errorHandler.js      # Centralized error & 404 middleware
│   ├── routes/
│   │   └── fileRoutes.js        # /api/search, /api/files, /api/stats, /api/download, /api/preview
│   ├── services/
│   │   └── fileService.js       # Recursive scanner, search filter, path sanitization
│   ├── .env                     # PORT=5000, FILE_DIRECTORY=../files
│   ├── package.json
│   └── server.js
│
└── Frontend/
    └── module/                  # React 19 + Vite Frontend
        ├── src/
        │   ├── api/             # API client services
        │   ├── components/      # UI Components (Navbar, SearchBar, FilterBar, FileCard, PreviewModal)
        │   ├── utils/           # Highlight matching substrings
        │   ├── App.jsx          # Search state coordinator
        │   ├── App.css          # Design system, glassmorphism, responsive grid
        │   └── main.jsx
        ├── index.html
        └── vite.config.js       # Vite proxy to backend port 5000
```

---

## ⚡ Quick Start Guide

### 1. Start Backend Server

```bash
cd backend
npm start
# or npm run dev
```

* API will run at: `http://localhost:5000`
* Accessible search directory: `../files/` (configured in `.env`)

### 2. Start Frontend Application

```bash
cd Frontend/module
npm run dev
```

* Frontend will run at: `http://localhost:5173`

---

## 🔍 Search Capabilities

| Search Query | Matches Found |
| :--- | :--- |
| `report` | `report.pdf`, `project-report.docx`, `report-final.pdf` |
| `certificate` | `css certtificate.pdf`, `html certificate.pdf`, `javascript certificate.pdf` |
| `.pdf` or `pdf` | All PDF documents across all subfolders |
| `assignment` | All files in `assignments/` or matching assignment keyword |
| `project` | `project.png`, `project-report.docx` |

---

## 🛡️ Security & Directory Traversal Protection

* Resolves paths via `path.resolve` and verifies they strictly start with the canonical `files/` root.
* Automatically rejects any `../`, `%2e%2e`, or null-byte traversal attempts with HTTP `403 Forbidden`.

---

## 📡 API Endpoints

- `GET /api/search?q={query}&category={category}&ext={ext}&folder={folder}&sortBy={sort}`
- `GET /api/files` - List all indexed files
- `GET /api/files/stats` - Directory overview metrics & category counts
- `GET /api/files/preview?path={relativePath}` - Inline preview (PDF/Image/Text)
- `GET /api/files/download?path={relativePath}` - Attachment download
- `GET /api/health` - Server health status
