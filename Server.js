const express = require('express');
const cors = require('cors');

// Fake data
let users = [
  { id: 1, email: 'user@taskhub.com', password: '123', name: 'User', balance: 5000 }
];
let tasks = [
  { id: 1, title: "Design Logo", budget: 500, category: "Design" },
  { id: 2, title: "Write Article", budget: 300, category: "Writing" }
];
let deposits = [];

const app = express();
app.use(cors());
app.use(express.json());

// Login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    res.json({
      success: true,
      user: { id: user.id, name: user.name, email, balance: user.balance },
      token: "fake-jwt-123"
    });
  } else {
    res.status(401).json({ success: false, msg: "Wrong email or password" });
  }
});

// Get tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// Submit deposit
app.post('/api/deposit', (req, res) => {
  const { amount, method, tid } = req.body;
  const deposit = {
    id: deposits.length + 1,
    amount,
    method,
    transactionId: tid,
    status: "pending",
    date: new Date().toISOString()
  };
  deposits.push(deposit);
  res.json({ success: true, deposit });
});

// Home
app.get('/', (req, res) => {
  res.send(`
    <h1>✅ TaskHub Backend Live</h1>
    <p>Your API is running! Made free by @yourname 💪</p>
    <p>Try: <a href="/api/tasks">/api/tasks</a></p>
  `);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is ON: ${PORT}`);
});
