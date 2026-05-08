# 🕵️ Incognito

> **Anonymous video conversations with strangers worldwide. No sign-up. No identity. Just pure connection.**

Incognito is a modern, high-performance web application that allows users to instantly connect via random video chat, akin to Omegle. Built with Next.js and real-time WebSockets, it leverages ZegoCloud for seamless, low-latency video communication.

---

## ✨ Features

- **Anonymous Matching**: Instantly pair up with random users without creating an account.
- **High-Quality Video Chat**: Powered by ZegoCloud for reliable peer-to-peer video streaming.
- **Real-Time WebSockets**: Fast and efficient matching system built on Socket.io.
- **Premium UI/UX**: A dark, glassmorphic design language with smooth animations.
- **Skip & Re-roll**: Easily move to the "Next Person" with a single click.

---

## 🛠️ Tech Stack

### Client (Frontend)
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Video Infrastructure**: [ZegoCloud UIKit Prebuilt](https://www.zegocloud.com/)
- **Socket Client**: `socket.io-client`

### Server (Backend)
- **Runtime**: [Node.js](https://nodejs.org/)
- **WebSockets**: [Socket.io](https://socket.io/)
- **Other**: Express, UUID

---

## 🚀 Getting Started

To run this project locally, you need to set up both the Client and the Socket server.

### 1. Prerequisites
- Node.js installed on your machine.
- A [ZegoCloud](https://console.zegocloud.com/) account for video chat API keys.

### 2. Setup the Socket Server
Navigate to the `socket` directory:
```bash
cd socket
npm install
```
Create a `.env` file in the `socket` directory:
```env
PORT=8000
```
Start the server:
```bash
npm run dev
```

### 3. Setup the Client
Navigate to the `client` directory:
```bash
cd client
npm install
```
Create a `.env.local` file in the `client` directory and add your ZegoCloud credentials and Socket URL:
```env
NEXT_PUBLIC_SOCKET_URL=http://localhost:8000
NEXT_PUBLIC_ZEGO_APP_ID=your_zego_app_id
NEXT_PUBLIC_ZEGO_SERVER_SECRET=your_zego_server_secret
```
Start the Next.js development server:
```bash
npm run dev
```

The application should now be running on `http://localhost:3000`.

---

## 🌐 Production Deployment

### Important Note for Production
When deploying to production (e.g., Vercel), ensure that your `NEXT_PUBLIC_SOCKET_URL` points to your deployed WebSocket server URL (e.g., `wss://your-socket-server.onrender.com`), **not** `localhost`. Attempting to connect to `localhost` in a production environment will result in connection errors.

1. Deploy the `socket` directory to a platform that supports WebSockets (like Render, Railway, or Heroku).
2. Deploy the `client` directory to Vercel.
3. Update the environment variables in Vercel to reflect the production ZegoCloud credentials and the live WebSocket server URL.

---

## 🎨 Design

The user interface was crafted to feel premium and immersive. It uses a dynamic dark theme, subtle radial gradients for depth, and noise textures to create a highly polished visual aesthetic.

---

<div align="center">
  <p>Made with love by Aaditya</p>
</div>
