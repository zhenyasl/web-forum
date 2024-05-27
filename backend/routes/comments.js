const express = require('express');
const router = express.Router();
const authenticate = require('../auth/authenticate');
const db = require('../database');

// Endpoint to add a comment to a post (Authenticated users)
router.post('/:postId', authenticate, (req, res) => {
    const { postId } = req.params;
    const userId = req.user.id; // Assuming the user ID is stored in req.user by your authentication middleware
    const { content } = req.body;

    if (!content) {
        return res.status(400).send('Content is required');
    }

    const query =
        'INSERT INTO Comments (post_id, user_id, content, comment_date) VALUES (?, ?, ?, NOW())';
    db.query(query, [postId, userId, content], (err, result) => {
        if (err) {
            console.error('Error adding comment:', err);
            return res.status(500).send('Server error during comment creation');
        }
        res.status(201).send(
            `Comment added successfully with ID: ${result.insertId}`
        );
    });
});

// Endpoint to get all comments of a post (Accessible to everyone)
router.get('/:postId', (req, res) => {
    const { postId } = req.params;

    const query = 'SELECT * FROM Comments WHERE post_id = ?';
    db.query(query, [postId], (err, results) => {
        if (err) {
            console.error('Error fetching comments:', err);
            return res
                .status(500)
                .send('Server error while retrieving comments');
        }
        res.json(results);
    });
});

// Endpoint to update a comment (Authenticated users)
router.put('/:commentId', authenticate, (req, res) => {
    const { commentId } = req.params;
    const { content } = req.body;

    if (!content) {
        return res.status(400).send('Content is required');
    }

    const query = 'UPDATE Comments SET content = ? WHERE comment_id = ?';
    db.query(query, [content, commentId], (err, result) => {
        if (err) {
            console.error('Error updating comment:', err);
            return res.status(500).send('Server error during comment update');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Comment not found');
        }
        res.send('Comment updated successfully');
    });
});

// Endpoint to delete a comment (Authenticated users)
router.delete('/:commentId', authenticate, (req, res) => {
    const { commentId } = req.params;

    const query = 'DELETE FROM Comments WHERE comment_id = ?';
    db.query(query, [commentId], (err, result) => {
        if (err) {
            console.error('Error deleting comment:', err);
            return res.status(500).send('Server error during comment deletion');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Comment not found');
        }
        res.send('Comment deleted successfully');
    });
});

module.exports = router;
