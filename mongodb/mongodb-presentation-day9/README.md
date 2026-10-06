# MongoDB Day 9 — MongoDB Compass, Atlas & Movie Watchlist API

A practical, classroom-friendly interactive developer presentation covering visual database management with **MongoDB Compass**, cloud deployment with **MongoDB Atlas**, and building a complete **Movie Watchlist API** using Node.js, Express, and Mongoose.

---

## 🚀 Presentation Highlights

- **Pure Vanilla Stack:** Built strictly with modern **HTML5**, **CSS3**, and **Vanilla JavaScript** (Zero frameworks, zero external dependencies).
- **Dark Developer Theme:** Deep charcoal `#060B10` canvas with MongoDB vibrant green `#00ED64` accents, traffic light code editors, and high contrast typography tailored for classroom projectors.
- **Short & Practical:** Exactly **22 slides** structured cleanly into 5 core sections.
- **4 Interactive Live Simulators:**
  1. **Compass Simulator (Slide 4):** Fake MongoDB Compass interface with database tree (`movieDB` > `movies`), live filter input, and dynamic tabs for **Documents**, **Aggregations**, and **Indexes**.
  2. **Atlas Stepper (Slide 9):** Interactive 6-step workflow walking students through Account, Project, Cluster, Database User, IP Network Whitelist, and SRV Connection String.
  3. **Movie Collection Manager (Slide 6):** Live document viewer with real-time title search, genre filters (All / Sci-Fi / Action), interactive "Watched" toggles, and new document modal.
  4. **Live CRUD Studio (Slide 21):** Interactive API tester for `POST`, `GET`, `PUT`, and `DELETE` showing step-by-step data pipeline animation (Client ➔ Express ➔ Atlas ➔ Compass).

---

## 📋 Exact Slide Structure

| # | Section | Topic |
|---|---|---|
| **01** | Section 1: Compass | MongoDB Compass & Atlas Title & Overview |
| **02** | Section 1: Compass | Learning Objectives (6 Practical Milestones) |
| **03** | Section 1: Compass | What Is MongoDB Compass? (GUI vs mongosh) |
| **04** | Section 1: Compass | Anatomy of Compass Interface & Interactive Simulator |
| **05** | Section 1: Compass | Connecting to Local MongoDB (`mongodb://127.0.0.1:27017`) |
| **06** | Section 1: Compass | Working With Documents & Interactive Collection Manager |
| **07** | Section 2: Atlas | What Is MongoDB Atlas? (Cloud Platform & Benefits) |
| **08** | Section 2: Atlas | Local MongoDB vs MongoDB Atlas Comparison Table |
| **09** | Section 2: Atlas | Atlas Setup Workflow (Interactive 6-Step Stepper) |
| **10** | Section 2: Atlas | Atlas Connection String & Environment Security (`.env`) |
| **11** | Section 3: Synergy | Compass & Atlas Together (Architecture Synergy) |
| **12** | Section 3: Synergy | GUI Inspection vs Application Code Roles |
| **13** | Section 4: Movie API | Project Overview: Movie Watchlist API |
| **14** | Section 4: Movie API | Movie Data Model & Mongoose Schema |
| **15** | Section 4: Movie API | Clean Project Directory Structure |
| **16** | Section 4: Movie API | REST API Endpoints Specification Table |
| **17** | Section 4: Movie API | Add Movie Endpoint (`POST /movies`) |
| **18** | Section 4: Movie API | Get Movies Endpoint (`GET /movies`) |
| **19** | Section 4: Movie API | Update & Delete Endpoints (`PUT` & `DELETE /movies/:id`) |
| **20** | Section 5: Practical Flow | Complete End-to-End Architecture Flow Diagram |
| **21** | Section 5: Practical Flow | Testing the API & Live CRUD Simulation Studio |
| **22** | Section 5: Practical Flow | Final Summary & The Golden Developer Loop |

---

## ⌨️ Keyboard Navigation

| Key | Action |
|---|---|
| `→` / `Space` / `Page Down` | Next slide |
| `←` / `Page Up` | Previous slide |
| `Home` | First slide (Title) |
| `End` | Last slide (Summary) |
| `F` | Toggle Fullscreen |
| `T` | Toggle Slide Index drawer |
| `?` | Toggle Keyboard Shortcuts help modal |
| `Escape` | Close Slide Index drawer or shortcuts modal |

---

## 🛠️ How to Run

Simply open `index.html` in any modern web browser:
```bash
# Windows PowerShell
Start-Process "index.html"
```
Or serve via any static HTTP server (e.g. VS Code Live Server or `npx serve .`).
