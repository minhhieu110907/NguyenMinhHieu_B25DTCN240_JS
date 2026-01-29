let bookName = prompt("Nhập tên sách: ");
let userName = prompt("Nhập tên người mượn: ");
let favouriteLevel = +prompt("Nhập tên mức độ yêu thích(1 - 5): ");


switch(favouriteLevel){
    case 1:
    case 2:
        console.log("Sách này bạn có thể cân nhắc mượn lại sau");
        break;
    case 3:
        console.log("Sách này khá ổn, có thể mượn");
        break;
    case 4:
    case 5:
        console.log("Đây là cuốn sách yêu thích của bạn, hãy đọc ngay!");
        break;
    default:
        console.log("Mức độ yêu thích( 1 - 5)");
}