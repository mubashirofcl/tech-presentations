// ===================================================================
// Step 1: Import Mongoose
// ===================================================================
const mongoose = require("mongoose");

/**
 * ===================================================================
 * Step 2: Define the Student Schema
 * ===================================================================
 * A Schema defines the "blueprint" or structure of documents stored in MongoDB.
 * It specifies:
 *  - Field names (name, email, password, age, course, active)
 *  - Data types (String, Number, Boolean)
 *  - Built-in validators (required: true, min: 18)
 *  - Indexes (unique: true)
 *  - Default values (default: "MERN", default: true)
 */
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Student name is required"]
  },

  email: {
    type: String,
    required: [true, "Student email is required"],
    unique: true // Creates a unique index in MongoDB to prevent duplicate emails
  },

  password: {
    type: String,
    required: [true, "Password is required"]
    // Teaching Note: Stored in plain text for classroom demonstration ONLY.
    // Production applications MUST hash passwords using bcrypt or argon2!
  },

  age: {
    type: Number,
    required: [true, "Age is required"],
    min: [18, "Age must be at least 18"] // Validates that age >= 18
  },

  course: {
    type: String,
    default: "MERN" // If no course is provided, Mongoose automatically sets "MERN"
  },

  /**
   * ===================================================================
   * Step 2.1: Reference to Course Model (For Mongoose populate())
   * ===================================================================
   * 1. type: mongoose.Schema.Types.ObjectId
   *    Tells Mongoose this field stores a 24-character hexadecimal ObjectId
   *    pointing to a document in another collection.
   * 
   * 2. ref: "Course"
   *    Tells Mongoose which model to look up when .populate("enrolledCourse") is called.
   *    This must exactly match the model name registered in Course.js:
   *    mongoose.model("Course", courseSchema)
   */
  enrolledCourse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  },

  active: {
    type: Boolean,
    default: true // Automatically marks newly registered students as active
  }
}, {
  // Automatically manages createdAt and updatedAt timestamps
  timestamps: true
});

/**
 * ===================================================================
 * Step 3: Create the Student Model
 * ===================================================================
 * The Model is a JavaScript class constructed from the Schema.
 * It provides methods (Student.create, Student.findOne, Student.find)
 * to interact with the database.
 * 
 * Note: Mongoose automatically takes the model name "Student",
 * converts it to lowercase and pluralizes it into the collection name: "students"
 * 
 * Flow:
 * Student Schema -> Student Model -> "students" Collection in MongoDB
 */
const Student = mongoose.model("Student", studentSchema);

// Export the Student model so server.js can use it
module.exports = Student;
