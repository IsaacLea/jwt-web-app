/**
 * Simple Express server to handle logon, logout, and session validation.
 * This is a basic implementation for demonstration purposes only.
 */


const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express();
const PORT = 3000;
const SECRET_KEY = 'your_jwt_secret_key'; // Move to .env

// Enable middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for localhost
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
}));

// middleware to test if authenticated
function isAuthenticated(req, res, next) {
    console.log('Checking authentication...');
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized. Please logon.' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid or expired token.' });
        }
        console.log('Token verified:', decoded);
        req.user = decoded; // Attach decoded user info to the request
        next();
    });
}

// Logon endpoint
app.post('/api/logon', express.urlencoded({ extended: false }), (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    if (username !== 'admin' || password !== 'admin') {
        return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Generate a JWT
    const token = jwt.sign({ userName: username }, SECRET_KEY, { expiresIn: '1h' });
    
    res.status(200).json({ message: 'Logged in successfully.', token });
});

// Logout endpoint
app.post('/api/logout', isAuthenticated, (req, res) => {
    // Inform the client to discard the token
    res.json({ message: 'Logged out successfully. Please discard your token.' });
});

app.get('/api/check-session', isAuthenticated, (req, res) => {
    res.json({ message: 'You are logged in!' });
});

// Server time endpoint
app.get('/api/server-time',  isAuthenticated, (req, res) => {
    
    const serverTime = new Date().toISOString();

    console.log(serverTime);
    res.json({ serverTime });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
