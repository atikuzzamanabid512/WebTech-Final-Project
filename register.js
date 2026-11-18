
const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", function(event) {

    event.preventDefault();

    // Get form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    const selectedRole = document.querySelector(
        'input[name="role"]:checked'
    );

    const roleError = document.getElementById("roleError");
    const message = document.getElementById("message");

    roleError.textContent = "";
    message.textContent = "";

    // Check role
    if (!selectedRole) {
        roleError.textContent = "Please select your role.";
        return;
    }

    // Check password
    if (password.length < 6) {
        message.style.color = "red";
        message.textContent = "Password must be at least 6 characters.";
        return;
    }

    // Confirm password
    if (password !== confirmPassword) {
        message.style.color = "red";
        message.textContent = "Passwords do not match!";
        return;
    }

    // Get registered users
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check duplicate email
    const existingUser = users.find(function(user) {
        return user.email.toLowerCase() === email.toLowerCase();
    });

    if (existingUser) {
        message.style.color = "red";
        message.textContent = "Email already registered!";
        return;
    }

    // Create new user
    const newUser = {
        name: name,
        email: email,
        password: password,
        role: selectedRole.value
    };

    // Save user
    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    // Show success message
    message.style.color = "green";
    message.textContent = "Registration successful! Redirecting to login...";

    // Go to login page
    setTimeout(function() {
        window.location.replace("login.html");
    }, 1000);

});
