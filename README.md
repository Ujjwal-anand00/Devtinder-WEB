
![Made with MERN](https://img.shields.io/badge/Made%20with-MERN-green?style=for-the-badge&logo=mongodb&logoColor=white)    
![Live Demo](https://img.shields.io/badge/Live%20Demo-Available-success?style=for-the-badge&logo=vercel&logoColor=white)  

# GitHookUp

GitHookUp is a real-time developer networking platform designed to connect programmers, enable instant chats, and foster collaboration. Built using the **MERN stack** and **Socket.IO**, it offers a smooth and responsive user experience across devices.

---

## 🚀 Features

- **Real-Time Chat** – Instant messaging powered by Socket.IO.
- **Developer Profiles** – Showcase skills, bio, and projects.
- **Search & Connect** – Find and connect with other developers.
- **Responsive UI** – Optimized for both desktop and mobile.
- **Secure Authentication** – User login & registration with JWT.

---

## 🛠️ Tech Stack

### **Frontend**
- React.js
- TailwindCSS / DaisyUI
- Axios

### **Backend**
- Node.js
- Express.js
- MongoDB
- Socket.IO

### **Deployment & Tools**
- Nginx
- PM2
- AWS EC2 (Ubuntu)
- Git & GitHub

---

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/githookup.git
   cd githookup
   ```
2.Install dependencies
  ```bash
  npm install
  ```
3.⚙️Create Environment Variables
  ```env
  PORT=5000
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  ```
4. ▶️ Running the Project Locally Backend + frontend
   ```bash
   npm run dev
   ```
5. 🌐 Deployment
   The project deployed using the following setup:
    Backend – Hosted on AWS EC2 with Nginx as a reverse proxy and PM2 for process management.
    Frontend – Deployed with Nginx reverse proxy pointing to the React build.
    Domain – Configured via DNS provider.
    SSL – Secured using Let’s Encrypt (Certbot).


```
👤 Author
Ujjwal Anand
```

  
