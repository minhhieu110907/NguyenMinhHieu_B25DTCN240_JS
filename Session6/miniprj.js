const correctUsername = "admin",
  correctPassword = 12345;
let logInCount = 0;
let libraries = ["Toán", "Văn", "Anh"],
  userName,
  password,
  attemps,
  lockedAccountMessage = "", output = "";

while (logInCount < 3) {
  userName = prompt("Nhập vào tên tài khoản");
  password = +prompt("Nhập vào mật khẩu");

  if (
    !userName ||
    !userName.trim() ||
    userName !== correctUsername ||
    password !== correctPassword
  ) {
    logInCount++;
    attemps = 3 - logInCount;
    if (logInCount === 3) {
      alert("Tài khoản của bạn đã bị khoá");
    } else {
      alert(
        `Mật khẩu hoặc Tài khoản không hợp lệ. Vui lòng nhập lại ( Bạn còn ${attemps} lần thử`,
      );
    }
    continue;
  } else if (userName === correctUsername || password === correctPassword) {
    alert("Đăng nhập thành công!");
    let choice;
    do {
      choice = +prompt(`--------MENU--------
1. Nhập thêm lô sách mới.
2. Hiển thị danh sách sách.
3. Tìm kiếm sách.
4. Cập nhật tên sách.
5. Đảo ngược thứ tự kệ sách.
6. Nhập kho từ nguồn khác.
7. Thoát chương trình.
`);
      switch (choice) {
        case 1: {
          let input,
            books = [];
          do {
            input = prompt("Nhập vào tên sách, cách nhau bởi dấu ", "");
            if (
              !input ||
              !input.trim() ||
              !isNaN(input.trim()) ||
              !input.includes(",")
            ) {
              alert("Nhập lại danh sách tên sách");
            }
          } while (
            !input ||
            !input.trim() ||
            !isNaN(input.trim()) ||
            !input.includes(",")
          );
          books = input
            .split(",")
            .map((book) => book.trim())
            .filter((book) => book !== "");
          libraries.push(...books);
          alert(`Đã thêm ${books.length} cuốn sách vào kho`);
          break;
        }

        case 2: {
          if ( libraries.length === 0){
            alert("Mảng rỗng");
            break;
          }
          let result = libraries.map((book, index) => `${index + 1}. ${book}`);
          alert(result.join("\n"));
          break;
        }

        case 3: {
          let bookName, position;
          do {
            bookName = prompt("Nhập tên sách");
            if (!bookName) {
              alert("Bạn vui lòng nhập tên sách");
            }
          } while (!bookName);
          position = indexOf("bookName");
          position === -1 ? alert("Không tìm thấy sách") : alert(`Sách ${bookName} được tìm thấy ở index ${position}`);
          break;
        }

        case 4: {
          let currentBookName, position, newBookName;
          do {
            currentBookName = prompt("Nhập tên sách hiện tại");
            if ( !currentBookName || !currentBookName.trim() ) {
              alert("Bạn vui lòng nhập tên sách hiện tại");
            }
          } while ( !currentBookName || !currentBookName.trim() );

          do {
            newBookName = prompt("Nhập tên sách mới");
            if ( !newBookName || !newBookName.trim() ) {
              alert("Bạn vui lòng nhập tên sách mới");
            }
          } while ( !newBookName || !newBookName.trim() );
          position = indexOf("curentBookName");
          libraries[position] = newBookName;

          alert(`Sách ở vị trí ${position} đã được cập nhật thành sách tên là: ${newBookName}`);
          break;
        }

        case 5: {
          let reversedArray = [...libraries].reverse();
          let output = reversedArray.map((book,index) => `${index+1}. ${book}`);
          alert(output.join("\n"));
          break;
        }

        case 6: {
          let books = ["Sách Kỹ Năng", "Truyện Tranh"];
          let newlibraries = libraries.concat(books);
          for (let book of newlibraries){
            output+= book + " ";
          }
          alert(`Mảng sau khi nối là: ${output}`);
          break;
        }

        case 7: {
          alert("Chương trình kết thúc!");
          break;
        }

        default:
          alert("Lựa chọn không hợp lệ. Vui lòng chọn lại");
          break;
      }
    } while (choice !== 7);
  }
}
