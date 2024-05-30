const express = require('express');
const router = express.Router();
const db = require('../database');

// user by user_id
router.get('/:userId', (req, res) => {
    const { userId } = req.params;

    const query = 'SELECT * FROM Users WHERE user_id = ?';
    db.query(query, [userId], (err, result) => {
        if (err) {
            console.error('Error fetching user:', err);
            return res.status(500).send('Server error while retrieving user');
        }
        if (result.length === 0) {
            return res.status(404).send('User not found');
        }
        res.json(result[0]); // Send the user data
    });
});

// user ID by username
router.get('/username/:username', (req, res) => {
    const { username } = req.params;

    const query = 'SELECT user_id FROM Users WHERE username = ?';
    db.query(query, [username], (err, result) => {
        if (err) {
            console.error('Error fetching user ID:', err);
            return res
                .status(500)
                .send('Server error while retrieving user ID');
        }
        if (result.length === 0) {
            return res.status(404).send('Username not found');
        }
        res.json(result[0]);
    });
});

//  all users
router.get('/', (req, res) => {
    const query = 'SELECT * FROM Users';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching posts:', err);
            return res.status(500).send('Server error while retrieving posts');
        }
        res.json(results);
    });
});

// user ID by email
router.get('/email/:email', (req, res) => {
    const { email } = req.params;

    const query = 'SELECT id FROM Users WHERE email = ?';
    db.query(query, [email], (err, result) => {
        if (err) {
            console.error('Error fetching user ID:', err);
            return res
                .status(500)
                .send('Server error while retrieving user ID');
        }
        if (result.length === 0) {
            return res.status(404).send('Email not found');
        }
        res.json(result[0]);
    });
});

// all comments by a user
router.get('/user/:userId', (req, res) => {
    const { userId } = req.params;

    const query = 'SELECT * FROM Comments WHERE user_id = ?';
    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching comments:', err);
            return res
                .status(500)
                .send('Server error while retrieving comments');
        }
        res.json(results);
    });
});

module.exports = router;
