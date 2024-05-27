require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./database');
const registerRouter = require('./auth/register');
const loginRouter = require('./auth/login');
const userRoutes = require('./routes/users');
const threadsRouter = require('./routes/threads');
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // Middleware to parse JSON bodies |
app.use(cors());
app.use('/auth', registerRouter);
app.use('/auth', loginRouter);

app.use('/users', userRoutes);
app.use('/threads', threadsRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

app.get('/', (req, res) => {
    res.send('Hello World2!');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
