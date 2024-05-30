require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./database');
const registerRouter = require('./auth/register');
const loginRouter = require('./auth/login');
const userRoutes = require('./routes/users');
const threadsRouter = require('./routes/threads');
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

db.query(
    `
    CREATE TABLE IF NOT EXISTS Users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL,
        password_hash VARCHAR(100) NOT NULL,
        registration_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        role VARCHAR(20) NOT NULL
    )
`,
    (err, result) => {
        if (err) throw err;
        console.log('Table Users created');
    }
);

db.query(
    `
    CREATE TABLE IF NOT EXISTS Threads (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        user_id INT
    )
`,
    (err, result) => {
        if (err) throw err;
        console.log('Table Threads created');
    }
);

db.query(
    `
    CREATE TABLE IF NOT EXISTS Posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        thread_id INT,
        user_id INT,
        username VARCHAR(50) NOT NULL,
        content TEXT NOT NULL,
        post_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
`,
    (err, result) => {
        if (err) throw err;
        console.log('Table Posts created');
    }
);

db.query(
    `
    CREATE TABLE IF NOT EXISTS Comments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        post_id INT,
        user_id INT,
        username VARCHAR(50) NOT NULL,
        content TEXT NOT NULL,
        comment_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
`,
    (err, result) => {
        if (err) throw err;
        console.log('Table Comments created');
    }
);
function insertData(table, data) {
    data.forEach((item) => {
        const columns = Object.keys(item).join(', ');
        const placeholders = Object.keys(item).fill('?').join(', ');
        const query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;

        db.query(query, Object.values(item), (err, result) => {
            if (err) throw err;
            console.log(`${table} record inserted`, result.insertId);
        });
    });
}
const threads = [
    { title: 'Sample Thread 1', creation_date: new Date(), user_id: 1 },
    { title: 'Sample Thread 2', creation_date: new Date(), user_id: 2 },
];
insertData('Threads', threads);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors());
app.use('/auth', registerRouter);
app.use('/auth', loginRouter);

app.use('/users', userRoutes);
app.use('/threads', threadsRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

app.get('/', (req, res) => {
    res.send('Hello World World Hello!');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
