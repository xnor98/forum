const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'imperium_forum',
  password: 'your_password',
  port: 5432
});

// API Endpoints
app.get('/api/threads', async (req, res) => {
  const result = await pool.query('SELECT * FROM threads ORDER BY date DESC');
  res.json(result.rows);
});

app.get('/api/threads/:id', async (req, res) => {
  const threadResult = await pool.query('SELECT * FROM threads WHERE id = $1', [req.params.id]);
  if (threadResult.rows.length === 0) return res.status(404).json({ error: 'Thread not found' });
  const messagesResult = await pool.query('SELECT * FROM messages WHERE thread_id = $1 ORDER BY date', [req.params.id]);
  const thread = threadResult.rows[0];
  thread.messages = messagesResult.rows;
  res.json(thread);
});

app.post('/api/threads', async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).json({ error: 'Missing fields' });
  const id = uuidv4();
  const result = await pool.query(
    'INSERT INTO threads (id, title, content, author, date, replies) VALUES ($1, $2, $3, $4, NOW(), 0) RETURNING *',
    [id, title, content, 'Frère Anonyme']
  );
  res.json(result.rows[0]);
});

app.post('/api/threads/:id/messages', async (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: 'Missing content' });
  const messageId = uuidv4();
  await pool.query(
    'INSERT INTO messages (id, thread_id, author, date, content) VALUES ($1, $2, $3, NOW(), $4)',
    [messageId, req.params.id, 'Frère Anonyme', content]
  );
  const updateResult = await pool.query(
    'UPDATE threads SET replies = replies + 1 WHERE id = $1 RETURNING *',
    [req.params.id]
  );
  const thread = updateResult.rows[0];
  const messagesResult = await pool.query('SELECT * FROM messages WHERE thread_id = $1 ORDER BY date', [req.params.id]);
  thread.messages = messagesResult.rows;
  res.json(thread);
});

app.get('/api/search', async (req, res) => {
  const query = req.query.q || '';
  const result = await pool.query(
    'SELECT * FROM threads WHERE title ILIKE $1 OR content ILIKE $1 ORDER BY date DESC',
    [`%${query}%`]
  );
  res.json(result.rows);
});

app.listen(3000, () => console.log('Server running on port 3000'));
