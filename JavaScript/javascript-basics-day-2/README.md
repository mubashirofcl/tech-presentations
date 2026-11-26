# JavaScript Fundamentals – Day 2 Presentation

## Advanced Arrays, Objects, Higher-Order Methods & Modern ES6+
**Target Audience:** Students with Python foundations preparing for React and Generative AI development.  
**Total Slides:** Exactly 22 slides.  
**Curriculum Adjustments:** Streamlined presentation focusing directly on core functional array methods, reference vs value memory models, destructuring, spread/rest, optional chaining, hands-on projects, and practice challenge banks.

---

## Complete 22-Slide Syllabus Breakdown

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
13. **Slide 13 – Object Immutability:** `Object.freeze()` (full lock) vs `Object.seal()` (fixed schema).
14. **Slide 14 – Destructuring:** Unpacking arrays and objects, variable renaming, and fallback defaults.
15. **Slide 15 – The Spread Operator (...):** Expanding arrays and immutable object state updates.
16. **Slide 16 – The Rest Operator (...):** Gathering function parameters and excluding sensitive object properties.
17. **Slide 17 – Optional Chaining (?.):** Safe deep property navigation without `TypeError` crashes.
18. **Slide 18 – Project 1: To-Do List Architecture & State Model:** State design with array of objects and immutable update mapping.
19. **Slide 19 – Project 1: Interactive To-Do List Application:** Fully working embedded live To-Do app with add, toggle, and delete.
20. **Slide 20 – Project 2: User Data Transformation Pipeline:** Complete interactive pipeline combining `filter`, `map`, `reduce`, and `spread`.
21. **Slide 21 – Practice Questions: Simple Challenges (Questions Only):** 6 curated foundational exercises on `map`, `filter`, `find`, `includes`, `Object.keys/values`, and `slice`.
22. **Slide 22 – Practice Questions: Intermediate Challenges (Questions Only):** 6 curated intermediate exercises on method chaining, cart calculation, frequency mapping, cohort audit, immutable sorting, and currency conversion.

---

## Practice Questions Bank (Questions Only)

### Simple Questions (Slide 21)
1. **Uppercase Name Converter (`map`):** Given `["arun", "divya", "karthik"]`, return an array with all names in uppercase.
2. **Extract Passing Exam Scores (`filter`):** Given `[45, 82, 90, 33, 67, 58]`, extract marks $\ge 60$.
3. **Find User Record by ID (`find`):** Given `[{id: 101, name: "Anita"}, {id: 102, name: "Bala"}, {id: 103, name: "Charan"}]`, find the user with `id: 102`.
4. **Verify Allowed Role (`includes`):** Given `["admin", "editor", "viewer"]`, check whether `"manager"` is permitted.
5. **Extract Keys and Values (`Object.keys/values`):** Given `{ name: "Laptop", price: 54000, inStock: true }`, extract an array of keys and an array of values.
6. **Extract Top 3 Colors Immutably (`slice`):** Given `["Red", "Green", "Blue", "Yellow", "Purple"]`, extract the first 3 colors into a new array.

### Intermediate Questions (Slide 22)
1. **Filter & Extract Product Titles (`filter + map`):** Given a product list, extract titles of only `"Electronics"` items priced under 1000.
2. **Compute Cart Grand Total (`reduce`):** Given a cart with `{ item, qty, price }`, compute the grand total cost.
3. **Action Frequency Map (`reduce`):** Given `["login", "click", "click", "logout", "login", "click"]`, return `{ login: 2, click: 3, logout: 1 }`.
4. **Cohort Audit Validation (`some & every`):** (a) Test if at least one student scored below 50. (b) Test if every student scored above 40.
5. **Immutable Salary Ranking (`slice + sort`):** Return a new array of employees sorted in descending order of salary without mutating the original array.
6. **Batch Currency Multiplier (`Object.entries`):** Given `{ USD: 1, EUR: 0.92, GBP: 0.79 }` and conversion factor 83, return a new object with prices in INR.
