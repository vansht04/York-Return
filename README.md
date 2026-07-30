<div align="center">

# 🔍 YorkReturn

### **The Central Hub for Lost & Found Items at York University**
*Ditch paper flyers and messy group chats. Find what’s yours in real-time.*

<br/>

[![Live Demo](https://img.shields.io/badge/🚀_Live_App-yorkreturn.vercel.app-2EA44F?style=for-the-badge&logo=vercel&logoColor=white)](https://yorkreturn.vercel.app/)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase_Firestore-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

---

</div>

<br/>

## 📌 Table of Contents
1. [🌌 Overview & Problem Statement](#-overview--problem-statement)
2. [✨ Key Features](#-key-features)
3. [🎯 Live Demo Walkthrough Guide (For Presentations)](#-live-demo-walkthrough-guide-for-presentations)
4. [🛠️ Tech Stack & Dependencies](#%EF%B8%8F-tech-stack--dependencies)
5. [📂 Project Structure](#-project-structure)
6. [🚀 Quick Start & Local Setup](#-quick-start--local-setup)
7. [🔐 Database & Security Architecture](#-database--security-architecture)
8. [🌐 Deployment (Vercel Integration)](#-deployment-vercel-integration)
9. [🤝 Contributing & Community](#-contributing--community)
10. [📄 License & Legal](#-license--legal)

---

## 🌌 Overview & Problem Statement

### **The Problem**
Every day on the York University campus, students lose valuable items—laptops, student IDs, keys, AirPods, and jackets. Traditionally, finding them involved:
- Taping paper flyers on bulletin boards across Keele and Glendon campuses.
- Posting in unorganized Reddit threads, Discord channels, or Instagram stories.
- Walking aimlessly to multiple lost-and-found security desks.

### **The Solution: YorkReturn**
**YorkReturn** brings the campus lost-and-found experience into the modern web era. It is a unified, real-time, geolocated portal designed specifically for York University students, faculty, and staff. With live Firestore synchronization, interactive Leaflet campus maps, and structured handover safety guidelines, YorkReturn dramatically increases recovery speed while prioritizing campus safety.

---

## ✨ Key Features

### 📍 1. Interactive Geolocation Campus Map
* **Precise Pins**: View exact or approximate locations where items were lost or found across York University (Keele & Glendon campuses).
* **Live Filtering**: Instantly toggle map markers between `Lost` 🔴 and `Found` 🟢 items.
* **Popup Details**: Click any marker on the map to preview item metadata, status, date, and quick action links.

### 🔍 2. Real-Time Directory & Search Engine
* **Multifaceted Filters**: Filter listings by **Category** (*Electronics, Student ID, Keys, Clothing, Books, Accessories, Other*), **Item Type** (*Lost vs. Found*), and **Status** (*Active vs. Resolved*).
* **Instant Keyword Search**: Search titles, descriptions, and location names in real-time.
* **Item Cards**: Rich visual cards featuring tags, handover preferences, formatted timestamps, and resolution badges.

### 📝 3. Instant Item Reporting
* **Interactive Coordinate Picker**: Users can click directly on the campus map within the modal to set exact pin location coordinates.
* **Handover Preferences**: Report lost/found items with designated safety preferences (`Direct Meetup`, `Campus Security Drop-off`, or `Both`).
* **Instant Database Sync**: Reports publish immediately to Cloud Firestore without needing page reloads.

### 🛡️ 4. Safety First & Campus Security Integration
* **Dedicated Safety Guidelines**: Educates students on safe meetup locations on campus (e.g., Scott Library, Vari Hall, Bennett Centre, York Lanes).
* **Campus Security Direct Contact**: Outlines standard protocols for turning items over to York University Security Services.

### 💬 5. Community Proof & Feedback Loop
* **Interactive Reviews & Ratings**: Live feedback component allowing students to post reviews and share recovery success stories.
* **Testimonial Showcase**: Highlights real campus recovery stories to foster trust.

---

## 🎯 Live Demo Walkthrough Guide (For Presentations)

When presenting or demoing YorkReturn to an audience or judge panel, follow this recommended sequence:

| Step | Section / Feature | What to Demonstrate & Mention |
| :---: | :--- | :--- |
| **1** | **Hero & Home (`/`)** | Highlight the tagline, live stats, and instant primary CTA buttons (`Browse Items` & `Report an Item`). |
| **2** | **Interactive Map (`/map`)** | Zoom in on Keele campus. Click a pin to open the popup. Toggle between *Lost* and *Found* layers to showcase geographic density. |
| **3** | **Directory (`/browse`)** | Show real-time search: type *"Student ID"* or *"AirPods"*. Toggle categories to show reactive filtering. |
| **4** | **Item Reporting Modal** | Click **"Report Item"**. Select `Found`, pick a location on campus, choose `Security Drop-off`, and submit. Show it appear live! |
| **5** | **Safety & Guidelines (`/safety`)** | Briefly show the safety protocol page that guides students on safe handovers and official campus security offices. |
| **6** | **Community Feedback (`/reviews`)** | Showcase community reviews and star ratings left by students who recovered their items. |

---

## 🛠️ Tech Stack & Dependencies

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND LAYER                       │
│   React 19  │  Vite 6  │  TypeScript 5  │  Tailwind CSS 4 │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│                 INTERACTIVE COMPONENTS                  │
│    React Leaflet (Maps)  │  Lucide React (Icons)        │
│    Motion (Animations)   │  React Router v7 (Routing)   │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│                   BACKEND & DATABASE                    │
│      Firebase Cloud Firestore  │  Firebase Auth         │
└─────────────────────────────────────────────────────────┘
```

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | `React 19`, `TypeScript` | Component-based UI with strict type checking |
| **Build Tool** | `Vite 6` | Fast development server & optimized production bundler |
| **Styling** | `Tailwind CSS 4`, `@tailwindcss/vite` | Modern utility-first styling with responsive design |
| **Mapping** | `Leaflet`, `react-leaflet` | Geospatial canvas, custom markers, and tile layers |
| **Database** | `Firebase Cloud Firestore` | NoSQL real-time document sync and persistence |
| **Animations** | `motion` | Smooth page transitions and modal enter/exit effects |
| **Icons** | `lucide-react` | Clean, accessible vector icons |
| **Deployment** | `Vercel` | Serverless static hosting with edge routing |

---

## 📂 Project Structure

```
yorkreturn/
├── src/
│   ├── components/               # Modular UI Components
│   │   ├── CampusMap.tsx         # Leaflet map container & interactive pins
│   │   ├── CookieConsent.tsx     # Privacy & cookie notification banner
│   │   ├── ItemCard.tsx          # Card component for lost/found items
│   │   ├── Navigation.tsx        # Responsive navbar with mobile menu
│   │   ├── ReportModal.tsx       # New item submission modal with location picker
│   │   └── ReviewsSection.tsx    # Live student review & rating feed
│   ├── lib/
│   │   └── firebase.ts           # Firebase app & Firestore database initialization
│   ├── pages/                    # Main Route Views
│   │   ├── Browse.tsx            # Full filterable item directory
│   │   ├── Help.tsx              # Help center & FAQ page
│   │   ├── Home.tsx              # Landing page with hero, search, & features
│   │   ├── MapView.tsx           # Fullscreen interactive map page
│   │   ├── Privacy.tsx           # Privacy policy & data protection terms
│   │   ├── Safety.tsx            # Handover safety protocols & campus security info
│   │   ├── Team.tsx              # Creator & project background
│   │   └── Testimonials.tsx      # Community success stories
│   ├── App.tsx                   # Main layout structure & router configuration
│   ├── index.css                 # Global styles & Tailwind CSS imports
│   ├── main.tsx                  # React DOM root entry
│   └── types.ts                  # Shared TypeScript interfaces & types
├── .env.example                  # Environment variable reference template
├── .gitignore                    # Git ignored files configuration
├── LICENSE                       # MIT Open Source License
├── README.md                     # Project documentation & demo guide
├── firestore.rules               # Firestore security & permission rules
├── index.html                    # Main HTML entry point (with emoji favicon & title)
├── package-lock.json             # Locked dependency versions
├── package.json                  # Project dependencies & npm scripts
├── tsconfig.json                 # TypeScript compiler configuration
├── vercel.json                   # Vercel SPA routing rewrite configuration
└── vite.config.ts                # Vite build options & plugins
```

---

## 🚀 Quick Start & Local Setup

### **1. Prerequisites**
Ensure you have the following installed on your machine:
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher (or `yarn` / `pnpm`)

### **2. Clone the Repository**
```bash
git clone https://github.com/your-username/yorkreturn.git
cd yorkreturn
```

### **3. Install Dependencies**
```bash
npm install
```

### **4. Environment Variables Setup**
Create a `.env` file in the root directory by copying `.env.example`:

```bash
cp .env.example .env
```

Populate `.env` with your Firebase credentials:
```ini
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
VITE_FIREBASE_DATABASE_ID=(default)
```

### **5. Run Development Server**
```bash
npm run dev
```
Navigate to `http://localhost:3000` in your browser.

---

## 🔐 Database & Security Architecture

### **Firestore Security Model (`firestore.rules`)**
YorkReturn enforces data integrity and protects against malicious modifications using Firestore Security Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Items collection
    match /items/{itemId} {
      allow read: if true; // Public read access for community search
      allow create: if true; // Community submissions allowed
      allow update, delete: if request.auth != null; // Protected modifications
    }
    
    // Reviews collection
    match /reviews/{reviewId} {
      allow read: if true;
      allow create: if true;
    }
  }
}
```

---

## 🌐 Deployment (Vercel Integration)

YorkReturn is optimized for single-command deployment on **Vercel**:

1. **Push your code to GitHub**.
2. Go to the [Vercel Dashboard](https://vercel.com/) and click **"Add New Project"**.
3. Import your `yorkreturn` repository.
4. Set the build settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add your Environment Variables (`VITE_FIREBASE_*`) in **Project Settings > Environment Variables**.
6. Click **Deploy**.

> Note: The included `vercel.json` file automatically handles single-page application (SPA) client-side routing rewrites so navigating directly to routes like `/browse` or `/map` will work seamlessly without 404 errors.

---

## 🤝 Contributing & Community

Contributions, issues, and feature requests are welcome!
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git checkout -b feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License & Legal

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

> **Disclaimer**: *YorkReturn is an independent open-source project developed for the York University campus community. It is not officially operated by York University Administration or York Security Services, though it incorporates recommended campus drop-off safety guidelines.*

---
