const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const val = urlParams.get('q');

if(val === null){
  document.addEventListener('DOMContentLoaded', fetchPosts)
}else{
  const findPosts= async (q)=>{
    const post = await fetch(`https://dummyjson.com/posts/search?q=${q}`);
    const data = await post.json();
    renderPosts(data.posts);
  };
  findPosts(val);
}


// Without USING ASYNC/AWAIT
function fetchPosts () {
  fetch('https://dummyjson.com/posts')
    .then((res) => res.json())
    .then((data) => renderPosts(data.posts))
}

// USING ASYNC/AWAIT
// async function fetchPosts() {
//     const posts = await fetch(
//         "https://jsonplaceholder.typicode.com/posts"
//     ).then((res) => res.json())
//     renderPosts(posts)
// }

// Manually creating UI elements
// function renderPosts(posts) {
//     const feeds = document.querySelector(".feeds")
//     posts.forEach((post) => {
//         const p = document.createElement("p")
//         p.innerText = post.body

//         feeds.appendChild(p)
//     })
// }

// elements Using Template
function renderPosts (posts) {
  const feeds = document.querySelector('.feeds')
  const feedTemplate = document.querySelector('#feed-template')

  posts.forEach((post) => {
    const feed = feedTemplate.content.cloneNode(true)
    feed.querySelector('.feed-template a').href = `./userPosts/index.html?userId=${post.userId}`
    feed.querySelector('.feed-template h6').innerText = post.userId
    feed.querySelector('.feed-template b').innerText = post.title
    feed.querySelector('.feed-template p').innerText = post.body

    feeds.appendChild(feed)
  })
}

document.querySelector('.search-btn').addEventListener('click', () => {
  const queryValue = document.querySelector('.query-value').value;
  window.location.href = `./index.html?q=${queryValue}`;
});
