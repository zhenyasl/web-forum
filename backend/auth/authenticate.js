const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.headers.authorization;
    //console.log(typeof token);
    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded JWT:', decoded); // Debugging line
        req.user = decoded;
        next();
    } catch (ex) {
        console.log('invalid token');
        res.status(400).send('Invalid token.');
    }
};

module.exports = authenticate;
