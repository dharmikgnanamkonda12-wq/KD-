const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("search");
const playlistDiv = document.getElementById("playlist");
const playerDiv = document.getElementById("player");

// audio player
const audio = document.createElement("audio");
audio.controls = true;
audio.autoplay = true;
playerDiv.appendChild(audio);

searchBtn.addEventListener("click", async () => {
  const query = searchInput.value.trim();
  if (!query) return alert("Enter a song name");

  playlistDiv.innerHTML = "Searching...";

  try {
    // ✅ CALL VERCEL API — NOT JIOSAAVN DIRECTLY
    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();

    playlistDiv.innerHTML = "";

    if (!data.data || !data.data.results.length) {
      playlistDiv.innerHTML = "No songs found";
      return;
    }

    data.data.results.forEach(song => {
      const btn = document.createElement("button");
      btn.textContent = `${song.name} — ${song.primaryArtists}`;

      const url = song.downloadUrl[song.downloadUrl.length - 1].url;

      btn.onclick = () => {
        audio.src = url;
        audio.play();
      };

      playlistDiv.appendChild(btn);
    });

  } catch (err) {
    console.error(err);
    playlistDiv.innerHTML = "❌ Network blocked or API failed";
  }
});
