# MERN Node.js — Day 9: File Uploads, Axios & Environment Variables

> **Day 9 Interactive Classroom Presentation Deck & Workshop Project**  
> **Course:** MERN Stack Web Development  
> **Topic:** File Uploads with Multer, Client-Server Communication with Axios, and Configuration Security with dotenv  
> **Tech Stack:** Node.js, Express.js, Multer, dotenv, Axios, React, CORS  
> **Project:** Student Profile Management (`student-profile-app`)

---

## 📋 Table of Contents
1. [Overview & Presentation Structure](#-overview--presentation-structure)
2. [18-Slide Curriculum Breakdown](#-18-slide-curriculum-breakdown)
3. [How to Launch the Presentation Deck](#-how-to-launch-the-presentation-deck)
4. [Interactive Features in the Presentation](#-interactive-features-in-the-presentation)
5. [Complete Runnable Project: `student-profile-app`](#-complete-runnable-project-student-profile-app)
   - [Project Directory Architecture](#project-directory-architecture)
   - [Backend: `package.json`](#backend-packagejson)
   - [Backend: `.env` & `.gitignore`](#backend-env--gitignore)
   - [Backend: `server.js`](#backend-serverjs)
   - [Frontend: `package.json`](#frontend-packagejson)
   - [Frontend: `src/App.jsx`](#frontend-srcappjsx)
   - [Frontend: `src/components/ProfileUpload.jsx`](#frontend-srccomponentsprofileuploadjsx)
6. [Postman Step-by-Step Testing Guide](#-postman-step-by-step-testing-guide)
7. [Common Beginner Pitfalls & Security Notes](#-common-beginner-pitfalls--security-notes)
8. [Student Practice Challenges](#-student-practice-challenges)

---

## 🎯 Overview & Presentation Structure

In **Day 9**, students learn how to bridge a client-side **React** application with a backend **Express** server to transmit binary files alongside text inputs.

Students master three core engineering patterns:
1. **Environment Variables (`dotenv`):** Decoupling application secrets, ports, and database URIs from source code, and shielding them with `.gitignore`.
2. **File Uploads (`Multer`):** Intercepting `multipart/form-data` streams, configuring `diskStorage` vs `memoryStorage`, enforcing file size limits, and validating MIME types with `fileFilter`.
3. **HTTP Client (`Axios`):** Communicating between React and Express using `axios.get()` and `axios.post()`, constructing browser `FormData` containers, and avoiding common header misconfigurations.

---

## 📑 18-Slide Curriculum Breakdown

| Slide # | Slide Title | Type | Key Topics Covered |
| :---: | :--- | :---: | :--- |
| **01** | **Title Slide** | Intro | Course metadata, stack overview, and objectives |
| **02** | **What Are We Building?** | Architecture | Student Profile Management, 6-step lifecycle, and request flow diagram |
| **03** | **What Are Environment Variables?** | Theory | External configuration, why we use them, and the hardcoding anti-pattern |
| **04** | **Installing & Configuring dotenv** | Practical | `npm install dotenv`, `.env` structure, `require("dotenv").config()`, `process.env` |
| **05** | **Practical: dotenv in a Real Project** | Practical | Before vs After, `.gitignore`, `.env.example` team templates |
| **06** | **What Is File Upload?** | Theory | Transferring binary files, limitations of JSON, `multipart/form-data` boundaries |
| **07** | **What Is Multer?** | Theory + Code | Express middleware, stream parsing, `dest: "uploads/"`, `req.file` attachment |
| **08** | **Multer Storage: Disk vs Memory** | Comparison | `diskStorage` vs `memoryStorage`, `path` vs `buffer`, RAM cautions |
| **09** | **Practical: Create File Upload API** | Practical + Tool | Building `file-upload-api`, 2MB limits, Postman testing, **Interactive Multer Sandbox** |
| **10** | **Understanding req.file** | Reference | `originalname`, `filename`, `mimetype`, `size`, `path`, `upload.single` vs `upload.array` |
| **11** | **File Validation & Error Handling** | Security | Image MIME checking via `fileFilter`, 2MB caps, catching `MulterError` |
| **12** | **What Is Axios?** | Theory | Promise-based HTTP client, automatic JSON parsing, Axios vs native `fetch` |
| **13** | **Axios HTTP Methods** | Architecture | `get`, `post`, `put`, `delete`, client-server request cycle diagram |
| **14** | **Practical: Connect React & Express** | Practical | Why CORS is needed, `npm install cors`, React `useEffect` + `axios.get` |
| **15** | **Axios POST & Error Handling** | Practical | Sending JSON bodies, `try/catch`, inspecting `error.response?.data` |
| **16** | **Practical: Upload File with Axios** | Practical | React file inputs, `FormData`, `append()`, **NEVER manually set Content-Type header!** |
| **17** | **Complete Student Profile Flow** | Integration | Full Express route, name + email + image, **Live Interactive Upload Console** |
| **18** | **Recap & Practical Challenge** | Summary | Complete concepts recap table, 8-step homework challenge, and static serving bonus |

---

## 🚀 How to Launch the Presentation Deck

The presentation website has no build tools, bundlers, or runtime dependencies.

### Option 1: Direct File Open
Double click `index.html` or run in terminal:
```bash
# Windows PowerShell
Start-Process "index.html"
```

### Option 2: Live Server (VS Code / npx)
```bash
npx serve .
# Or open with the VS Code Live Server extension
```

### Presenter Keyboard Shortcuts
- <kbd>→</kbd> or <kbd>Space</kbd> or <kbd>PageDown</kbd>: Next Slide
- <kbd>←</kbd> or <kbd>PageUp</kbd>: Previous Slide
- <kbd>Home</kbd>: Jump to Slide 1
- <kbd>End</kbd>: Jump to Slide 18
- <kbd>F</kbd>: Toggle Fullscreen Mode
- <kbd>T</kbd>: Toggle Table of Contents Drawer
- <kbd>?</kbd>: Open Keyboard Shortcuts Cheat Sheet
- Touch Swipe (Left / Right): Navigate on mobile devices / tablets

---

## 🎮 Interactive Features in the Presentation

### 1. Slide 9: Live Multer Upload Simulator
An embedded sandbox allowing students to test Multer's server-side behavior:
- Select from simulated files: `student-photo.png` (800 KB), `profile-banner.jpg` (1.5 MB), `large-video.mp4` (4 MB - triggers `LIMIT_FILE_SIZE`), or `script.exe` (triggers `fileFilter` validation rejection).
- Select between **Disk Storage** (`req.file.path`) and **Memory Storage** (`req.file.buffer`).
- Toggle `fileFilter` image validation on/off.
- Click **"Simulate Upload"** to see the exact metadata object populated in Node.js!

### 2. Slide 17: Interactive Student Profile Upload Console
A complete simulated React + Axios client:
- Enter student name and email.
- Choose a sample avatar picture.
- Click **"Submit via Axios"** to view:
  1. The exact outgoing HTTP request headers with dynamic `Content-Type: multipart/form-data; boundary=----WebKitFormBoundary...`.
  2. The raw multipart body structure.
  3. The server's `201 Created` JSON response payload.

### 3. One-Click Code Copying
Every single code container includes a **"Copy"** button with dynamic visual feedback ("Copied!").

---

## 💻 Complete Runnable Project: `student-profile-app`

Below is the complete, runnable reference implementation of the project built throughout this lesson.

### Project Directory Architecture
```text
student-profile-app/
├── backend/
│   ├── uploads/          # Saved student pictures
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   └── components/
    │       └── ProfileUpload.jsx
    └── package.json
```

---

### Backend: `package.json`
```json
{
  "name": "student-profile-backend",
  "version": "1.0.0",
  "description": "Student Profile Management API using Express, Multer, dotenv, and CORS",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "multer": "^1.4.5-lts.1"
  },
  "devDependencies": {
    "nodemon": "^3.1.4"
  }
}
```

---

### Backend: `.env` & `.gitignore`

#### `.env`
```env
PORT=5000
APP_NAME=Student Profile Management API
NODE_ENV=development
```

#### `.env.example`
```env
PORT=5000
APP_NAME=Student Profile Management API
NODE_ENV=development
```

#### `.gitignore`
```text
node_modules/
.env
uploads/
```

---

### Backend: `server.js`
```javascript
// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Serve uploaded images statically so the frontend can display them!
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ----------------------------------------------------
// Configure Multer Disk Storage
// ----------------------------------------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // Generate unique filename: <timestamp>-<originalname>
    const uniqueSuffix = Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
    cb(null, uniqueSuffix);
  }
});

// File validation filter (images only)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files (JPG, PNG, WebP) are allowed!"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024 // 2 Megabytes limit
  },
  fileFilter: fileFilter
});

// In-memory student array (for demonstration)
const students = [];

// ----------------------------------------------------
// ROUTES
// ----------------------------------------------------

// 1. Health check & student list
app.get("/students", (req, res) => {
  res.json({
    success: true,
    count: students.length,
    students: students
  });
});

// 2. Upload student profile (text fields + single image)
app.post("/students", upload.single("image"), (req, res) => {
  try {
    const { name, email } = req.body;

    // Validate text inputs
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Student name and email are required fields."
      });
    }

    // Validate file input
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Profile image is required (key: 'image')."
      });
    }

    const newStudent = {
      id: "std_" + (students.length + 1).toString().padStart(3, "0"),
      name: name,
      email: email,
      imageFilename: req.file.filename,
      imageUrl: `http://localhost:${PORT}/uploads/${req.file.filename}`,
      uploadedAt: new Date().toISOString()
    };

    students.push(newStudent);

    return res.status(201).json({
      success: true,
      message: "Student profile registered successfully!",
      student: newStudent
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// ----------------------------------------------------
// Global Error Handler for Multer
// ----------------------------------------------------
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File too large: Maximum allowed size is 2 MB."
      });
    }
    return res.status(400).json({ success: false, message: err.message });
  } else if (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
  next();
});

app.listen(PORT, () => {
  console.log(`🚀 ${process.env.APP_NAME || "Server"} running at http://localhost:${PORT}`);
});
```

---

### Frontend: `package.json`
```json
{
  "name": "student-profile-frontend",
  "version": "1.0.0",
  "type": "module",
  "dependencies": {
    "axios": "^1.7.2",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.0",
    "vite": "^5.3.1"
  }
}
```

---

### Frontend: `src/App.jsx`
```jsx
// src/App.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import ProfileUpload from "./components/ProfileUpload";

function App() {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/students");
      setStudents(response.data.students || []);
    } catch (err) {
      console.error("Failed to load students:", err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1>🎓 Student Profile Manager</h1>
      
      {/* Upload Component */}
      <ProfileUpload onUploadSuccess={fetchStudents} />

      <hr style={{ margin: "2rem 0" }} />

      {/* Student List */}
      <h2>Registered Students ({students.length})</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1rem" }}>
        {students.map((student) => (
          <div key={student.id} style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "1rem", textAlign: "center" }}>
            <img 
              src={student.imageUrl} 
              alt={student.name} 
              style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "50%", marginBottom: "0.5rem" }} 
            />
            <h3 style={{ margin: "0.25rem 0" }}>{student.name}</h3>
            <p style={{ color: "#666", fontSize: "0.9rem", margin: "0" }}>{student.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
```

---

### Frontend: `src/components/ProfileUpload.jsx`
```jsx
// src/components/ProfileUpload.jsx
import React, { useState } from "react";
import axios from "axios";

function ProfileUpload({ onUploadSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !file) {
      alert("Please fill in all fields and choose a profile image!");
      return;
    }

    setLoading(true);
    setMessage("");

    // 1. Create native FormData container
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    // Key "image" MUST match upload.single("image") on backend!
    formData.append("image", file);

    try {
      // 2. Dispatch POST request via Axios
      // IMPORTANT: Do NOT manually set Content-Type header!
      const response = await axios.post("http://localhost:5000/students", formData);

      setMessage("✅ " + response.data.message);
      setName("");
      setEmail("");
      setFile(null);
      setPreview(null);

      // Refresh parent student list
      if (onUploadSuccess) onUploadSuccess();
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message;
      setMessage("❌ Error: " + errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: "#f8fafc", padding: "1.5rem", borderRadius: "8px", border: "1px solid #cbd5e1" }}>
      <h3>Register New Student</h3>
      
      <div style={{ marginBottom: "1rem" }}>
        <label>Full Name:</label><br />
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="e.g. Arun Kumar" 
          style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }} 
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>Email Address:</label><br />
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="e.g. arun@example.com" 
          style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }} 
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>Profile Picture (Max 2MB):</label><br />
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange} 
          style={{ marginTop: "0.25rem" }} 
        />
        {preview && (
          <div style={{ marginTop: "0.5rem" }}>
            <img src={preview} alt="Preview" style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px" }} />
          </div>
        )}
      </div>

      <button 
        type="submit" 
        disabled={loading} 
        style={{ background: "#0284c7", color: "white", padding: "0.6rem 1.2rem", border: "none", borderRadius: "4px", cursor: "pointer" }}
      >
        {loading ? "Uploading..." : "Register Student"}
      </button>

      {message && <p style={{ marginTop: "1rem", fontWeight: "600" }}>{message}</p>}
    </form>
  );
}

export default ProfileUpload;
```

---

## 📮 Postman Step-by-Step Testing Guide

### Endpoint 1: Upload Single File (`POST /upload`)
1. Set method to **`POST`**.
2. Enter URL: `http://localhost:5000/upload`.
3. Click the **Body** tab &rarr; select **form-data**.
4. In the **Key** field, enter `file`.
5. Hover over the right edge of the Key field &rarr; change dropdown from **Text** to **File**.
6. In the **Value** column, click **Select Files** and pick any image (`avatar.png`).
7. Click **Send**.
8. **Expected Status:** `200 OK`. The file will appear in your backend's `uploads/` directory!

### Endpoint 2: Register Student Profile (`POST /students`)
1. Set method to **`POST`**.
2. Enter URL: `http://localhost:5000/students`.
3. Select **Body** &rarr; **form-data**.
4. Provide 3 keys:
   - `name` (Text): `Arun Kumar`
   - `email` (Text): `arun@example.com`
   - `image` (File): *[Select image file]*
5. Click **Send**.
6. **Expected Status:** `201 Created`.
7. **Expected JSON Response:**
```json
{
  "success": true,
  "message": "Student profile registered successfully!",
  "student": {
    "id": "std_001",
    "name": "Arun Kumar",
    "email": "arun@example.com",
    "imageFilename": "1714529381200-arun_photo.png",
    "imageUrl": "http://localhost:5000/uploads/1714529381200-arun_photo.png",
    "uploadedAt": "2026-11-10T10:00:00.000Z"
  }
}
```

---

## ⚠️ Common Beginner Pitfalls & Security Notes

1. **Overriding the Content-Type Header:**  
   *Wrong:* `axios.post('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } })`  
   *Why it breaks:* Manually setting this header prevents the browser from generating the required dynamic multipart **boundary string**, causing Multer to throw an error!  
   *Right:* Omit the header completely; Axios handles it automatically.

2. **Forgetting `cors()` in Express:**  
   *Symptom:* Browser console shows: *"Access to XMLHttpRequest at '...' from origin '...' has been blocked by CORS policy"*.  
   *Fix:* Add `app.use(cors())` before route declarations.

3. **Field Name Mismatch:**  
   If Multer is configured with `upload.single("image")`, your frontend must append with `formData.append("image", file)`. If you append `"file"`, Multer will ignore it and `req.file` will be `undefined`.

4. **Security in Production:**  
   - Restrict allowed extensions (never allow `.exe`, `.php`, `.sh`).
   - Use random UUIDs or hashes for stored filenames.
   - For high-volume production apps, upload directly to S3 / Cloudinary using signed URLs or memory buffers.

---

## 🏆 Student Practice Challenges

### Challenge 1: Live Frontend Image Preview
- **Goal:** Display a preview of the selected image before the user clicks "Submit".
- **Hint:** Use `URL.createObjectURL(e.target.files[0])` in the file input's `onChange` handler and render it in an `<img>` tag.

### Challenge 2: Static File Serving & Direct Display
- **Goal:** Allow the frontend to load and render the uploaded image using its backend URL.
- **Hint:** In `server.js`, configure `app.use("/uploads", express.static("uploads"))`. Return `imageUrl: "http://localhost:5000/uploads/" + req.file.filename` in the API response.

### Challenge 3: Multi-File Resume & Portfolio Upload
- **Goal:** Extend the form to allow students to upload both a profile picture (image) AND a resume (PDF).
- **Hint:** Use `upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'resume', maxCount: 1 }])`. Inspect `req.files['avatar']` and `req.files['resume']`.

---

*Made with ❤️ for MERN Stack Developers & Educators.*

