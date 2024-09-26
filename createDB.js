const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./florantine.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS feedback (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_name TEXT NOT NULL,
        feedback_text TEXT NOT NULL
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        email TEXT,
        password TEXT
    )`);
});


db.close();
console.log('Database and table created');
