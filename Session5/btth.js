let books = ["Nha Gia Kim", "Dac Nhan Tam", "Tuan Lam Viec 4 Gio"];
let choice;

do {
  choice = +prompt(`--- THƯ VIỆN KHOA HỌC ---
1. Xem danh sách
2. Nhập sách mới
3. Mượn sách (Xóa)
4. Sửa tên sách
5. Sắp xếp kệ
0. Thoát`);

  switch (choice) {
    case 1: {
      if (books.length === 0) {
        alert("Kho sách trống");
        break;
      }
      let result = books
        .map((book, index) => `${index + 1}. ${book}`)
        .join(" - ");
      // đẩy đủ là function, return
      // let result = books.map(function(book, index) {
      // return `${index + 1}. ${book}`; })
      //.join(" - ");
      alert(`Danh sách hiện tại ( ${books.length} cuốn)`);
      alert(result);
      break;
    }

    case 2:
      {
        let newBookName;
        do {
          newBookName = prompt("Nhập tên sách mới");
          if (!newBookName.trim() || !newBookName) {
            alert("Vui lòng nhập lại");
          }
        } while (!newBookName.trim() || !newBookName);
        books.push(newBookName);
        alert(`Đã thêm thành công sách ${newBookName}`);
      }
      break;

    case 3: {
      let bookTitle;
      do {
        bookTitle = prompt("Nhập tên sách muốn mượn");
        if (!bookTitle.trim() || !bookTitle) {
          alert("Vui lòng nhập lại");
        }
      } while (!bookTitle.trim() || !bookTitle);
      let position = books.indexOf(bookTitle);
      if (position === -1) {
        alert("Lỗi! Không tìm thấy sách");
      } else {
        books.splice(position, 1);
        alert(`Đã cho mượn sách ${bookTitle}`);
      }
      break;
    }

    case 4: {
      let currentBookName, newName;
      do {
        currentBookName = prompt("Nhập tên sách hiện tại");
        if (!currentBookName || !currentBookName.trim()) {
          alert("Tên sách không hợp lệ. Vui lòng nhập lại");
        }
      } while (!currentBookName || !currentBookName.trim());
      let index = books.indexOf(currentBookName);
      if (index === -1) {
        alert("Không tìm thấy sách");
      } else {
        do {
          newName = prompt("Nhập tên mới");
          if (!newName || !newName.trim()) {
            alert("Tên không phù hợp. Vui lòng nhập lại");
          }
        } while (!newName || !newName.trim());
        books[index] = newName;
        alert("Đã cập nhật tên thành công!");
      }
      break;
    }

    case 5: {
      let sortedBook = books.slice().sort();
      alert(`Danh sách sau khi sắp xếp là: ${sortedBook}`);
      break;
    }

    case 0: {
      break;
    }

    default: {
      alert("Lựa chọn không phù hợp.Vui lòng chọn lại"); //books.sort((a, b) => a.localeCompare(b)); (không phân biệt hoa thường)
    }
  }
} while (choice !== 0);
