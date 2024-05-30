const db = require('./database');

console.log('Starting to seed data...');

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

// Test Users
const users = [
    {
        username: 'user3',
        email: 'user3@example.com',
        password_hash: 'hash3',
        registration_date: new Date(),
        role: 'user',
    },
    {
        username: 'user2',
        email: 'user2@example.com',
        password_hash: 'hash2',
        registration_date: new Date(),
        role: 'user',
    },
];

// Test Threads
const threads = [
    { title: 'Sample Thread 1', creation_date: new Date(), user_id: 1 }, // Assuming 1 is a valid user_id
    { title: 'Sample Thread 2', creation_date: new Date(), user_id: 2 }, // Adjust user_id accordingly
];

// Test Posts
const posts = [
    {
        thread_id: 1,
        user_id: 1,
        username: 'username 1',
        content: 'This is a sample post in thread 1.',
        post_date: new Date(),
    },
    {
        thread_id: 1,
        user_id: 2,
        username: 'username 2',
        content: 'This is a sample post in thread 2.',
        post_date: new Date(),
    },
];

// Test Comments
const comments = [
    {
        post_id: 1,
        user_id: 2,
        content: 'This is a sample comment on post 1.',
        comment_date: new Date(),
    },
    {
        post_id: 2,
        user_id: 1,
        content: 'This is a sample comment on post 2.',
        comment_date: new Date(),
    },
];

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

// insertData('Users', users);
insertData('Threads', threads);
// insertData('Posts', posts);
// insertData('Comments', comments);
