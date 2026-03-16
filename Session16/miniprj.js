let employees = [];
let isEditing = false;
let editId = null;

const employeeForm = document.querySelector("#employee-form");
const fullNameInput = document.querySelector("#fullName");
const emailInput = document.querySelector("#email");
const dobInput = document.querySelector("#dateOfBirth");
const positionInput = document.querySelector("#position");

const employeeTbody = document.querySelector("#employee-tbody");
const formTitle = document.querySelector("#form-title");
const submitBtn = document.querySelector("#submit-btn");
const cancelBtn = document.querySelector("#cancel-edit-btn");

const employeeCountBadge = document.querySelector("#employee-count");
const footerCount = document.querySelector("#footer-count");

// 1. Render danh sách nhân viên
function renderEmployees() {
  employeeTbody.innerHTML = employees.map(emp => {
    const dateParts = emp.dob.split("-");
    const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;

    return `
      <tr data-id="${emp.id}">
        <td>${emp.id}</td>
        <td>${emp.fullName}</td>
        <td>${emp.email}</td>
        <td>${formattedDate}</td>
        <td>${emp.position}</td>
        <td>
          <div class="actions">
            <button class="btn btn-sm btn-edit">Sửa</button>
            <button class="btn btn-sm btn-delete">Xóa</button>
          </div>
        </td>
      </tr>
    `;
  }).join("");

  updateStats();
}

// 2. Cập nhật thống kê
function updateStats() {
  const total = employees.length;
  employeeCountBadge.textContent = `${total} nhân viên`;
  footerCount.textContent = `Tổng số nhân viên: ${total}`;
}

// 3. Thêm hoặc Cập nhật nhân viên
employeeForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const fullName = fullNameInput.value.trim();
  const email = emailInput.value.trim();
  const dob = dobInput.value;
  const position = positionInput.value;

  if (!fullName || !email || !dob || !position) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  if (isEditing) {
    // Xử lý cập nhật
    employees = employees.map(emp => {
      if (emp.id === editId) {
        return { ...emp, fullName, email, dob, position };
      }
      return emp;
    });
    resetForm();
  } else {
    // Xử lý thêm mới
    const newEmployee = {
      id: Date.now(),
      fullName,
      email,
      dob,
      position
    };
    employees.push(newEmployee);
  }

  renderEmployees();
  employeeForm.reset();
});

// 4. Xử lý Sửa và Xóa 
employeeTbody.addEventListener("click", (e) => {
  const row = e.target.closest("tr");
  if (!row) return;
  const id = Number(row.dataset.id);

  // Xử lý Xóa
  if (e.target.classList.contains("btn-delete")) {
    const emp = employees.find(item => item.id === id);
    if (confirm(`Bạn có chắc muốn xóa nhân viên ${emp.fullName}?`)) {
      employees = employees.filter(item => item.id !== id);
      if (isEditing && editId === id) resetForm();
      renderEmployees();
    }
  }

  // Xử lý Sửa
  if (e.target.classList.contains("btn-edit")) {
    const emp = employees.find(item => item.id === id);
    if (!emp) return;

    // Đổ dữ liệu vào form
    fullNameInput.value = emp.fullName;
    emailInput.value = emp.email;
    dobInput.value = emp.dob;
    positionInput.value = emp.position;

    // Đổi trạng thái form
    isEditing = true;
    editId = id;
    formTitle.textContent = "Chỉnh Sửa Nhân Viên";
    submitBtn.textContent = "Cập Nhật";
    cancelBtn.classList.remove("hidden");

    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

// 5. Hủy chỉnh sửa
function resetForm() {
  isEditing = false;
  editId = null;
  employeeForm.reset();
  formTitle.textContent = "Thêm Nhân Viên Mới";
  submitBtn.textContent = "Thêm Nhân Viên";
  cancelBtn.classList.add("hidden");
}

cancelBtn.addEventListener("click", resetForm);

renderEmployees();