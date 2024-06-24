import { Router } from 'express';
import {
  list,
  create,
  update,
  deleteNote,
  restoreNote,
  distinctTags,
} from '../services/notes.js';

const router = Router();

// List
router.get('/', async (req, res) => {
  try {
    const response = await list({
      createdBy: res.locals.user._id,
    });
    res.json(response);
  } catch (error) {
    res.json({ error });
  }
});

// Create
router.post('/', async (req, res) => {
  const { title, note, tags = [] } = req.body;
  const response = await create({
    title,
    note,
    tags,
    createdBy: res.locals.user._id,
  });
  if (response.error) {
    return res.status(500).json({ error: response.error });
  }
  res.json(response);
});

// Update
router.put('/', async (req, res) => {
  const { id, title, note, tags = [] } = req.body;
  const response = await update({ id, title, note, tags });
  res.json(response);
});

// Delete
router.delete('/', async (req, res) => {
  const { id } = req.body;
  const response = await deleteNote({ id });
  res.json(response);
});

// Restore
router.put('/restore', async (req, res) => {
  const { id } = req.body;
  const response = await restoreNote({ id });
  res.json(response);
});

// Theme change
router.put('/theme', async (req, res) => {
  const { id, theme } = req.body;
  const response = await update({ id, theme });
  res.json(response);
});

// Update Tags
router.put('/tags', async (req, res) => {
  const { id, tags = [] } = req.body;
  const response = await update({ id, tags });
  res.json(response);
});

// List tags
router.get('/tags', async (req, res) => {
  try {
    const response = await distinctTags('tags');
    res.json(response);
  } catch (error) {
    res.json({ error });
  }
});

export default router;
