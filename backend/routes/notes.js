const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/Fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

// Route 1: Fetch All notes using : GET "api/notes/fetchallnotes" . Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 2: Create a new note : Post "api/notes/addnote" . Login required
router.post(
  "/addnote",
  fetchuser,
  [body("description", "enter a valid description of atleast 3 char").isLength({ min: 3 }),],
  async (req, res) => {
    try {
      const { description } = req.body;
      // If there are errors, Return bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        description,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);


// Route 3: Toggle Note Title Value using : PUT "api/notes/toggletitle/:id" . Login required
router.put("/toggletitle/:id", fetchuser, async (req, res) => {
  try {
    // Find the note by ID
    let note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).send("Note not found");
    }

    // Check ownership
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    // Toggle the 'title' boolean value
    note.title = !note.title;

    // Save the updated note
    const updatedNote = await note.save();

    res.json({ Success: "Title value toggled", note: updatedNote });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});


// Route 5: Delete notes using : Delete "api/notes/deletenote" . Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // Find a note to be delete and delete it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }
    // Allow deleteion only if user owns this note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
