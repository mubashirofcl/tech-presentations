# MongoDB & mongosh Interactive Educational Presentation Deck

A complete, professional, beginner-friendly MongoDB and `mongosh` interactive educational presentation built with **vanilla HTML5, CSS3, and JavaScript**.

---

## 🚀 Key Features

1. **62 Comprehensive Slides**
   - Follows the complete syllabus from NoSQL concepts, Windows installation, service management, and `mongosh` fundamentals up to full CRUD, query operators, sorting, projection, and challenges.

2. **In-Memory MongoDB Command Simulator**
   - Live query evaluation engine executing in the browser against the official practice dataset `collegeDB.students`.
   - Supports:
     - `find(filter, projection)`
     - `findOne(filter)`
     - `countDocuments(filter)`
     - `insertOne(doc)`
     - `insertMany([ ... ])`
     - `updateOne(filter, update)`
     - `updateMany(filter, update)`
     - `deleteOne(filter)`
     - `deleteMany(filter)`
     - Operators: `$gt`, `$gte`, `$lt`, `$lte`, `$eq`, `$ne`, `$in`, `$nin`, `$or`, `$and`, `$regex`, `$exists`
     - Update operators: `$set`, `$inc`, `$unset`, `$rename`
     - Cursor chaining: `.sort()`, `.limit()`, `.skip()`
   - Features one-click sample query chips and a "Reset Dataset" button.

3. **Interactive mongosh Terminal Emulation**
   - Real shell environment supporting commands like `help`, `show dbs`, `use collegeDB`, `db`, `show collections`, `cls`, and queries.

4. **Interactive Challenge Reveals**
   - On Slides 56–59, practical questions feature hidden "Hint" and "Show Solution" buttons with syntax-highlighted code.

5. **15-Question Interactive Master Quiz**
   - Complete multi-format quiz (Multiple Choice, True/False, Predict Output, Query Construction).
   - Generates instant score percentages and detailed rationale for each answer.

6. **Searchable Command Cheat Sheet**
   - Instant real-time search across Database, Create, Read, Update, Delete, and Operator syntax.

7. **Code Block Copy Buttons**
   - Instant one-click copy with animated "Copied ✓" status on every code block.

8. **Keyboard Controls & Shortcuts**
   - `&rarr;` / `Space` / `PageDown`: Next Slide
   - `&larr;` / `PageUp`: Previous Slide
   - `Home`: Jump to Slide 1
   - `End`: Jump to Slide 62
   - `T`: Toggle Course Syllabus (Table of Contents)
   - `S`: Toggle Interactive MongoDB Command Simulator
   - `F`: Toggle Fullscreen
   - `Esc`: Close any open drawer or modal

---

## 📂 Project Structure

```text
mongodb-presentation-day2/
├── index.html        # Complete semantic HTML5 structure with all 62 slides & modals
├── style.css         # Modern MongoDB dark developer theme & responsive styles
├── script.js         # Vanilla JS engine: navigation, in-memory simulator, quiz, search
└── README.md         # Course guide & documentation
```

---

## 🏃 Running the Presentation

Simply double-click `index.html` or open it in any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Brave, Safari).
No installation, no node server, and no build tools are required!
