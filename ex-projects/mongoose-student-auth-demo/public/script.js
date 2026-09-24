// ===================================================================
// Helper Function: Show status messages in the UI card
// ===================================================================
function showMessage(text, isSuccess) {
  const messageBox = document.getElementById("messageBox");
  if (messageBox) {
    messageBox.textContent = text;
    messageBox.className = "message-box " + (isSuccess ? "success" : "error");
  }
}

// ===================================================================
// PART 1: Handle Student Signup Form Submission
// Flow:
// User clicks "Create Account"
//   -> Read form values
//   -> fetch('/signup', POST, JSON)
//   -> Wait for response from Express & Mongoose
//   -> Display success or error message
// ===================================================================
const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", async (event) => {
    // Prevent the default browser form submission (which reloads the page)
    event.preventDefault();

    // 1. Grab values from the input fields
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const age = document.getElementById("age").value;
    const course = document.getElementById("course").value;

    const signupBtn = document.getElementById("signupBtn");
    if (signupBtn) signupBtn.disabled = true;

    try {
      // 2. Send POST request to the Express backend with JSON body
      const response = await fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password,
          age,
          course
        })
      });

      // 3. Parse JSON response from the server
      const data = await response.json();

      // 4. Update the UI message box and trigger an alert
      showMessage(data.message, data.success);
      alert(data.message);

      // If signup was successful, clear the form
      if (data.success) {
        signupForm.reset();
      }

    } catch (error) {
      console.error("Network or fetch error:", error);
      showMessage("Failed to connect to server. Is the server running?", false);
      alert("Failed to connect to server. Is the server running?");
    } finally {
      if (signupBtn) signupBtn.disabled = false;
    }
  });
}

// ===================================================================
// PART 2: Handle Student Login Form Submission
// Flow:
// User clicks "Login"
//   -> Read email & password
//   -> fetch('/login', POST, JSON)
//   -> Backend searches MongoDB with Student.findOne()
//   -> Display welcome message or authentication error
// ===================================================================
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    // Prevent default page reload
    event.preventDefault();

    // 1. Grab credentials from form
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const loginBtn = document.getElementById("loginBtn");
    if (loginBtn) loginBtn.disabled = true;

    try {
      // 2. Send POST request to /login route
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      // 3. Parse JSON response from server
      const data = await response.json();

      // 4. Update UI message box and trigger alert
      showMessage(data.message, data.success);
      alert(data.message);

      if (data.success) {
        loginForm.reset();
      }

    } catch (error) {
      console.error("Network or fetch error:", error);
      showMessage("Failed to connect to server. Is the server running?", false);
      alert("Failed to connect to server. Is the server running?");
    } finally {
      if (loginBtn) loginBtn.disabled = false;
    }
  });
}
