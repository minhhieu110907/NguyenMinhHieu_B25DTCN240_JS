const students = [
  { id: 1, name: "Nguyễn Văn Anh", age: 20, gpa: 8.5, status: "active" },
  { id: 2, name: "Trần Thị Bình", age: 21, gpa: 7.2, status: "active" },
  { id: 3, name: "Lê Hoàng Châu", age: 19, gpa: 9.8, status: "active" },
  { id: 4, name: "Phạm Minh Đức", age: 22, gpa: 6.5, status: "active" },
  { id: 5, name: "Nguyễn Minh Hiếu", age: 18, gpa: 10.0, status: "active" },
];

function inputName(message) {
  let name = prompt(message);
  if (!name || !name.trim()) {
    alert("Tên không được để trống");
    return null;
  }
  return name.trim();
}

function inputAge(message) {
  let age = parseInt(prompt(message));
  if (isNaN(age)) {
    alert("Tuổi không hợp lệ");
    return null;
  }
  return age;
}

function inputGPA(message) {
  let gpa = parseFloat(prompt(message));
  if (isNaN(gpa)) {
    alert("GPA không hợp lệ");
    return null;
  }
  return gpa;
}

function inputStatus(message) {
  let status = prompt(message);
  if (!status || (status !== "active" && status !== "inactive")) {
    alert('Status chỉ được là "active" hoặc "inactive"');
    return null;
  }
  return status;
}

function createStudent() {
  let name = inputName("Nhập tên sinh viên mới");
  if (!name) return;

  let age = inputAge(`Nhập tuổi cho sinh viên ${name}`);
  if (age === null) return;

  let gpa = inputGPA(`Nhập điểm trung bình cho sinh viên ${name}`);
  if (gpa === null) return;

  let status = inputStatus(
    `Nhập trạng thái cho sinh viên ${name} (active hoặc inactive)`
  );
  if (!status) return;

  let lastElement = students[students.length - 1];
  let newID = lastElement ? lastElement.id + 1 : 1;

  let newStudent = { id: newID, name, age, gpa, status };
  students.push(newStudent);

  alert(`Đã thêm thành công sinh viên!
ID: ${newStudent.id}
Tên: ${newStudent.name}
Tuổi: ${newStudent.age}
GPA: ${newStudent.gpa}
Trạng thái: ${newStudent.status}`);
}

function readAllStudents() {
  if (students.length === 0) {
    alert("Danh sách trống!");
    return;
  }

  let text = students
    .map(
      (s) =>
        `ID: ${s.id} | Tên: ${s.name} | Tuổi: ${s.age} | GPA: ${s.gpa} | Status: ${s.status}`
    )
    .join("\n");

  alert("--- DANH SÁCH SINH VIÊN ---\n" + text);
}

function filterScholarship() {
  let filtered = students.filter((s) => s.gpa > 8.0);

  if (filtered.length === 0) {
    alert("Danh sách trống!");
    return;
  }

  let text = filtered
    .map(
      (s) =>
        `ID: ${s.id} | Tên: ${s.name} | Tuổi: ${s.age} | GPA: ${s.gpa} | Status: ${s.status}`
    )
    .join("\n");

  alert("--- DANH SÁCH SINH VIÊN ĐẠT HỌC BỔNG ---\n" + text);
}

function updateStudent() {
  let id = parseInt(prompt("Nhập vào ID cần tìm"));
  if (isNaN(id)) {
    alert("ID không hợp lệ");
    return;
  }

  let student = students.find((s) => s.id === id);

  if (!student) {
    alert("Không có sinh viên nào có ID như trên");
    return;
  }

  let name = inputName("Nhập tên mới");
  if (!name) return;

  let age = inputAge("Nhập tuổi mới");
  if (age === null) return;

  let gpa = inputGPA("Nhập GPA mới");
  if (gpa === null) return;

  let status = inputStatus("Nhập status mới (active hoặc inactive)");
  if (!status) return;

  student.name = name;
  student.age = age;
  student.gpa = gpa;
  student.status = status;

  alert("Đã cập nhật thành công");
}

function deleteStudent() {
  let id = parseInt(prompt("Nhập vào ID cần xoá"));
  if (isNaN(id)) {
    alert("ID không hợp lệ");
    return;
  }

  let index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    alert("Không có sinh viên nào có ID như trên");
    return;
  }

  students.splice(index, 1);
  alert("Đã xoá thành công");
}

function complianceCheck() {
  let ageCheck = students.some((s) => s.age < 18);
  let sttCheck = students.every((s) => s.status === "active");

  alert(`Có ít nhất một sinh viên dưới 18 tuổi: ${ageCheck}
Toàn bộ sinh viên đều active: ${sttCheck}`);
}

function academicStatistics() {
  if (students.length === 0) {
    alert("Danh sách trống!");
    return;
  }

  let avg =
    students.reduce((sum, s) => sum + s.gpa, 0) / students.length;

  alert(`Điểm trung bình: ${avg.toFixed(2)}`);
}

function dataNormalization() {
  if (students.length === 0) {
    alert("Danh sách trống!");
    return;
  }

  let text = students
    .map(
      (s) =>
        `ID: ${s.id} | Tên: ${s.name.toUpperCase()} | Tuổi: ${s.age} | GPA: ${s.gpa} | Status: ${s.status}`
    )
    .join("\n");

  alert("--- DANH SÁCH SINH VIÊN ---\n" + text);
}

let menu = `===== STUDENT MANAGEMENT SYSTEM =====
1. Create Student
2. Read All Students
3. Filter Scholarship Candidates (GPA > 8.0)
4. Update Student Profile
5. Delete Record
6. Compliance Verification
7. Academic Statistics
8. Data Normalization
0. Exit
======================================
Nhập lựa chọn của bạn:`;

let choice;

do {
  choice = parseInt(prompt(menu));

  switch (choice) {
    case 1:
      createStudent();
      break;
    case 2:
      readAllStudents();
      break;
    case 3:
      filterScholarship();
      break;
    case 4:
      updateStudent();
      break;
    case 5:
      deleteStudent();
      break;
    case 6:
      complianceCheck();
      break;
    case 7:
      academicStatistics();
      break;
    case 8:
      dataNormalization();
      break;
    case 0:
      alert("Thoát chương trình");
      break;
    default:
      alert("Lựa chọn không hợp lệ");
  }
} while (choice !== 0);