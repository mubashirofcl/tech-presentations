# JavaScript Fundamentals – Day 2 Presentation

## Advanced Arrays, Objects, Higher-Order Methods & Modern ES6+
**Target Audience:** Students with Python foundations preparing for React and Generative AI development.  
**Total Slides:** Exactly 26 slides.  
**Eliminated Redundancies:** All 8 duplicated Day 1 basic array & object definition slides (`What is an Array`, `push/pop/shift/unshift`, `What is an Object`, `Object.keys/values`, `Nested Objects`) have been eliminated and replaced with essential higher-order and immutability concepts.

---

## Complete 26-Slide Syllabus Breakdown

1. **Slide 1 – Introduction to Day 2:** Advanced Data Structures, Higher-Order Array Methods, Modern ES6+ & Immutability.
2. **Slide 2 – Reference vs Value in JavaScript:** Memory stack vs heap, why objects and arrays are copied by reference, and the core React state immutability rule.
3. **Slide 3 – Loops in JavaScript:** `for`, `for...of` (values), and `for...in` (object keys).
4. **Slide 4 – forEach() vs map():** Side effects vs pure transformations, return value differences, and why React renders with `map()`.
5. **Slide 5 – filter():** Selecting elements by predicate conditions and React state deletion pattern.
6. **Slide 6 – reduce():** Universal aggregator and accumulator pattern for calculating grand totals, averages, and object maps.
7. **Slide 7 – Method Chaining:** Combining `filter() + map() + reduce()` into declarative functional pipelines.
8. **Slide 8 – Searching Arrays:** `find()` and `findIndex()` for fast short-circuiting record lookups.
9. **Slide 9 – Testing Conditions:** `some()` and `every()` boolean validations for access control and form validation.
10. **Slide 10 – Element Lookup:** `includes()` vs `indexOf()` for clean primitive membership checking.
11. **Slide 11 – Array Immutability:** `slice()` (pure copy) vs `splice()` (in-place mutation).
12. **Slide 12 – Sorting Mechanics:** The default lexicographical sort trap and writing numeric comparators `(a, b) => a - b`.
13. **Slide 13 – Advanced Objects:** Computed Property Names (`[expression]`) and the universal React form handler pattern.
14. **Slide 14 – Object Merging:** `Object.assign()` vs Modern Object Spread (`...`).
15. **Slide 15 – Object Immutability:** `Object.freeze()` (full lock) vs `Object.seal()` (fixed schema).
16. **Slide 16 – Destructuring:** Unpacking arrays and objects, variable renaming, and fallback defaults.
17. **Slide 17 – Destructuring in Functions & React Props:** Clean function signatures and React component props preview.
18. **Slide 18 – The Spread Operator (...):** Expanding arrays and immutable object state updates.
19. **Slide 19 – The Rest Operator (...):** Gathering function parameters and excluding sensitive object properties.
20. **Slide 20 – Optional Chaining (?.):** Safe deep property navigation without `TypeError` crashes.
21. **Slide 21 – Nullish Coalescing (??):** Precise fallback defaults vs truthy/falsy flaws in `||`.
22. **Slide 22 – Project 1: To-Do List Architecture & State Model:** State design with array of objects and immutable update mapping.
23. **Slide 23 – Project 1: Interactive To-Do List Application:** Fully working embedded live To-Do app with add, toggle, and delete.
24. **Slide 24 – Project 2: User Data Transformation Pipeline:** Complete interactive pipeline combining `filter`, `map`, `reduce`, and `spread`.
25. **Slide 25 – Practice Questions: Simple Challenges (Questions Only):** 6 curated foundational exercises on `map`, `filter`, `find`, `includes`, `Object.keys/values`, and `slice`.
26. **Slide 26 – Practice Questions: Intermediate Challenges (Questions Only):** 6 curated intermediate exercises on method chaining, cart calculation, frequency mapping, cohort audit, immutable sorting, and currency conversion.

---

## Practice Questions Bank (Questions Only)

### Simple Questions (Slide 25)
1. **Uppercase Name Converter (`map`):** Given `["arun", "divya", "karthik"]`, return an array with all names in uppercase.
2. **Extract Passing Exam Scores (`filter`):** Given `[45, 82, 90, 33, 67, 58]`, extract marks $\ge 60$.
3. **Find User Record by ID (`find`):** Given `[{id: 101, name: "Anita"}, {id: 102, name: "Bala"}, {id: 103, name: "Charan"}]`, find the user with `id: 102`.
4. **Verify Allowed Role (`includes`):** Given `["admin", "editor", "viewer"]`, check whether `"manager"` is permitted.
5. **Extract Keys and Values (`Object.keys/values`):** Given `{ name: "Laptop", price: 54000, inStock: true }`, extract an array of keys and an array of values.
6. **Extract Top 3 Colors Immutably (`slice`):** Given `["Red", "Green", "Blue", "Yellow", "Purple"]`, extract the first 3 colors into a new array.

### Intermediate Questions (Slide 26)
1. **Filter & Extract Product Titles (`filter + map`):** Given a product list, extract titles of only `"Electronics"` items priced under 1000.
2. **Compute Cart Grand Total (`reduce`):** Given a cart with `{ item, qty, price }`, compute the grand total cost.
3. **Action Frequency Map (`reduce`):** Given `["login", "click", "click", "logout", "login", "click"]`, return `{ login: 2, click: 3, logout: 1 }`.
4. **Cohort Audit Validation (`some & every`):** (a) Test if at least one student scored below 50. (b) Test if every student scored above 40.
5. **Immutable Salary Ranking (`slice + sort`):** Return a new array of employees sorted in descending order of salary without mutating the original array.
6. **Batch Currency Multiplier (`Object.entries`):** Given `{ USD: 1, EUR: 0.92, GBP: 0.79 }` and conversion factor 83, return a new object with prices in INR.
