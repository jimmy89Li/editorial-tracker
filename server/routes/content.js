const express = require('express');
const router = express.Router();

// Content items, for mocking.
const content = require('../data/content');
// Users, for validating.
const users = require('../data/users');

/**
 * Retrieve all content items.
 */
router.get('/', (request, response) => {
  if (!request.query.email) {
    return response.status(400).json({ msg: 'Invalid query parameters' });
  }

  // Validate user.
  const currentUser = users.find((user) => user.email === request.query.email);
  if (!currentUser) {
    return response.code(401).json({ msg: 'Unauthorized' });
  }

  // Filter content based on user role.
  if (currentUser.role === 'editor') {
    return response.json(content);
  }
  if (currentUser.role === 'contributor') {
    let items = content.filter((item) =>
      item.authors.includes(request.query.email)
    );
    return response.json(items);
  }
  return response.status(400).json({ msg: 'Invalid role' });
});

/**
 * Create a new content item.
 */
router.post('/', (request, response) => {
  const { title, status, authors, deadline, type } = request.body;
  if (!title || !status || !authors || !deadline || !type) {
    return response.status(400).json({ msg: 'Missing parameters' });
  }

  // Build up the new content item.
  const newContentItem = {
    id: content.length + 1,
    title,
    status,
    authors: authors.replace(' ', '').split(','),
    deadline,
    type,
  };
  return response.status(200).json({ content: [...content, newContentItem] });
});

/**
 * Update the status of a content item.
 */
router.put('/:id', (request, response) => {
  const { id } = request.params;
  const { status } = request.body;

  // Verify the provided data.
  if (!id || !status) {
    return response.status(400).json({ msg: 'Missing parameters' });
  }

  // Check if the content item exists.
  const contentItem = content.find((item) => item.id === Number(id));
  if (!contentItem) {
    return response.status(404).json({ msg: 'Content item not found' });
  }

  // Return the updated content item.
  contentItem.status = status;
  return response.status(200).json({ content: contentItem });
});

module.exports = router;
