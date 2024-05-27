const express = require('express');
const router = express.Router();
const authenticate = require('../auth/authenticate');
const db = require('../database');

// Endpoint to create a new thread (Authenticated users)
router.post('/', authenticate, (req, res) => {
    const { title } = req.body;
    console.log('User from req.user:', req.user); // Debugging line
    const userId = req.user.id; // user ID is stored in req.user by authentication middleware
    console.log('User id from req.user.id:', userId); // Debugging line

    if (!title) {
        return res.status(400).send('Title is required');
    }

    const query =
        'INSERT INTO Threads (title, user_id, creation_date) VALUES (?, ?, NOW())';
    db.query(query, [title, userId], (err, result) => {
        if (err) {
            console.error('Error creating thread:', err);
            return res.status(500).send('Server error during thread creation');
        }
        res.status(201).send(
            `Thread created successfully with ID: ${result.insertId}`
        );
    });
});

// Endpoint to get all threads (Accessible to everyone)
router.get('/', (req, res) => {
    const query = 'SELECT * FROM Threads';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching threads:', err);
            return res
                .status(500)
                .send('Server error while retrieving threads');
        }
        res.json(results);
    });
});

// Endpoint to update a thread (Authenticated users)
router.put('/:threadId', authenticate, (req, res) => {
    const { threadId } = req.params;
    const { title } = req.body;

    if (!title) {
        return res.status(400).send('Title is required');
    }

    const query = 'UPDATE Threads SET title = ? WHERE thread_id = ?';
    db.query(query, [title, threadId], (err, result) => {
        if (err) {
            console.error('Error updating thread:', err);
            return res.status(500).send('Server error during thread update');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Thread not found');
        }
        res.send('Thread updated successfully');
    });
});

// Endpoint to delete a thread (Authenticated users)
router.delete('/:threadId', authenticate, (req, res) => {
    const { threadId } = req.params;

    const query = 'DELETE FROM Threads WHERE thread_id = ?';
    db.query(query, [threadId], (err, result) => {
        if (err) {
            console.error('Error deleting thread:', err);
            return res.status(500).send('Server error during thread deletion');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Thread not found');
        }
        res.send('Thread deleted successfully');
    });
});

module.exports = router;
