// ===================================================================
// Step 1: Import Mongoose
// ===================================================================
const mongoose = require("mongoose");

/**
 * ===================================================================
 * Step 2: Define the Course Schema
 * ===================================================================
 * This Schema represents the "Course" collection in MongoDB.
 * It will be referenced by the Student Schema using Mongoose `populate()`.
 * 
 * Fields:
 *  - title: Name of the course (e.g., "Full Stack MERN Bootcamp")
 *  - code: Unique course code (e.g., "MERN-101")
 *  - instructor: Name of the instructor leading the course
 *  - durationWeeks: Length of the course in weeks
 *  - description: Brief syllabus summary
 * ===================================================================
 */
const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Course title is required"],
      trim: true
    },
    code: {
      type: String,
      required: [true, "Course code is required"],
      unique: true,
      uppercase: true,
      trim: true
    },
    instructor: {
      type: String,
      required: [true, "Instructor name is required"],
      trim: true
    },
    durationWeeks: {
      type: Number,
      required: [true, "Duration in weeks is required"],
      min: [1, "Course duration must be at least 1 week"]
    },
    description: {
      type: String,
      default: "Comprehensive hands-on training module."
    }
  },
  {
    // Automatically creates `createdAt` and `updatedAt` timestamps
    timestamps: true
  }
);

/**
 * ===================================================================
 * Step 3: Create and Export the Course Model
 * ===================================================================
 * Model name: "Course"
 * MongoDB automatically creates the collection: "courses"
 * 
 * When Student Schema specifies `ref: "Course"`, Mongoose uses this model
 * to fetch matching course documents during `.populate()`.
 * ===================================================================
 */
const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
