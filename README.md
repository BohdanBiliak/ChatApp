# 📦 ChatApp — Full-stack Real-Time Chat Application

A modern full-stack messaging application that supports **real-time communication**, **user authentication**, **image uploads**, and **modular front/back separation**. Built for scalability, clarity, and ease of use.

---

## ✨ Features

- 🔐 **Secure JWT-based authentication**
- 💬 **Real-time messaging** using Socket.IO
- 👥 **Public and private chat rooms**
- 📸 **Avatar and media upload** via Cloudinary
- 🌐 **Modular monorepo** structure (client/server)
- ⚛️ **State management** via Zustand
- 🎨 Modern UI with **TailwindCSS** + **DaisyUI**
- 🚀 Optimized for deployment on **Vercel + Render**

---

## 🧱 Tech Stack

### 🔹 Frontend (`client-app`)
| Technology         | Purpose                                |
|--------------------|-----------------------------------------|
| React 19           | Component-based UI                     |
| Vite               | Lightning-fast bundler                 |
| Zustand            | State management                       |
| React Router v7    | Client-side routing                    |
| Tailwind CSS       | Utility-first styling                  |
| DaisyUI            | Prebuilt components with Tailwind      |
| Axios              | HTTP client                            |
| Lucide             | Icon library                           |
| react-hot-toast    | Notifications                          |

### 🔸 Backend (`server-app`)
| Technology         | Purpose                                |
|--------------------|-----------------------------------------|
| Node.js + Express  | Backend & API handling                 |
| Socket.IO          | Real-time WebSocket communication      |
| MongoDB + Mongoose | NoSQL database with schema validation  |
| JWT + bcrypt       | Auth & password hashing                |
| dotenv             | Environment config                     |
| cookie-parser      | Cookie session handling                |
| Cloudinary         | Media upload and CDN                   |

---

## ⚙️ Getting Started

### 🧩 Prerequisites
- Node.js ≥ 18
- MongoDB instance (local or Atlas)
- Cloudinary account for media upload

### 🔧 1. Install Dependencies
```bash
cd client-app && npm install
cd ../server-app && npm install
🚀 2. Start Development Servers

# Backend
cd server-app && npm run dev

# Frontend (in another terminal)
cd ../client-app && npm run dev
🔐 Environment Configuration
Create a .env file inside /server-app:

MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/chatapp
JWT_SECRET=supersecretkey
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-secret
📜 Scripts
📦 Client
Script	Description
npm run dev	Run dev server (Vite)
npm run build	Production build
npm run preview	Preview production build

🔌 Server
Script	Description
npm run dev	Start backend with nodemon
npm start	Start backend in production mode

☁️ Deployment
🔹 Frontend (Vercel)
Connect to client-app/ as the root

Use npm run build as the build command

Output dir: dist

🔸 Backend (Render / Heroku)
Connect server-app/

Add environment variables in dashboard

Start command: npm run start
