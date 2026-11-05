
let students = JSON.parse(localStorage.getItem("students")) || [];
let companies = JSON.parse(localStorage.getItem("companies")) || [];
let interviews = JSON.parse(localStorage.getItem("interviews")) || [];

// Student Profile Management
document.getElementById("studentForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let student = {
        name: document.getElementById("name").value.trim(),
        roll: document.getElementById("roll").value.trim(),
        email: document.getElementById("email").value.trim(),
        cgpa: Number(document.getElementById("cgpa").value),
        skills: document.getElementById("skills").value.trim()
    };

    if (student.cgpa < 0 || student.cgpa > 10) {
        alert("CGPA must be between 0 and 10");
        return;
    }

    students = students.filter(s => s.roll !== student.roll);
    students.push(student);

    localStorage.setItem("students", JSON.stringify(students));

    displayStudents();
    updateReports();

    alert("Student Profile Saved Successfully!");

    this.reset();
});

// Display Students
function displayStudents() {
    let output = document.getElementById("studentDetails");

    output.innerHTML = "<h3>Saved Student Profiles</h3>";

    students.forEach(student => {
        let p = document.createElement("p");
        p.textContent =
            `Name: ${student.name} | Roll: ${student.roll} | CGPA: ${student.cgpa} | Skills: ${student.skills}`;
        output.appendChild(p);
    });
}

// Company Registration
document.getElementById("companyForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let company = {
        name: document.getElementById("companyName").value.trim(),
        role: document.getElementById("role").value.trim(),
        minCgpa: Number(document.getElementById("minCgpa").value)
    };

    if (company.minCgpa < 0 || company.minCgpa > 10) {
        alert("Minimum CGPA must be between 0 and 10");
        return;
    }

    companies.push(company);

    localStorage.setItem("companies", JSON.stringify(companies));

    displayCompanies();
    updateReports();

    alert("Company Registered Successfully!");

    this.reset();
});

// Display Companies
function displayCompanies() {
    let list = document.getElementById("companyList");
    list.innerHTML = "";

    companies.forEach(company => {
        let li = document.createElement("li");
        li.textContent =
            `${company.name} - ${company.role} (Minimum CGPA: ${company.minCgpa})`;
        list.appendChild(li);
    });
}

// Eligibility Checking
document.getElementById("checkEligibility").addEventListener("click", function() {
    let result = document.getElementById("eligibilityResult");
    result.innerHTML = "";

    if (students.length === 0) {
        result.textContent = "Please register a student profile first.";
        return;
    }

    if (companies.length === 0) {
        result.textContent = "Please register a company first.";
        return;
    }

    let student = students[students.length - 1];

    let eligibleCompanies = companies.filter(company =>
        student.cgpa >= company.minCgpa
    );

    let heading = document.createElement("h3");
    heading.textContent = "Eligibility Results for " + student.name;
    result.appendChild(heading);

    if (eligibleCompanies.length > 0) {
        eligibleCompanies.forEach(company => {
            let p = document.createElement("p");
            p.textContent = "Eligible for " + company.name + " - " + company.role;
            result.appendChild(p);
        });
    } else {
        result.append("Not eligible for any registered companies.");
    }
});

// Interview Scheduling
document.getElementById("interviewForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let interview = {
        company: document.getElementById("interviewCompany").value.trim(),
        date: document.getElementById("interviewDate").value,
        time: document.getElementById("interviewTime").value
    };

    interviews.push(interview);

    localStorage.setItem("interviews", JSON.stringify(interviews));

    displayInterviews();
    updateReports();

    alert("Interview Scheduled Successfully!");

    this.reset();
});

// Display Interviews
function displayInterviews() {
    let list = document.getElementById("interviewList");
    list.innerHTML = "";

    interviews.forEach(interview => {
        let li = document.createElement("li");
        li.textContent =
            `${interview.company} - ${interview.date} at ${interview.time}`;
        list.appendChild(li);
    });
}

// Placement Reports
function updateReports() {
    document.getElementById("studentCount").textContent = students.length;
    document.getElementById("companyCount").textContent = companies.length;
    document.getElementById("interviewCount").textContent = interviews.length;
}

document.getElementById("refreshReport").addEventListener("click", function() {
    updateReports();
    alert("Reports Updated Successfully!");
});

// Load Saved Data
displayStudents();
displayCompanies();
displayInterviews();
updateReports();
