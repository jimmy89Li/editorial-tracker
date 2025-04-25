// Content items, for mocking.
const content = require('../data/content');
// Users, for validating.
const users = require('../data/users');

/**
 * Controller to get all content.
 */
const getContents = (request, response) => {
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
};

/**
 * Controller to get specific content.
 */
const getContentByID = (request, response) => {
  if (!request.params.id || !request.query.email) {
    return response.status(400).json({ msg: 'Invalid query parameters' });
  }

  // Validate user.
  const currentUser = users.find((user) => user.email === request.query.email);
  if (!currentUser) {
    return response.code(401).json({ msg: 'Unauthorized' });
  }

  // Filter content based on user role.
  if (currentUser.role === 'editor') {
    let item = content.find((item) => item.id === parseInt(request.params.id));
    if (!item) {
      return response.status(400).json({ msg: 'Invalid content ID' });
    }
    return response.json(item);
  }
  if (currentUser.role === 'contributor') {
    let item = content.find(
      (item) =>
        item.id === parseInt(request.params.id) &&
        item.authors.includes(request.query.email)
    );
    if (!item) {
      return response.status(400).json({ msg: 'Invalid content ID' });
    }
    return response.json(item);
  }
  return response.status(400).json({ msg: 'Invalid role' });
};

/**
 * Controller to update content.
 */
const updateContent = (request, response) => {
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
};

/**
 * Controller to create content.
 */
const createContent = (request, response) => {
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
};

module.exports = { getContents, getContentByID, updateContent, createContent };
