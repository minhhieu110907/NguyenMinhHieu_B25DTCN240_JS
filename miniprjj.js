const students = [
  { id: 1, name: "Nguyễn Văn Anh", age: 20, gpa: 8.5, status: "active" },
  { id: 2, name: "Trần Thị Bình", age: 21, gpa: 7.2, status: "active" },
  { id: 3, name: "Lê Hoàng Châu", age: 19, gpa: 9.8, status: "active" },
  { id: 4, name: "Phạm Minh Đức", age: 22, gpa: 6.5, status: "active" },
  { id: 5, name: "Nguyễn Minh Hiếu", age: 18, gpa: 10.0, status: "active" },
];

function generateTimestamp() {
  const now = new Date();
  const formattedDate = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()} - ${now.getHours()}:${now.getMinutes()}`;
  return formattedDate;
}
function idCheck(findById) {
  return students.find((s) => s.id === findById);
}

function createStudent() {
  let id = parseInt(prompt("Nhập vào ID sinh viên"));
  let name = prompt("Nhập tên sinh viên");
  let age = parseInt(prompt("Nhập tuổi sinh viên"));
  let gpa = parseFloat(prompt("Nhập vào GPA sinh viên"));
  let status = prompt(
    "Nhập vào trạng thái sinh viên (active hoặc inactive)",
  ).toLowerCase();

  let newStudent = {
    id,
    name,
    age,
    gpa,
    status,
    createAt: generateTimestamp(),
    updateAt: null,
    deleteAt: null,
  };
  students.push(newStudent);
  alert(`Thêm mới thành công: -${newStudent.id} - ${newStudent.name}`);
}

function updateStudent() {
  let findByID = parseInt(
    prompt("Nhập vào ID sinh viên cần cập nhật thông tin"),
  );
  let student = idCheck(findByID);

  if (!student) {
    alert(`Không tìm thấy thông tin sinh viên có ID (${findByID})`);
  }
  let newName = prompt("Nhập tên mới (enter để bỏ qua)");
  let newAge = parseInt("Nhập tuổi mới (enter để bỏ qua)");
  let newGPA = parseFloat("Nhập GPA mới (enter để bỏ qua)");
  let newStatus = prompt(
    "Nhập trạng thái sinh viên (active hoặc inactive) (enter để bỏ qua)",
  );

  let updateStudentInfo = {
    id,
    name: newName,
    age: newAge,
    gpa: newGPA,
    status: newStatus,
    createAt: null,
    updateAt: generateTimestamp(),
    deleteAt: null,
  };
  Object.assign(students, updateStudent);
  alert(`Cập nhật thành công ID (${updateStudentInfo.id})`);
}

function sortDeleteStudent() {
  let findByID = parseInt(
    prompt("Nhập vào ID sinh viên cần xoá thông tin"),
  );
  let student = idCheck(findByID);

  if (!student) {
    alert(`Không tìm thấy thông tin sinh viên có ID (${findByID})`);
  }
  let confirm = confirm(`Bạn có chắc chắn muốn xoá sinh viên ${student.name}?`);
  if (!confirmDelete) return;

  student.status = "inactive";
  student.deletedAt = generateTimestamp();
  alert("Soft delete thành công!");
}

function restoreStudent () {
     let findByID = parseInt(
    prompt("Nhập vào ID sinh viên cần khôi phục dữ liệu"),
  );
  let student = idCheck(findByID);

  if (!student) {
    alert(`Không tìm thấy thông tin sinh viên có ID (${findByID})`);
  }
  if(student.status === null ) return alert("Sinh viên chưa bị xoá");

  student.status = "active";
  student.deleteAt = null;
  student.updateAt = generateTimestamp();
  alert("Phục hồi thành công!");
}


let menu = `==== STUDENT MANAGER ADVANCED ====
1.Create Student
2.Update Student
3.Soft Delete Student
4.Restore Student
5.View Students
6.Analytics Dashboard
7.Exit
Nhập lựa chọn của bạn:`;

let choice;

do {
  choice = parseInt(prompt(menu));

  switch (choice) {
    case 1:
      createStudent();
      break;
    case 2:
      break;
    case 3:
      break;
    case 4:
      break;
    case 5:
      break;
    case 6:
      break;
    case 7:
      alert("Thoát chương trình");
      break;
    default:
      alert("Lựa chọn không hợp lệ");
  }
} while (choice !== 0);
