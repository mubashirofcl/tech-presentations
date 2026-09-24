# 🎓 Student Signup and Login Demo (`mongoose-student-auth-demo`)

> **Beginner-Friendly Classroom Demonstration:**  
> Connecting **HTML/CSS + Vanilla JavaScript + Node.js + Express + Mongoose + MongoDB** together.

---

## 📌 1. Project Overview

The goal of this project is **educational** — to clearly teach students how frontend forms talk to an Express backend, and how **Mongoose** defines schemas, models, validates input data, and stores documents inside **MongoDB**.

> [!NOTE]
> **Classroom Teaching Focus:**  
> This project is designed strictly for teaching the core database connection and Mongoose operations (`Student.create()` and `Student.findOne()`).  
> **Passwords are stored in plain text for demonstration simplicity.** In real-world production applications, you must always hash passwords using libraries like `bcrypt` or `argon2`, and manage user sessions/JWTs.

---

## 🛠️ 2. Technologies Used

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | HTML5, CSS3, Vanilla JS | Form UI, event handling, and asynchronous `fetch()` API calls |
| **Backend** | Node.js & Express.js | Web server, JSON routing, middleware, and request/response handling |
| **ODM Layer** | Mongoose (v8+) | Schema definition, data types, validation, and MongoDB collection modeling |
| **Database** | MongoDB (Local) | NoSQL document database running on `127.0.0.1:27017` |
| **Configuration** | dotenv | Loads sensitive environment variables (`MONGODB_URI`, `PORT`) |

---

## 📂 3. Folder Structure

```text
mongoose-student-auth-demo/
│
├── node_modules/           # Installed NPM packages (Express, Mongoose, dotenv)
│
├── public/                 # Static frontend served automatically by Express
│   ├── signup.html         # Student registration form
│   ├── login.html          # Student login form
│   ├── style.css           # Clean, responsive styles (Pure Vanilla CSS)
│   └── script.js           # Client-side JavaScript (fetch POST /signup & /login)
│
├── src/
│   ├── config/
│   │   └── db.js           # Asynchronous MongoDB connection using Mongoose
│   │
│   ├── models/
│   │   └── Student.js      # Mongoose Schema & Student Model definition
│   │
│   └── server.js           # Express app, middleware, signup/login routes, port listener
│
├── .env                    # Connection string & port configuration
├── .gitignore              # Ignores node_modules and .env
├── package.json            # Project metadata and start scripts
└── README.md               # Complete classroom guide and documentation
```

---

## 📦 4. Installation & Setup

If you are setting this up from scratch, here are the step-by-step commands:

```bash
# 1. Create project folder
mkdir mongoose-student-auth-demo
cd mongoose-student-auth-demo

# 2. Initialize Node.js project
npm init -y

# 3. Install required dependencies
npm install express mongoose dotenv
```

### What Each Dependency Does:
1. **`express`**: Minimal web framework used to create HTTP servers, route requests (`/signup`, `/login`), and parse JSON.
2. **`mongoose`**: An Object Data Modeling (ODM) library that translates between JavaScript code and MongoDB documents with strict schemas.
3. **`dotenv`**: Reads variables from your `.env` file and attaches them to `process.env`.

---

## ⚙️ 5. Environment Variables (`.env`)

Create a `.env` file in the project root:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/studentAuthDB
PORT=3000
```

### Understanding the MongoDB Connection URI:
```text
MongoDB Protocol    Host/IP        Port        Database Name
   mongodb://      127.0.0.1   :   27017   /   studentAuthDB
```

- **`mongodb://`**: Protocol specifier for MongoDB connections.
- **`127.0.0.1`**: IP address of your local machine (`localhost`).
- **`27017`**: Default port MongoDB listens on.
- **`studentAuthDB`**: The database created automatically when documents are first saved.

---

## 🔌 6. Database Connection (`src/config/db.js`)

```javascript
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
```

### Explanation for Beginners:
* **`mongoose.connect()`**: Connects our Node application to MongoDB. It returns a Promise, so we use `await` inside an `async` function.
* **`process.env.MONGODB_URI`**: Retrieves the connection string from `.env`.
* **`try...catch`**: If MongoDB is not running or the URI is misspelled, the `catch` block catches the error and exits (`process.exit(1)`).

---

## 📑 7. Student Schema & Model (`src/models/Student.js`)

```javascript
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true,
    min: 18
  },
  course: {
    type: String,
    default: "MERN"
  },
  active: {
    type: Boolean,
    default: true
  }
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
```

### Key Concepts:
1. **Schema**: The blueprint specifying rules, types (`String`, `Number`, `Boolean`), validators (`min: 18`), and defaults.
2. **Model**: A wrapper around the Schema providing database interaction methods (`.create()`, `.findOne()`, `.find()`).
3. **Automatic Collection Pluralization**:
   ```text
   Model Name: 'Student'  ──►  MongoDB Collection: 'students'
   ```

---

## 🚀 8. How to Run the Project

Ensure your local MongoDB service is running (or open MongoDB Compass / service manager).

```bash
# Start the server
npm start
```

Terminal Output:
```text
MongoDB connected successfully
Server running on http://localhost:3000
Visit Signup : http://localhost:3000/signup.html
Visit Login  : http://localhost:3000/login.html
```

Open in your browser:
* **Signup Page**: [http://localhost:3000/signup.html](http://localhost:3000/signup.html)
* **Login Page**: [http://localhost:3000/login.html](http://localhost:3000/login.html)

---

## 🔄 9. Architecture & Complete Flow

### Master Request Diagram

```text
┌─────────────────┐
│   HTML FORM     │
│ Signup / Login  │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│   JavaScript    │
│    fetch()      │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│     Express     │
│   POST /signup  │
│   POST /login   │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│    Mongoose     │
│ Schema + Model  │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│     MongoDB     │
│ studentAuthDB   │
│   students      │
└─────────────────┘
```

### Detailed Signup Flow:
```text
User fills Signup Form
       ↓
Browser JavaScript runs event listener
       ↓
fetch("/signup", { method: "POST", body: JSON })
       ↓
Express parses body via express.json()
       ↓
Student.create({ name, email, password, age, course })
       ↓
Mongoose validates against studentSchema rules
       ↓
Saved as a Document in the "students" collection of studentAuthDB
       ↓
Response { success: true, message: "Signup successful!" } sent back to UI
```

### Detailed Login Flow:
```text
User enters Email & Password in Login Form
       ↓
fetch("/login", { method: "POST", body: JSON })
       ↓
Express receives POST /login
       ↓
Student.findOne({ email }) searches MongoDB
       ↓
If not found ──► 404 "Student not found"
       ↓
If found ──► Compare password with student.password
       ↓
If mismatch ──► 401 "Incorrect password"
       ↓
If match ──► 200 "Welcome Rahul!"
```

---

## 🧭 10. MongoDB Compass Demonstration

To inspect your saved data in a visual GUI:

1. Open **MongoDB Compass**.
2. Paste the connection string:
   ```text
   mongodb://127.0.0.1:27017
   ```
3. Click **Connect**.
4. In the left sidebar, click **`studentAuthDB`**.
5. Click the **`students`** collection.
6. Observe the registered document:
   ```json
   {
     "_id": "6741b6329fa0123e456789ab",
     "name": "Rahul Sharma",
     "email": "rahul@gmail.com",
     "password": "simplepassword123",
     "age": 21,
     "course": "MERN",
     "active": true,
     "__v": 0
   }
   ```

---

## 🧪 11. Classroom Experiments: Testing Mongoose Features

### Test 1 — Validation: Age Below 18
* **Action**: Try signing up with Age = `15`.
* **Result**: Mongoose rejects the document with error: `Age must be at least 18`.
* **Lesson**: Schema validation prevents invalid data from entering MongoDB.

### Test 2 — Validation: Missing Required Name
* **Action**: Leave the Name field blank.
* **Result**: Mongoose rejects with error: `Path \`name\` is required`.
* **Lesson**: `required: true` enforces mandatory fields.

### Test 3 — Unique Constraint: Duplicate Email
* **Action**: Register the same email (`rahul@gmail.com`) twice.
* **Result**: Error `E11000 duplicate key error collection: studentAuthDB.students index: email_1 dup key`.
* **Lesson**: `unique: true` creates a unique index in MongoDB.

### Test 4 — Default Values
* **Action**: Register a student without selecting any Course.
* **Result**: In MongoDB Compass, inspect the document: `course` automatically becomes `"MERN"`, and `active` is `true`.
* **Lesson**: Mongoose applies schema defaults when values are omitted.

---

## 📊 12. Mongoose vs MongoDB Shell Comparison

| Operation | MongoDB Shell (`mongosh`) | Mongoose (Node.js) |
|---|---|---|
| **Find All Students** | `db.students.find()` | `await Student.find()` |
| **Find One Student** | `db.students.findOne({ email: "..." })` | `await Student.findOne({ email })` |
| **Insert / Create** | `db.students.insertOne({ name: "Rahul", ... })` | `await Student.create({ name: "Rahul", ... })` |
| **Delete One** | `db.students.deleteOne({ email: "..." })` | `await Student.deleteOne({ email })` |

---

## ⚠️ 13. Common Errors & Troubleshooting

1. **`MongooseServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017`**
   * **Cause**: MongoDB is not running on your computer.
   * **Fix**: Start the MongoDB service via Windows Services or run `mongod` in a terminal.

2. **`E11000 duplicate key error`**
   * **Cause**: An account with this email already exists in MongoDB.
   * **Fix**: Use a different email address or log in using the existing account.

3. **`ValidationError: ... Path is required`**
   * **Cause**: A mandatory field in the schema was omitted.
   * **Fix**: Fill out all required fields in the form.

4. **`Cannot POST /signup`**
   * **Cause**: Express server route is missing or server is not running.
   * **Fix**: Ensure `server.js` has `app.post("/signup", ...)` and you ran `npm start`.
