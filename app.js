/* =========================================
   BaloTV
========================================= */

/* PLAYLISTS */

const playlists = {


  educational: [

    {
      videoId: "S4vNf6UNs8E",
      title: "Fake Casting Agent - African Casting"
    },
 
    {
      videoId: "23ENrmIoCfs",
      title: "South Africa's 2029 Election Could Change Everything"
    },

    {
      videoId: "E0ElvFfV6U4",
      title: "The History of Maize | How It Changed Africa"
    }, 
    
    {
      videoId: "ZE-sWzZx0VM",
      title: "ChatGPT Explained for South African Students | Beginner's Guide 2026"
    },


  ],


   talk: [

    {
      videoId: "z0Ito0_XF_8",
      title: "Young Ross - Producer - Nkabi Record - Amaphiko"
    },

    {
      videoId: "o_Zowc8eO90",
      title: "Mhlekazi - Masikandi Artist - Interview"
    },

    {
      videoId: "XvhCbD5sPec",
      title: "Lawisa Zulu - Masikandi Artist - Interview"
    },

    {
      videoId: "Tivk4nCSVfg",
      title: "Nasty C Is My Bother Form Another Mother"
    },

    {
      videoId: "QlqznFEUbBw",
      title: "This Rap Battle Got Out Of Control"
    },
 
   ],
 
   cartoons: [

    {
      videoId: "ryA419P7Z1Q",
      title: "I'm Not A Berry - Fruity Friends"
    },

 
     {
       videoId: "pAHuC9E_Axg",
       title: "Truth Or Truth - Fruity Friends"
     },
 
     {
       videoId: "fg8uJ0GZ3jk",
       title: "IskhathiSes'phithisphithi KwaMthembu - E1"
     },
 
     {
       videoId: "j9rRaQbLZLo",
       title: "IskhathiSes'phithisphithi KwaMthembu - E2"
     },

     {
      videoId: "cNBdNIUkq2k",
      title: "Story Time"
    },

    {
      videoId: "ii4-VAtg2fg",
      title: "He Starved At School To Avoid Bullying"
    },

    {
      videoId: "e9ODdIf_tOU",
      title: "IskhathiSes'phithisphithi KwaMthembu - E2"
    },

    {
      videoId: "tyByhQtGzWM",
      title: "KFC Hist"
    },

    {
      videoId: "SGWahTOOgHo",
      title: "IskhathiSes'phithisphithi KwaMthembu - E1"
    },

    {
      videoId: "ogK4XR-0ho4",
      title: "IskhathiSes'phithisphithi KwaMthembu - E2"
    },

    {
     videoId: "gv5RNibH_cw",
     title: "Truth Or Truth - Fruity Friends"
   },

   {
     videoId: "yR9eY07X0Hc",
     title: "IskhathiSes'phithisphithi KwaMthembu - E1"
   },

   {
     videoId: "9nons4kJfFY",
     title: "IskhathiSes'phithisphithi KwaMthembu - E2"
   }
 
   ],
 
   trailer: [
 
    {
      videoId: "ONytvK1G9fY",
      title: "Young Ross - Producer - Nkabi Record - Amaphiko - Trailer"
    },

    {
      videoId: "OwWlrcgZJF0",
      title: "Mhlekazi - Masikandi Artist - Trailer"
    },


    {
     videoId: "cYup8Xd8i_U",
     title: "Lawisa - Masikandi Artist - Trailer"
   },

   
 
   ],
 
 };
 
 /* PLAYER STATE */
 
 let currentPlaylist = [];
 
 let currentIndex = 0;
 
 /* ELEMENTS */
 
 const playerSection =
   document.getElementById(
     "playerSection"
   );
 
 const player =
   document.getElementById(
     "video-player"
   );
 
 const videoTitle =
   document.getElementById(
     "video-title"
   );
 
 /* HIDE PLAYER INITIALLY */
 
 playerSection.classList.add(
   "hidden"
 );

 updatePlayerQueue();
 
 /* LOAD ALL VIDEOS */
 
 function loadAll() {

  displayVideos(
    playlists.educational,
    "row-educational"
  );
 
   displayVideos(
     playlists.talk,
     "row-talk"
   );
 
   displayVideos(
     playlists.cartoons,
     "row-cartoons"
   );
 
   displayVideos(
     playlists.trailer,
     "row-trailer"
   );
 
 }
 
 /* DISPLAY VIDEOS */
 
 function displayVideos(
   videos,
   rowId
 ) {
 
   const row =
     document.getElementById(rowId);
 
   if (!row) return;
 
   row.innerHTML = "";
 
   videos.forEach((video, index) => {
 
     const card =
       document.createElement("div");
 
     card.className =
       "video-card";
 
       card.innerHTML = `
       <img
         class="video-thumb"
         src="https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg"
         alt="${video.title}"
         loading="lazy"
       >
     
       <div class="video-card-content">
     
         <h4>${video.title}</h4>
     
         <p class="watch-label">
           ▶ Watch now
         </p>
     
       </div>
     `;
 
     card.onclick = () => {
 
       currentPlaylist = videos;
 
       currentIndex = index;
 
       playVideo(
         video.videoId,
         video.title
       );
 
     };
 
     row.appendChild(card);
 
   });
 
 }
 
 /* PLAY VIDEO */
 
 function playVideo(videoId, title = "") {

  playerSection.classList.remove("hidden");

  document.getElementById("welcomeBanner").style.display = "none";

  player.src =
    `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&enablejsapi=1`;

  document
    .getElementById("video-title")
    .innerText = title;

  // Show videos from the same category in Up Next
  function updatePlayerQueue(){

    const queue=document.getElementById("playerQueue");

    queue.innerHTML="";

    currentPlaylist.forEach((video,index)=>{

        if(index===currentIndex) return;

        const card=document.createElement("div");

        card.className="up-next-card";

        card.innerHTML=`

        <img src="https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg">

        <div class="up-next-info">

            <h3>${video.title}</h3>

            <div class="up-next-meta">

                👁 12K views • 📅 12 May 2026 • ⏱ 18:43

            </div>

        </div>

        `;

        card.onclick=()=>{

            currentIndex=index;

            playVideo(video.videoId,video.title);

        };

        queue.appendChild(card);

    });

}

  playerSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
});

  localStorage.setItem(
    "lastPlayedVideo",
    JSON.stringify({
      videoId,
      title
    })
  );

}
 
 /* LOAD LAST PLAYED */
 
 function loadLastPlayed() {
 
   const saved =
     JSON.parse(
       localStorage.getItem(
         "lastPlayedVideo"
       )
     );
 
   if (!saved) return;
 
   playVideo(
     saved.videoId,
     saved.title
   );
 
 }
 
 /* NEXT VIDEO */
 
 function playNext() {

  if (
    currentIndex <
    currentPlaylist.length - 1
  ) {

    currentIndex++;

    const nextVideo =
      currentPlaylist[currentIndex];

    playVideo(
      nextVideo.videoId,
      nextVideo.title
    );

  } else {

    // Restart from the beginning of the same category
    currentIndex = 0;

    const firstVideo =
      currentPlaylist[currentIndex];

    playVideo(
      firstVideo.videoId,
      firstVideo.title
    );

  }

}
 /* PREVIOUS VIDEO */
 
 function playPrevious() {
 
   if (currentIndex > 0) {
 
     currentIndex--;
 
     const prevVideo =
       currentPlaylist[currentIndex];
 
     playVideo(
       prevVideo.videoId,
       prevVideo.title
     );
 
     updatePlayerQueue();

   }
 
 }
 
 /* BUTTONS */
 
 document
   .getElementById("nextBtn")
   .addEventListener(
     "click",
     playNext
   );
 
 document
   .getElementById("prevBtn")
   .addEventListener(
     "click",
     playPrevious
   );
 
 /* SEARCH */

document.getElementById("searchInput").addEventListener("input", function () {

  const search = this.value.toLowerCase();

  document.querySelectorAll(".section").forEach(section => {

      let visible = 0;

      section.querySelectorAll(".video-card").forEach(card => {

          const match = card.innerText.toLowerCase().includes(search);

          card.style.display = match ? "block" : "none";

          if (match) visible++;

      });

      section.style.display = visible ? "block" : "none";

  });

});
 
 /* SERVICE WORKER */
 
 if (
   "serviceWorker" in navigator
 ) {
 
   navigator
     .serviceWorker
     .register(
       "/service-worker.js"
     );
 
 }


 document.addEventListener("click", function(e){

  const menu=document.getElementById("dropdownMenu");
  const button=document.querySelector(".menu-btn");

  if(!menu.contains(e.target) && !button.contains(e.target)){

      menu.classList.remove("active");

  }

});



function playNext() {

  if (
    currentIndex <
    currentPlaylist.length - 1
  ) {

    currentIndex++;

    const nextVideo =
      currentPlaylist[currentIndex];

    playVideo(
      nextVideo.videoId,
      nextVideo.title
    );

  } else {

    // Restart from the beginning of the same category
    currentIndex = 0;

    const firstVideo =
      currentPlaylist[currentIndex];

    playVideo(
      firstVideo.videoId,
      firstVideo.title
    );

  }

}



async function getVideoDetails(videoIds){

  const API_KEY="AIzaSyD6o4Zwpt0Qim-6lLdJ4Ti0gUWJbrMwk-Y";

  const url=`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds.join(",")}&key=${API_KEY}`;

  const res=await fetch(url);

  const data=await res.json();

  return data.items;

}



function formatDuration(duration){

  const match=duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);

  const h=match[1]||0;

  const m=match[2]||0;

  const s=match[3]||0;

  if(h>0)
      return `${h}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;

  return `${m}:${String(s).padStart(2,"0")}`;

}



function formatViews(views){

  return Number(views).toLocaleString()+" views";

}




function formatDate(date){

  return new Date(date).toLocaleDateString("en-GB",{

      day:"numeric",

      month:"short",

      year:"numeric"

  });

}



<div class="up-next-meta">

👁 ${formatViews(video.statistics.viewCount)}

•

📅 ${formatDate(video.snippet.publishedAt)}

•

⏱ ${formatDuration(video.contentDetails.duration)}

</div>

 
 /* START */
 
 loadAll();
 
 /* COMMENT THIS OUT
    IF YOU DON'T WANT
    PLAYER TO AUTO-OPEN
 */
 
 /*
 loadLastPlayed();
 */