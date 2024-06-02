const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../database'); 

router.post('/login', (req, res) => {
    console.log("I'm in login!!!");
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send('Please provide email and password');
        }

        // Check if user exists
        db.query(
            'SELECT * FROM Users WHERE email = ?',
            [email],
            async (err, results) => {
                if (err) {
                    return res
                        .status(500)
                        .send('Server error during user lookup');
                }

                if (results.length === 0) {
                    return res.status(401).send('Invalid credentials');
                }

                const user = results[0]; //знайдений користувач по email

                // Звірення паролю
                const isMatch = await bcrypt.compare(
                    password,
                    user.password_hash
                );
                if (isMatch) {
                    const token = jwt.sign(
                        { email: email, id: user.id },
                        process.env.JWT_SECRET,
                        { expiresIn: '10h' }
                    );
                    console.log(token);
                    return res.json(token);
                } else {
                    res.status(401).send('Invalid credentials');
                }
            }
        );
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
