const API_KEY = "AIzaSyD6o4Zwpt0Qim-6lLdJ4Ti0gUWJbrMwk-Y";
const CHANNEL_ID = "UC5reF0zkdOnB3GEpVqNJfHw";

/* PLAYLISTS */

const playlists = {

  talk:
  "PL8W_paC7-AOtTlt5kzJXexdirvM5HGIHf",

  cartoons:
  "PL8W_paC7-AOuHLHtxjVGMRaeEVFdqpoix",

  musicvideos:
  "PL8W_paC7-AOs-YVLrcN1rw_MhozUIoESZ",

};

/* LOAD */

async function loadAll(){

  for(const category in playlists){

    loadPlaylist(
      playlists[category],
      `row-${category}`
    );

  }

}

/* LOAD PLAYLIST */

async function loadPlaylist(
  id,
  rowId
){

  try{

    const url =
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=${id}&key=${API_KEY}`;

    const res =
      await fetch(url);

    const data =
      await res.json();

    displayVideos(
      data.items,
      rowId
    );

  }catch(err){

    console.log(err);

  }

}

/* DISPLAY */

function displayVideos(
  videos,
  rowId
){

  const row =
    document.getElementById(rowId);

  row.innerHTML = "";

  videos.forEach(video => {

    const videoId =
      video.snippet.resourceId.videoId;

    const card =
      document.createElement("div");

    card.className =
      "video-card";

    card.innerHTML = `

      <img
        src="${video.snippet.thumbnails.high.url}"
      >

      <div class="video-card-content">

        <h4>

          ${video.snippet.title.slice(0,50)}

        </h4>

      </div>

    `;

    card.onclick = () => {

      window.location.href =
      `index.html?video=${videoId}`;

    };

    row.appendChild(card);

  });

}

loadAll();