const express = require('express');
const router = express.Router();

// Content items, for mocking.
const content = require('../data/content');
// Users, for validating.
const users = require('../data/users');
const {
  getContents,
  getContentByID,
  createContent,
  updateContent,
} = require('../controllers/contentController');

/**
 * Retrieve all content items.
 */
router.get('/', getContents);

/**
 * Retrieve a specific content by ID.
 */
router.get('/:id', getContentByID);

/**
 * Create a new content item.
 */
router.post('/', createContent);

/**
 * Update the status of a content item.
 */
router.put('/:id', updateContent);

module.exports = router;
