const supabaseUrl =
'https://lnuznyfumxjrftxtozhg.supabase.co';

const supabaseKey =
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxudXpueWZ1bXhqcmZ4dHhvemhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4MDU5MjgsImV4cCI6MjA5NTM4MTkyOH0.WxIT5uWCm-Y0UXiWvwTEzU_HCnYTxJoEt9SJFfUhIfo';

const supabaseClient =
supabase.createClient(
supabaseUrl,
supabaseKey
);

const CLOUD_NAME =
'dwbacjvml';

const UPLOAD_PRESET =
'balotv_uploads';

async function uploadImage(file){

if(!file) return '';

const formData = new FormData();

formData.append('file', file);

formData.append(
'upload_preset',
UPLOAD_PRESET
);

const response = await fetch(
`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
{
method:'POST',
body:formData
}
);

const data = await response.json();

return data.secure_url;

}

async function createPost(){

const username =
document.getElementById('username').value;

const content =
document.getElementById('content').value;

const imageFile =
document.getElementById('imageInput').files[0];

if(!username || !content){

alert('Please fill everything');

return;

}

let imageUrl = '';

if(imageFile){

imageUrl =
await uploadImage(imageFile);

}

const { error } =
await supabaseClient
.from('posts')
.insert([
{
username: username,
content: content,
image_url: imageUrl
}
]);

if(error){

console.log(error);

alert('Error posting');

return;

}

document.getElementById('content').value = '';

document.getElementById('imageInput').value = '';

loadPosts();

}

async function loadPosts(){

const feed =
document.getElementById('feed');

const loading =
document.getElementById('loading');

loading.style.display = 'block';

const { data, error } =
await supabaseClient
.from('posts')
.select('*')
.order(
'created_at',
{ ascending:false }
);

loading.style.display = 'none';

if(error){

console.log(error);

return;

}

feed.innerHTML = '';

if(data.length === 0){

feed.innerHTML =
'<p>No posts yet.</p>';

return;

}

data.forEach(post => {

const postElement =
document.createElement('div');

postElement.className =
'feed-post';

postElement.innerHTML = `

<div class="feed-user">

<div class="avatar">
${post.username.charAt(0).toUpperCase()}
</div>

<div>

<h3>${post.username}</h3>

<div class="feed-time">

${new Date(
post.created_at
).toLocaleString()}

</div>

</div>

</div>

<p class="feed-text">
${post.content}
</p>

${post.image_url ? `

<img
class="feed-image"
src="${post.image_url}"
>

` : ''}

<div class="feed-actions">

<span>❤️ Like</span>

<span>💬 Comment</span>

<span>↗ Share</span>

</div>

`;

feed.appendChild(postElement);

});

}

loadPosts();