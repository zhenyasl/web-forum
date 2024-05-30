const express = require('express');
const router = express.Router();
const authenticate = require('../auth/authenticate');
const db = require('../database');

// Endpoint to add a post to a thread (Authenticated users)
router.post('/:threadId', authenticate, (req, res) => {
    const { threadId } = req.params;
    const username = req.user.email; // Assuming the user ID is stored in req.user by your authentication middleware
    const { content } = req.body;
    console.log('content - ');
    console.log(req.body);
    console.log('User name from req.user.email:', username); // Debugging line

    if (!content) {
        return res.status(404).send('Content is required');
    }

    const query =
        'INSERT INTO Posts (thread_id, username, content, post_date) VALUES (?, ?, ?, NOW())';
    db.query(query, [threadId, username, content], (err, result) => {
        if (err) {
            console.error('Error adding post:', err);
            return res.status(500).send('Server error during post creation');
        }
        res.status(201).send(
            `Post added successfully with ID: ${result.insertId}`
        );
    });
});

// Endpoint to get all posts of a thread (Accessible to everyone)
router.get('/:threadId', (req, res) => {
    const { threadId } = req.params;

    const query = 'SELECT * FROM Posts WHERE thread_id = ?';
    db.query(query, [threadId], (err, results) => {
        if (err) {
            console.error('Error fetching posts:', err);
            return res.status(500).send('Server error while retrieving posts');
        }
        res.json(results);
    });
});

// Endpoint to update a post (Authenticated users)
router.put('/:postId', authenticate, (req, res) => {
    const { postId } = req.params;
    const { content } = req.body;

    if (!content) {
        return res.status(400).send('Content is required');
    }

    const query = 'UPDATE Posts SET content = ? WHERE post_id = ?';
    db.query(query, [content, postId], (err, result) => {
        if (err) {
            console.error('Error updating post:', err);
            return res.status(500).send('Server error during post update');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Post not found');
        }
        res.send('Post updated successfully');
    });
});

// Endpoint to delete a post (Authenticated users)
router.delete('/:postId', authenticate, (req, res) => {
    const { postId } = req.params;

    const query = 'DELETE FROM Posts WHERE post_id = ?';
    db.query(query, [postId], (err, result) => {
        if (err) {
            console.error('Error deleting post:', err);
            return res.status(500).send('Server error during post deletion');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Post not found');
        }
        res.send('Post deleted successfully');
    });
});

module.exports = router;
