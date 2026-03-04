const students = [
  { id: 1, name: "Nguyễn Văn Anh", age: 20, gpa: 8.5, status: "active" },
  { id: 2, name: "Trần Thị Bình", age: 21, gpa: 7.2, status: "active" },
  { id: 3, name: "Lê Hoàng Châu", age: 19, gpa: 9.8, status: "active" },
  { id: 4, name: "Phạm Minh Đức", age: 22, gpa: 6.5, status: "active" },
  { id: 5, name: "Nguyễn Minh Hiếu", age: 18, gpa: 10.0, status: "active" },
];

function generateTimestamp() {
  return newDate();
}

function findStudentById(id) {
  return students.find(s => s.id === id);
}

function validateStudent({ id, name, age, gpa, status }, isUpdate = false) {
  if (!isUpdate || id !== undefined) {
    if (!id || id.trim() === "") return "ID không được rỗng";
    if (!isUpdate && findStudentById(id)) return "ID đã tồn tại";
  }

  if (!isUpdate || name !== undefined) {
    if (!name || name.trim().length < 2) return "Tên phải ≥ 2 ký tự";
  }

  if (!isUpdate || age !== undefined) {
    if (isNaN(age) || age < 16 || age > 60)
      return "Tuổi phải từ 16 đến 60";
  }

  if (!isUpdate || gpa !== undefined) {
    if (isNaN(gpa) || gpa < 0 || gpa > 10)
      return "GPA phải từ 0 đến 10";
  }

  if (!isUpdate || status !== undefined) {
    if (status !== "active" && status !== "inactive")
      return "Status phải là active hoặc inactive";
  }

  return null;
}

function createStudent() {
  let id = prompt("Nhập ID:");
  let name = prompt("Nhập tên:");
  let age = +prompt("Nhập tuổi:");
  let gpa = +prompt("Nhập GPA:");
  let status = prompt("Nhập status (active/inactive):");

  let error = validateStudent({ id, name, age, gpa, status });

  if (error) {
    alert(error);
    return;
  }

  students.push({
    id,
    name,
    age,
    gpa,
    status,
    createdAt: generateTimestamp(),
    updatedAt: null,
    deletedAt: null
  });

  alert("Thêm sinh viên thành công!");
}

function updateStudent() {
  let id = prompt("Nhập ID cần cập nhật:");
  let student = findStudentById(id);

  if (!student) {
    alert("Không tìm thấy sinh viên!");
    return;
  }

  let name = prompt("Tên mới (Enter để bỏ qua):");
  let ageInput = prompt("Tuổi mới (Enter để bỏ qua):");
  let gpaInput = prompt("GPA mới (Enter để bỏ qua):");
  let status = prompt("Status mới (Enter để bỏ qua):");

  let updateData = {};

  if (name !== "") updateData.name = name;
  if (ageInput !== "") updateData.age = +ageInput;
  if (gpaInput !== "") updateData.gpa = +gpaInput;
  if (status !== "") updateData.status = status;

  let error = validateStudent(updateData, true);
  if (error) {
    alert(error);
    return;
  }

  Object.assign(student, updateData);
  student.updatedAt = generateTimestamp();

  alert("Cập nhật thành công!");
}

function softDeleteStudent() {
  let id = prompt("Nhập ID cần xoá:");
  let student = findStudentById(id);

  if (!student) {
    alert("Không tìm thấy sinh viên!");
    return;
  }

  if (student.status === "inactive") {
    alert("Sinh viên đã bị xoá trước đó!");
    return;
  }

  let confirmDelete = confirm("Bạn chắc chắn muốn xoá?");
  if (!confirmDelete) return;

  student.status = "inactive";
  student.deletedAt = generateTimestamp();

  alert("Soft delete thành công!");
}

function restoreStudent() {
  let id = prompt("Nhập ID cần phục hồi:");
  let student = findStudentById(id);

  if (!student) {
    alert("Không tìm thấy sinh viên!");
    return;
  }

  if (student.deletedAt === null) {
    alert("Sinh viên chưa bị xoá!");
    return;
  }

  student.status = "active";
  student.deletedAt = null;
  student.updatedAt = generateTimestamp();

  alert("Phục hồi thành công!");
}

function viewStudents() {
  let data = [...students]; 

  let keyword = prompt("Tìm theo tên (Enter bỏ qua):");
  if (keyword) {
    data = data.filter(s =>
      s.name.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  let statusFilter = prompt("Lọc status (active/inactive/all):");
  if (statusFilter !== "all") {
    data = data.filter(s => s.status === statusFilter);
  }

  let sortOrder = prompt("Sort GPA (asc/desc):");
  if (sortOrder === "asc" || sortOrder === "desc") {
    data = data.slice().sort((a, b) =>
      sortOrder === "asc" ? a.gpa - b.gpa : b.gpa - a.gpa
    );
  }

  let currentPage = 1;
  const pageSize = 5;

  function renderPage() {
    let totalPages = Math.ceil(data.length / pageSize) || 1;
    if (currentPage > totalPages) currentPage = 1;

    let start = (currentPage - 1) * pageSize;
    let pageData = data.slice(start, start + pageSize);

    console.clear();
    console.log(`Trang ${currentPage}/${totalPages}`);
    console.log(`Tổng bản ghi: ${data.length}`);
    console.table(pageData);
  }

  while (true) {
    renderPage();
    let action = prompt("First / Last / Next / Prev / Exit");

    let totalPages = Math.ceil(data.length / pageSize) || 1;

    if (action === "First") currentPage = 1;
    else if (action === "Last") currentPage = totalPages;
    else if (action === "Next" && currentPage < totalPages) currentPage++;
    else if (action === "Prev" && currentPage > 1) currentPage--;
    else if (action === "Exit") break;
  }
}


function analyticsDashboard() {
  if (students.length === 0) {
    alert("Chưa có dữ liệu!");
    return;
  }

  let overview = students.reduce((acc, s) => {
    acc.total++;
    if (s.status === "active") acc.active++;
    else acc.inactive++;
    acc.totalGpa += s.gpa;

    if (s.gpa === 0) acc.zeroGpa++;
    if (s.gpa < 3) acc.risk++;

    if (s.gpa >= 8) acc.excellent++;
    else if (s.gpa >= 6.5) acc.good++;
    else if (s.gpa >= 5) acc.average++;
    else acc.weak++;

    return acc;
  }, {
    total: 0,
    active: 0,
    inactive: 0,
    totalGpa: 0,
    zeroGpa: 0,
    risk: 0,
    excellent: 0,
    good: 0,
    average: 0,
    weak: 0
  });

  console.clear();
  console.log("===== DASHBOARD =====");
  console.log("Tổng SV:", overview.total);
  console.log("Active:", overview.active);
  console.log("Inactive:", overview.inactive);
  console.log("GPA trung bình:", (overview.totalGpa / overview.total).toFixed(2));
  console.log("GPA = 0:", overview.zeroGpa);
  console.log("Nguy cơ (GPA <3):", overview.risk);

  console.log("Phân bố học lực:");
  console.log("Giỏi:", overview.excellent);
  console.log("Khá:", overview.good);
  console.log("Trung bình:", overview.average);
  console.log("Yếu:", overview.weak);

  let topGpa = students.slice().sort((a,b)=>b.gpa-a.gpa).slice(0,5);
  let youngest = students.slice().sort((a,b)=>a.age-b.age).slice(0,5);

  console.log("Top 5 GPA cao nhất:");
  console.table(topGpa);

  console.log("Top 5 nhỏ tuổi nhất:");
  console.table(youngest);
}

function mainMenu() {
  let choice;

  do {
    choice = prompt(`
==== STUDENT MANAGER ADVANCED ====
1. Create Student
2. Update Student
3. Soft Delete Student
4. Restore Student
5. View Students
6. Analytics Dashboard
7. Exit
`);

    switch (choice) {
      case "1":
        createStudent();
        break;
      case "2":
        updateStudent();
        break;
      case "3":
        softDeleteStudent();
        break;
      case "4":
        restoreStudent();
        break;
      case "5":
        viewStudents();
        break;
      case "6":
        analyticsDashboard();
        break;
      case "7":
        alert("Thoát chương trình!");
        break;
      default:
        alert("Lựa chọn không hợp lệ!");
    }

  } while (choice !== "7");
}

mainMenu();