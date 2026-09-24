// ===================================================================
// 1. Load Environment Variables from .env file
// ===================================================================
require("dotenv").config();

// ===================================================================
// 2. Import Dependencies and Modules
// ===================================================================
const express = require("express");
const connectDB = require("./config/db");
const Student = require("./models/Student");

// ===================================================================
// 3. Initialize the Express Application
// ===================================================================
const app = express();

// ===================================================================
// 4. Configure Middleware
// ===================================================================
// express.json(): Parses incoming requests with JSON payloads (e.g. from fetch())
app.use(express.json());

// express.urlencoded(): Parses incoming requests with form-encoded payloads
app.use(express.urlencoded({ extended: true }));

// express.static("public"): Serves frontend files (HTML, CSS, JS) from "public" folder
app.use(express.static("public"));

// ===================================================================
// 5. Connect to MongoDB Database
// ===================================================================
connectDB();

// Root route redirect: Automatically redirect visitors to signup.html
app.get("/", (req, res) => {
  res.redirect("/signup.html");
});

// ===================================================================
// 6. Signup Route - POST /signup
// ===================================================================
// Flow:
// Frontend Form -> fetch('/signup') -> Express -> Mongoose -> MongoDB
// ===================================================================
app.post("/signup", async (req, res) => {
  try {
    // req.body contains the JSON data sent from our frontend JavaScript
    const { name, email, password, age, course } = req.body;

    // Student.create() triggers Mongoose Schema validation:
    //  - Checks if name, email, password, age are present
    //  - Validates that age >= 18
    //  - Checks unique constraint on email
    //  - Applies default value ("MERN") if course is empty/undefined
    const studentData = {
      name,
      email,
      password,
      age: age ? Number(age) : undefined
    };

    // If course is provided and not empty, include it; otherwise let Mongoose default apply
    if (course && course.trim() !== "") {
      studentData.course = course;
    }

    const student = await Student.create(studentData);

    // Return a success JSON response to the browser
    res.status(201).json({
      success: true,
      message: "Signup successful!",
      student
    });

  } catch (error) {
    // If validation fails (e.g. age < 18) or email is duplicate (E11000)
    let errorMessage = error.message;

    // Beginner friendly error message for duplicate email
    if (error.code === 11000) {
      errorMessage = "This email is already registered! Please use another email or login.";
    }

    res.status(400).json({
      success: false,
      message: errorMessage
    });
  }
});

// ===================================================================
// 7. Login Route - POST /login
// ===================================================================
// Flow:
// Frontend Form -> fetch('/login') -> Express -> Student.findOne() -> Compare
// ===================================================================
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation: Ensure both fields are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide both email and password"
      });
    }

    // Step A: Search for student in MongoDB by email
    const student = await Student.findOne({ email });

    // Step B: Check if student exists
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    // Step C: Check if password matches
    // ---------------------------------------------------------------
    // TEACHING NOTE:
    // Passwords are checked as plain text ONLY because this is a 
    // beginner classroom demonstration. Never store real user passwords
    // like this in a production application! Production applications
    // should hash passwords using a proper library like 'bcrypt'.
    // ---------------------------------------------------------------
    if (student.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password"
      });
    }

    // Step D: Send success response
    res.json({
      success: true,
      message: `Welcome ${student.name}!`,
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        course: student.course,
        age: student.age
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// ===================================================================
// 8. Start the HTTP Server
// ===================================================================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Visit Signup : http://localhost:${PORT}/signup.html`);
  console.log(`Visit Login  : http://localhost:${PORT}/login.html`);
});
