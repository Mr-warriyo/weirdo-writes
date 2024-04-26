// For when note is being deleted

const Note = require("../../models/notes.js");
const User = require("../../models/user.js");

const deleteNote = async (req, res) => {
    try {
        const { noteId, token } = req.body;

        if (!noteId) {
            return res.json({
                status: "FAILED",
                message: "Note ID is missing!"
            });
        }

        const note = await Note.findById({
            _id: noteId
        });

        if (!note) {
            return res.json({
                status: "FAILED",
                message: "Note not found!"
            });
        }

        if (note.owner !== token) {
            return res.json({
                status: "FAILED",
                message: "Unauthorized: You are not the owner of this note!"
            });
        }

        const deletedNote = await Note.findByIdAndDelete(noteId);

        await User.updateMany(
            { $or: [{ canRead: noteId }, { canEdit: noteId }] },
            { $pull: { canRead: noteId, canEdit: noteId } }
        );

        res.json({
            status: "SUCCESS",
            message: "Note deleted successfully!"
        });
    } catch (error) {
        res.json({
            status: "FAILED",
            message: error.message
        });
        console.error(error);
    }
};

module.exports = { deleteNote };
