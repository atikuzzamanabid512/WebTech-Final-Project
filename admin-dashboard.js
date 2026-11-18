
// Get Logged-in Admin
let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

// Check Admin Login
if (!currentUser || currentUser.role !== "admin") {
    window.location.href = "login.html";
} else {
    document.getElementById("adminName").textContent = currentUser.name;
}


// Logout Function
document.getElementById("logoutBtn").addEventListener("click", function() {
    sessionStorage.removeItem("currentUser");
    window.location.href = "login.html";
});


// Get Registered Users
let users = JSON.parse(localStorage.getItem("users")) || [];


// Display Users
function displayUsers() {

    let userTable = document.getElementById("userTable");

    userTable.innerHTML = "";

    if (users.length === 0) {
        userTable.innerHTML =
            '<tr><td colspan="3">No users available.</td></tr>';
        return;
    }

    users.forEach(function(user) {

        let row = document.createElement("tr");

        let nameCell = document.createElement("td");
        let emailCell = document.createElement("td");
        let roleCell = document.createElement("td");

        nameCell.textContent = user.name;
        emailCell.textContent = user.email;
        roleCell.textContent = user.role;

        row.appendChild(nameCell);
        row.appendChild(emailCell);
        row.appendChild(roleCell);

        userTable.appendChild(row);

    });
}


// Display User Count
document.getElementById("userCount").textContent = users.length;


// Display Courses
let courses = JSON.parse(localStorage.getItem("courses")) || [];

let courseTable = document.getElementById("courseTable");

if (courses.length === 0) {

    courseTable.innerHTML =
        '<tr><td colspan="4">No courses available.</td></tr>';

} else {

    courseTable.innerHTML = "";

    courses.forEach(function(course, index) {

        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td></td>
            <td></td>
            <td>Available</td>
        `;

        row.children[1].textContent = course.name;
        row.children[2].textContent = course.instructor || "Not assigned";

        courseTable.appendChild(row);

    });

}


// Display Course Count
document.getElementById("courseCount").textContent = courses.length;


// View System Reports
document.getElementById("reportText").textContent =
    "Total Registered Users: " + users.length +
    " | Total Courses: " + courses.length;


// Display Users and Reports
displayUsers();


// Manage System Settings
document.getElementById("settingsForm").addEventListener("submit", function(event) {

    event.preventDefault();

    let systemName = document.getElementById("systemName").value;
    let adminEmail = document.getElementById("adminEmail").value;

    let settings = {
        systemName: systemName,
        adminEmail: adminEmail
    };

    localStorage.setItem("systemSettings", JSON.stringify(settings));

    document.getElementById("settingsMessage").textContent =
        "System settings saved successfully!";

});
