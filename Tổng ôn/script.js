// VARIABLE
let editingId = null;
let idCounter = JSON.parse(localStorage.getItem("idCounter")) || 1;
let songs = JSON.parse(localStorage.getItem("songs")) || [];

// RETRIEVE DATA
const title = document.querySelector("#formTitle");
const form = document.querySelector(".form");
const songName = document.querySelector("#title");
const artist = document.querySelector("#artist");
const songList = document.querySelector("#songTable");
const searchBySongName = document.querySelector("#search");

const submitBtn = document.querySelector("#submitBtn");
const editBtn = document.querySelector("#updateBtn");
const deleteBtn = document.querySelector("#deleteBtn");
const cancelBtn = document.querySelector("#cancelBtn");

// VALIDATATION
function validation() {
  if (!songName.value.trim()) {
    alert("Tên bài hát không được để trống");
    return false;
  } else if (songName.value.length < 2) {
    alert("Tên bài hát không được dưới 2 kí tự");
    return false;
  }

  if (!artist.value.trim()) {
    alert("Tên ca sĩ không dược để trống");
    return false;
  } else if (artist.value.length < 2) {
    alert("Tên ca sĩ không được dưới 2 kí tự");
    return false;
  }

  return true;
}

// RESET FORM
function formReset() {
  form.reset();
  editingId = null;
  title.textContent = "🎵 Thêm bài hát";
  submitBtn.textContent = "Thêm";
  cancelBtn.style.display = "none";
}

// SAVE DATA
function saveData() {
  localStorage.setItem("songs", JSON.stringify(songs));
  localStorage.setItem("idCounter", JSON.stringify(idCounter));
}

// RENDER
function renderSongs(list = songs) {
  songList.innerHTML = "";
  if (list.length === 0) {
    songList.innerHTML = `
        <div class="empty-state show">
            <div class="empty-state-icon">🎶</div>
           <div class="empty-state-text">Chưa có bài hát nào</div>
        </div>`;
  } else {
    list.forEach((s) => {
      songList.innerHTML += `
    <tr>
                    <td>${s.id}</td>
                    <td>${s.songName}</td>
                    <td>${s.singer}</td>
                    <td><button class="btn-edit" data-id="${s.id}">
                            Sửa
                        </button>
                        <button class="btn-delete" data-id="${s.id}">
                            Xóa
                        </button>
                    </td>
    </tr>`;
    });
  }
}

// ADD / UPDATE
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!validation()) return;

  let newSong = {
    songName: songName.value.trim(),
    singer: artist.value.trim(),
  };

  if (editingId) {
    let song = songs.find((s) => s.id === editingId);
    Object.assign(song, newSong);
    saveData();
    renderSongs();
    formReset();
  } else {
    newSong.id = idCounter++;
    songs.push(newSong);
    saveData();
    renderSongs();
    formReset();
  }
});

// EDIT / DELETE
songList.addEventListener("click", (e) => {
    let id = +(e.target.dataset.id);
    if (!id) return;
    if(e.target.classList.contains("btn-delete")){
        let index = songs.findIndex(s => s.id === id);
        if (index === -1) {
            alert("Không có dữ liệu bài hát");
            return;
        } else {
            if(confirm("Bạn có chắc chắn muốn xoá bài hát " + songs[index].songName + "?" )) {
                songs.splice(index,1);
                alert("Đã xoá thành công!");
                saveData();
                renderSongs();
            }
        }
    } if ( e.target.classList.contains("btn-edit")) {
        let song = songs.find ( s => s.id === id);
        editingId = id ;

        // FILL FORM
        songName.value = song.songName;
        artist.value = song.singer;

        // CHANGE UI
        title.textContent = " Cập nhật bài hát";
        cancelBtn.style.display = "inline-block";
        submitBtn.textContent = "💾 Cập Nhật";

        // SCROLL + POINTER
        window.scrollTo({ top: 0, behavior: "smooth" });
        songName.focus();


    }
});

// CLICK TO CANCEL 
cancelBtn.addEventListener("click", formReset);


// SEARCH
searchBySongName.addEventListener("input", findSong);
function findSong () {
  let musicList = songs;
  let keyword = searchBySongName.value.toLowerCase();
  if (keyword) {
    musicList = musicList.filter(s => s.songName.toLowerCase().includes(keyword))
  }

  renderSongs(musicList);
}



// APP RUN
renderSongs();