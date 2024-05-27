const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../database'); // Adjust the path as per your project structure

// User registration endpoint
router.post('/register', async (req, res) => {
    console.log("I'm in registration!!!");
    try {
        const { username, email, password } = req.body;

        // Basic Validation (You can expand this as per your requirements)
        if (!username || !email || !password) {
            return res
                .status(400)
                .send('Please provide username, email, and password');
        }

        // Check if user already exists in the database
        db.query(
            'SELECT email FROM Users WHERE email = ?',
            [email],
            async (err, results) => {
                if (err) {
                    return res
                        .status(500)
                        .send('Server error during user check');
                }

                if (results.length > 0) {
                    return res.status(409).send('User already exists');
                } else {
                    // Hash password
                    const hashedPassword = await bcrypt.hash(password, 10);

                    // Save user to the database
                    db.query(
                        'INSERT INTO Users (username, email, password_hash, registration_date, role) VALUES (?, ?, ?, NOW(), "user")',
                        [username, email, hashedPassword],
                        (err, results) => {
                            if (err) {
                                console.error(
                                    'Error during user registration:',
                                    err
                                );
                                return res
                                    .status(500)
                                    .send(
                                        'Server error during user registration'
                                    );
                            }
                            res.status(201).send(
                                'User registered successfully'
                            );
                        }
                    );
                }
            }
        );
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// router.get('/register', (req, res) => {
//     res.send('Hello from registration');
// });

module.exports = router;
