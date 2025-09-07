<h1 align="center">🌾 Agro-Med Backend</h1>

<p align="center">
  <b>AI-powered crop disease detection system</b><br>
  Backend service built with Node.js, Express, PostgreSQL, and Cloudinary 🚀
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-22.x-green?style=for-the-badge&logo=node.js" />
<img src="https://img.shields.io/badge/Express.js-Backend-black?style=for-the-badge&logo=express" />
<img src="https://img.shields.io/badge/SQLite-Database-blue?style=for-the-badge&logo=sqlite&logoColor=white" />
<img src="https://img.shields.io/badge/Cloudinary-Image%20Storage-lightblue?style=for-the-badge&logo=cloudinary" />
<img src="https://img.shields.io/badge/Deployed%20on-Render-purple?style=for-the-badge&logo=render" />
</p>

---

<h2>⚙️ Tech Stack</h2>

<ul>
  <li><b>Node.js + Express.js</b> — Backend framework</li>
  <li><b>SQLIte</b> — Database</li>
  <li><b>Cloudinary</b> — Image storage</li>
  <li><b>Axios</b> — ML API calls</li>
  <li><b>JWT</b> — Authentication</li>
  <li><b>Render</b> — Deployment</li>
</ul>

---

<h2>📂 Project Structure</h2>

<pre>
AgroMed-Backend/
├── .vscode/                  # Editor settings
├── config/                   # Database & app config
├── controllers/              # Route handlers
│   ├── authController.js
│   ├── feedbackController.js
│   ├── historyController.js
│   ├── predictController.js
│   └── uploadController.js
├── models/                   # Sequelize models
│   ├── User.js
│   ├── Image.js
│   ├── Prediction.js
│   └── Feedback.js
├── routes/                   # API routes
│   ├── auth.js
│   ├── predict.js
│   ├── upload.js
│   ├── history.js
│   └── feedback.js
├── .env                      # Environment variables
├── .gitignore
├── data.json                 # Crop disease remedies & prevention
├── index.js                  # App entry point
├── package.json
├── package-lock.json
└── data.json          # Additional remedies/preventions
</pre>

---

<h2>🚀 Setup & Installation</h2>

<ol>
  <li>Clone the repository:</li>

  <pre><code>git clone https://github.com/infinitepush/AgroMed-Backend
cd crop-disease-backend</code></pre>

  <li>Install dependencies:</li>

  <pre><code>npm install</code></pre>

  <li>Create a <code>.env</code> file:</li>

  <pre><code>PORT=5000
DATABASE_URL=postgresql://username:password@host:5432/dbname
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret</code></pre>

  <li>Run migrations (if using Sequelize):</li>

  <pre><code>npx sequelize-cli db:migrate</code></pre>

  <li>Start the server:</li>

  <pre><code>npm start</code></pre>
</ol>

---

<h2>🔑 API Endpoints</h2>

<h3>Authentication</h3>
<ul>
  <li><code>POST /auth/signup</code> → Register a new user</li>
  <li><code>POST /auth/signin</code> → Login & get JWT</li>
  <li><code>GET /auth/profile</code> → Get user profile (JWT required)</li>
</ul>

<h3>Prediction</h3>
<ul>
  <li><code>POST /upload</code> → Upload an image</li>
  <li><code>POST /predict/:imageId</code> → Get prediction + suggestions</li>
  <li><code>GET /history</code> → Get user history</li>
  <li><code>POST /feedback</code> → Submit feedback</li>
</ul>

---

<h2>🧠 Prediction Flow</h2>

<ol>
  <li>User uploads crop image → <code>/upload</code></li>
  <li>Backend stores image in <b>Cloudinary</b></li>
  <li>Image URL sent to <b>ML API</b> (<code>/predict/url</code>)</li>
  <li>ML API returns <code>{ crop, disease, confidence }</code></li>
  <li>Backend adds <b>remedies & prevention</b> from <code>data.json</code></li>
  <li>Result saved in <b>PostgreSQL</b> & returned to frontend</li>
</ol>

---

<h2>🌱 Example Response</h2>

<pre><code>{
  "success": true,
  "message": "Prediction successful and saved to database.",
  "prediction": {
    "id": 65,
    "crop": "Potato",
    "disease": "Late Blight",
    "confidence": 0.92,
    "suggestion": {
      "remedy": "Apply systemic fungicides such as metalaxyl.",
      "prevention": "Plant certified disease-free tubers and destroy volunteer potatoes."
    },
    "imageUrl": "https://res.cloudinary.com/.../image.png"
  }
}
</code></pre>

---

<h2>🤝 Contributing</h2>
<p>Contributions are welcome! Follow these steps:</p>

<ol>
  <li>Fork the repo 🍴</li>
  <li>Create a new branch 🌿</li>
  <li>Commit changes ✨</li>
  <li>Open a PR 🚀</li>
</ol>

---

<h2>📜 License</h2>
<p>MIT License © 2025 Agro-Med Team</p>

---
<h3 align="center">💡 Note</h3>
<p align="center">
  This project was developed as a <b>team effort</b> 🤝.<br>
  I was primarily responsible for building the <b>entire backend</b> architecture 💻⚡<br>
  👉 <a href="https://github.com/infinitepush/crop-disease-backend">Backend Repository</a>
</p>

<hr>

<p align="center">  
  Made with ❤️ by <b>Team AgroMed</b>  
</p>


