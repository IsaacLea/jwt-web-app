/**
 * Simple Express server to handle logon, logout, and session validation.
 * This is a basic implementation for demonstration purposes only.
 */


const express = require('express');
const session = require('express-session');
// const crypto = require('crypto');
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express();
const PORT = 3000;

app.use(session({
    secret: 'my session secret', // Move to .env
    resave: false,
    name: 'sessionId',
    saveUninitialized: true,
    cookie: {
        secure:false, // should be set to true when running over HTTPS
        httpOnly: true, 
        maxAge: 60 * 60 * 1000 // 1 hour.  Note this will expire the session automatically no code needed.
    }
}))

app.use((req, res, next) => {
    console.log(req.session);
    next();
});

// Enable middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for localhost
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
    // allowedHeaders: ['Content-Type', 'Authorization'] // Added 'Authorization' to allowed headers
}));
// app.use(cors());

const sessionStore = new Map(); // Change to Map to store session details

// middleware to test if authenticated
function isAuthenticated (req, res, next) {
    console.log('Checking authentication...');  
    console.log(req.session.user) ;

    if (req.session.user) {
        next()
    } else {
        res.status(401).json({ message: 'Unauthorized. Please logon.' });
    }
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

    // regenerate the session, which is good practice to help guard against forms of session fixation
    // This ensures a clean session with a new Id
    req.session.regenerate(function (err) {

        if (err) next(err);

        // store user information in session, typically a user id
        req.session.user = { userName: username };

        // save the session before redirection to ensure page
        // load does not happen before session is saved
        req.session.save(function (err) {
            if (err) return next(err)
            res.status(200).json({ message: 'Logged in successfully.' });
            //res.redirect('/')
        })
    })

    console.log(req.session.id);

});

// Logout endpoint
app.post('/api/logout', isAuthenticated, (req, res) => {
    const user = req.session.user;

    if (user) {
        req.session.destroy(err => {
            if (err) {
                console.error('Error destroying session:', err);
                return res.status(500).json({ message: 'Failed to log out. Please try again.' });
            }
            res.clearCookie('sessionId'); // Clear the session cookie
            res.json({ message: 'Logged out successfully.' });
        });
    } else {
        res.status(400).json({ message: 'No active session to log out from.' });
    }
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
