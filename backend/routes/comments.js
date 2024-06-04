const express = require('express');
const router = express.Router();
const authenticate = require('../auth/authenticate');
const db = require('../database');

// add a comment to a post (auth)
router.post('/:postId', authenticate, (req, res) => {
    const { postId } = req.params;
    const { content } = req.body;
    //const { user } = req.body;

    const username = req.user.email;
    if (!content) {
        return res.status(400).send('Content is required');
    }
    const getUserIdQuery = 'SELECT * FROM Users WHERE username = ?';

    const getUserIdPromise = new Promise((resolve, reject) => {
        db.query(getUserIdQuery, [username], (err, userResult) => {
            if (err) {
                reject(err);
            }
            resolve(userResult);
        });
    });

    getUserIdPromise
        .then((userResult) => {
            if (userResult.length === 0) {
                // обробка, якщо користувач не знайдений
            }

            const user_id = userResult[0].id;

            const query =
                'INSERT INTO Comments (post_id, user_id, username, content, comment_date) VALUES (?, ?, ?, ?, NOW())';
            db.query(
                query,
                [postId, user_id, username, content],
                (err, result) => {
                    if (err) {
                    }
                    res.status(201).send(`Comment added successfully`);
                }
            );
        })
        .catch((err) => {});
    // db.query(getUserIdQuery, [username], (err, userResult) => {
    //     if (err) {
    //         console.error('Error getting userId:', err);
    //         return res.status(500).send('Server error during user retrieval');
    //     }

    //     if (userResult.length === 0) {
    //         return res.status(404).send('User not found');
    //     }

    //     const user_id = userResult[0].id;

    //     // const query =
    //     //     'INSERT INTO Comments (post_id, user_id, username, content, comment_date) VALUES (?, ?, ?, NOW())';
    //     // db.query(query, [postId, username, user_id, content], (err, result) => {
    //     //     if (err) {
    //     //         console.error('Error adding comment:', err);
    //     //         return res
    //     //             .status(500)
    //     //             .send('Server error during comment creation');
    //     //     }
    //     //     res.status(201).send(`Comment added successfully`);
    //     // });
    //     const comment = { postId, username, user_id, content };
    //     res.json(comment);
    // });
});

// get all comments of a post
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

// update a comment (auth)
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

// delete a comment (auth)
router.delete('/:commentId', authenticate, (req, res) => {
    const { commentId } = req.params;

    const query = 'DELETE FROM Comments WHERE id = ?';
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

// get all comments of a user
router.get('/users/:username', (req, res) => {
    const { username } = req.params;
    //console.log(username);
    const query = 'SELECT * FROM Comments WHERE username = ?';
    db.query(query, [username], (err, results) => {
        if (err) {
            console.error('Error fetching comments:', err);
            return res
                .status(500)
                .send('Server error while retrieving comments');
        }
        res.json(results);
    });
});
