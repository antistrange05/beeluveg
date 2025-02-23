// Import necessary modules
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to serve static files
app.use(express.static('public'));

// Body parser middleware to handle form submissions
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    // Serve the login page first
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/login', (req, res) => {
    const { password } = req.body;
    const correctPassword = "yourPassword"; // Change this to your desired password

    if (password === correctPassword) {
        res.redirect('/index'); // Redirect to index.html if correct
    } else {
        res.send("<script>alert('Incorrect password. Please try again.'); window.location.href='/';</script>");
    }
});

app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/page1', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'page1.html'));
});

app.get('/page2', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'page2.html'));
});

// Ensure the public directory and images folder exist
const fs = require('fs');
const publicDir = path.join(__dirname, 'public');
const imagesDir = path.join(publicDir, 'images');
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
}
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir);
}

// Create CSS file if it doesn't exist
const cssPath = path.join(publicDir, 'styles.css');
const cssContent = `
body {
    font-family: Arial, sans-serif;
    text-align: center;
    background-color: #f8f9fa;
    margin: 0;
    padding: 20px;
}
h1 {
    color: #d63384;
}
button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    margin: 10px;
    cursor: pointer;
    border-radius: 5px;
}
button:hover {
    background-color: #0056b3;
}
img {
    border-radius: 10px;
    box-shadow: 2px 2px 10px gray;
    margin: 10px;
}`;
if (!fs.existsSync(cssPath)) {
    fs.writeFileSync(cssPath, cssContent);
}

// Create HTML files if they don't exist
const pages = {
    'login.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>
<body>
    <h2>Please Log In</h2>
    <form action="/login" method="POST">
        <label for="password">Enter Password:</label>
        <input type="password" id="password" name="password" required>
        <button type="submit">Submit</button>
    </form>
</body>
</html>`,
    'index.html': `<!DOCTYPE html>
<html>
<head>
    <title>Anniversary Gift</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
    <h1>Happy Anniversary!</h1>
    <button onclick="location.href='/page1'">Go to Page 1</button>
    <button onclick="location.href='/page2'">Go to Page 2</button>
</body>
</html>`,
    'page1.html': `<!DOCTYPE html>
<html>
<head>
    <title>Page 1</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
    <h1>Memories Together</h1>
    <p>Add your text and images here.</p>
    <img src="images/IMG_6057.jpg" alt="A special memory">
    <img src="images/picture2.png" alt="Another moment">
    <button onclick="location.href='/'">Back Home</button>
</body>
</html>`,
    'page2.html': `<!DOCTYPE html>
<html>
<head>
    <title>Page 2</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
    <h1>Our Journey</h1>
    <p>Another special message or images can go here.</p>
    <img src="images/picture3.jpg" alt="A beautiful moment">
    <img src="images/picture4.png" alt="Cherished memory">
    <button onclick="location.href='/'">Back Home</button>
</body>
</html>`
};

for (const [file, content] of Object.entries(pages)) {
    const filePath = path.join(publicDir, file);
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, content);
    }
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
