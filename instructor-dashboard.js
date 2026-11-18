// check if teacher is logged in
var currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

if (currentUser == null || currentUser.role != "teacher") {
    window.location.href = "login.html";
} else {
    document.getElementById("instructorName").textContent = currentUser.name;
}

// logout
document.getElementById("logoutBtn").addEventListener("click", function () {
    sessionStorage.removeItem("currentUser");
    window.location.href = "login.html";
});

// arrays to store data
var courses = [];
var quizzes = [];
var assignments = [];
var materials = [];
var feedbacks = [];

// update the numbers in summary cards
function updateSummary() {
    var cards = document.querySelectorAll(".summary-card p");
    cards[0].textContent = courses.length;
    cards[1].textContent = quizzes.length;
    cards[2].textContent = assignments.length;
}

// ---------- Courses ----------
document.getElementById("courseForm").addEventListener("submit", function (e) {
    e.preventDefault();

    var name = document.getElementById("courseName").value;
    var description = document.getElementById("courseDescription").value;

    courses.push({ name: name, description: description });

    showCourses();
    document.getElementById("courseMessage").textContent = "Course created successfully!";
    document.getElementById("courseForm").reset();
    updateSummary();
});

function showCourses() {
    var list = document.getElementById("courseList");
    list.innerHTML = "";

    for (var i = 0; i < courses.length; i++) {
        var li = document.createElement("li");
        li.textContent = courses[i].name + " - " + courses[i].description;
        list.appendChild(li);
    }
}

// ---------- Quizzes ----------
document.getElementById("quizForm").addEventListener("submit", function (e) {
    e.preventDefault();

    var name = document.getElementById("quizName").value;
    var description = document.getElementById("quizDescription").value;

    quizzes.push({ name: name, description: description });

    showQuizzes();
    document.getElementById("quizMessage").textContent = "Quiz created successfully!";
    document.getElementById("quizForm").reset();
    updateSummary();
});

function showQuizzes() {
    var list = document.getElementById("quizList");
    list.innerHTML = "";

    for (var i = 0; i < quizzes.length; i++) {
        var li = document.createElement("li");
        li.textContent = quizzes[i].name + " - " + quizzes[i].description;
        list.appendChild(li);
    }
}

// ---------- Assignments ----------
document.getElementById("assignmentForm").addEventListener("submit", function (e) {
    e.preventDefault();

    var name = document.getElementById("assignmentName").value;
    var description = document.getElementById("assignmentDescription").value;

    assignments.push({ name: name, description: description });

    showAssignments();
    document.getElementById("assignmentMessage").textContent = "Assignment created successfully!";
    document.getElementById("assignmentForm").reset();
    updateSummary();
});

function showAssignments() {
    var list = document.getElementById("assignmentList");
    list.innerHTML = "";

    for (var i = 0; i < assignments.length; i++) {
        var li = document.createElement("li");
        li.textContent = assignments[i].name + " - " + assignments[i].description;
        list.appendChild(li);
    }
}

// ---------- Learning Materials ----------
document.getElementById("materialForm").addEventListener("submit", function (e) {
    e.preventDefault();

    var name = document.getElementById("materialName").value;
    var file = document.getElementById("materialFile").files[0];

    if (!file) {
        alert("Please select a file.");
        return;
    }

    materials.push({ name: name, fileName: file.name });

    showMaterials();
    document.getElementById("materialMessage").textContent = "Material added successfully!";
    document.getElementById("materialForm").reset();
});

function showMaterials() {
    var list = document.getElementById("materialList");
    list.innerHTML = "";

    for (var i = 0; i < materials.length; i++) {
        var li = document.createElement("li");
        li.textContent = materials[i].name + " - " + materials[i].fileName;
        list.appendChild(li);
    }
}

// ---------- Feedback ----------
document.getElementById("feedbackForm").addEventListener("submit", function (e) {
    e.preventDefault();

    var student = document.getElementById("studentName").value;
    var text = document.getElementById("feedbackText").value;

    feedbacks.push({ student: student, feedback: text });

    showFeedback();
    document.getElementById("feedbackMessage").textContent = "Feedback submitted successfully!";
    document.getElementById("feedbackForm").reset();
});

function showFeedback() {
    var list = document.getElementById("feedbackList");
    list.innerHTML = "";

    for (var i = 0; i < feedbacks.length; i++) {
        var li = document.createElement("li");
        li.textContent = feedbacks[i].student + ": " + feedbacks[i].feedback;
        list.appendChild(li);
    }
}

// show 0 in the cards when page loads
updateSummary();