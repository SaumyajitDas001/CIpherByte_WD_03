document.addEventListener("DOMContentLoaded", loadPosts);

function addPost() {
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    if (title.trim() === "" || content.trim() === "") {
        alert("Please enter both title and content!");
        return;
    }

    const post = {
        title: title,
        content: content,
        id: Date.now()
    };

    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.unshift(post);
    localStorage.setItem("posts", JSON.stringify(posts));

    document.getElementById("title").value = "";
    document.getElementById("content").value = "";

    loadPosts();
}

function loadPosts() {
    const postsContainer = document.getElementById("posts-container");
    postsContainer.innerHTML = "";
    
    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    posts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");

        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <button class="delete-btn" onclick="deletePost(${post.id})">Delete</button>
        `;

        postsContainer.appendChild(postElement);
    });
}

function deletePost(id) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts = posts.filter(post => post.id !== id);
    localStorage.setItem("posts", JSON.stringify(posts));
    loadPosts();
}
