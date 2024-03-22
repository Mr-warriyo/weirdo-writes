const Note = require("../../models/notes.js");
const User = require("../../models/user.js");

const createNote = async (req, res) => {
    try {
        const { canEdit, canRead, title, content, owner } = req.body;

        if (!canEdit || !canRead || !title || !content || !owner) {
            return res.json({
                status: "FAILED",
                message: "Some detail seems to be invalid!"
            });
        }

        // Create the note
        const note = new Note({
            title,
            content,
            owner,
            canRead,
            canEdit,
            _id: Date.now()
        });

        await note.save();

        // Update the user schemas
        await User.updateMany(
            { _id: { $in: canRead } },
            { $addToSet: { canRead: note._id } }
        );

        await User.updateMany(
            { _id: { $in: canEdit } },
            { $addToSet: { canEdit: note._id } }
        );

        res.json({
            status: "SUCCESS",
            message: "Note created Successfully!!",
            noteId: note._id
        });
    } catch (error) {
        res.json({
            status: "FAILED",
            message: error.message
        });
        console.error(error);
    }
};

module.exports = { createNote };
