
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const message = document.getElementById("errorMessage");

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const loggedInUser = users.find(function(user) {
        return user.email.toLowerCase() === email.toLowerCase()
            && user.password === password;
    });

    if (!loggedInUser) {
        message.style.color = "red";
        message.textContent = "Invalid email or password!";
        return;
    }

    // Save current user information
    sessionStorage.setItem("currentUser", JSON.stringify({
        name: loggedInUser.name,
        email: loggedInUser.email,
        role: loggedInUser.role
    }));

    message.style.color = "green";
    message.textContent = "Login successful! Redirecting...";

    setTimeout(function() {

        if (loggedInUser.role === "student") {
            window.location.href = "student-dashboard.html";

        } else if (loggedInUser.role === "teacher") {
            window.location.href = "instructor-dashboard.html";

        } else if (loggedInUser.role === "admin") {
            window.location.href = "admin-dashboard.html";

        } else {
            message.style.color = "red";
            message.textContent = "Invalid user role!";
        }

    }, 500);
});
