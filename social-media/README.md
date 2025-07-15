# Welcome to EPITECH Barcelona Summer Camp

## 📋 Overview
Congratulations! You got the social media theme!!

What if we told you that you could develop your own X app? Well it's real, here is a simple social media platform skeleton designed for you to have a good base to get started with the development of your project. It demonstrates core social media features including posting, liking, friend management, and user profiles using vanilla HTML, CSS, and JavaScript.

## 🎯 Learning Objectives
Students will learn:
- Social media platform architecture
- User interaction design
- Real-time-like updates with JavaScript
- Profile management systems
- Friend/connection systems
- Content creation and management
- Responsive social media layouts

## 📁 Project Structure
```
social-media/
    ├── index.html          # Main HTML structure
    ├── style.css           # Styling and responsive design
    ├── script.js           # JavaScript functionality
    ├── data.json           # User and post data
    └── README.md           # This documentation
```

## 🚀 Features
- **User Posts**: Create, display, and interact with posts
- **Like System**: Like and unlike posts with real-time updates
- **Friend Management**: Add/remove friends and view suggestions
- **User Profiles**: Personal profile with stats and post history
- **Responsive Design**: Works on all device sizes
- **Navigation**: Single-page app with section switching

## 🔧 How It Works

### HTML Structure
- **Header**: Navigation and user info
- **Feed Section**: Post creation and timeline
- **Profile Section**: User profile and personal posts
- **Friends Section**: Friends list and suggestions

### CSS Features
- **Grid Layouts**: Friends grid and responsive design
- **Gradient Backgrounds**: Modern visual appeal
- **Card Components**: Post cards and friend cards
- **Hover Effects**: Interactive elements
- **Mobile-First**: Responsive breakpoints

### JavaScript Functionality
But first what's Javascript?

JavaScript is a programming language that adds interactivity and dynamic behavior to websites. It's kind like the brain and nervous system of our website! It's how web pages come alive, allowing for things like animations, form validation, and interactive elements that respond to user actions without needing to reload the page. 

Our code holds:
- **Dynamic Content**: Posts and friends loaded from JSON
- **Event Handling**: Form submissions and button clicks
- **State Management**: User interactions and data updates
- **Section Navigation**: Single-page app behavior

### JSON Data Structure
What about JSON Data?

Well JSON, which stands for JavaScript Object Notation, is a way to organize and store data in a text format. It's like a structured list of information, where each piece of information has a name (key) and a corresponding value. JSON is commonly used to exchange data between a server and a web application, making it easy for different parts of a system to understand and use the same information. 

In our case this is the structure of our JSON:
```json
{
  "posts": [
    {
      "id": 1,
      "author": "User Name",
      "authorId": 1,
      "content": "Post content",
      "timestamp": "2024-01-15T10:30:00Z",
      "likes": 5,
      "comments": ["Comment 1", "Comment 2"],
      "liked": false
    }
  ],
  "users": [
    {
      "id": 1,
      "name": "User Name",
      "email": "user@example.com",
      "avatar": "avatar-url",
      "bio": "User bio",
      "isFriend": true
    }
  ]
}
```

## 🛠️ CRUD Operations

### Create Post
```javascript
function createPost(content) {
    const newPost = {
        id: posts.length + 1,
        author: currentUser.name,
        content: content,
        timestamp: new Date().toISOString(),
        likes: 0,
        comments: [],
        liked: false
    };
    posts.unshift(newPost);
    displayPosts();
}
```

### Read Posts
```javascript
function displayPosts() {
    const postsFeed = document.getElementById('posts-feed');
    postsFeed.innerHTML = '';
    posts.forEach(post => {
        const postElement = createPostElement(post);
        postsFeed.appendChild(postElement);
    });
}
```

### Update Post (Like/Unlike)
```javascript
function toggleLike(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.liked = !post.liked;
        post.likes += post.liked ? 1 : -1;
        displayPosts();
    }
}
```

### Delete Post
```javascript
function deletePost(postId) {
    posts = posts.filter(post => post.id !== postId);
    displayPosts();
}
```

## 📚 Key Concepts Explained

### 1. Single Page Application (SPA)
```javascript
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    // Show target section
    document.getElementById(\`\${sectionName}-section\`).classList.add('active');
}
```

### 2. Dynamic Content Creation
```javascript
function createPostElement(post) {
    const postCard = document.createElement('div');
    postCard.className = 'post-card';
    postCard.innerHTML = \`
        <div class="post-header">...</div>
        <div class="post-content">\${post.content}</div>
        <div class="post-actions">...</div>
    \`;
    return postCard;
}
```

### 3. Event Delegation
```javascript
// Using onclick attributes for simplicity in this educational project
// In production, use addEventListener for better practices
```

### 4. Array Manipulation
```javascript
// Add to beginning
posts.unshift(newPost);

// Filter items
const friends = users.filter(user => user.isFriend);

// Find specific item
const post = posts.find(p => p.id === postId);
```

## 🎨 Customization Ideas
1. **Comments System**: Add full comment functionality
2. **Image Posts**: Allow image uploads and display
3. **Real-time Updates**: Add WebSocket for live updates
4. **User Authentication**: Add login/logout functionality
5. **Post Categories**: Add hashtags or categories
6. **Notifications**: Add notification system
7. **Dark Mode**: Add theme switching
8. **Search**: Add user and post search functionality

## 🐛 Common Issues & Solutions

### Posts Not Displaying
- Check JSON file syntax
- Verify fetch request is working
- Check browser console for errors

### Styling Problems
- Ensure CSS classes match HTML
- Check responsive breakpoints
- Verify CSS file is linked

### JavaScript Errors
- Use browser developer tools
- Check for typos in function names
- Verify event listeners are attached

## 📖 Next Steps
1. Add user authentication system
2. Implement real-time features
3. Add image and media support
4. Create admin panel
5. Add data persistence
6. Implement privacy settings


## 🔒 Privacy & Ethics Discussion Points
- Data privacy and user consent
- Content moderation
- Digital wellbeing
- Responsible social media use
- Online safety and security

If you have any questions please feel free to ask the teachers around you! We wish you all good luck and A LOT of fun <3

EPITECH BARCELONA TEAM