const express = require("express");
const cors = require("cors");
const connectDB = require("./db");

const app = express();
const PORT = 3000;
let notesCollection;

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  next();
});

// GET: pobierz wszystkie notatki
app.get("/notes", async (req, res) => {
  const notes = await notesCollection.find({}).toArray();
  res.json(notes);
});

// POST: dodaj nową notatkę
app.post("/notes", async (req, res) => {
  const note = req.body;
  if (!note.id || !note.title || !note.content) {
    return res
      .status(400)
      .json({ message: "Brak wymaganych danych: id, title, content" });
  }
  await notesCollection.insertOne(note);
  res.status(201).json({ message: "✅ Notatka została dodana", note });
});

// DELETE: usuń notatkę po ID
app.delete("/notes/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const result = await notesCollection.deleteOne({ id });
  if (result.deletedCount === 0) {
    return res
      .status(404)
      .json({ message: `❌ Nie znaleziono notatki o ID ${id}` });
  }
  res.json({ message: `🗑️ Usunięto notatkę o ID ${id}` });
});

// PUT: edytuj notatkę po ID
app.put("/notes/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content } = req.body;

  const result = await notesCollection.updateOne(
    { id },
    { $set: { title, content } }
  );

  if (result.matchedCount === 0) {
    return res
      .status(404)
      .json({ message: `❌ Nie znaleziono notatki o ID ${id}` });
  }

  res.json({ message: `✏️ Zaktualizowano notatkę o ID ${id}` });
});

// Uruchomienie serwera i połączenie z MongoDB
app.listen(PORT, async () => {
  notesCollection = await connectDB();
  console.log(`🚀 API działa na http://localhost:${PORT}`);
});
