
// Get logged-in teacher information
let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

// Check teacher login
if (!currentUser || currentUser.role !== "teacher") {
    window.location.href = "login.html";
} else {
    document.getElementById("instructorName").textContent =
        currentUser.name;
}


// Logout Function
document.getElementById("logoutBtn").addEventListener("click", function() {
    sessionStorage.removeItem("currentUser");
    window.location.href = "login.html";
});


// Get HTML Elements
const courseForm = document.getElementById("courseForm");
const quizForm = document.getElementById("quizForm");
const assignmentForm = document.getElementById("assignmentForm");
const materialForm = document.getElementById("materialForm");
const feedbackForm = document.getElementById("feedbackForm");


// Dashboard Data
let courses = [];
let quizzes = [];
let assignments = [];
let materials = [];
let feedbacks = [];


// Update Dashboard Summary
function updateSummary() {
    document.querySelectorAll(".summary-card p")[0].textContent = courses.length;
    document.querySelectorAll(".summary-card p")[1].textContent = quizzes.length;
    document.querySelectorAll(".summary-card p")[2].textContent = assignments.length;
}


// Create Courses
courseForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("courseName").value;
    let description = document.getElementById("courseDescription").value;

    courses.push({
        name: name,
        description: description
    });

    displayCourses();

    document.getElementById("courseMessage").textContent =
        "Course created successfully!";

    courseForm.reset();

    updateSummary();
});

function displayCourses() {
    let courseList = document.getElementById("courseList");

    courseList.innerHTML = "";

    courses.forEach(function(course) {
        let li = document.createElement("li");

        li.textContent = course.name + " - " + course.description;

        courseList.appendChild(li);
    });
}


// Create Quizzes
quizForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("quizName").value;
    let description = document.getElementById("quizDescription").value;

    quizzes.push({
        name: name,
        description: description
    });

    displayQuizzes();

    document.getElementById("quizMessage").textContent =
        "Quiz created successfully!";

    quizForm.reset();

    updateSummary();
});

function displayQuizzes() {
    let quizList = document.getElementById("quizList");

    quizList.innerHTML = "";

    quizzes.forEach(function(quiz) {
        let li = document.createElement("li");

        li.textContent = quiz.name + " - " + quiz.description;

        quizList.appendChild(li);
    });
}


// Manage Assignments
assignmentForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("assignmentName").value;
    let description = document.getElementById("assignmentDescription").value;

    assignments.push({
        name: name,
        description: description
    });

    displayAssignments();

    document.getElementById("assignmentMessage").textContent =
        "Assignment created successfully!";

    assignmentForm.reset();

    updateSummary();
});

function displayAssignments() {
    let assignmentList = document.getElementById("assignmentList");

    assignmentList.innerHTML = "";

    assignments.forEach(function(assignment) {
        let li = document.createElement("li");

        li.textContent = assignment.name + " - " + assignment.description;

        assignmentList.appendChild(li);
    });
}


// Upload Learning Materials
materialForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("materialName").value;
    let file = document.getElementById("materialFile").files[0];

    if (!file) {
        alert("Please select a file.");
        return;
    }

    materials.push({
        name: name,
        fileName: file.name
    });

    displayMaterials();

    document.getElementById("materialMessage").textContent =
        "Material added successfully!";

    materialForm.reset();
});

function displayMaterials() {
    let materialList = document.getElementById("materialList");

    materialList.innerHTML = "";

    materials.forEach(function(material) {
        let li = document.createElement("li");

        li.textContent = material.name + " - " + material.fileName;

        materialList.appendChild(li);
    });
}


// Provide Feedback
feedbackForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let student = document.getElementById("studentName").value;
    let feedback = document.getElementById("feedbackText").value;

    feedbacks.push({
        student: student,
        feedback: feedback
    });

    displayFeedback();

    document.getElementById("feedbackMessage").textContent =
        "Feedback submitted successfully!";

    feedbackForm.reset();
});

function displayFeedback() {
    let feedbackList = document.getElementById("feedbackList");

    feedbackList.innerHTML = "";

    feedbacks.forEach(function(item) {
        let li = document.createElement("li");

        li.textContent = item.student + ": " + item.feedback;

        feedbackList.appendChild(li);
    });
}


// Initial Summary
updateSummary();
