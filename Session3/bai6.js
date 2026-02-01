let seriousComplaintCount = 0,
  minorComplaintCount = 0,
  mediumComplaintCount = 0,
  positiveComplaintCount = 0,
  suggestionCount = 0, 
  totalFeedback = 0;
let option;

do {
  let rawOption = prompt("Tiếp tục kiểm kê sách tiếp theo? (Có/ Không)");
  if (rawOption === null) {
    option = "không"; 
  } else {
    option = rawOption.toLowerCase();
  }
  if (option === "không") {
    alert(`Tổng số phản hồi đã xử lý: ${totalFeedback};
Số khiếu nại nghiêm trọng: ${seriousComplaintCount};
Số khiếu nại trung bình: ${mediumComplaintCount};
Số khiếu nại nhẹ:  ${minorComplaintCount};
Số đề xuất cải thiện: ${suggestionCount};
Số phản hồi tích cực ${positiveComplaintCount} ;
`)
  } else if (option === "có") { 
    totalFeedback +=1;
    let userName = prompt("Nhập tên người dùng");
    if (userName = null) 
        continue;
    let cardCode = prompt("Nhập mã thẻ ( nếu có )");
    let optionType; 
    do {
        let rawOptionType = prompt("Mời nhập vào lựa chọn (1-Khiêu nại  2-Đề xuất cải thiện  3-Phản hồi tích cực");
        if (rawOptionType === null) {
             optionType = -1;
            break;
        } else {
            optionType = +rawOptionType;
                if ( (optionType !== 1 && optionType !== 2 && optionType !== 3) || isNaN(optionType ) ) {
                    alert("Lựa chọn không phù hợp.Vui lòng nhập lại");
                }
          }
    } while ((optionType !== 1 && optionType !== 2 && optionType !== 3) || isNaN(optionType ));
    if(optionType === 1){
        let seriousLevel;
        do {
            let rawSeriousLevel = prompt("Nhập mức độ nghiêm trọng (1-Nhẹ 2-Trung bình 3-Nghiêm trọng");
        if (rawSeriousLevel === null) {
            seriousLevel = -1;
            break;
        } else {
            seriousLevel = +rawSeriousLevel;
        if ( (seriousLevel !== 1 && seriousLevele !== 2 && seriousLevel !== 3) || isNaN(seriousLevel ) ) {
            alert("Lựa chọn không phù hợp.Vui lòng nhập lại");
        }
    }
        } while ((seriousLevel !== 1 && seriousLevele !== 2 && seriousLevel !== 3) || isNaN(seriousLevel ));
        if (seriousLevel === 3) {
            seriousComplaintCount++;
            alert("Chuyển ngay lãnh đạo - Khiếu nại nghiêm trọng");
        } else if ( seriousLevel === 2) {
            mediumComplaintCount++;
            alert("Ghi nhận, sẽ xử lý trong ngày - Khiếu nại trung bình");
        } else if ( seriousLevel === 1) {
            minorComplaintCount++;
            alert("Xử lý ngay tại quầy - Khiếu nại nhẹ");
        }
    } else if ( optionType === 2) {
        suggestionCount++;
        alert("Cảm ơn! Đề xuất đã được ghi nhận");
    } else if ( optionType === 3) {
        positiveComplaintCount++;
        alert("Cảm ơn bạn đã phản hồi tích cực!");
    }
  } else {
    alert('Vui lòng chọn "có" hoặc "không" ');
  }
} while ( option !== "không" );