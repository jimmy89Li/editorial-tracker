const express = require('express');
const router = express.Router();

// Test users, for mock authentication.
const users = require('../data/users');

// Login route.
router.post('/', (request, response) => {
  if (!request.body) {
    return response.sendStatus(400);
  }

  const { email, password } = request.body;
  if (!email || !password) {
    return response.sendStatus(400);
  }

  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!user) {
    return response.status(401).json({ msg: 'Invalid credentials' });
  }

  return response.status(200).json({
    msg: 'Login successful',
    user: { email: user.email, role: user.role },
  });
});

module.exports = router;
