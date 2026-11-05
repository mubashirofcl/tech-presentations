# Node.js Day 7 — User Authentication Using JSON Web Tokens (JWT)

> **MERN Stack Development · Backend Security Track**  
> Complete interactive educational slide presentation, reference architecture, and runnable Node.js/Express code for beginner to intermediate students.

---

## 📋 Course Overview

In **Day 7**, students transition from public CRUD APIs to secure, authenticated backend systems. This session introduces two fundamental building blocks of modern backend security:

1. **Password Hashing with `bcryptjs`**: Understanding why plain-text passwords must never be stored in databases, how cryptographic salts defeat rainbow tables, and how `bcrypt.compare()` safely verifies credentials.
2. **JSON Web Tokens (JWT) with `jsonwebtoken`**: Understanding the structure of a token (Header, Payload, Signature), how tokens are signed using a server-side secret, why Base64Url is *not* encryption, and how stateless authentication scales.
3. **Authentication Middleware (`authMiddleware`)**: Implementing the Express gatekeeper pattern to extract `Bearer` tokens from the HTTP `Authorization` header, verify cryptographic signatures, and attach user claims to `req.user`.
4. **Protected Endpoints**: Creating secured routes such as `GET /api/profile` that strictly require valid token authentication.

---

## 🗂️ Presentation Contents (18 Slides)

| Slide # | Slide Title | Category | Key Concept & Learning Objective |
|---|---|---|---|
| **01** | **User Authentication Using JSON Web Tokens (JWT)** | Welcome & Overview | Course objectives, prerequisites, and technology stack overview. |
| **02** | **What Are We Building Today?** | Project Roadmap | High-level architecture of `jwt-auth-api` (Student Authentication API). |
| **03** | **What Is Authentication?** | Core Concepts | Difference between Identity Verification (AuthN) and Permissions (AuthZ). |
| **04** | **How Modern Authentication Works** | Architecture | Client-server communication lifecycle, stateful sessions vs. stateless tokens. |
| **05** | **Why Should We Hash Passwords?** | Security Theory | Plain-text breach risks, one-way hash functions, cryptographic salts, and work factor. |
| **06** | **Practical: Hashing Passwords with bcryptjs** | Hands-on & Lab | Using `bcrypt.hash()` and `bcrypt.compare()`. Includes an interactive live sandbox! |
| **07** | **What Is JSON Web Token (JWT)?** | Token Deep-Dive | RFC 7519 structure: Header (Red), Payload (Purple), and Signature (Cyan). |
| **08** | **How JWT Authentication Works (Step-by-Step)** | Protocol Flow | Complete sequence diagram: Login &rarr; Token Generation &rarr; Protected Request &rarr; Verification. |
| **09** | **Practical: Generate a JWT with jwt.sign()** | Hands-on Implementation | Constructing tokens with custom claims and expiration options (`expiresIn: '1h'`). |
| **10** | **Understanding JWT Verification** | Token Deep-Dive | Using `jwt.verify()`, handling expiration, tampering detection, and error classes. |
| **11** | **Project Setup: The Student Auth API** | Project Architecture | Directory structure, `npm init`, installing dependencies, and configuring `.env`. |
| **12** | **Practical: User Registration API** | Hands-on Implementation | `POST /api/register` with input validation, duplicate checks (409), and 201 Created. |
| **13** | **Practical: User Login API** | Hands-on Implementation | `POST /api/login` with `bcrypt.compare()`, token signing, and preventing user enumeration. |
| **14** | **What Is Authentication Middleware?** | Middleware Pattern | Express pipeline gatekeeper pattern: intercepting requests, parsing headers, and calling `next()`. |
| **15** | **Practical: Creating authMiddleware.js** | Hands-on Implementation | Extracting `Bearer <token>`, handling missing/malformed headers, and setting `req.user`. |
| **16** | **Practical: Creating Protected Routes** | Hands-on Implementation | Securing `GET /api/profile` with `authMiddleware` and reading verified user data. |
| **17** | **Testing JWT Authentication Using Postman** | Testing & Lab | Sequential 4-step testing workflow with built-in interactive simulator! |
| **18** | **Recap & Practical Student Challenges** | Summary & Lab | Master concepts table and 5 progressive coding challenges for students. |

---

## 🚀 How to Launch the Presentation

The presentation is built with pure HTML5, modern CSS3, and Vanilla JavaScript—no external compilers, bundlers, or frameworks required.

### Quick Start:
1. Navigate to the `mern-node-day7-presentation/` directory.
2. Open `index.html` directly in any modern browser (Chrome, Edge, Firefox, Safari).
3. **Keyboard Controls**:
   - `Right Arrow` / `Down Arrow` / `Space` / `Page Down`: Next slide
   - `Left Arrow` / `Up Arrow` / `Page Up`: Previous slide
   - `Home`: Jump to first slide
   - `End`: Jump to last slide
   - `T`: Toggle Table of Contents drawer
   - `F`: Toggle Fullscreen mode
   - `?` or `H`: View keyboard shortcut help
   - `Esc`: Close any open drawer or modal

---

## 🛠️ Complete Project Code: `jwt-auth-api`

Below is the complete, runnable code for the Student Authentication API demonstrated in the presentation.

### 1. `package.json`
```json
{
  "name": "jwt-auth-api",
  "version": "1.0.0",
  "description": "Student Authentication API using Express, bcryptjs, and JWT",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "jsonwebtoken": "^9.0.2"
  },
  "devDependencies": {
    "nodemon": "^3.1.0"
  }
}
```

### 2. `.env`
```ini
PORT=5000
JWT_SECRET=superSecretKey_NodeDay7_JWT_2026!
JWT_EXPIRES_IN=1h
```

### 3. `.gitignore`
```
node_modules/
.env
```

### 4. `middleware/authMiddleware.js`
```javascript
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // 1. Read Authorization header
  const authHeader = req.headers.authorization;

  // 2. Validate format: must be "Bearer <token>"
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: 'Access denied. No authentication token provided.'
    });
  }

  // 3. Extract the token string
  const token = authHeader.split(' ')[1];

  try {
    // 4. Verify signature with secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5. Attach decoded payload to request
    req.user = decoded;

    // 6. Proceed to the route handler
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: 'Invalid or expired token.'
    });
  }
};

module.exports = authMiddleware;
```

### 5. `routes/authRoutes.js`
```javascript
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// In-memory student database
const students = [];

// ==========================================
// 1. REGISTER: POST /api/register
// ==========================================
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    // Duplicate check
    const existing = students.find(s => s.email === email);
    if (existing) {
      return res.status(409).json({ error: 'A student with this email already exists.' });
    }

    // Hash password with 10 salt rounds
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save student
    const newStudent = {
      id: String(students.length + 101),
      name,
      email,
      password: hashedPassword
    };
    students.push(newStudent);

    // Return 201 Created (do not expose password)
    res.status(201).json({
      success: true,
      message: 'Student registered successfully.',
      student: {
        id: newStudent.id,
        name: newStudent.name,
        email: newStudent.email
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal server registration error.' });
  }
});

// ==========================================
// 2. LOGIN: POST /api/login
// ==========================================
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    // Find student
    const student = students.find(s => s.email === email);
    if (!student) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // Compare entered password with stored hash
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // Generate signed JWT token
    const token = jwt.sign(
      { userId: student.id, email: student.email, role: 'student' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );

    res.status(200).json({
      success: true,
      message: 'Login successful.',
      token
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal server login error.' });
  }
});

// ==========================================
// 3. PROTECTED PROFILE: GET /api/profile
// ==========================================
router.get('/profile', authMiddleware, (req, res) => {
  // req.user was set by authMiddleware
  const student = students.find(s => s.id === req.user.userId);

  if (!student) {
    return res.status(404).json({ error: 'Student profile not found.' });
  }

  res.status(200).json({
    success: true,
    message: 'Profile retrieved successfully.',
    profile: {
      id: student.id,
      name: student.name,
      email: student.email,
      role: req.user.role
    }
  });
});

module.exports = router;
```

### 6. `server.js`
```javascript
const express = require('express');
require('dotenv').config();

const app = express();

// Body Parser Middleware
app.use(express.json());

// Mount Authentication Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api', authRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date() });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Authentication server listening at http://localhost:${PORT}`);
});
```

---

## 🧪 Testing with Postman & cURL

### 1. Register a New Student
```bash
curl -X POST http://localhost:5000/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Sarah Connor","email":"sarah@college.edu","password":"mypassword123"}'
```
**Expected Response:** `201 Created`
```json
{
  "success": true,
  "message": "Student registered successfully.",
  "student": {
    "id": "101",
    "name": "Sarah Connor",
    "email": "sarah@college.edu"
  }
}
```

### 2. Login to Obtain JWT Token
```bash
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"sarah@college.edu","password":"mypassword123"}'
```
**Expected Response:** `200 OK`
```json
{
  "success": true,
  "message": "Login successful.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMDEiLCJlbWFpbCI..."
}
```

### 3. Access Protected Route (Valid Token)
```bash
curl -X GET http://localhost:5000/api/profile \
  -H "Authorization: Bearer <PASTE_TOKEN_HERE>"
```
**Expected Response:** `200 OK`
```json
{
  "success": true,
  "message": "Profile retrieved successfully.",
  "profile": {
    "id": "101",
    "name": "Sarah Connor",
    "email": "sarah@college.edu",
    "role": "student"
  }
}
```

### 4. Access Protected Route (Without Token)
```bash
curl -X GET http://localhost:5000/api/profile
```
**Expected Response:** `401 Unauthorized`
```json
{
  "success": false,
  "error": "Access denied. No authentication token provided."
}
```

---

## 🎯 5 Student Practice Challenges

1. **Role-Based Access Control (RBAC)**:
   - Create an `adminOnly` middleware function.
   - Attach it to a new route: `GET /api/admin/students` that returns the list of all registered students only if `req.user.role === 'admin'`. Return `403 Forbidden` otherwise.
2. **Password Strength Validation**:
   - Add validation logic inside `POST /api/register` to ensure passwords contain at least 8 characters, at least one uppercase letter, and at least one numeric digit. Return `400 Bad Request` with helpful hints if weak.
3. **Password Change Endpoint**:
   - Implement `PUT /api/update-password` protected by `authMiddleware`.
   - Require `currentPassword` and `newPassword`. Verify `currentPassword` against the stored hash with `bcrypt.compare()` before updating!
4. **Token Expiration Custom Error Handling**:
   - Update `authMiddleware` to inspect `err.name`. If `err.name === 'TokenExpiredError'`, return `{ error: 'Your session has expired. Please log in again.' }`.
5. **MongoDB & Mongoose Migration**:
   - Replace the in-memory `students` array with a Mongoose `Student` Schema with `{ email: { type: String, unique: true } }` in preparation for Day 8!

---

## 📄 License & Attribution
Prepared for the **MERN Stack Development Curriculum**. Free for educational, classroom, and training use.
