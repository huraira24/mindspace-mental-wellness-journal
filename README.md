# 🌿 MindSpace — Mental Wellness Journal

MindSpace is a web-based mental wellness journal that provides a private space to **journal thoughts, track moods, and receive AI-powered reflections**.

## ✨ Features

* 🔐 **Firebase Authentication** — Secure login and signup with protected routes.
* 📝 **Personal Journal** — Create, view, and delete journal entries.
* 🤖 **AI Journal Insights** — Gemini AI analyzes journal entries for emotions, key themes, gentle reflections, and wellness suggestions.
* 😊 **Mood Tracker** — Record and manage daily moods.
* 📊 **Mood Visualization** — View mood patterns over time using Recharts.
* ☁️ **Firestore Database** — Stores user-specific journal and mood data securely.
* 📱 **Responsive UI** — Works across desktop and mobile devices.

> **Note:** MindSpace is a wellness and self-reflection tool and does not provide medical diagnosis or professional medical advice.

## 🛠️ Tech Stack

**Frontend:** React.js, JavaScript, HTML, CSS, React Router, Recharts
**Backend:** Node.js, Express.js
**Database & Auth:** Firebase Authentication, Firestore
**AI:** Google Gemini API
**Tools:** Vite, Git, GitHub, VS Code

## 🏗️ Project Structure

```text
mindspace-mental-wellness-journal/
├── server/          # Express backend & Gemini integration
├── src/
│   ├── components/  # Navbar, Footer, ProtectedRoute
│   ├── pages/       # Home, Journal, Mood Tracker, Auth, About
│   ├── firebase.js  # Firebase configuration
│   └── App.jsx
├── .gitignore
├── package.json
└── README.md
```

## ⚙️ Run Locally

```bash
git clone https://github.com/huraira24/mindspace-mental-wellness-journal.git
cd mindspace-mental-wellness-journal
npm install
npm run dev
```

For the backend:

```bash
cd server
npm install
node server.js
```

Create `server/.env` and add:

```text
GEMINI_API_KEY=your_api_key
```

**Never commit API keys to GitHub.**

## 📸 Screenshots

*Add screenshots of the Home, Journal, AI Insights, and Mood Tracker pages here.*

## 🚀 Future Enhancements

* Calendar-based journal
* Advanced mood analytics
* Dark mode
* Voice journaling
* Personalized AI insights

---

**Built with React, Firebase, Express.js, Gemini AI, and Recharts. 🌿**
