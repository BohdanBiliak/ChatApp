📦 ChatApp — Full-stack Real-Time Chat Application

Overview

ChatApp is a modern full-stack real-time chat application that allows users to communicate through publicor private chat rooms.
It features secure JWT-based authentication, live messaging using Socket.IO, avatar/image upload via Cloudinary,
and a fully modular client-server architecture.

🔧 Features
Real-time communication with WebSockets
Authentication & Authorization with JWT
Group and private messaging
Avatar/image upload via Cloudinary
State management with Zustand
TailwindCSS + DaisyUI interface

🛠️ Technologies
Frontend (client-app)
React 19 + Vite
Zustand for state management
React Router v7
TailWind CSS & DaisyUI
Axios
Lucide Icons
react-hot-toast for notifications

Backend (server-app)
Node.js + Express
Socket.IO for WebSockets
MongoDB + Mongoose
JWT, bcrypt for authentication
dotenv, cookie-parser
Cloudinary SDK for image uploads

📁 Project Structure
ChatApp/
├── client-app/         # React frontend
├── server-app/         # Express backend + Socket.IO

🚀 Getting Started
1. Install Dependencies
cd client-app && npm install
cd ../server-app && npm install

2. Start Development Servers
cd server-app && npm run dev
cd ../client-app && npm run dev

3. Setup Environment
Create a .env file in server-app/:
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-secret>
CLOUDINARY_CLOUD_NAME=<your-cloud-name>
CLOUDINARY_API_KEY=<your-api-key>
CLOUDINARY_API_SECRET=<your-secret>

📄 Scripts
Client
npm run dev – start development server
npm run build – build for production
npm run preview – preview production
Server
npm run dev – start backend with nodemon
npm start – run backend in production

📦 Deployment
Can be deployed on Vercel (client) and Render/Heroku (server)
