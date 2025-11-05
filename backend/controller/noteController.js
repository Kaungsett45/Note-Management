import Note from "../models/Notes.js";

export const createNote = async (req, res) => {
     const { title, content } = req.body;

  if (!title || !content) return res.status(400).json({ message: "Title and content required" });

  try {
    const note = new Note({
      user: req.user.id,
      title,
      content,
    });
    await note.save();
    res.status(201).json(note);

  } catch (error) {
    console.error(error);
    
  }
};

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateNote = async (req, res) => {
  const { title, content } = req.body;

  try {
    const note = await Note.findById(req.params.id);

    if (!note) {return res.status(404).json({ message: "Note not found" });}

    if (note.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not your Note " });
    }

    note.title = title || note.title;
    note.content = content || note.content;

    await note.save();
    res.json(note);
  } catch (error) {
    console.error(error);
  }
};

export const deleteNote = async (req, res) => {
 try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    if (note.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await note.deleteOne();
    res.json({ message: "Note deleted " });
  } catch (error) {
    console.error(error);
  }
};