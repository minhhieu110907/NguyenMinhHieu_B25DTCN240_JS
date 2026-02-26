let names = [
  "MacBook Pro",
  "Chuột Logitech",
  "Bàn phím cơ",
  "Màn hình Dell",
  "77 pro",
];
let prices = [2500, 50, 150, 600, 4000];
let stocks = [5, 20, 0, 8, 0];

function productCheck() {
  let premiumProducts = names.filter((_, index) => prices[index] >= 500);
  if (premiumProducts.length === 0) {
    alert("Không có sản phẩm nào giá >= 500.");
  } else {
    let message = "Các sản phầm cao cấp là: \n";
    premiumProducts.forEach((product, index) => {
      message += `${index + 1}. ${product}\n`;
    });
    alert(message);
  }
}

let menu = `-----HỆ THỐNG QUẢN LÝ KHO HÀNG-----
1.Lọc sản phẩm cao cấp
2.Kiểm định trạng thái dữ liệu
3.Phân tích giá trị vốn hoá
4.Triển khai chiến dịch chiết khấu
5.Truy vấn sản phẩm mang theo từ khoá
6.Báo cáo tình trạng tồn kho
7.Thoát`;

let choice;

do {
  choice = +prompt(menu + "\n\n" + "Mời nhập vào lựa chọn của bạn");

  switch (choice) {
    case 1: {
      productCheck();
      break;
    }
    case 2: {
      let hasOutOfStock = stocks.some((s) => s === 0);
      hasOutOfStock
        ? alert(`Có sản phẩm hết hàng: ${hasOutOfStock}`)
        : alert(`Có sản phẩm hết hàng: ${hasOutOfStock}`);
      let isSatisfied = prices.every((price) => price > 100);
      isSatisfied
        ? alert(`Tất cả sản phẩm giá > 100: ${isSatisfied}`)
        : alert(`Tất cả sản phẩm giá > 100: ${isSatisfied}`);
      break;
    }

    case 3: {
      let totalPrice = prices.reduce(
        (total, price, index) => total + price * stocks[index],
        0,
      );
      alert(`Tổng giá trị tài sản hiện có trong kho hàng là: ${totalPrice}`);
      break;
    }

    case 4: {
      let discount = prices.forEach((price, i) => (prices[i] = price * 0.9));
      alert("Đã cập nhật thành công giá chiết khấu 10%");
      break;
    }

    case 5: {
      let input = prompt("Bạn muốn tìm gì?").toLowerCase().trim();
      let resultSearch = "";
      let isFound = false;
      names.forEach((name, i) => {
        if (name.toLowerCase().includes(input)) {
          resultSearch += `${name} - Giá: ${prices[i]} - Kho: ${stocks[i]}\n`;
          isFound = true;
        }
      });

      if (!isFound) {
        alert("Không tìm thấy sản phẩm");
      } else {
        alert(resultSearch);
      }
      break;
    }

    case 6: {
      let status = stocks.map((stock, i) => {
        stock === 0 ? "Hết hàng" : "Còn hàng";
        return `Báo cáo tồn kho:\n ${names[i]}: ${status}(${stocks[i]}\n)`;
      });
      alert(status);
      break;
    }

    case 7: {
      alert("Thoát chương trình!Cảm ơn bạn");
      break;
    }

    default: {
      alert("Lựa chọn không hợp lệ");
    }
  }
} while (choice !== 7);
