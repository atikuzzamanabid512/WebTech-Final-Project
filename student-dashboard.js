
// Check logged-in user

let currentUser = JSON.parse(
    sessionStorage.getItem("currentUser")
);

// Only students can access this dashboard

if (!currentUser || currentUser.role !== "student") {
    window.location.href = "login.html";
} else {
    document.getElementById("studentName").textContent =
        currentUser.name;
}


// Get saved student data

let studentData = JSON.parse(
    localStorage.getItem("student_" + currentUser.email)
) || {
    courses: [],
    assignment: "",
    quizScore: null,
    notifications: [
        "Welcome to the LMS Student Dashboard!",
        "Check your courses and assignments regularly."
    ],
    grades: []
};


// Save student data

function saveStudentData() {
    localStorage.setItem(
        "student_" + currentUser.email,
        JSON.stringify(studentData)
    );
}


// Update dashboard information

function updateDashboard() {

    document.getElementById("courseCount").textContent =
        studentData.courses.length;

    let progress = studentData.courses.length > 0 ? 25 : 0;

    if (studentData.assignment) progress += 25;
    if (studentData.quizScore !== null) progress += 50;

    document.getElementById("progressSummary").textContent =
        progress + "%";

    document.getElementById("progressBar").style.width =
        progress + "%";

    document.getElementById("progressText").textContent =
        progress + "% completed";


    // Show enrolled courses

    let courseList = document.getElementById("enrolledCourses");

    courseList.innerHTML = "";

    if (studentData.courses.length === 0) {
        courseList.innerHTML =
            "<li>You have not enrolled in any courses yet.</li>";
    } else {
        studentData.courses.forEach(function(course) {
            let li = document.createElement("li");
            li.textContent = course;
            courseList.appendChild(li);
        });
    }


    // Update enroll buttons

    document.querySelectorAll(".enroll-btn").forEach(function(button) {

        let enrolled = studentData.courses.includes(
            button.dataset.course
        );

        button.disabled = enrolled;
        button.textContent = enrolled ? "Enrolled" : "Enroll in Course";

    });


    // Show notifications

    let notificationList =
        document.getElementById("notificationList");

    notificationList.innerHTML = "";

    studentData.notifications.forEach(function(notification) {
        let li = document.createElement("li");
        li.textContent = notification;
        notificationList.appendChild(li);
    });


    // Show grades

    let gradesTable = document.getElementById("gradesTable");

    gradesTable.innerHTML = "";

    if (studentData.quizScore === null) {
        gradesTable.innerHTML = `
            <tr>
                <td>Web Development</td>
                <td>HTML Quiz</td>
                <td>Not graded</td>
            </tr>
        `;
    } else {
        gradesTable.innerHTML = `
            <tr>
                <td>Web Development</td>
                <td>HTML Quiz</td>
                <td>${studentData.quizScore}/100</td>
            </tr>
        `;
    }

}


// Enroll in Courses

document.querySelectorAll(".enroll-btn").forEach(function(button) {

    button.addEventListener("click", function() {

        let courseName = button.dataset.course;

        if (!studentData.courses.includes(courseName)) {

            studentData.courses.push(courseName);

            studentData.notifications.unshift(
                "You successfully enrolled in " + courseName + "."
            );

            saveStudentData();
            updateDashboard();

            alert("Successfully enrolled in " + courseName);

        }

    });

});


// Submit Assignment

document.getElementById("assignmentForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        let submission =
            document.getElementById("assignmentText").value.trim();

        if (submission === "") {
            return;
        }

        studentData.assignment = submission;

        studentData.notifications.unshift(
            "Your HTML assignment has been submitted."
        );

        saveStudentData();
        updateDashboard();

        document.getElementById("assignmentMessage").textContent =
            "Assignment submitted successfully!";

        document.getElementById("assignmentForm").reset();

    });


// Attempt Quiz

document.getElementById("quizForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        let answer = document.querySelector(
            'input[name="answer"]:checked'
        );

        let quizResult = document.getElementById("quizResult");

        if (!answer) {
            quizResult.textContent = "Please select an answer!";
            return;
        }

        if (studentData.quizScore !== null) {
            quizResult.textContent =
                "You have already submitted this demo quiz. Your score is "
                + studentData.quizScore + "/100.";
            return;
        }

        if (answer.value === "a") {

            studentData.quizScore = 100;

            quizResult.textContent =
                "Correct answer! Your score is 100/100.";

        } else {

            studentData.quizScore = 0;

            quizResult.textContent =
                "Incorrect answer. Your score is 0/100.";

        }

        studentData.notifications.unshift(
            "You completed the HTML Basic Quiz."
        );

        saveStudentData();
        updateDashboard();

        document.querySelectorAll(
            'input[name="answer"]'
        ).forEach(function(input) {
            input.disabled = true;
        });

        document.querySelector(
            '#quizForm button[type="submit"]'
        ).disabled = true;

    });


// Logout

document.getElementById("logoutBtn").addEventListener("click", function() {

    sessionStorage.removeItem("currentUser");

    window.location.href = "login.html";

});


// Load saved information

updateDashboard();
