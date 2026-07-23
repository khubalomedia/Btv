
// SUPABASE CONNECTION
const SUPABASE_URL =
"https://lnuznyfumxjrfxtxozhg.supabase.co"

const SUPABASE_KEY =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxudXpueWZ1bXhqcmZ4dHhvemhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4MDU5MjgsImV4cCI6MjA5NTM4MTkyOH0.WxIT5uWCm-Y0UXiWvwTEzU_HCnYTxJoEt9SJFfUhIfo"

const supabaseClient =
supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
)


// AUTH STATE
let currentUser = null


// CHECK USER
async function checkUser() {

  const {
    data: { user }
  } = await supabaseClient.auth.getUser()

  currentUser = user

  if (user) {

    const {
      data: profile,
      error: profileError
    } =
    await supabaseClient
    .from("profiles")
    .select("username, avatar_url")
    .eq("id", user.id)
    .single()
  
    userLabel.innerText =
    profile?.username || user.email
    
    avatarPreview.style.display =
    "block"

    avatarPreview.src =
    profile?.avatar_url ||
    "images/default-avatar.png"

    avatarPreview.style.display =
    "block"
  
    loginBtn.style.display =
    "none"
  
    registerBtn.style.display =
    "none"
  
    logoutBtn.style.display =
    "inline-block"

    editProfileBtn.style.display =
    "inline-block"
  
  } else {

    userLabel.innerText =
    "Guest"

    avatarPreview.style.display =
    "none"

    loginBtn.style.display =
    "inline-block"

    registerBtn.style.display =
    "inline-block"

    logoutBtn.style.display =
    "none"

    editProfileBtn.style.display =
    "none"

  }

}


// REGISTER
async function register() {

  const username =
  prompt("Choose Username")

  if (!username) return

  const email =
  prompt("Email")

  if (!email) return

  const password =
  prompt("Password")

  if (!password) return

  const {
    data,
    error
  } =
  await supabaseClient.auth.signUp({
    email,
    password
  })

  if (error) {

    alert(error.message)

    return

  }

  if (data.user) {

    const {
      error: profileError
    } =
    await supabaseClient
    .from("profiles")
    .insert([
      {
        id: data.user.id,
        username: username
      }
    ])

    if (profileError) {

      console.error(profileError)

      alert(profileError.message)

      return

    }

  }

  await supabaseClient.auth
  .signInWithPassword({
    email,
    password
  })

  await checkUser()

  alert("Welcome to BaloTV!")

}

// LOGIN
async function login() {

  const email =
  prompt("Email")

  if (!email) return

  const password =
  prompt("Password")

  if (!password) return

  const { error } =
  await supabaseClient.auth
  .signInWithPassword({
    email,
    password
  })

  if (error) {

    alert(error.message)

    return

  }

  await checkUser()

}


// LOGOUT
async function logout() {

  await supabaseClient.auth.signOut()

  await checkUser()

}


const playlists = {

  home: [

  {
  videoId:"Tivk4nCSVfg",
  title:"Nasty C is my brother from another mother full"
  },
  
  {
  videoId:"S4vNf6UNs8E",
  title:"Ivo Suzee EXPOSED? The Dark Truth"
  },

  {
  videoId: "ZE-sWzZx0VM",
  title: "ChatGPT Explained for South African Students | Beginner's Guide 2026"
  },
  
  {
  videoId:"OwWlrcgZJF0",
  title:"Mhlekazi - Masikandi Artist - Trailer"
  },

  {
  videoId:"ONytvK1G9fY",
  title:"Young Ross - Producer - Nkabi Record - Amaphiko - Trailer"
  },

  {
    videoId:"cYup8Xd8i_U",
    title:"Lawisa - Masikandi Artist - Trailer"
    },

  {
  videoId:"pAHuC9E_Axg",
  title:"Fruity Friends Truth or Truth"
  },
  
  {
  videoId:"QlqznFEUbBw",
  title:"This Rap Battle Got Out Of Control"
  },
   
   {
   videoId:"ii4-VAtg2fg",
   title:"He Starved At School To Avoid Bullying"
   },

   {
      videoId: "ryA419P7Z1Q",
      title: "I'm Not A Berry - Fruity Friends"
    },

  ],
  
 
  
  };
  
  /* PLAYER STATE */
  
  let currentPlaylist = [];
  
  let currentIndex = 0;
  
  /* LOAD */
  
  function loadAll(){
  
  for(const category in playlists){
  
  displayVideos(
  playlists[category],
  `row-${category}`
  );
  
  }
  
  }
  
  /* DISPLAY */
  
  function displayVideos(
  videos,
  rowId
  ){
  
  const row =
  document.getElementById(rowId);
  
  if(!row) return;
  
  row.innerHTML = "";
  
  videos.forEach((video,index)=>{
  
  const card =
  document.createElement("div");
  
  card.className =
  "video-card";
  
  card.innerHTML = `
  
  <img
  src="https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg"
  loading="lazy"
  >
  
  <div class="video-card-content">
  
  <h4>${video.title}</h4>
  
  </div>
  
  `;
  
  card.onclick = ()=>{
  
  currentPlaylist = videos;
  
  currentIndex = index;
  
  playVideo(
  video.videoId,
  video.title
  );
  
  updateUpNext();
  
  };
  
  row.appendChild(card);
  
  });
  
  }
  
  /* PLAY VIDEO */
  
  function playVideo(
  videoId,
  title=""
  ){
  
  document
  .getElementById("playerSection")
  .classList.remove("hidden");
  
  const player =
  document.getElementById(
  "video-player"
  );
  
  player.src =
  `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  
  document
  .getElementById("video-title")
  .innerText = title;
  
  window.scrollTo({
  
  top:0,
  behavior:"smooth"
  
  });
  
  localStorage.setItem(
  "lastPlayedVideo",
  JSON.stringify({
  videoId,
  title
  })
  );
  
  }
  
  /* LOAD LAST */
  
  function loadLastPlayed(){
  
  const saved =
  JSON.parse(
  localStorage.getItem(
  "lastPlayedVideo"
  )
  );
  
  if(!saved) return;
  
  playVideo(
  saved.videoId,
  saved.title
  );
  
  }
  
  /* UP NEXT */
  
  function updateUpNext(){
  
  const row =
  document.getElementById(
  "up-next-row"
  );
  
  if(!row) return;
  
  row.innerHTML = "";
  
  const nextVideos =
  currentPlaylist.slice(
  currentIndex + 1,
  currentIndex + 8
  );
  
  nextVideos.forEach((video,index)=>{
  
  const card =
  document.createElement("div");
  
  card.className =
  "video-card";
  
  card.innerHTML = `
  
  <img
  src="https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg"
  >
  
  <div class="video-card-content">
  
  <h4>${video.title}</h4>
  
  </div>
  
  `;
  
  card.onclick = ()=>{
  
  currentIndex =
  currentIndex + index + 1;
  
  playVideo(
  video.videoId,
  video.title
  );
  
  updateUpNext();
  
  };
  
  row.appendChild(card);
  
  });
  
  }
  
  /* NEXT */
  
  function playNext(){
  
  if(
  currentIndex <
  currentPlaylist.length - 1
  ){
  
  currentIndex++;
  
  const nextVideo =
  currentPlaylist[currentIndex];
  
  playVideo(
  nextVideo.videoId,
  nextVideo.title
  );
  
  updateUpNext();
  
  }
  
  }
  
  /* PREVIOUS */
  
  function playPrevious(){
  
  if(currentIndex > 0){
  
  currentIndex--;
  
  const prevVideo =
  currentPlaylist[currentIndex];
  
  playVideo(
  prevVideo.videoId,
  prevVideo.title
  );
  
  updateUpNext();
  
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
  
  document
  .getElementById("searchInput")
  .addEventListener(
  "input",
  function(){
  
  const value =
  this.value.toLowerCase();
  
  const cards =
  document.querySelectorAll(
  ".video-card"
  );
  
  cards.forEach(card=>{
  
  const text =
  card.innerText.toLowerCase();
  
  card.style.display =
  text.includes(value)
  ? "block"
  : "none";
  
  });
  
  }
  );
  
  /* START */
  
  loadAll();
  
  loadLastPlayed();