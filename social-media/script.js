// Global variables
let posts = [];
let users = [];
const currentUser = { id: 1, name: "John Doe" };

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  loadData();
  setupEventListeners();
  showSection("feed");
});

// Load data from JSON file
async function loadData() {
  try {
    const response = await fetch("data.json");
    const data = await response.json();
    posts = data.posts;
    users = data.users;

    displayPosts();
    displayFriends();
    updateProfileStats();
  } catch (error) {
    console.error("Error loading data:", error);
    // Use sample data if JSON fails to load
    loadSampleData();
  }
}

// Setup event listeners
function setupEventListeners() {
  const postForm = document.getElementById("post-form");
  postForm.addEventListener("submit", handlePostSubmit);
}

// Handle post form submission
function handlePostSubmit(e) {
  e.preventDefault();

  const content = document.getElementById("post-content").value.trim();
  if (content) {
    createPost(content);
    document.getElementById("post-content").value = "";
  }
}

// Create a new post
function createPost(content) {
  const newPost = {
    id: posts.length + 1,
    author: currentUser.name,
    authorId: currentUser.id,
    content: content,
    timestamp: new Date().toISOString(),
    likes: 0,
    comments: [],
    liked: false,
  };

  posts.unshift(newPost); // Add to beginning of array
  displayPosts();
  updateProfileStats();
}

// Display all posts
function displayPosts() {
  const postsFeed = document.getElementById("posts-feed");
  const userPosts = document.getElementById("user-posts");

  postsFeed.innerHTML = "";
  userPosts.innerHTML = "";

  posts.forEach((post) => {
    const postElement = createPostElement(post);
    postsFeed.appendChild(postElement.cloneNode(true));

    // Add user's posts to profile section
    if (post.authorId === currentUser.id) {
      userPosts.appendChild(postElement.cloneNode(true));
    }
  });
}

// Create a post element
function createPostElement(post) {
  const postCard = document.createElement("div");
  postCard.className = "post-card";

  const postDate = new Date(post.timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  postCard.innerHTML = `
        <div class="post-header">
            <img src="https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1114445501.jpg" alt="${
              post.author
            }" class="post-avatar">
            <div>
                <div class="post-author">${post.author}</div>
            </div>
            <div class="post-date">${postDate}</div>
        </div>
        <div class="post-content">${post.content}</div>
        <div class="post-actions">
            <button class="post-action ${
              post.liked ? "liked" : ""
            }" onclick="toggleLike(${post.id})">
                ❤️ ${post.likes} ${post.likes === 1 ? "Like" : "Likes"}
            </button>
            <button class="post-action" onclick="showComments(${post.id})">
                💬 ${post.comments.length} ${
    post.comments.length === 1 ? "Comment" : "Comments"
  }
            </button>
            <button class="post-action" onclick="sharePost(${post.id})">
                🔄 Share
            </button>
        </div>
    `;

  return postCard;
}

// Toggle like on a post
function toggleLike(postId) {
  const post = posts.find((p) => p.id === postId);
  if (post) {
    if (post.liked) {
      post.likes--;
      post.liked = false;
    } else {
      post.likes++;
      post.liked = true;
    }
    displayPosts();
  }
}

// Show comments (placeholder function)
function showComments(postId) {
  const post = posts.find((p) => p.id === postId);
  if (post) {
    alert(
      `Comments for post by ${post.author}:\n\n${
        post.comments.length > 0 ? post.comments.join("\n") : "No comments yet."
      }`
    );
  }
}

// Share post (placeholder function)
function sharePost(postId) {
  const post = posts.find((p) => p.id === postId);
  if (post) {
    alert(
      `Sharing post by ${post.author}: "${post.content.substring(0, 50)}..."`
    );
  }
}

// Display friends
function displayFriends() {
  const friendsGrid = document.getElementById("friends-grid");
  const suggestionsGrid = document.getElementById("suggestions-grid");

  friendsGrid.innerHTML = "";
  suggestionsGrid.innerHTML = "";

  // Display current friends
  const friends = users.filter(
    (user) => user.id !== currentUser.id && user.isFriend
  );
  friends.forEach((friend) => {
    const friendCard = createFriendCard(friend, true);
    friendsGrid.appendChild(friendCard);
  });

  // Display friend suggestions
  const suggestions = users.filter(
    (user) => user.id !== currentUser.id && !user.isFriend
  );
  suggestions.slice(0, 6).forEach((user) => {
    const suggestionCard = createFriendCard(user, false);
    suggestionsGrid.appendChild(suggestionCard);
  });
}

// Create a friend card element
function createFriendCard(user, isFriend) {
  const card = document.createElement("div");
  card.className = "friend-card";

  card.innerHTML = `
        <img src="${user.avatar}" alt="${user.name}" class="friend-avatar">
        <div class="friend-name">${user.name}</div>
        <div class="friend-mutual">${user.mutualFriends} mutual friends</div>
        <button class="btn ${isFriend ? "btn-secondary" : "btn-primary"}" 
                onclick="${
                  isFriend
                    ? `removeFriend(${user.id})`
                    : `addFriend(${user.id})`
                }">
            ${isFriend ? "Remove Friend" : "Add Friend"}
        </button>
    `;

  return card;
}

// Add friend
function addFriend(userId) {
  const user = users.find((u) => u.id === userId);
  if (user) {
    user.isFriend = true;
    displayFriends();
    updateProfileStats();
    alert(`You are now friends with ${user.name}!`);
  }
}

// Remove friend
function removeFriend(userId) {
  const user = users.find((u) => u.id === userId);
  if (user) {
    user.isFriend = false;
    displayFriends();
    updateProfileStats();
    alert(`You are no longer friends with ${user.name}.`);
  }
}

// Update profile statistics
function updateProfileStats() {
  const userPostsCount = posts.filter(
    (post) => post.authorId === currentUser.id
  ).length;
  const friendsCount = users.filter((user) => user.isFriend).length;

  document.getElementById("posts-count").textContent = userPostsCount;
  document.getElementById("friends-count").textContent = friendsCount;
}

// Show different sections
function showSection(sectionName) {
  // Hide all sections
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => section.classList.remove("active"));

  // Show selected section
  const targetSection = document.getElementById(`${sectionName}-section`);
  if (targetSection) {
    targetSection.classList.add("active");
  }

  // Update navigation
  const navLinks = document.querySelectorAll(".nav a");
  navLinks.forEach((link) => (link.style.backgroundColor = "transparent"));

  const activeLink = document.querySelector(`.nav a[href="#${sectionName}"]`);
  if (activeLink) {
    activeLink.style.backgroundColor = "rgba(255,255,255,0.2)";
  }
}

// Load sample data if JSON fails
function loadSampleData() {
  posts = [
    {
      id: 1,
      author: "Alice Johnson",
      authorId: 2,
      content:
        "Just finished reading an amazing book about web development! Highly recommend it to anyone starting their coding journey. 📚💻",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      likes: 5,
      comments: ["Great recommendation!", "What's the title?"],
      liked: false,
    },
    {
      id: 2,
      author: "Bob Smith",
      authorId: 3,
      content:
        "Beautiful sunset today! Sometimes it's important to step away from the screen and enjoy nature. 🌅",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      likes: 12,
      comments: ["Gorgeous photo!", "Where was this taken?"],
      liked: true,
    },
  ];

  users = [
    {
      id: 2,
      name: "Alice Johnson",
      avatar: "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1114445501.jpg",
      mutualFriends: 3,
      isFriend: true,
    },
    {
      id: 3,
      name: "Bob Smith",
      avatar: "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1114445501.jpg",
      mutualFriends: 5,
      isFriend: true,
    },
    {
      id: 4,
      name: "Carol Davis",
      avatar: "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1114445501.jpg",
      mutualFriends: 2,
      isFriend: false,
    },
  ];

  displayPosts();
  displayFriends();
  updateProfileStats();
}

// Delete post function
function deletePost(postId) {
  posts = posts.filter((post) => post.id !== postId);
  displayPosts();
  updateProfileStats();
}

// Edit post function
function editPost(postId, newContent) {
  const post = posts.find((p) => p.id === postId);
  if (post) {
    post.content = newContent;
    post.timestamp = new Date().toISOString();
    displayPosts();
  }
}
