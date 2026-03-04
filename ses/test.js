const students = [
  { id: 1, name: "Nguyễn Văn Anh", age: 20, gpa: 8.5, status: "active" },
  { id: 2, name: "Trần Thị Bình", age: 21, gpa: 7.2, status: "active" },
  { id: 3, name: "Lê Hoàng Châu", age: 19, gpa: 9.8, status: "active" },
  { id: 4, name: "Phạm Minh Đức", age: 22, gpa: 6.5, status: "active" },
  { id: 5, name: "Nguyễn Minh Hiếu", age: 18, gpa: 10.0, status: "active" },
];


let topGpa = students.slice().sort((a,b)=>b.gpa-a.gpa).slice(0,5);
  let youngest = students.slice().sort((a,b)=>a.age-b.age).slice(0,5);

  console.log("Top 5 GPA cao nhất:");
  console.table(topGpa);

  console.log("Top 5 nhỏ tuổi nhất:");
  console.table(youngest);