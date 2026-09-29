// ===================================================================
// Seed Script: Populate MongoDB with Sample Courses and Students
// Run this with: npm run seed  OR  node src/seed.js
// ===================================================================
require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Student = require("./models/Student");
const Course = require("./models/Course");

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

async function seedDatabase() {
  try {
    console.log("\n=======================================================");
    console.log("🌱 Starting Mongoose Populate() Database Seeder...");
    console.log("=======================================================");

    // Step 1: Connect to MongoDB
    await connectDB();

    // Step 2: Clear previous sample data to avoid duplicate key errors
    console.log("\n🧹 Step 1: Clearing existing courses and sample students...");
    await Course.deleteMany({});
    // Remove sample students created by seeder or with sample emails
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
    console.log("   ✓ Cleaned previous seed data.");

    // Step 3: Insert Courses into 'courses' collection
    console.log("\n📚 Step 2: Creating Course documents in MongoDB...");
    const createdCourses = await Course.insertMany(sampleCourses);
    console.log(`   ✓ Created ${createdCourses.length} Courses:`);
    createdCourses.forEach((c) => {
      console.log(`     - [${c.code}] ${c.title} (MongoDB _id: ${c._id})`);
    });

    // Step 4: Create Students with enrolledCourse referencing Course ObjectIds
    console.log("\n🎓 Step 3: Creating Students with 'enrolledCourse' ObjectId reference...");
    const sampleStudents = [
      {
        name: "Rahul Sharma",
        email: "rahul.mern@example.com",
        password: "password123",
        age: 22,
        course: "MERN",
        enrolledCourse: createdCourses[0]._id // References MERN-101 ObjectId
      },
      {
        name: "Ananya Verma",
        email: "ananya.py@example.com",
        password: "password123",
        age: 21,
        course: "Python",
        enrolledCourse: createdCourses[1]._id // References PY-201 ObjectId
      },
      {
        name: "Vikram Patel",
        email: "vikram.java@example.com",
        password: "password123",
        age: 24,
        course: "Java",
        enrolledCourse: createdCourses[2]._id // References JAVA-301 ObjectId
      },
      {
        name: "Kavita Rao",
        email: "kavita.fullstack@example.com",
        password: "password123",
        age: 23,
        course: "MERN",
        enrolledCourse: createdCourses[0]._id // Also enrolled in MERN-101
      }
    ];

    const createdStudents = await Student.insertMany(sampleStudents);
    console.log(`   ✓ Created ${createdStudents.length} Students with references.`);

    // ===================================================================
    // EDUCATIONAL DEMONSTRATION OF populate() IN CONSOLE
    // ===================================================================
    console.log("\n=======================================================");
    console.log("🔍 DEMONSTRATION 1: Query WITHOUT .populate()");
    console.log("   Code: await Student.find({ email: 'rahul.mern@example.com' })");
    console.log("=======================================================");
    const unpopulatedStudent = await Student.findOne({ email: "rahul.mern@example.com" }).select(
      "name email age enrolledCourse"
    );
    console.log(JSON.stringify(unpopulatedStudent, null, 2));
    console.log("👉 NOTICE: 'enrolledCourse' contains ONLY the 24-character hex ObjectId string.");

    console.log("\n=======================================================");
    console.log("✨ DEMONSTRATION 2: Query WITH .populate('enrolledCourse')");
    console.log("   Code: await Student.find({ email: 'rahul.mern@example.com' }).populate('enrolledCourse')");
    console.log("=======================================================");
    const populatedStudent = await Student.findOne({ email: "rahul.mern@example.com" })
      .select("name email age enrolledCourse")
      .populate("enrolledCourse");
    console.log(JSON.stringify(populatedStudent, null, 2));
    console.log("👉 NOTICE: Mongoose automatically replaced the ObjectId with the ENTIRE Course document!");

    console.log("\n=======================================================");
    console.log("🎯 DEMONSTRATION 3: Field Selection with .populate()");
    console.log("   Code: .populate('enrolledCourse', 'title instructor -_id')");
    console.log("=======================================================");
    const selectedFieldStudent = await Student.findOne({ email: "rahul.mern@example.com" })
      .select("name email enrolledCourse")
      .populate("enrolledCourse", "title instructor -_id");
    console.log(JSON.stringify(selectedFieldStudent, null, 2));
    console.log("👉 NOTICE: Only 'title' and 'instructor' were fetched, omitting '_id'!");

    console.log("\n=======================================================");
    console.log("✅ Database seeding and populate() demo complete!");
    console.log("=======================================================\n");

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

// Allow running directly or exporting for use in Express route
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
