const mysql = require('mysql2');
//let connection;

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
    //console.log("yes it's jaws");
} else {
    connection = mysql.createConnection({
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: '11235813',
        database: 'mydb5',
    });
}

// // connection.query('DROP DATABASE IF EXISTS mydb', (error, results) => {
// //     if (error) {
// //         console.error('Error dropping database:', error);
// //         return;
// //     }
// //     console.log('Database "mydb" dropped successfully');
// // });

// connection.query('CREATE DATABASE IF NOT EXISTS mydb5', (error, results) => {
//     if (error) {
//         console.error('Error creating database:', error);
//         return;
//     }
//     console.log('Database "mydb5" created successfully');
// });

connection.connect((error) => {
    if (error) {
        console.error('Error connecting to the database:', error);
        return;
    }
    console.log('Connected to the database');
});
module.exports = connection;
// let connection;

// if (process.env.JAWSDB_URL) {
//     connection = mysql.createConnection(process.env.JAWSDB_URL);
// } else {
//     connection = mysql.createConnection({
//         host: '127.0.0.1',
//         port: 3306,
//         user: 'root',
//         password: '11235813',
//         database: 'mydb4',
//     });
// }

// connection.connect((error) => {
//     if (error) {
//         console.error('Error connecting to the database:', error);
//         return;
//     }
//     console.log('Connected to the database');
//     createDatabase();
// });

// function createDatabase() {
//     connection.query('CREATE DATABASE IF NOT EXISTS mydb4', (err) => {
//         if (err) {
//             console.error('Error creating DB: ' + err.message);
//         } else {
//             console.log('DB created or existed');
//             connectToDatabase(); // После создания базы данных, подключаемся к ней
//         }
//     });
// }

// function connectToDatabase() {
//     const dbConnection = mysql.createConnection({
//         ...connection.config,
//         database: 'mydb4',
//     });
//     dbConnection.connect((err) => {
//         if (err) {
//             console.error('Error connecting to database: ' + err.message);
//         } else {
//             console.log('Connection to DB successfully');
//             createTables(dbConnection);
//         }
//     });
// }

// function createTables(dbConnection) {
//     const createTablesQueries = [
//         `CREATE TABLE IF NOT EXISTS Users (
//           id INT AUTO_INCREMENT PRIMARY KEY,
//           username VARCHAR(50) NOT NULL,
//           email VARCHAR(100) NOT NULL,
//           password_hash VARCHAR(100) NOT NULL,
//           registration_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
//           role VARCHAR(20) NOT NULL
//       )`,
//         `CREATE TABLE IF NOT EXISTS Threads (
//           id INT AUTO_INCREMENT PRIMARY KEY,
//           title VARCHAR(255) NOT NULL,
//           creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
//           user_id INT
//       )`,
//         `CREATE TABLE IF NOT EXISTS Posts (
//           id INT AUTO_INCREMENT PRIMARY KEY,
//           thread_id INT,
//           user_id INT,
//           username VARCHAR(50) NOT NULL,
//           content TEXT NOT NULL,
//           post_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
//       )`,
//         `CREATE TABLE IF NOT EXISTS Comments (
//           id INT AUTO_INCREMENT PRIMARY KEY,
//           post_id INT,
//           user_id INT,
//           username VARCHAR(50) NOT NULL,
//           content TEXT NOT NULL,
//           comment_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
//       )`,
//     ];

//     createTablesQueries.forEach((query) => {
//         dbConnection.query(query, (err, result) => {
//             if (err) throw err;
//             console.log('Table created');
//         });
//     });

//     // Заполнение таблиц данными
//     const threads = [
//         { title: 'example 1', creation_date: new Date(), user_id: 1 },
//         { title: 'example 2', creation_date: new Date(), user_id: 2 },
//     ];

//     // Функция вставки данных
//     function insertData(table, data) {
//         data.forEach((item) => {
//             const columns = Object.keys(item).join(', ');
//             const placeholders = Object.keys(item).fill('?').join(', ');
//             const query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;

//             dbConnection.query(query, Object.values(item), (err, result) => {
//                 if (err) throw err;
//                 console.log(`${table} inserted`, result.insertId);
//             });
//         });
//     }
//     insertData('Threads', threads);
// }

// module.exports = connection;
