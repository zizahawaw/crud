const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json()); 

//Koneksi ke database 
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'testdb',
});

db.connect((err) => {
    if (err) throw err;
    console.log('✅ Database connected!');
});

// =====Routes=====

app.get("/users", (req, res) => {
    db.query("SELECT * FROM users", (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.post("/users", (req, res) => {
    const { name, email } = req.body;
    db.query("INSERT INTO users (name, email) VALUES (?, ?)", [name, email], (err) => {
        if (err) throw err;
        res.send({ message: "User added successfully!" });
    });
});

app.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    db.query("UPDATE users SET name = ?, email = ? WHERE id = ?", [name, email, id], (err) => {
        if (err) throw err;
        res.send({ message: "User updated successfully!" });
    });
});

app.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM users WHERE id = ?", [id], (err) => {
        if (err) throw err;
        res.send({ message: "User deleted successfully!" });
    });
});

app.listen(5000, () => {
  console.log(' 🚀Server running on http://localhost:5000');
});


