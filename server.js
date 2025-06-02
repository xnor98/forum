const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose.connect('mongodb://localhost/imperium-forum', { useNewUrlParser: true, useUnifiedTopology: true });

// Schéma MongoDB
const threadSchema = new mongoose.Schema({
  id: { type: String, unique: true, default: uuidv4 },
  title: String,
  content: String,
  author: String,
  date: { type: Date, default: Date.now },
  replies: { type: Number, default: 0 },
  messages: [{
    author: String,
    date: { type: Date, default: Date.now },
    content: String
  }]
});

const Thread = mongoose.model('Thread', threadSchema);

// API Endpoints
app.get('/api/threads', async (req, res) => {
  const threads = await Thread.find().sort({ date: -1 });
  res.json(threads);
});

app.get('/api/threads/:id', async (req, res) => {
  const thread = await Thread.findOne({ id: req.params.id });
  if (!thread) return res.status(404).json({ error: 'Thread not found' });
  res.json(thread);
});

app.post('/api/threads', async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).json({ error: 'Missing fields' });
  const thread = new Thread({
    title,
    content,
    author: 'Frère Anonyme',
  });
  await thread.save();
  res.json(thread);
});

app.post('/api/threads/:id/messages', async (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: 'Missing content' });
  const thread = await Thread.findOne({ id: req.params.id });
  if (!thread) return res.status(404).json({ error: 'Thread not found' });
  thread.messages.push({
    author: 'Frère Anonyme',
    content
  });
  thread.replies = thread.messages.length;
  await thread.save();
  res.json(thread);
});

app.get('/api/search', async (req, res) => {
  const query = req.query.q?.toLowerCase() || '';
  const threads = await Thread.find({
    $or: [
      { title: { $regex: query, $options: 'i' } },
      { content: { $regex: query, $options: 'i' } }
    ]
  }).sort({ date: -1 });
  res.json(threads);
});

app.listen(3000, () => console.log('Server running on port 3000'));