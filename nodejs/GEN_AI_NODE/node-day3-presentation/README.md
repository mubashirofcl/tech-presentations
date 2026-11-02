# Node.js Day 3 — Express Routing, Middleware & Zod Validation

An interactive 20-slide deck built with **HTML5, CSS3 and Vanilla JavaScript** only. No frameworks, no build step. It uses the same light-blue and white theme as the earlier days.

```text
node-day3-express-presentation/
├── index.html   # All 20 slides
├── style.css    # Theme, layouts, code blocks, diagrams, responsive and print styles
├── script.js    # Navigation, progress bar, keyboard controls, fullscreen, table of contents, copy code
└── README.md
```

## How to Open

Double-click `index.html`, or right-click it and choose **Open with** Chrome, Edge, Firefox or Safari.

Optional local server:

```bash
npx serve node-day3-express-presentation
# or
python -m http.server 8000
```

## Slides

| Section | Slides |
|---|---|
| 1: Welcome | 01 Title · 02 Learning Objectives |
| 2: Express Routing | 03 Express Routing · 04 Route and Query Parameters · 05 Express Router |
| 3: Middleware | 06 Middleware · 07 Types of Middleware · 08 JSON Body Parsing · 09 Error Handling · 10 CORS |
| 4: Project Structure | 11 Project Structure · 12 Routes · 13 Controllers · 14 Services · 15 Connecting Routes, Controllers and Services |
| 5: Zod Validation | 16 Introduction to Zod · 17 Creating Zod Schemas · 18 parse() vs safeParse() · 19 Zod Validation in Express |
| 6: Final Practical | 20 Student Registration API |

## How to Navigate

| Control | Action |
|---|---|
| `→` / `Space` / `PageDown` | Next slide |
| `←` / `PageUp` | Previous slide |
| `Home` | First slide |
| `End` | Last slide |
| `F` | Toggle fullscreen |
| `T` or `M` | Open the Contents panel (jump to any slide) |
| `?` or `H` | Open the shortcuts list |
| `Esc` | Close the panel or list |

On screen you also have **Previous** and **Next** buttons, a slide counter (`03 / 20`), a progress bar at the top, a section label for the current slide, and **Contents**, **Shortcuts** and **Fullscreen** buttons. The URL hash (`#slide-1` to `#slide-20`) follows the current slide.

Shortcuts are ignored while typing in an input or editable element, and when Ctrl, Cmd or Alt is held. Printing the page gives one slide per page.

## Copy Code Buttons

Every code block has a **Copy Code** button in its header. Click it, and the button shows **Copied!** for two seconds. Paste the code into a file with the filename shown in the block header.

## Running the Examples

All code uses CommonJS (`require` and `module.exports`).

```bash
npm init -y
npm install express cors zod
node server.js
```

Test with Postman or curl, for example:

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Anu","email":"anu@gmail.com","age":22}'
```

Only one example server can use port 3000 at a time. Stop the previous server with `Ctrl + C` before starting another.

## Notes for the Instructor

- Slides 12–15 build the user API (routes, controllers, services). Slide 19 adds the Zod validator to the same API.
- The user service stores only `name` and `email`, so `age` is validated on slide 19 but not saved.
- Zod error message wording can differ slightly between versions. The examples were checked with Express 5, cors 2.8 and Zod 4. The slide 19 messages are custom, so they stay the same.
- In Zod 4, `z.email()` is the newer form of `z.string().email()`. The older form used in these slides still works.
- Slide 20 is a student challenge. It includes an `errorHandler` starter that returns `err.statusCode` when it is set, otherwise `500`.
