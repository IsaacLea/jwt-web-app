const express = require('express');
const crypto = require('crypto');

const app = express();
const PORT = 3000;

// ...existing code...

// Logon endpoint
app.post('/api/logon', (req, res) => {
    // Generate a random session token
    const sessionToken = crypto.randomBytes(16).toString('hex');
    
    // In a real application, you would store this token in a database or in-memory store
    console.log(`Generated session token: ${sessionToken}`);
    
    res.json({ token: sessionToken });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// ...existing code...
