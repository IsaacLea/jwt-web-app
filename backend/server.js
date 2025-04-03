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
    allowedHeaders: ['Content-Type']
}));

// Enable CORS for all origins (for development purposes only)
// app.use(cors())



const sessionStore = new Set(); // In-memory store for session tokens

// Middleware to validate session token
function validateSession(req, res, next) {
    const token = req.headers['authorization'];
    if (sessionStore.has(token)) {
        next();
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
    
    // In a real application, you would store this token in a database or in-memory store
    console.log(`Generated session token: ${sessionToken}`);
    
    sessionStore.add(sessionToken); // Store the session token
    
    res.json({ token: sessionToken });
});

// Check session endpoint
app.get('/api/check-session', validateSession, (req, res) => {
    res.json({ message: 'You are logged in!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
