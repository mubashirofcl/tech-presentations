# MongoDB Day 7 — MongoDB Aggregation: $match, $group, $project, $sort & Real-World Examples

Interactive developer presentation and educational demonstration deck for MongoDB Day 7.

---

## 🎯 Main Topics Covered

1. **What Is Aggregation?**: Processing multi-document collections and generating analytical reports directly on the database engine.
2. **Aggregation Pipeline Architecture**: The factory assembly line mental model — stages execute sequentially, each stage receiving the previous stage's output.
3. **`$match`**: Filtering documents before subsequent stages (similar to `find()`).
4. **`$group`**: Grouping documents by a specified key (`_id`) and running accumulators (`$sum`, `$avg`, `$min`, `$max`).
5. **`$project`**: Selecting, excluding (`_id: 0`), reshaping, renaming, and creating calculated fields (`$multiply`).
6. **`$sort`**: Ordering documents ascending (`1`) or descending (`-1`) with single and multi-field criteria.
7. **Combining Stages**: Complete 4-stage pipelines (`$match` → `$group` → `$project` → `$sort`).
8. **Real-World Examples**: Course performance metrics, top students leaderboard, e-commerce category volume, and revenue analytics.
9. **Mongoose Integration**: Executing pipelines via `Model.aggregate()` and understanding why output returns plain JavaScript objects (POJOs) instead of hydrated Mongoose documents.
10. **Practical Mini Project**: Student Analytics Dashboard tying all four stages together.
11. **Common Mistakes & Classroom Quiz**: 5 big beginner mistakes and 10 interactive review questions.

---

## 🚀 How to Run the Presentation

The presentation is built with 100% pure **Vanilla HTML5, CSS3, and JavaScript**. No build step, no npm packages, and no web server required!

### Option 1: Direct File Opening
Double-click `index.html` or drag it into any modern web browser (Chrome, Edge, Firefox, Brave, Safari).

### Option 2: Local HTTP Server (Optional)
If using VS Code / Antigravity IDE Live Server or Python:
```bash
python -m http.server 8080
# Open http://localhost:8080 in your browser
```

---

## ⌨️ Keyboard Shortcuts & Presentation Controls

| Key | Action |
| :--- | :--- |
| <kbd>→</kbd> / <kbd>Space</kbd> / <kbd>PageDown</kbd> | Advance to Next Slide |
| <kbd>←</kbd> / <kbd>PageUp</kbd> | Return to Previous Slide |
| <kbd>Home</kbd> | Jump to Slide 1 (Title) |
| <kbd>End</kbd> | Jump to Slide 45 (Summary) |
| <kbd>T</kbd> | Toggle Slide Index Drawer (Table of Contents) |
| <kbd>F</kbd> | Toggle Fullscreen Mode |
| <kbd>?</kbd> | Open Keyboard Shortcuts Help Modal |
| <kbd>Esc</kbd> | Close any open drawer or modal |

---

## 📂 Slide Directory Overview (45 Slides)

- **Slide 1:** Title — MongoDB Aggregation ($match, $group, $project, $sort & Real-World Examples)
- **Slide 2:** Learning Objectives
- **Slide 3:** Section 1 — What Is Aggregation?
- **Slide 4:** Why Do We Need Aggregation? (1,000 Students Scenario)
- **Slide 5:** Aggregation Use Cases (E-commerce, Education, Business, Analytics)
- **Slide 6:** Section 2 — What Is an Aggregation Pipeline? (Factory Metaphor)
- **Slide 7:** Pipeline Stages Run in Order
- **Slide 8:** Basic Aggregation Syntax (`Model.aggregate([ stages ])`)
- **Slide 9:** Section 3 — What Is `$match`?
- **Slide 10:** `$match` Example & Interactive Live Filter Demo
- **Slide 11:** `$match` With Query Conditions (`$gte`, `$lte`)
- **Slide 12:** When Should We Use `$match`? (Filter Early Rule)
- **Slide 13:** Section 4 — What Is `$group`?
- **Slide 14:** Understanding `_id` in `$group` (`_id: "$course"`)
- **Slide 15:** Counting Documents with `$sum: 1`
- **Slide 16:** `$sum` With Numeric Values (`$sum: "$quantity"`)
- **Slide 17:** Calculating Averages with `$avg`
- **Slide 18:** Finding Extremes: `$min` and `$max`
- **Slide 19:** Section 5 — What Is `$project`?
- **Slide 20:** Include and Exclude Fields (`1` and `0`, `_id: 0`)
- **Slide 21:** Renaming Fields with `$project` (`studentName: "$name"`)
- **Slide 22:** Creating Calculated Fields with `$project` (`$multiply`)
- **Slide 23:** Section 6 — What Is `$sort`? (`1` Ascending, `-1` Descending)
- **Slide 24:** `$sort` Example & Interactive Live Sorting Demo
- **Slide 25:** Sorting by Multiple Fields (`{ course: 1, mark: -1 }`)
- **Slide 26:** Section 7 — Why Combine Stages?
- **Slide 27:** Complete Pipeline Example
- **Slide 28:** Understand Pipeline Step-by-Step (Interactive Stage Stepper)
- **Slide 29:** Section 8 — Real-World Example 1: Course Statistics
- **Slide 30:** Real-World Example 2: Top Students Leaderboard
- **Slide 31:** Real-World Example 3: E-Commerce Sales by Category
- **Slide 32:** Real-World Example 4: Revenue Calculation Report
- **Slide 33:** Real-World Example 5: Filter + Group + Sort
- **Slide 34:** Section 9 — Aggregation With Mongoose
- **Slide 35:** Aggregation vs. `find()` Comparison Table
- **Slide 36:** Important Aggregation Note: Plain JavaScript Objects (POJOs)
- **Slide 37:** Section 10 — Practical Mini Project: Student Analytics Dashboard
- **Slide 38:** Project Structure (`mongodb-day7/`)
- **Slide 39:** Practical Aggregation Solution Code
- **Slide 40:** Expected Analytics Result
- **Slide 41:** Section 11 — Common Beginner Mistakes
- **Slide 42:** Quick Classroom Quiz (10 Interactive Questions)
- **Slide 43:** Aggregation Cheat Sheet
- **Slide 44:** Final Concept Map
- **Slide 45:** Final Summary & Key Takeaways

---

## 🎨 Theme & Technology Stack

- **Theme:** MongoDB Developer Studio Palette (Obsidian `#060B10`, Surface `#0B131D`, MongoDB Green `#00ED64`, Sky Cyan `#38BDF8`, Amber `#FBBF24`, Purple `#C084FC`).
- **Typography:** `Inter` for UI & text; `JetBrains Mono` and `Fira Code` for code & technical metrics.
- **Components:** Glassmorphism cards, interactive live query simulators, copy-to-clipboard code blocks with feedback, keyboard navigation, and responsive full-screen viewport.
