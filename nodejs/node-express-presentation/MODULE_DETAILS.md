# NODE.JS & EXPRESS.JS MASTERCLASS — COMPLETE SYLLABUS & MODULE DETAILS
## Comprehensive Core Foundations & Course Overview

---

### SECTION 1: NODE.JS CORE FOUNDATIONS

#### 1. Node.js Runtime Architecture
- What is Node.js? JavaScript Runtime Environment built on Google V8.
- Browser JS vs Server JS Environment (DOM/window vs fs/http/process).
- Architecture Layers: JavaScript ➔ V8 Engine ➔ Node APIs ➔ libuv ➔ OS Kernel.
- V8 Engine: Parsing, Abstract Syntax Tree (AST), Ignition Interpreter & TurboFan JIT Compiler.

#### 2. Single-Threaded Execution & libuv Engine
- Explaining Single-Threaded JS Execution correctly (Main Call Stack).
- libuv C Library: Event Loop phases & 4-Worker Thread Pool (`UV_THREADPOOL_SIZE`).
- OS Kernel Async I/O (epoll, kqueue, IOCP) for Network Sockets vs Thread Pool for Disk `fs`, `crypto`, `dns`.
- CPU-Intensive vs I/O-Intensive Workloads.

#### 3. Node Installation, npm & package.json
- `node -v`, `npm -v`, `npm init -y`.
- `package.json` Manifest: `scripts`, `dependencies`, `devDependencies`, `"type": "module"`.
- `npm i`, `npm i -D`, `npx` executable runner, `npm scripts`.

#### 4. Module System: CommonJS vs ES Modules
- CommonJS (CJS): `require()`, `module.exports`, `exports`.
- ES Modules (ESM): `import`, `export`, `export default`, named exports.
- Differences: Dynamic runtime loading vs Static parsing, `__dirname`/`__filename` availability.

#### 5. Node Globals & `process` Object
- `console`, `process`, `__dirname`, `__filename`, `global`.
- `process.env`: Environment variables configuration (`process.env.PORT`).
- `process.argv`, `process.cwd()`, `process.exit()`.
- `.env` files, Security best practices & `.gitignore`.

#### 6. Core Node Modules
- `fs`: `readFile`, `writeFile`, `appendFile`, `unlink`, `mkdir` (Callback, Promise, `async`/`await`).
- `path`: `path.join()`, `path.resolve()`, `path.basename()`, `path.dirname()`, `path.extname()`.
- `os`: `os.platform()`, `os.arch()`, `os.cpus()`, `os.totalmem()`, `os.freemem()`.

#### 7. EventEmitter & Event-Driven Architecture
- `EventEmitter` class: `on()`, `emit()`, `once()`, `removeListener()`.
- Why Events Matter in Node (HTTP servers, sockets, streams).

#### 8. Built-in HTTP Module & URL Parsing
- `http.createServer((req, res) => ...)` before Express.
- HTTP Request & Response objects (`req.url`, `req.method`, `req.headers`, `res.writeHead`, `res.end`).
- URL Module: `pathname`, `searchParams`.

#### 9. Streams & Buffers
- Readable, Writable, Duplex, Transform streams & `pipe()`.
- `Buffer`: Binary data in UTF-8, Hex, Base64 encodings (`Buffer.from()`, `alloc()`, `toString()`, `concat()`).
- Data Pipeline: Stream ➔ Chunks ➔ Buffers ➔ Processing.

#### 10. Async Node Evolution & Error-First Callbacks
- Callback ➔ Promise ➔ `async`/`await` evolution.
- Error-First Callback Pattern `(err, data)` & Why errors are checked first.
- Async Error Handling with `try/catch` & Uncaught Exception management.

---

### SECTION 2: DEDICATED WORKING SESSION: NODE.JS EVENT LOOP SIMULATOR

#### 1. Interactive Working Simulator
- State-Driven Simulation Engine (`Call Stack`, `V8 Engine`, `libuv Phase Ring`, `nextTick Queue`, `Microtask Queue`, `Console Output`, `Audit Log`).
- 5 Executable Code Scenarios (Basic Timers, `nextTick` vs `Promise`, `setTimeout(0)` vs `setImmediate`, I/O Context `fs.readFile`, `async/await`).
- Step Controls: Step Prev, Step Next, Play, Pause, Reset, Speed Selector.

#### 2. The 6 libuv Event Loop Phases
1. `TIMERS`: `setTimeout` & `setInterval` callbacks.
2. `PENDING CALLBACKS`: Deferred system I/O callbacks.
3. `IDLE, PREPARE`: Internal libuv housekeeping.
4. `POLL`: Retrieving I/O events & running I/O callbacks.
5. `CHECK`: `setImmediate()` callbacks.
6. `CLOSE CALLBACKS`: Socket close handlers (`socket.on('close')`).

#### 3. Priority Queues
- `process.nextTick()` Queue (drains immediately after operation finishes).
- `Microtask Queue` (`Promise.then`, `await`) (drains after `nextTick`).

---

### SECTION 3: EXPRESS FRAMEWORK & PRODUCTION ARCHITECTURE

#### 1. Express Setup & Request Lifecycle
- Express Web Framework Overview over `http` module.
- `app.listen()`, HTTP Methods (GET, POST, PUT, DELETE, PATCH).
- Client ➔ Request ➔ Express ➔ Middleware ➔ Router ➔ Controller ➔ Service ➔ Database ➔ Response.

#### 2. Middleware & Flow Simulator
- Middleware signature `(req, res, next)`.
- Interactive Middleware Flow Simulator (Logger ➔ Auth ➔ Validation ➔ Controller ➔ Response).
- Global vs Route Middleware.

#### 3. Router, Controllers & Services Architecture
- `express.Router()` feature modularization (`routes/users.js`).
- Controller handlers (`createUser`, `getUsers`).
- Service layer business logic separation.

#### 4. Validation, CORS & HTTP Headers
- Client vs Server validation rules.
- CORS Browser Security Mechanism (Origins, Domains, Ports, `cors` middleware).
- HTTP Headers (`Content-Type`, `Authorization`, `Cookie`, `Set-Cookie`).

#### 5. Cookies, Sessions & Authentication
- Cookies (`HttpOnly`, `Secure`, `SameSite`).
- `express-session`, Authentication vs Authorization, protected route middleware.

#### 6. Centralized Error Handling & Security
- 4-Parameter Error Middleware `(err, req, res, next)`.
- 404 Catch-All Route.
- Security Best Practices (Sanitize inputs, env variables, rate limiting awareness, hiding stack traces).

#### 7. REST API & Status Codes
- Resource Naming conventions.
- HTTP Status Codes (200, 201, 204, 400, 401 vs 403, 404 vs 409, 422, 500).

#### 8. Request Data Sources Matrix
- `req.params`, `req.query`, `req.body`, `req.headers`, `req.cookies`, `req.file`, `req.files`.

#### 9. Multer File Uploads
- `multipart/form-data`, Multer diskStorage engine, file validation, size limits.

#### 10. Production Folder Structure & Capstone
- Project structure (`src/` with `routes`, `controllers`, `services`, `models`, `middleware`, `utils`, `app.js` vs `server.js`).
- Final User Management REST API Capstone with Auth, Uploads, Search & Pagination.
