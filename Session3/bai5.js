let totalRequests = 0,
    successfulRequests = 0,
    rejectedRequests = 0,
    pendingRequests = 0;

let option;

do {
    let rawOption = prompt("Có yêu cầu đặt mượn trước mới không? (có/không)");
    
    if (rawOption === null || rawOption.toLowerCase() === "không") {
        option = "không";
        alert(`--- BÁO CÁO TỔNG HỢP CA LÀM VIỆC ---
Tổng số yêu cầu đã xử lý: ${totalRequests}
Số đặt trước thành công: ${successfulRequests}
Số yêu cầu bị từ chối: ${rejectedRequests}
Số chờ xét duyệt: ${pendingRequests}`);
        break;
    }
    option = rawOption.toLowerCase();

    if (option === "có") {
        totalRequests += 1;

        let readerName = prompt("Tên bạn đọc:");
        if (readerName === null) { totalRequests--; continue; }

        let bookCode = prompt("Mã sách muốn đặt trước:");
        if (bookCode === null) { totalRequests--; continue; }

        let bookName = prompt("Tên sách (tham khảo):");
        if (bookName === null) { totalRequests--; continue; }

        let waitDays;
        do {
            let rawWait = prompt("Số ngày dự kiến chờ (Số nguyên >= 1):");
            if (rawWait === null) break;
            waitDays = +rawWait; 
            if (isNaN(waitDays) || waitDays < 1 || !Number.isInteger(waitDays)) {
                alert("Số ngày không hợp lệ.");
            }
        } while (isNaN(waitDays) || waitDays < 1 || !Number.isInteger(waitDays));

        if (waitDays === undefined) { totalRequests--; continue; }

        let priority;
        do {
            let rawPri = prompt("Ưu tiên (1: Sinh viên, 2: Giảng viên, 3: Đặc cách):");
            if (rawPri === null) break;
            priority = +rawPri;
            if (priority !== 1 && priority !== 2 && priority !== 3) {
                alert("Mức ưu tiên không hợp lệ.");
            }
        } while (priority !== 1 && priority !== 2 && priority !== 3);

        if (priority === undefined) { totalRequests--; continue; }

        if (waitDays > 45) {
            rejectedRequests += 1;
            console.log("Từ chối: Thời gian chờ quá lâu (>45 ngày)");
            alert("Kết quả: Từ chối.");
        } else if (priority === 3) {
            successfulRequests += 1;
            console.log("Đặt trước thành công - Ưu tiên đặc cách cao nhất");
            alert("Kết quả: Thành công (Đặc cách).");
        } else if (priority === 2 && waitDays <= 30) {
            successfulRequests += 1;
            console.log("Đặt trước thành công - Ưu tiên giảng viên/nghiên cứu");
            alert("Kết quả: Thành công (Giảng viên).");
        } else if (priority === 1 && waitDays <= 21) {
            successfulRequests += 1;
            console.log("Đặt trước thành công");
            alert("Kết quả: Thành công.");
        } else {
            pendingRequests += 1;
            console.log("Đặt trước tạm thời - Chờ xét duyệt thêm");
            alert("Kết quả: Chờ xét duyệt.");
        }
    } else {
        alert("Vui lòng chỉ nhập 'có' hoặc 'không'.");
    }
} while (option !== "không");