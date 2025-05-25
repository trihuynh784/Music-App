// APlayer
const aplayer = document.getElementById("aplayer");
let ap;
if (aplayer) {
  let dataSong = aplayer.getAttribute("data-song");
  let dataSinger = aplayer.getAttribute("data-singer");

  dataSong = JSON.parse(dataSong);
  dataSinger = JSON.parse(dataSinger);

  ap = new APlayer({
    container: document.getElementById("aplayer"),
    autoplay: true,
    lrcType: 1,
    audio: [
      {
        name: dataSong.title,
        artist: dataSinger.fullName,
        url: dataSong.audio,
        cover: dataSong.avatar,
        lrc: dataSong.lyrics,
      },
    ],
  });
}
// End APlayer

// Flash Message
function closeFlashMsg() {
  const msg = document.getElementById("flash-msg");
  if (msg) msg.remove();
}
setTimeout(() => {
  const msg = document.getElementById("flash-msg");
  if (msg) msg.classList.add("opacity-0", "transition");
  setTimeout(() => msg?.remove(), 1000);
}, 4000);
// End Flash Message

// Emoji Button
const listButton = document.querySelector("[list-button]");
if (listButton) {
  const btnLike = listButton.querySelector("[button-like]");
  if (btnLike) {
    btnLike.addEventListener("click", () => {
      btnLike.classList.toggle("emoji-active");
    });
  }

  const btnsFavorite = listButton.querySelectorAll("[button-favorite]");
  btnsFavorite.forEach((btnFavorite) => {
    btnFavorite.addEventListener("click", () => {
      btnFavorite.classList.toggle("emoji-active");
    });
  });
}
// End Emoji Button

const toggleLoading = (button, i, type) => {
  button.toggleAttribute("disabled");
  button.classList.toggle(`loading-container`);
  i.classList.toggle(`loading-spinner-${type}`);
};

// Like
const buttonLike = document.querySelector("[button-like]");
if (buttonLike) {
  const i = buttonLike.querySelector("i");

  buttonLike.addEventListener("click", () => {
    toggleLoading(buttonLike, i, "like");

    const slugSong = buttonLike.getAttribute("button-like");
    const isActive = buttonLike.classList.contains("emoji-active");

    const type = isActive ? "add" : "remove";
    const link = `/songs/like/${type}/${slugSong}`;
    const option = {
      method: "PATCH",
    };
    fetch(link, option)
      .then((res) => res.json())
      .then((data) => {
        const url = new URL(window.location.href);
        switch (data.message) {
          case "liked":
            break;
          case "success":
            const span = buttonLike.querySelector("span");
            span.innerHTML = `${data.like} Thích`;
            break;
          case "not login":
            url.pathname = "/user/login";
            window.location.href = url.href;
            break;
          default:
            url.pathname = "/404-not-found";
            window.location.href = url.href;
            break;
        }
      })
      .finally(() => {
        setTimeout(() => {
          toggleLoading(buttonLike, i, "like");
        }, 300);
      });
  });
}
// End Like

// Favorite
const buttonsFavorite = document.querySelectorAll("[button-favorite]");
if (buttonsFavorite) {
  buttonsFavorite.forEach((buttonFavorite) => {
    buttonFavorite.addEventListener("click", () => {
      const i = buttonFavorite.querySelector("i");

      toggleLoading(buttonFavorite, i, "favorite");

      const slugSong = buttonFavorite.getAttribute("button-favorite");
      const isActive = buttonFavorite.classList.contains("emoji-active");
      const status = isActive ? "add" : "remove";
      const link = `/songs/favorite/${status}/${slugSong}`;
      const option = {
        method: "PATCH",
      };
      fetch(link, option)
        .then((res) => res.json())
        .then((data) => {
          const url = new URL(window.location.href);
          switch (data.message) {
            case "favorited":
            case "success":
              break;
            case "not login":
              url.pathname = "/user/login";
              window.location.href = url.href;
              break;
            default:
              url.pathname = "/404-not-found";
              window.location.href = url.href;
              break;
          }
        })
        .finally(() => {
          setTimeout(() => {
            toggleLoading(buttonFavorite, i, "favorite");
          }, 300);
        });
    });
  });
}
// End Favorite

// Search Suggestions
const search = document.querySelector("#search");
if (search) {
  const inputSearch = search.querySelector("input");
  inputSearch.addEventListener("keyup", () => {
    const keyword = inputSearch.value;
    const link = `/search/suggestions?keyword=${keyword}`;
    fetch(link)
      .then((res) => res.json())
      .then((data) => {
        const suggestions = search.querySelector("#suggestions");
        if (data.code == 200 && data.songs.length > 0) {
          suggestions.classList.add("show");

          suggestions.innerHTML = "";

          data.songs.forEach((song) => {
            const li = document.createElement("li");
            li.classList.add("m-0");
            li.classList.add("p-0");
            li.innerHTML = `
              <a class="px-4 py-2 cursor-pointer flex hover:bg-gray-700" href="/songs/detail/${song.slug}">
                <img class="w-[18%]" src=${song.avatar} />
                <div class="right flex flex-col ml-4">
                  <span class="text-lg capitalize">${song.title}</span>
                  <div class="singer text-md block mt-2">
                    <i class="fa-solid fa-signature mr-2"></i>
                    ${song.infoSinger.fullName}
                  </div>
                </div>
              </a>
            `;

            suggestions.appendChild(li);
          });
        } else {
          suggestions.classList.remove("show");
        }
      });
  });
}
// End Search Suggestions

// Listen
ap.on("ended", () => {
  const listenAttribute = document.querySelector("[listen-song-id]");
  const songId = listenAttribute.getAttribute("listen-song-id");

  const link = `/songs/listen/${songId}`;
  const option = {
    method: "PATCH",
  };
  fetch(link, option)
    .then((res) => res.json())
    .then((data) => {
      if (data.code == 200) {
        const span = listenAttribute.querySelector("span");
        span.innerHTML = `${data.listen} lượt nghe`;
      }
    });
});
// End Listen
