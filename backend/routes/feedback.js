import express from 'express';
import db from '../db.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Get the feedbacks using filter of date and text search
router.get('/', (req, res) => {
  const { keyword = '', dateFilter = '' } = req.query;
  
  try {
    const feedbacks = db.prepare(`
      SELECT * FROM feedbacks 
      WHERE (name LIKE ? OR email LIKE ? OR message LIKE ?) AND date LIKE ?
      ORDER BY date DESC
    `).all(`%${keyword}%`, `%${keyword}%`, `%${keyword}%`, `${dateFilter}%`);
    
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch feedbacks' });
  }
});

// Add the new feedbacks
router.post('/', (req, res) => {
  const { name, email, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  try {
    const feedback = { id: uuidv4(), name, email, message, date: new Date().toISOString() };
    db.prepare(`
      INSERT INTO feedbacks (id, name, email, message, date) 
      VALUES (@id, @name, @email, @message, @date)
    `).run(feedback);
    
    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add feedback' });
  }
});

// Delete the existing feedbacks
router.delete('/:id', (req, res) => {
  try {
    const result = db.prepare('DELETE FROM feedbacks WHERE id = ?').run(req.params.id);
    
    if (!result.changes) {
      return res.status(404).json({ error: 'Feedback not found' });
    }
    
    res.json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete feedback' });
  }
});

export default router;
