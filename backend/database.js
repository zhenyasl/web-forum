const mysql = require('mysql2');
let connection;

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: '11235813',
        database: 'mydb',
    });
}
// connection.query('DROP DATABASE IF EXISTS mydb', (error, results) => {
//     if (error) {
//         console.error('Error dropping database:', error);
//         return;
//     }
//     console.log('Database "mydb" dropped successfully');
// });

// connection.query('CREATE DATABASE IF NOT EXISTS mydb', (error, results) => {
//     if (error) {
//         console.error('Error creating database:', error);
//         return;
//     }
//     console.log('Database "mydb" created successfully');
// });

connection.connect((error) => {
    if (error) {
        console.error('Error connecting to the database:', error);
        return;
    }
    console.log('Connected to the database');
});

module.exports = connection;
