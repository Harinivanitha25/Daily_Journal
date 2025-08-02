const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3000;


const MONGO_URI = `mongodb://localhost:27017/journal`;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const connectDb = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB', err);
    process.exit(1);
  }
};

// Schema & Model
const journalSchema = new mongoose.Schema({
  date: { type: String, required: true },
  happy: String,
  sad: String,
  about: { type: String, required: true },
  mood: {
    type: String,
    enum: ['happy', 'moderate', 'sad'],
    required: true,
  },
});

const Journal = mongoose.model('Journal', journalSchema);

app.post('/journal', async (req, res) => {
  try {
    const { date, happy, sad, about, mood } = req.body;
    const journalEntry = new Journal({ date, happy, sad, about, mood });
    await journalEntry.save();
    res.status(201).json(journalEntry);
  } catch (error) {
    console.error('Error saving journal entry:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/journal', async (req, res) => {
  try {
    const entries = await Journal.find().sort({ date: -1 });
    res.json(entries);
  } catch (error) {
    console.log('Error fetching journal entries:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.delete('/journal/:id', async (req, res) => {
  try {
    const deletedEntry = await Journal.findByIdAndDelete(req.params.id);
    if (!deletedEntry) {
      return res.status(404).json({ error: 'Journal entry not found' });
    }
    res.json({ message: 'Entry deleted successfully' });
  } catch (error) {
    console.log('Error deleting journal entry:', error);
    res.status(500).json({ error: 'Failed to delete journal entry' });
  }
});


connectDb().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
