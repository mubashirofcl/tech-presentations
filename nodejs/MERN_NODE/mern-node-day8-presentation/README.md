# MERN Node.js — Day 8: Implementing User Sessions

> **Day 8 Curriculum Presentation & Hands-On Workshop**  
> **Course:** MERN Stack Web Development  
> **Topic:** User Sessions, Cookies, Session-Based Authentication, and MongoDB Session Stores  
> **Tech Stack:** Node.js, Express.js, `express-session`, `connect-mongo`, `bcryptjs`, MongoDB  

---

## 📋 Table of Contents
1. [Overview & Presentation Structure](#-overview--presentation-structure)
2. [18-Slide Curriculum Breakdown](#-18-slide-curriculum-breakdown)
3. [How to Launch the Presentation](#-how-to-launch-the-presentation)
4. [Interactive Features in the Presentation](#-interactive-features-in-the-presentation)
5. [Complete Runnable Project: `student-session-api`](#-complete-runnable-project-student-session-api)
   - [Directory Structure](#directory-structure)
   - [`package.json`](#packagejson)
   - [`.env.example`](#envexample)
   - [`middleware/authMiddleware.js`](#middlewareauthmiddlewarejs)
   - [`server.js`](#serverjs)
6. [Postman Step-by-Step Testing Guide](#-postman-step-by-step-testing-guide)
7. [JWT vs. Session-Based Authentication Reference](#-jwt-vs-session-based-authentication-reference)
8. [Student Practice Challenges](#-student-practice-challenges)

---

## 🎯 Overview & Presentation Structure

This Day 8 lesson transitions students from **stateless JWT tokens** (covered in Day 7) to **stateful user sessions** using cookies and session stores. 

Students build a complete, production-ready **Student Session Authentication API** (`student-session-api`) while understanding the browser-server lifecycle:
- How the server sets an `HttpOnly` signed cookie (`Set-Cookie`)
- How the browser automatically includes that cookie in subsequent requests (`Cookie: student.sid=...`)
- How `express-session` reads the session ID, finds the session in memory/MongoDB, and populates `req.session`
- How to guard against session fixation attacks using `req.session.regenerate()`
- How to cleanly invalidate sessions on logout using `req.session.destroy()` and `res.clearCookie()`

---

## 📑 18-Slide Curriculum Breakdown

| Slide # | Slide Title | Core Concepts Taught |
| :---: | :--- | :--- |
| **01** | **Implementing User Sessions in Node.js** | Title, workshop roadmap, session-based vs token-based preview |
| **02** | **What Is a User Session?** | Definition of session, HTTP statefulness problem, state lifecycle |
| **03** | **Difference Between JWT and Sessions** | Comprehensive comparison matrix (State, Storage, Invalidation, Overhead) |
| **04** | **What Are Cookies?** | Cookie anatomy, `HttpOnly`, `Secure`, `SameSite`, `Max-Age`, signed cookies |
| **05** | **How Session Authentication Works** | Visual architecture diagram: Login → Server Store → Cookie → Follow-up Request |
| **06** | **What Is `express-session`?** | Middleware explanation, options: `secret`, `resave`, `saveUninitialized`, `cookie` |
| **07** | **Practical — Create Your First Session** | Building a visit counter with `req.session.views` + **Live Interactive Simulator** |
| **08** | **Project Setup** | Folder structure, `npm init -y`, installing `express`, `express-session`, `connect-mongo`, `bcryptjs`, `dotenv` |
| **09** | **Practical — Configure Session Middleware** | Wiring up `express-session`, secret keys, session options, security best practices |
| **10** | **How to Store User Information in a Session** | `req.session.userId`, `req.session.email`, session serialization & retrieval |
| **11** | **Practical — User Registration** | Password hashing with `bcryptjs.hash()`, storing user in array/DB, validation |
| **12** | **Practical — User Login & Session Creation** | Password verification (`bcrypt.compare`), `req.session.regenerate()`, session saving |
| **13** | **What Is Authentication Middleware?** | Interceptor pattern, inspecting `req.session.userId`, unauthorized 401 handling |
| **14** | **Practical — Create Authentication Middleware** | Writing reusable `authMiddleware(req, res, next)` guard |
| **15** | **Practical — Create a Protected Profile Route** | `GET /profile` endpoint guarded by `authMiddleware`, returning user profile data |
| **16** | **Practical — Logout & Destroy Session** | Calling `req.session.destroy()`, removing server state, clearing client cookie via `res.clearCookie()` |
| **17** | **Testing Session Authentication Using Postman** | Postman Cookie Jar demo, 5-stage API testing workflow + **Interactive Postman Console** |
| **18** | **Recap and Practical Challenge** | Summary checklist, key takeaways, and 3 hands-on student homework exercises |

---

## 🚀 How to Launch the Presentation

The presentation is built with pure **HTML5, CSS3, and modern Vanilla JavaScript**. It requires zero build tools, bundlers, or servers.

### Option 1: Direct File Open
Double click `index.html` or open in any modern browser:
```bash
# On Windows PowerShell
Start-Process "index.html"
```

### Option 2: Live Server (VS Code / npx)
```bash
npx serve .
# Or open with the VS Code Live Server extension
```

### Keyboard Shortcuts
- <kbd>→</kbd> or <kbd>Space</kbd> or <kbd>PageDown</kbd>: Next Slide
- <kbd>←</kbd> or <kbd>PageUp</kbd>: Previous Slide
- <kbd>Home</kbd>: First Slide
- <kbd>End</kbd>: Last Slide
- <kbd>F</kbd>: Toggle Fullscreen Mode
- <kbd>T</kbd>: Toggle Table of Contents Drawer
- <kbd>?</kbd>: Open Keyboard Shortcuts Cheat Sheet

---

## 🎮 Interactive Features in the Presentation

### 1. Slide 7: Live Visit Counter Session Simulator
An in-slide sandbox where students can trigger simulated HTTP requests to `GET /` and watch:
- Session ID generation
- `req.session.views` incrementing in real-time
- Session object state display
- Simulated `Set-Cookie` and `Cookie` request headers
- Reset session button to demonstrate clearing `req.session.views = 0`

### 2. Slide 17: Interactive Postman Session API Console
A fully functional interactive Postman simulation allowing students to step through all 5 lifecycle endpoints without leaving the presentation:
1. `POST /register`: Registers student Alex Rivera with hashed password.
2. `POST /login`: Generates session ID, injects `student.sid` into simulated Browser/Postman Cookie Jar.
3. `GET /profile` (Authenticated): Successfully retrieves protected student data with status `200 OK`.
4. `POST /logout`: Destroys server-side session and removes `student.sid` from the Cookie Jar.
5. `GET /profile` (Unauthenticated): Demonstrates `401 Unauthorized` response when cookie is missing.

### 3. One-Click Code Snippet Copying
Every single code block in all 18 slides includes a floating **"Copy"** button with dynamic visual feedback ("Copied!").

---

## 💻 Complete Runnable Project: `student-session-api`

Below is the complete, working implementation of the backend application created in this lesson.

### Directory Structure
```text
student-session-api/
│── node_modules/
│── middleware/
│   └── authMiddleware.js
│── .env
│── .gitignore
│── package.json
└── server.js
```

---

### `package.json`
```json
{
  "name": "student-session-api",
  "version": "1.0.0",
  "description": "Student Session Authentication API using Express, express-session, connect-mongo, and bcryptjs",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "connect-mongo": "^5.1.0",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "express-session": "^1.18.0"
  },
  "devDependencies": {
    "nodemon": "^3.1.4"
  }
}
```

---

### `.env.example`
```env
PORT=5000
SESSION_SECRET=super_secret_session_key_987654321_secure
# Optional MongoDB connection string for production session persistence:
MONGO_URI=mongodb://127.0.0.1:27017/student_sessions_db
NODE_ENV=development
```

---

### `middleware/authMiddleware.js`
```javascript
// middleware/authMiddleware.js

/**
 * Authentication Middleware
 * Verifies that the client has an active authenticated session
 * by checking the presence of req.session.userId.
 */
function authMiddleware(req, res, next) {
  // If the session does not exist or has no userId attached, block access
  if (!req.session || !req.session.userId) {
    return res.status(401).json({
      success: false,
      message: "Access Denied: Please log in first to access this resource."
    });
  }

  // Session is valid; proceed to controller
  next();
}

module.exports = authMiddleware;
```

---

### `server.js`
```javascript
// server.js
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const bcrypt = require("bcryptjs");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();
const PORT = process.env.PORT || 5000;

// Parse incoming JSON payloads
app.use(express.json());

// ----------------------------------------------------
// Configure Session Store
// ----------------------------------------------------
// Use MongoDB if MONGO_URI is set; otherwise falls back to MemoryStore
let sessionStore = undefined;
if (process.env.MONGO_URI) {
  sessionStore = MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: "sessions",
    ttl: 24 * 60 * 60, // 1 day in seconds
    autoRemove: "native"
  });
  console.log("Connected session persistence to MongoDB via connect-mongo.");
} else {
  console.log("Running in development mode with express-session MemoryStore.");
}

// ----------------------------------------------------
// Session Middleware Setup
// ----------------------------------------------------
app.use(
  session({
    name: "student.sid", // Custom cookie name (hides backend tech stack)
    secret: process.env.SESSION_SECRET || "fallback_super_secret_key_12345",
    resave: false, // Do not re-save unmodified sessions
    saveUninitialized: false, // Do not store empty sessions (GDPR & storage efficiency)
    store: sessionStore,
    cookie: {
      httpOnly: true, // Prevents client-side JS (XSS) from reading cookie
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      sameSite: "lax", // Protects against Cross-Site Request Forgery (CSRF)
      maxAge: 1000 * 60 * 60 * 24 // 24 hours in milliseconds
    }
  })
);

// ----------------------------------------------------
// In-Memory Database (for classroom demonstration)
// ----------------------------------------------------
const users = [];

// ----------------------------------------------------
// ROUTES
// ----------------------------------------------------

/**
 * 0. Visit Counter Demo Route
 * GET /
 */
app.get("/", (req, res) => {
  req.session.views = (req.session.views || 0) + 1;
  res.json({
    message: "Welcome to Student Session Authentication API",
    views: req.session.views,
    sessionId: req.sessionID
  });
});

/**
 * 1. User Registration Route
 * POST /register
 * Body: { name, email, password, course }
 */
app.post("/register", async (req, res) => {
  try {
    const { name, email, password, course } = req.body;

    // Validate inputs
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email, and password."
      });
    }

    // Check if user already exists
    const existingUser = users.find((u) => u.email === email.toLowerCase());
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists."
      });
    }

    // Hash password with salt rounds = 10
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user object
    const newUser = {
      id: "std_" + (users.length + 1).toString().padStart(3, "0"),
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      course: course || "MERN Stack Development",
      createdAt: new Date().toISOString()
    };

    users.push(newUser);

    return res.status(201).json({
      success: true,
      message: "Student registered successfully!",
      student: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        course: newUser.course
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * 2. User Login & Session Creation
 * POST /login
 * Body: { email, password }
 */
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password."
      });
    }

    // Lookup user
    const user = users.find((u) => u.email === email.toLowerCase());
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password."
      });
    }

    // Verify password hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password."
      });
    }

    // SECURITY BEST PRACTICE: Regenerate session ID to prevent Session Fixation attacks
    req.session.regenerate((err) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Session generation failed." });
      }

      // Store authenticated user identity into session
      req.session.userId = user.id;
      req.session.email = user.email;
      req.session.role = "student";

      // Explicitly save the session before sending response
      req.session.save((saveErr) => {
        if (saveErr) {
          return res.status(500).json({ success: false, message: "Session save failed." });
        }

        return res.status(200).json({
          success: true,
          message: "Login successful! Session initialized.",
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            course: user.course
          }
        });
      });
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * 3. Protected Profile Route
 * GET /profile
 * Protected by authMiddleware
 */
app.get("/profile", authMiddleware, (req, res) => {
  const user = users.find((u) => u.id === req.session.userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User profile not found."
    });
  }

  res.status(200).json({
    success: true,
    message: "Protected profile accessed successfully.",
    sessionMeta: {
      sessionId: req.sessionID,
      cookieExpires: req.session.cookie.expires
    },
    profile: {
      id: user.id,
      name: user.name,
      email: user.email,
      course: user.course,
      memberSince: user.createdAt
    }
  });
});

/**
 * 4. Logout & Destroy Session
 * POST /logout
 */
app.post("/logout", (req, res) => {
  // If no session exists, simply respond OK
  if (!req.session) {
    return res.status(200).json({ success: true, message: "Already logged out." });
  }

  // 1. Destroy server-side session data
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to destroy session."
      });
    }

    // 2. Clear client-side cookie from browser / Postman
    res.clearCookie("student.sid", { path: "/" });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully. Session destroyed and cookie cleared."
    });
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Student Session API running at http://localhost:${PORT}`);
});
```

---

## 📮 Postman Step-by-Step Testing Guide

### Step 1: Register a Student
- **Method:** `POST`
- **URL:** `http://localhost:5000/register`
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**
  ```json
  {
    "name": "Alex Rivera",
    "email": "alex@example.com",
    "password": "Password123!",
    "course": "Full Stack MERN"
  }
  ```
- **Expected Status:** `201 Created`

### Step 2: Login and Receive Session Cookie
- **Method:** `POST`
- **URL:** `http://localhost:5000/login`
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**
  ```json
  {
    "email": "alex@example.com",
    "password": "Password123!"
  }
  ```
- **Expected Status:** `200 OK`
- **What to look for in Postman:**
  - Click the **Cookies** tab below the URL bar.
  - Notice `student.sid=s%3A...` is now stored for `localhost`.
  - In Response Headers, inspect `Set-Cookie`:
    ```http
    Set-Cookie: student.sid=s%3A...; Path=/; Expires=...; HttpOnly; SameSite=Lax
    ```

### Step 3: Access Protected Profile
- **Method:** `GET`
- **URL:** `http://localhost:5000/profile`
- **Headers:** *(None required — Postman automatically sends the cookie!)*
- **Expected Status:** `200 OK`
- **Response:**
  ```json
  {
    "success": true,
    "message": "Protected profile accessed successfully.",
    "profile": {
      "id": "std_001",
      "name": "Alex Rivera",
      "email": "alex@example.com",
      "course": "Full Stack MERN"
    }
  }
  ```

### Step 4: Logout
- **Method:** `POST`
- **URL:** `http://localhost:5000/logout`
- **Expected Status:** `200 OK`
- **Response:**
  ```json
  {
    "success": true,
    "message": "Logged out successfully. Session destroyed and cookie cleared."
  }
  ```
- **Verification:** Check Postman's **Cookies** tab — `student.sid` is cleared or expired.

### Step 5: Verify Protection After Logout
- **Method:** `GET`
- **URL:** `http://localhost:5000/profile`
- **Expected Status:** `401 Unauthorized`
- **Response:**
  ```json
  {
    "success": false,
    "message": "Access Denied: Please log in first to access this resource."
  }
  ```

---

## ⚖️ JWT vs. Session-Based Authentication Reference

| Feature | JSON Web Tokens (JWT) — Day 7 | Session-Based Auth — Day 8 |
| :--- | :--- | :--- |
| **Server State** | **Stateless** (Server stores nothing; token holds payload) | **Stateful** (Server/DB stores session data) |
| **Client Storage** | Usually `localStorage` or `sessionStorage` or cookies | Stored in signed `HttpOnly` browser cookie |
| **Client Overhead** | Larger payload sent with every request header | Minimal (only small 32-byte Session ID string) |
| **Immediate Invalidation** | Difficult (requires token blacklists or redis caching) | **Instant & Simple** (`req.session.destroy()`) |
| **XSS Vulnerability** | Vulnerable if saved in `localStorage` | **Immune** if cookie is marked `HttpOnly` |
| **CSRF Vulnerability** | Immune if sent in `Authorization: Bearer` | Needs `SameSite=lax/strict` or CSRF tokens |
| **Multi-Server Scaling** | Easy out of the box (any server can verify JWT signature) | Requires centralized session store (e.g., Redis or MongoDB) |
| **Best Used For** | Microservices, mobile apps, cross-domain third-party APIs | Traditional web apps, monoliths, banking, internal dashboards |

---

## 🏆 Student Practice Challenges

### Challenge 1: Remember Me (Dynamic Cookie Expiry)
- **Goal:** Allow users to choose between a short session (15 minutes) or a persistent session (30 days).
- **Instructions:** In `POST /login`, accept an optional boolean `rememberMe`. If `true`, set `req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000`. If `false`, set `req.session.cookie.expires = false` (a browser session cookie that expires when the tab closes).

### Challenge 2: Role-Based Authorization Middleware (`adminOnly`)
- **Goal:** Create a middleware that restricts endpoints to admins.
- **Instructions:** Add a `role` property ("student" or "admin") to registered users. Store `req.session.role = user.role` upon login. Create an `adminMiddleware` that checks `if (req.session.role !== "admin") return res.status(403)`. Protect a new route: `GET /admin/all-students`.

### Challenge 3: Inactivity Timeout (Rolling Sessions)
- **Goal:** Automatically log out inactive users after 10 minutes of silence, but extend their session whenever they make requests.
- **Instructions:** Enable `rolling: true` in `express-session` options, and set `cookie: { maxAge: 10 * 60 * 1000 }`. Test how making requests resets the cookie expiration time.

### Challenge 4: Max Active Sessions Tracker
- **Goal:** Prevent multiple simultaneous logins from different devices for the same user.
- **Instructions:** Store the active `sessionId` inside the user record in your database during login. In `authMiddleware`, verify that `req.sessionID === user.activeSessionId`. If it doesn't match, destroy the old session and reject the request!

### Challenge 5: Flash Messages Using Session
- **Goal:** Pass one-time notification messages across page redirects or API calls.
- **Instructions:** Attach a temporary message to `req.session.flashMessage = "Password updated successfully!"`. When read once, delete it from the session so it cannot be viewed a second time.

---

*Made with ❤️ for MERN Stack Developers & Educators.*

