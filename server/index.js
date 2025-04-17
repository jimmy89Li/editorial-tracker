const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Routers.
const loginRouter = require('./routes/login');
const contentRouter = require('./routes/content');

// Use CORS middleware.
app.use(cors());
// Parse application/json content.
app.use(express.json());
// Parse application/x-www-form-urlencoded content.
app.use(express.urlencoded({ extended: false }));

// Default route.
app.get('/', (request, response) => {
  response.send('Hello!');
});

// Login route.
app.use('/login', loginRouter);
// Content route.
app.use('/content', contentRouter);

// Listen for connections.
app.listen(port, () => {
  console.log(`Listening to http://localhost:${port}/`);
});
