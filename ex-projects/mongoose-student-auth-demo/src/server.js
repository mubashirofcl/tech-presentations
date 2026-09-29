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
const Course = require("./models/Course");

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
    const { name, email, password, age, course, enrolledCourse } = req.body;

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

    // If course string is provided, record it; otherwise default "MERN" applies
    if (course && course.trim() !== "") {
      studentData.course = course.trim();
    }

    // Link enrolledCourse reference for Mongoose populate():
    // 1. If an explicit Course ObjectId was passed in req.body, use it
    // 2. Otherwise, look up a Course matching the course name (e.g. "MERN", "Python", "Java")
    if (enrolledCourse) {
      studentData.enrolledCourse = enrolledCourse;
    } else {
      const courseKeyword = studentData.course || "MERN";
      const matchedCourse = await Course.findOne({
        $or: [
          { code: new RegExp(courseKeyword, "i") },
          { title: new RegExp(courseKeyword, "i") }
        ]
      });
      if (matchedCourse) {
        studentData.enrolledCourse = matchedCourse._id;
      }
    }

    const student = await Student.create(studentData);

    // Optionally populate enrolledCourse before returning in the response
    const populatedStudent = await Student.findById(student._id)
      .select("-password")
      .populate("enrolledCourse");

    // Return a success JSON response to the browser
    res.status(201).json({
      success: true,
      message: "Signup successful!",
      student: populatedStudent || student
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
// 8. Populate Demo Route 1 - GET /api/courses
// Returns all courses stored in the 'courses' collection
// ===================================================================
app.get("/api/courses", async (req, res) => {
  try {
    const courses = await Course.find().sort({ code: 1 });
    res.json({
      success: true,
      count: courses.length,
      courses
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ===================================================================
// 9. Populate Demo Route 2 - GET /api/students/raw (WITHOUT populate)
// ===================================================================
// TEACHING NOTE:
// Without .populate(), MongoDB returns the document as stored on disk.
// The 'enrolledCourse' field only contains the 24-character ObjectId string.
// ===================================================================
app.get("/api/students/raw", async (req, res) => {
  try {
    const students = await Student.find()
      .select("name email age course enrolledCourse active")
      .sort({ _id: -1 });

    res.json({
      success: true,
      queryType: "RAW (Without .populate())",
      explanation: "enrolledCourse contains only the MongoDB ObjectId reference.",
      count: students.length,
      students
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ===================================================================
// 10. Populate Demo Route 3 - GET /api/students/populated (WITH .populate())
// ===================================================================
// TEACHING NOTE:
// .populate("enrolledCourse") tells Mongoose to inspect the 'enrolledCourse'
// field, grab the ObjectId, query the 'courses' collection (via ref: 'Course'),
// and replace the ObjectId with the actual Course document!
// ===================================================================
app.get("/api/students/populated", async (req, res) => {
  try {
    const students = await Student.find()
      .select("name email age course enrolledCourse active")
      .populate("enrolledCourse")
      .sort({ _id: -1 });

    res.json({
      success: true,
      queryType: "POPULATED (With .populate('enrolledCourse'))",
      explanation: "Mongoose replaced the ObjectId with the full referenced Course document.",
      count: students.length,
      students
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ===================================================================
// 11. Populate Demo Route 4 - GET /api/students/populated-select
// Demonstrates selective field population
// ===================================================================
// TEACHING NOTE:
// You don't always need every field from the referenced document.
// You can pass a projection string like 'title code instructor -_id'
// to fetch ONLY specific fields from the Course document.
// ===================================================================
app.get("/api/students/populated-select", async (req, res) => {
  try {
    const students = await Student.find()
      .select("name email course enrolledCourse")
      .populate("enrolledCourse", "title code instructor durationWeeks -_id")
      .sort({ _id: -1 });

    res.json({
      success: true,
      queryType: "POPULATED WITH PROJECTION (.populate('enrolledCourse', 'title code instructor durationWeeks -_id'))",
      explanation: "Only selected fields from Course are retrieved, saving bandwidth.",
      count: students.length,
      students
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ===================================================================
// 12. Reset & Seed Route - POST /api/seed
// Allows one-click seeding directly from the demo web page
// ===================================================================
app.post("/api/seed", async (req, res) => {
  try {
    // 1. Clear courses & seed students
    await Course.deleteMany({});
    await Student.deleteMany({
      email: {
        $in: [
          "rahul.mern@example.com",
          "ananya.py@example.com",
          "vikram.java@example.com",
          "kavita.fullstack@example.com"
        ]
      }
    });

    // 2. Create courses
    const sampleCourses = [
      {
        title: "Full Stack MERN Bootcamp",
        code: "MERN-101",
        instructor: "Dr. Alex Rivera",
        durationWeeks: 12,
        description: "Master MongoDB, Express.js, React.js, and Node.js with real-world industry projects."
      },
      {
        title: "Python Data Science & Machine Learning",
        code: "PY-201",
        instructor: "Prof. Priya Nair",
        durationWeeks: 10,
        description: "From Python fundamentals to Pandas, NumPy, Scikit-Learn, and Neural Networks."
      },
      {
        title: "Cloud-Native Java & Spring Boot Microservices",
        code: "JAVA-301",
        instructor: "Michael Chen",
        durationWeeks: 14,
        description: "Enterprise backend development with Spring Boot, Docker, and REST APIs."
      }
    ];

    const courses = await Course.insertMany(sampleCourses);

    // 3. Create students referencing courses
    const sampleStudents = [
      {
        name: "Rahul Sharma",
        email: "rahul.mern@example.com",
        password: "password123",
        age: 22,
        course: "MERN",
        enrolledCourse: courses[0]._id
      },
      {
        name: "Ananya Verma",
        email: "ananya.py@example.com",
        password: "password123",
        age: 21,
        course: "Python",
        enrolledCourse: courses[1]._id
      },
      {
        name: "Vikram Patel",
        email: "vikram.java@example.com",
        password: "password123",
        age: 24,
        course: "Java",
        enrolledCourse: courses[2]._id
      },
      {
        name: "Kavita Rao",
        email: "kavita.fullstack@example.com",
        password: "password123",
        age: 23,
        course: "MERN",
        enrolledCourse: courses[0]._id
      }
    ];

    const students = await Student.insertMany(sampleStudents);

    res.json({
      success: true,
      message: "Database seeded successfully with Courses and Students!",
      coursesCount: courses.length,
      studentsCount: students.length
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ===================================================================
// 13. Start the HTTP Server
// ===================================================================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Visit Signup        : http://localhost:${PORT}/signup.html`);
  console.log(`Visit Login         : http://localhost:${PORT}/login.html`);
  console.log(`Visit Populate Demo : http://localhost:${PORT}/populate.html`);
  console.log(`API Raw             : http://localhost:${PORT}/api/students/raw`);
  console.log(`API Populated       : http://localhost:${PORT}/api/students/populated`);
});
