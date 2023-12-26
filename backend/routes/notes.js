const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/Fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

// Route 1: Fetch All notes using GET "api/notes/fetchallnotes". Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    // Fetch all notes associated with the authenticated user
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 2: Create a new note using POST "api/notes/addnote". Login required
router.post(
  "/addnote",
  fetchuser,
  [
    // Validation for the description field
    body("description", "Enter a valid description of at least 3 characters").isLength({ min: 3 }),
  ],
  async (req, res) => {
    try {
      const { description } = req.body;
      // Validate the request body
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      // Create a new note associated with the authenticated user
      const note = new Note({
        description,
        user: req.user.id,
      });

      // Save the newly created note
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Route 3: Toggle Note Title Value using PUT "api/notes/toggletitle/:id". Login required
router.put("/toggletitle/:id", fetchuser, async (req, res) => {
  try {
    // Find the note by ID
    let note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).send("Note not found");
    }

    // Check ownership of the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    // Toggle the 'title' boolean value of the note
    note.title = !note.title;

    // Save the updated note
    const updatedNote = await note.save();

    res.json({ Success: "Title value toggled", note: updatedNote });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 4: Delete a note using DELETE "api/notes/deletenote/:id". Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // Find the note to be deleted
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }

    // Ensure the authenticated user owns the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    // Delete the note
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
