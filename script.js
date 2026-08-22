/* =========================================================
   CT RESULT ANALYSIS WEBSITE
   Main JavaScript File
   ========================================================= */


/* =========================================================
   1. HELPER FUNCTION
   ========================================================= */

const $ = (selector) => {
    return document.querySelector(selector);
};


/* =========================================================
   2. GLOBAL VARIABLES
   ========================================================= */

const content = $("#content");

let currentUser = null;


/* =========================================================
   3. DEMO RESULT DATA
   ========================================================= */

let demoResults = [

    {
        id: "CS101",
        name: "Aarav Sharma",
        subject: "Java",
        ct: "CT-1",
        max: 30,
        marks: 26,
        status: "Pass"
    },

    {
        id: "CS102",
        name: "Priya Verma",
        subject: "Java",
        ct: "CT-1",
        max: 30,
        marks: 22,
        status: "Pass"
    },

    {
        id: "CS103",
        name: "Rohan Singh",
        subject: "Java",
        ct: "CT-1",
        max: 30,
        marks: 14,
        status: "Pass"
    },

    {
        id: "CS104",
        name: "Neha Patel",
        subject: "Java",
        ct: "CT-1",
        max: 30,
        marks: 9,
        status: "Fail"
    },

    {
        id: "CS105",
        name: "Vivek Kumar",
        subject: "Java",
        ct: "CT-1",
        max: 30,
        marks: 28,
        status: "Pass"
    }

];


/* =========================================================
   4. TOAST MESSAGE
   ========================================================= */

function showToast(message) {

    const toast = $("#toast");

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2200);

}


/* =========================================================
   5. LOGIN / REGISTER TABS
   ========================================================= */

document.querySelectorAll(".tab").forEach((button) => {

    button.onclick = () => {

        document.querySelectorAll(".tab").forEach((btn) => {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        const isLogin =
            button.dataset.auth === "login";


        $("#loginForm")
            .classList
            .toggle("hidden", !isLogin);


        $("#registerForm")
            .classList
            .toggle("hidden", isLogin);

    };

});


/* =========================================================
   6. STUDENT / TEACHER REGISTRATION FIELDS
   ========================================================= */

$("#regRole").onchange = () => {

    const student =
        $("#regRole").value === "student";


    $("#studentFields")
        .classList
        .toggle("hidden", !student);


    $("#teacherFields")
        .classList
        .toggle("hidden", student);

};


/* =========================================================
   7. LOGIN
   ========================================================= */

$("#loginForm").onsubmit = (event) => {

    event.preventDefault();


    const id =
        $("#loginId").value.trim();


    const password =
        $("#loginPassword").value;


    const role =
        $("#loginRole").value;


    if (!id || !password) {

        showToast(
            "Please enter College ID and password."
        );

        return;

    }


    currentUser = {

        id: id,

        name: id,

        role: role

    };


    localStorage.setItem(
        "ctUser",
        JSON.stringify(currentUser)
    );


    showToast("Login successful.");


    setTimeout(() => {

        openApp();

    }, 500);

};


/* =========================================================
   8. REGISTRATION
   ========================================================= */

$("#registerForm").onsubmit = (event) => {

    event.preventDefault();


    const id =
        $("#regId").value.trim();


    const name =
        $("#regName").value.trim();


    const email =
        $("#regEmail").value.trim();


    const password =
        $("#regPassword").value;


    const confirmPassword =
        $("#regConfirmPassword").value;


    const role =
        $("#regRole").value;


    /* Check Password */

    if (password !== confirmPassword) {

        showToast(
            "Passwords do not match."
        );

        return;

    }


    /* Basic validation */

    if (!id || !name || !email || !password) {

        showToast(
            "Please fill all required fields."
        );

        return;

    }


    /* Create user */

    currentUser = {

        id: id,

        name: name,

        email: email,

        role: role

    };


    /* Save demo account */

    localStorage.setItem(
        "ctUser",
        JSON.stringify(currentUser)
    );


    showToast(
        "Account created successfully."
    );


    setTimeout(() => {

        openApp();

    }, 500);

};


/* =========================================================
   9. LOGOUT
   ========================================================= */

$("#logoutBtn").onclick = () => {

    currentUser = null;

    localStorage.removeItem("ctUser");


    $("#appPage")
        .classList
        .add("hidden");


    $("#authPage")
        .classList
        .remove("hidden");


    showToast(
        "Logged out successfully."
    );

};


/* =========================================================
   10. MOBILE MENU
   ========================================================= */

$("#menuBtn").onclick = () => {

    $(".sidebar")
        .classList
        .toggle("open");

};


/* =========================================================
   11. OPEN APPLICATION
   ========================================================= */

function openApp() {

    $("#authPage")
        .classList
        .add("hidden");


    $("#appPage")
        .classList
        .remove("hidden");


    $("#userName").textContent =
        currentUser.name;


    $("#userRole").textContent =
        currentUser.role.toUpperCase();


    $("#userAvatar").textContent =
        currentUser.name
            .charAt(0)
            .toUpperCase();


    buildNavigation();


    renderDashboard();

}


/* =========================================================
   12. BUILD NAVIGATION
   ========================================================= */

function buildNavigation() {

    const commonItems = [

        ["dashboard", "📊 Dashboard"],

        ["results", "📋 Results"],

        ["analysis", "📈 Performance Analysis"],

        ["reports", "📄 Reports"],

        ["profile", "👤 My Profile"]

    ];


    const teacherItems = [

        ["students", "🎓 Student Management"],

        ["marks", "✏️ Marks Entry"]

    ];


    const adminItems = [

        ["users", "👥 User Management"],

        ["settings", "⚙️ Settings"]

    ];


    let items = [];


    if (currentUser.role === "admin") {

        items =
            commonItems.concat(adminItems);

    }

    else if (currentUser.role === "teacher") {

        items =
            commonItems.concat(teacherItems);

    }

    else {

        items =
            commonItems;

    }


    $("#navMenu").innerHTML =
        items.map(item => {

            return `
                <button
                    class="nav-btn"
                    data-page="${item[0]}">

                    ${item[1]}

                </button>
            `;

        }).join("");


    document
        .querySelectorAll(".nav-btn")
        .forEach(button => {

            button.onclick = () => {

                navigate(
                    button.dataset.page
                );

            };

        });


    const firstButton =
        document.querySelector(".nav-btn");


    if (firstButton) {

        firstButton.classList.add(
            "active"
        );

    }

}


/* =========================================================
   13. PAGE NAVIGATION
   ========================================================= */

function navigate(page) {

    document
        .querySelectorAll(".nav-btn")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.page === page
            );

        });


    $(".sidebar")
        .classList
        .remove("open");


    const titles = {

        dashboard:
            "Dashboard",

        results:
            "Results",

        analysis:
            "Performance Analysis",

        reports:
            "Reports",

        profile:
            "My Profile",

        users:
            "User Management",

        settings:
            "Settings",

        students:
            "Student Management",

        marks:
            "Marks Entry"

    };


    $("#pageTitle").textContent =
        titles[page] || "Dashboard";


    $("#welcomeText").textContent =
        "CT Result Analysis Management System";


    switch (page) {

        case "dashboard":
            renderDashboard();
            break;

        case "results":
            renderResults();
            break;

        case "analysis":
            renderAnalysis();
            break;

        case "reports":
            renderReports();
            break;

        case "profile":
            renderProfile();
            break;

        case "users":
            renderUsers();
            break;

        case "settings":
            renderSettings();
            break;

        case "students":
            renderStudents();
            break;

        case "marks":
            renderMarks();
            break;

        default:
            renderDashboard();

    }

}


/* =========================================================
   14. DASHBOARD
   ========================================================= */

function renderDashboard() {

    const total =
        demoResults.length;


    const totalMarks =
        demoResults.reduce(
            (sum, student) =>
                sum + student.marks,
            0
        );


    const average =
        Math.round(
            totalMarks / total
        );


    const passStudents =
        demoResults.filter(
            student =>
                student.status === "Pass"
        ).length;


    const passPercentage =
        Math.round(
            passStudents /
            total *
            100
        );


    content.innerHTML = `

        <div class="grid stats">

            <div class="stat-card">

                <div class="icon">
                    👨‍🎓
                </div>

                <h3>
                    ${currentUser.role === "student"
                        ? "1"
                        : total}
                </h3>

                <p>
                    Total Students
                </p>

            </div>


            <div class="stat-card">

                <div class="icon">
                    📊
                </div>

                <h3>
                    ${average}/30
                </h3>

                <p>
                    Class Average
                </p>

            </div>


            <div class="stat-card">

                <div class="icon">
                    ✅
                </div>

                <h3>
                    ${passPercentage}%
                </h3>

                <p>
                    Pass Percentage
                </p>

            </div>


            <div class="stat-card">

                <div class="icon">
                    🏆
                </div>

                <h3>
                    28/30
                </h3>

                <p>
                    Highest Marks
                </p>

            </div>

        </div>


        <div class="grid dashboard-grid">

            <!-- Performance Chart -->

            <div class="card">

                <div class="section-title">

                    <h3>
                        CT Performance Overview
                    </h3>

                    <span class="muted">
                        Java • CT Performance
                    </span>

                </div>


                <div class="bar-chart">

                    ${createChartBars()}

                </div>

            </div>


            <!-- Recent Results -->

            <div class="card">

                <div class="section-title">

                    <h3>
                        Recent Results
                    </h3>

                    <button
                        class="btn"
                        onclick="navigate('results')">

                        View All

                    </button>

                </div>


                ${demoResults
                    .slice(0, 4)
                    .map(student => {

                        return `

                            <div
                                style="
                                display:flex;
                                justify-content:space-between;
                                padding:11px 0;
                                border-bottom:
                                1px solid var(--border);
                                ">

                                <div>

                                    <strong>
                                        ${student.name}
                                    </strong>

                                    <div class="muted">

                                        ${student.subject}
                                        •
                                        ${student.ct}

                                    </div>

                                </div>


                                <strong>

                                    ${student.marks}/${student.max}

                                </strong>

                            </div>

                        `;

                    }).join("")}

            </div>

        </div>

    `;

}


/* =========================================================
   15. CREATE CHART
   ========================================================= */

function createChartBars() {

    const values = [
        68,
        76,
        54,
        82,
        93
    ];


    return values.map(
        (value, index) => {

            return `

                <div class="bar">

                    <span>
                        ${value}%
                    </span>

                    <i
                        style="
                        height:${value}%;
                        ">
                    </i>

                    <span>
                        CT-${index + 1}
                    </span>

                </div>

            `;

        }
    ).join("");

}


/* =========================================================
   16. RESULT PAGE
   ========================================================= */

function renderResults() {

    content.innerHTML = `

        <div class="card">

            <div class="section-title">

                <h3>
                    Result Management
                </h3>


                <button
                    class="btn success"
                    onclick="exportResults()">

                    ⬇ Export

                </button>

            </div>


            <!-- Search / Filters -->

            <div class="toolbar">

                <input
                    id="search"
                    type="text"
                    placeholder="Search student...">


                <select id="subjectFilter">

                    <option>
                        All Subjects
                    </option>

                    <option>
                        Java
                    </option>

                    <option>
                        Data Structures
                    </option>

                    <option>
                        Database
                    </option>

                </select>


                <select id="ctFilter">

                    <option>
                        All CTs
                    </option>

                    <option>
                        CT-1
                    </option>

                    <option>
                        CT-2
                    </option>

                    <option>
                        CT-3
                    </option>

                </select>

            </div>


            <!-- Result Table -->

            <div class="table-wrap">

                <table class="table">

                    <thead>

                        <tr>

                            <th>
                                Student ID
                            </th>

                            <th>
                                Student
                            </th>

                            <th>
                                Subject
                            </th>

                            <th>
                                CT
                            </th>

                            <th>
                                Marks
                            </th>

                            <th>
                                Percentage
                            </th>

                            <th>
                                Status
                            </th>

                        </tr>

                    </thead>


                    <tbody
                        id="resultBody">
                    </tbody>

                </table>

            </div>

        </div>

    `;


    fillResults(demoResults);


    $("#search").oninput =
        filterResults;


    $("#subjectFilter").onchange =
        filterResults;


    $("#ctFilter").onchange =
        filterResults;

}


/* =========================================================
   17. FILTER RESULTS
   ========================================================= */

function filterResults() {

    const search =
        $("#search")
            .value
            .toLowerCase();


    const subject =
        $("#subjectFilter")
            .value;


    const ct =
        $("#ctFilter")
            .value;


    const filtered =
        demoResults.filter(student => {

            const matchesSearch =
                student.name
                    .toLowerCase()
                    .includes(search) ||

                student.id
                    .toLowerCase()
                    .includes(search);


            const matchesSubject =
                subject === "All Subjects" ||
                student.subject === subject;


            const matchesCT =
                ct === "All CTs" ||
                student.ct === ct;


            return (
                matchesSearch &&
                matchesSubject &&
                matchesCT
            );

        });


    fillResults(filtered);

}


/* =========================================================
   18. FILL RESULT TABLE
   ========================================================= */

function fillResults(rows) {

    const body =
        $("#resultBody");


    if (!body) return;


    if (rows.length === 0) {

        body.innerHTML = `

            <tr>

                <td
                    colspan="7"
                    class="empty">

                    No results found.

                </td>

            </tr>

        `;

        return;

    }


    body.innerHTML =
        rows.map(student => {

            const percentage =
                Math.round(
                    student.marks /
                    student.max *
                    100
                );


            const badgeClass =
                student.status === "Pass"
                    ? "pass"
                    : "fail";


            return `

                <tr>

                    <td>
                        ${student.id}
                    </td>

                    <td>
                        ${student.name}
                    </td>

                    <td>
                        ${student.subject}
                    </td>

                    <td>
                        ${student.ct}
                    </td>

                    <td>
                        ${student.marks}/${student.max}
                    </td>

                    <td>
                        ${percentage}%
                    </td>

                    <td>

                        <span
                            class="badge ${badgeClass}">

                            ${student.status}

                        </span>

                    </td>

                </tr>

            `;

        }).join("");

}


/* =========================================================
   19. EXPORT RESULTS
   ========================================================= */

function exportResults() {

    let csv =
        "Student ID,Student,Subject,CT,Maximum Marks,Obtained Marks,Percentage,Status\n";


    demoResults.forEach(student => {

        const percentage =
            Math.round(
                student.marks /
                student.max *
                100
            );


        csv +=
            `${student.id},` +
            `${student.name},` +
            `${student.subject},` +
            `${student.ct},` +
            `${student.max},` +
            `${student.marks},` +
            `${percentage}%,` +
            `${student.status}\n`;

    });


    const blob =
        new Blob(
            [csv],
            {
                type: "text/csv"
            }
        );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href = url;

    link.download =
        "CT_Result_Report.csv";


    link.click();


    URL.revokeObjectURL(url);


    showToast(
        "Result exported successfully."
    );

}


/* =========================================================
   20. PERFORMANCE ANALYSIS
   ========================================================= */

function renderAnalysis() {

    content.innerHTML = `

        <div class="grid stats">

            <div class="stat-card">

                <div class="icon">
                    📚
                </div>

                <h3>
                    4
                </h3>

                <p>
                    Subjects
                </p>

            </div>


            <div class="stat-card">

                <div class="icon">
                    🎯
                </div>

                <h3>
                    72%
                </h3>

                <p>
                    Average Performance
                </p>

            </div>


            <div class="stat-card">

                <div class="icon">
                    📈
                </div>

                <h3>
                    +8%
                </h3>

                <p>
                    Improvement
                </p>

            </div>


            <div class="stat-card">

                <div class="icon">
                    ⚠️
                </div>

                <h3>
                    1
                </h3>

                <p>
                    Needs Support
                </p>

            </div>

        </div>


        <div
            class="card"
            style="margin-top:16px">

            <div class="section-title">

                <h3>
                    Subject Performance
                </h3>

                <span class="muted">
                    Average Percentage
                </span>

            </div>


            <div class="bar-chart">

                ${createSubjectChart()}

            </div>

        </div>

    `;

}


/* =========================================================
   21. SUBJECT CHART
   ========================================================= */

function createSubjectChart() {

    const subjects = [
        "Java",
        "DSA",
        "DBMS",
        "Maths"
    ];


    const values = [
        78,
        64,
        85,
        72
    ];


    return subjects.map(
        (subject, index) => {

            return `

                <div class="bar">

                    <span>
                        ${values[index]}%
                    </span>

                    <i
                        style="
                        height:${values[index]}%;
                        ">
                    </i>

                    <span>
                        ${subject}
                    </span>

                </div>

            `;

        }
    ).join("");

}


/* =========================================================
   22. REPORTS
   ========================================================= */

function renderReports() {

    const reports = [

        "Class Result Report",

        "Subject Performance Report",

        "CT Comparison Report",

        "Student Progress Report"

    ];


    content.innerHTML = `

        <div class="card">

            <div class="section-title">

                <h3>
                    Result Reports
                </h3>

            </div>


            <div class="grid stats">

                ${reports.map(report => {

                    return `

                        <div class="stat-card">

                            <div class="icon">
                                📄
                            </div>

                            <h3
                                style="
                                font-size:17px;
                                ">

                                ${report}

                            </h3>

                            <p>
                                Generate and download
                                report
                            </p>


                            <button
                                class="btn"
                                style="
                                margin-top:12px;
                                "
                                onclick="
                                generateReport(
                                    '${report}'
                                )">

                                Generate

                            </button>

                        </div>

                    `;

                }).join("")}

            </div>

        </div>

    `;

}


/* =========================================================
   23. GENERATE REPORT
   ========================================================= */

function generateReport(reportName) {

    showToast(
        `${reportName} generated successfully.`
    );

}


/* =========================================================
   24. PROFILE
   ========================================================= */

function renderProfile() {

    let fields = [];


    if (currentUser.role === "student") {

        fields = [

            ["College ID", currentUser.id],

            ["Full Name", currentUser.name],

            [
                "College Email",
                currentUser.email ||
                "student@college.edu"
            ],

            [
                "Branch",
                "Computer Science"
            ],

            [
                "Class",
                "BCA 2nd Year"
            ],

            [
                "Section",
                "A"
            ],

            [
                "Semester",
                "3"
            ]

        ];

    }

    else if (
        currentUser.role === "teacher"
    ) {

        fields = [

            [
                "College ID / Employee ID",
                currentUser.id
            ],

            [
                "Full Name",
                currentUser.name
            ],

            [
                "College Email",
                currentUser.email ||
                "teacher@college.edu"
            ],

            [
                "Department",
                "Computer Science"
            ]

        ];

    }

    else {

        fields = [

            [
                "Admin ID",
                currentUser.id
            ],

            [
                "Full Name",
                currentUser.name
            ],

            [
                "Role",
                "System Administrator"
            ]

        ];

    }


    content.innerHTML = `

        <div class="card">

            <div class="profile">

                <div class="profile-avatar">

                    ${currentUser.name
                        .charAt(0)
                        .toUpperCase()}

                </div>


                <div>

                    <h3>
                        ${currentUser.name}
                    </h3>

                    <p class="muted">

                        ${currentUser.role
                            .toUpperCase()}

                    </p>


                    <div
                        class="form-grid"
                        style="
                        margin-top:20px;
                        ">

                        ${fields.map(field => {

                            return `

                                <div class="field">

                                    <label>
                                        ${field[0]}
                                    </label>

                                    <input
                                        value="${field[1]}"
                                        disabled>

                                </div>

                            `;

                        }).join("")}

                    </div>

                </div>

            </div>

        </div>

    `;

}


/* =========================================================
   25. ADMIN USER MANAGEMENT
   ========================================================= */

function renderUsers() {

    content.innerHTML = `

        <div class="card">

            <div class="section-title">

                <h3>
                    User Management
                </h3>

                <button
                    class="btn"
                    onclick="
                    showToast(
                    'User verification screen opened.'
                    )">

                    Verify IDs

                </button>

            </div>


            <div class="table-wrap">

                <table class="table">

                    <thead>

                        <tr>

                            <th>
                                College ID
                            </th>

                            <th>
                                Name
                            </th>

                            <th>
                                Role
                            </th>

                            <th>
                                Status
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        <tr>

                            <td>
                                STU-001
                            </td>

                            <td>
                                Student User
                            </td>

                            <td>
                                Student
                            </td>

                            <td>

                                <span
                                    class="badge pass">

                                    Verified

                                </span>

                            </td>

                        </tr>


                        <tr>

                            <td>
                                EMP-001
                            </td>

                            <td>
                                Teacher User
                            </td>

                            <td>
                                Teacher
                            </td>

                            <td>

                                <span
                                    class="badge pass">

                                    Verified

                                </span>

                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>

        </div>

    `;

}


/* =========================================================
   26. ADMIN SETTINGS
   ========================================================= */

function renderSettings() {

    content.innerHTML = `

        <div class="card">

            <h3>
                System Settings
            </h3>


            <div
                class="form-grid"
                style="
                margin-top:18px;
                ">

                <div class="field">

                    <label>

                        College Name

                        <input
                            id="collegeName"
                            value="Your College">

                    </label>

                </div>


                <div class="field">

                    <label>

                        Passing Percentage

                        <input
                            id="passingPercentage"
                            type="number"
                            value="40">

                    </label>

                </div>


                <div class="field">

                    <label>

                        Maximum CT Marks

                        <input
                            id="maximumMarks"
                            type="number"
                            value="30">

                    </label>

                </div>

            </div>


            <button
                class="primary-btn"
                style="
                margin-top:18px;
                "
                onclick="saveSettings()">

                Save Settings

            </button>

        </div>

    `;

}


/* =========================================================
   27. SAVE SETTINGS
   ========================================================= */

function saveSettings() {

    const settings = {

        collegeName:
            $("#collegeName").value,

        passingPercentage:
            $("#passingPercentage").value,

        maximumMarks:
            $("#maximumMarks").value

    };


    localStorage.setItem(
        "ctSettings",
        JSON.stringify(settings)
    );


    showToast(
        "Settings saved successfully."
    );

}


/* =========================================================
   28. STUDENT MANAGEMENT
   ========================================================= */

function renderStudents() {

    content.innerHTML = `

        <div class="card">

            <div class="section-title">

                <h3>
                    Student Management
                </h3>


                <button
                    class="btn success"
                    onclick="addStudent()">

                    + Add Student

                </button>

            </div>


            <div class="table-wrap">

                <table class="table">

                    <thead>

                        <tr>

                            <th>
                                College ID
                            </th>

                            <th>
                                Name
                            </th>

                            <th>
                                Branch
                            </th>

                            <th>
                                Class
                            </th>

                            <th>
                                Section
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        ${demoResults.map(student => {

                            return `

                                <tr>

                                    <td>
                                        ${student.id}
                                    </td>

                                    <td>
                                        ${student.name}
                                    </td>

                                    <td>
                                        Computer Science
                                    </td>

                                    <td>
                                        BCA 2nd Year
                                    </td>

                                    <td>
                                        A
                                    </td>

                                </tr>

                            `;

                        }).join("")}

                    </tbody>

                </table>

            </div>

        </div>

    `;

}


/* =========================================================
   29. ADD STUDENT
   ========================================================= */

function addStudent() {

    showToast(
        "Student registration form opened."
    );

}


/* =========================================================
   30. MARKS ENTRY
   ========================================================= */

function renderMarks() {

    content.innerHTML = `

        <div class="card">

            <div class="section-title">

                <h3>
                    CT Marks Entry
                </h3>

                <span class="muted">
                    Enter marks for selected CT
                </span>

            </div>


            <div class="form-grid">


                <div class="field">

                    <label>

                        Academic Session

                        <select>

                            <option>
                                2026-27
                            </option>

                            <option>
                                2025-26
                            </option>

                        </select>

                    </label>

                </div>


                <div class="field">

                    <label>

                        Class

                        <select>

                            <option>
                                BCA 2nd Year
                            </option>

                            <option>
                                BCA 1st Year
                            </option>

                        </select>

                    </label>

                </div>


                <div class="field">

                    <label>

                        Subject

                        <select>

                            <option>
                                Java
                            </option>

                            <option>
                                Data Structures
                            </option>

                            <option>
                                Database
                            </option>

                        </select>

                    </label>

                </div>


                <div class="field">

                    <label>

                        CT Number

                        <select>

                            <option>
                                CT-1
                            </option>

                            <option>
                                CT-2
                            </option>

                            <option>
                                CT-3
                            </option>

                        </select>

                    </label>

                </div>


                <div class="field">

                    <label>

                        Maximum Marks

                        <input
                            id="maxMarks"
                            type="number"
                            value="30">

                    </label>

                </div>


                <div class="field">

                    <label>

                        Marks File

                        <input
                            id="marksFile"
                            type="file"
                            accept=".csv,.xlsx,.xls">

                    </label>

                </div>


            </div>


            <button
                class="primary-btn"
                style="
                margin-top:18px;
                "
                onclick="
                validateMarks()">

                Validate & Save Marks

            </button>

        </div>

    `;

}


/* =========================================================
   31. MARKS VALIDATION
   ========================================================= */

function validateMarks() {

    const maximumMarks =
        Number($("#maxMarks").value);


    if (
        !maximumMarks ||
        maximumMarks <= 0
    ) {

        showToast(
            "Enter valid maximum marks."
        );

        return;

    }


    const file =
        $("#marksFile").files[0];


    if (!file) {

        showToast(
            "Please select a CSV or Excel file."
        );

        return;

    }


    showToast(
        "Marks validated and saved successfully."
    );

}


/* =========================================================
   32. CHECK STORED LOGIN
   ========================================================= */

const savedUser =
    localStorage.getItem("ctUser");


if (savedUser) {

    try {

        currentUser =
            JSON.parse(savedUser);


        openApp();

    }

    catch (error) {

        localStorage.removeItem(
            "ctUser"
        );

    }

}
