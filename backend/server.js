const express = require('express');
const crypto = require('crypto');
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express();
const PORT = 3000;

// Enable middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for localhost
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'] // Added 'Authorization' to allowed headers
}));

// Enable CORS for all origins (for development purposes only)
// app.use(cors())

const sessionStore = new Map(); // Change to Map to store session details

// Middleware to validate session token
function validateSession(req, res, next) {
    
    console.log('Validating session...');
    const token = req.headers['authorization'];
    console.log(token);

    const session = sessionStore.get(token);
    if (session) {
        const now = new Date();
        if (now < session.expiry) {
            console.log("Valid session found");
            next();
        } else {
            console.log("Session expired");
            sessionStore.delete(token); // Remove expired session
            res.status(401).json({ message: 'Session expired. Please logon again.' });
        }
    } else {
        res.status(401).json({ message: 'Unauthorized. Please logon.' });
    }
}

// Logon endpoint
app.post('/api/logon', (req, res) => {
    console.log(req.body);

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    if (username !== 'admin' || password !== 'password') {
        return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Generate a random session token
    const sessionToken = crypto.randomBytes(16).toString('hex');
    const refreshToken = crypto.randomBytes(16).toString('hex'); // Generate refresh token
    const sessionStartTime = new Date();
    const sessionExpiry = new Date(sessionStartTime.getTime() + 30 * 60 * 1000); // 30 minutes expiry

    // Store session details
    sessionStore.set(sessionToken, {
        username,
        startTime: sessionStartTime,
        expiry: sessionExpiry,
        refreshToken // Store refresh token
    });

    console.log(`Generated session token: ${sessionToken}`);
    console.log(`Generated refresh token: ${refreshToken}`);
    res.json({ token: sessionToken, refreshToken }); // Return both tokens
});

// Logout endpoint
app.post('/api/logout', (req, res) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(400).json({ message: 'Authorization token is required.' });
    }

    if (sessionStore.has(token)) {
        sessionStore.delete(token); // Invalidate the session token
        console.log(`Session token invalidated: ${token}`);
        res.json({ message: 'Logged out successfully.' });
    } else {
        res.status(400).json({ message: 'Invalid session token.' });
    }
});

// Check session endpoint
app.get('/api/check-session', validateSession, (req, res) => {
    res.json({ message: 'You are logged in!' });
});

// Server time endpoint
app.get('/api/server-time', validateSession, (req, res) => {
    const serverTime = new Date().toISOString();
    res.json({ serverTime });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
