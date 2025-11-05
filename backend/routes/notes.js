import express from "express";
import Note from "../models/Notes.js";
import { protect } from "../middleware/protctauth.js";
import { createNote, getNotes, updateNote, deleteNote } from "../controller/noteController.js";


const router = express.Router();

router.route("/")
  .post(protect, createNote)
  .get(protect, getNotes);

router.route("/:id")
  .put(protect, updateNote)
  .delete(protect, deleteNote);

export default router;