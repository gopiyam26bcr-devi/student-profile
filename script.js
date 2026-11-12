
let students = JSON.parse(
    localStorage.getItem("students")
) || [];

let editIndex = -1;

const form = document.getElementById("studentForm");
const studentList = document.getElementById("studentList");

function displayStudents(data = students) {

    studentList.innerHTML = "";

    data.forEach((student) => {

        const index = students.indexOf(student);

        let row = document.createElement("tr");

        [
            student.name,
            student.roll,
            student.email,
            student.department,
            student.year,
            student.phone
        ].forEach(value => {
            let cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        let actionCell = document.createElement("td");

        let editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "edit";
        editBtn.onclick = () => editStudent(index);

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete";
        deleteBtn.onclick = () => deleteStudent(index);

        actionCell.appendChild(editBtn);
        actionCell.appendChild(deleteBtn);

        row.appendChild(actionCell);

        studentList.appendChild(row);
    });
}

form.addEventListener("submit", function(e) {

    e.preventDefault();

    let student = {
        name: document.getElementById("name").value.trim(),
        roll: document.getElementById("roll").value.trim(),
        email: document.getElementById("email").value.trim(),
        department: document.getElementById("department").value.trim(),
        year: document.getElementById("year").value,
        phone: document.getElementById("phone").value.trim()
    };

    if (editIndex === -1) {

        let exists = students.some(s =>
            s.roll.toLowerCase() === student.roll.toLowerCase()
        );

        if (exists) {
            alert("Roll Number Already Exists!");
            return;
        }

        students.push(student);

    } else {

        let exists = students.some((s, i) =>
            i !== editIndex &&
            s.roll.toLowerCase() === student.roll.toLowerCase()
        );

        if (exists) {
            alert("Roll Number Already Exists!");
            return;
        }

        students[editIndex] = student;
        editIndex = -1;

        document.getElementById("submitBtn").textContent =
            "Add Student";
    }

    saveData();
    form.reset();
    displayStudents();
});

function editStudent(index) {

    let student = students[index];

    document.getElementById("name").value = student.name;
    document.getElementById("roll").value = student.roll;
    document.getElementById("email").value = student.email;
    document.getElementById("department").value =
        student.department;
    document.getElementById("year").value = student.year;
    document.getElementById("phone").value = student.phone;

    editIndex = index;

    document.getElementById("submitBtn").textContent =
        "Update Student";

    window.scrollTo(0, 0);
}

function deleteStudent(index) {

    if (confirm("Are you sure you want to delete this student?")) {

        students.splice(index, 1);

        saveData();
        displayStudents();
    }
}

function saveData() {

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );
}

document.getElementById("search").addEventListener(
    "input", function() {

        let value = this.value.toLowerCase();

        let filtered = students.filter(student =>
            student.name.toLowerCase().includes(value) ||
            student.roll.toLowerCase().includes(value)
        );

        displayStudents(filtered);
    }
);

displayStudents();
