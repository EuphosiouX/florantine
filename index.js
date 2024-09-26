// Require the express web application framework (https://expressjs.com)
const express = require('express')
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const path = require('path');
const session = require('express-session');

// Create a new web application by calling the express function
const app = express()
const port = 3000
const db = new sqlite3.Database('./florantine.db');

app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 60 * 1000 }  // Set session to expire after 30 minutes
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Tell our application to serve all the files under the `public_html` directory
app.use(express.static('public_html'))

function isAuthenticated(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login.html');
    }
}

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const saltRounds = 10;

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        db.run(`INSERT INTO users (username, email, password) VALUES (?, ?, ?)`, [username, email, hashedPassword], function (err) {
            if (err) {
                return res.status(500).send('User already exists');
            }
            res.send('User registered successfully');
        });
    } catch (err) {
        res.status(500).send('Error registering user');
    }
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.get(`SELECT * FROM users WHERE username = ?`, [username], async (err, user) => {
        if (err || !user) {
            return res.status(400).send('User not found');
        }

        const match = await bcrypt.compare(password, user.password);
        if (match) {
            req.session.user = username;  // Set the session with the username
            res.send('Login successful');
        } else {
            res.status(401).send('Invalid credentials');
        }
    });
});

// Logout endpoint
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Unable to log out');
        } else {
            res.redirect('/index.html');
        }
    });
});

app.get('/api/profile', (req, res) => {
    if (!req.session.user) {
        console.log('Unauthorized: No session found');
        return res.status(401).json({ message: 'Unauthorized' });  // Send JSON error if not logged in
    }

    const username = req.session.user;
    console.log('Fetching profile for username:', username);

    db.get('SELECT username, email FROM users WHERE username = ?', [username], (err, user) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Failed to fetch profile details' });
        }

        if (!user) {
            console.log('User not found in database');
            return res.status(500).json({ error: 'User not found' });
        }

        res.json(user);  // Send the user's profile as JSON
    });
});

// Route to get feedback data
app.get('/get_feedback', (req, res) => {
    db.all('SELECT customer_name, feedback_text FROM feedback', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Route to submit feedback
app.post('/submit_feedback', (req, res) => {
    const { customer_name, feedback_text } = req.body;
    db.run('INSERT INTO feedback (customer_name, feedback_text) VALUES (?, ?)', [customer_name, feedback_text], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Feedback submitted!' });
    });
});

// Serve the About Us page (aboutus.html)
app.get('/aboutus', (req, res) => {
    res.sendFile(path.join(__dirname, 'aboutus.html'));
});

// Tell our application to listen to requests at port 3000 on the localhost
app.listen(port, ()=> {
  // When the application starts, print to the console that our app is
  // running at http://localhost:3000. Print another message indicating
  // how to shut the server down.
  console.log(`Web server running at: http://localhost:${port}`)
  console.log(`Type Ctrl+C to shut down the web server`)
})
