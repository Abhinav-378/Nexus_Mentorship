const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const userId = urlParams.get('userId');

const findPosts= async (Id)=>{
    const post = await fetch(`https://dummyjson.com/posts/user/${Id}`);
    const data = await post.json();
    renderPosts(data.posts);
};

findPosts(userId);

function renderPosts (posts) {
    const pos = document.querySelector('.posts')
    const postTemplate = document.querySelector('#post-template')
  
    posts.forEach((post) => {
      const feed = postTemplate.content.cloneNode(true)
      feed.querySelector('.post-template h6').innerText = post.userId
      feed.querySelector('.post-template b').innerText = post.title
      feed.querySelector('.post-template p').innerText = post.body
  
      pos.appendChild(feed)
    })
}