const express = require('express');
const router = express.Router();
const { Note } = require('../models/note');

/**
 * @openapi
 * components:
 *   schemas:
 *     Note:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the note
 *         title:
 *           type: string
 *           description: The title of the note
 *         content:
 *           type: string
 *           description: The content of the note
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the note was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the note was last updated
 *       example:
 *         id: 1
 *         title: My First Note
 *         content: This is the content of my first note
 *         createdAt: "2023-05-01T10:00:00.000Z"
 *         updatedAt: "2023-05-01T10:00:00.000Z"
 */

/**
 * @openapi
 * /notes:
 *   post:
 *     summary: Create a new note
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Note'
 *     responses:
 *       201:
 *         description: The created note
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       500:
 *         description: Server error
 */
router.post('/', async (req, res) => {
  try {
    const note = await Note.create(req.body);
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @openapi
 * /notes:
 *   get:
 *     summary: Get all notes
 *     tags: [Notes]
 *     responses:
 *       200:
 *         description: List of all notes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 *       500:
 *         description: Server error
 */
router.get('/', async (req, res) => {
  try {
    const notes = await Note.findAll();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @openapi
 * /notes/{id}:
 *   get:
 *     summary: Get a note by ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The note ID
 *     responses:
 *       200:
 *         description: The note data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       404:
 *         description: Note not found
 *       500:
 *         description: Server error
 */
router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @openapi
 * /notes/{id}:
 *   put:
 *     summary: Update a note
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The note ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Note'
 *     responses:
 *       200:
 *         description: The updated note
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       404:
 *         description: Note not found
 *       500:
 *         description: Server error
 */
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Note.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) {
      return res.status(404).json({ error: 'Note not found' });
    }
    const updatedNote = await Note.findByPk(req.params.id);
    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @openapi
 * /notes/{id}:
 *   delete:
 *     summary: Delete a note
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The note ID
 *     responses:
 *       204:
 *         description: Note deleted successfully
 *       404:
 *         description: Note not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Note.destroy({
      where: { id: req.params.id },
    });
    if (!deleted) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;