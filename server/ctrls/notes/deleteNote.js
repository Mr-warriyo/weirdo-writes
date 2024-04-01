const Note = require("../../models/notes.js");
const User = require("../../models/user.js");

const deleteNote = async (req, res) => {
    try {
        const { noteId } = req.body;

        if (!noteId) {
            return res.json({
                status: "FAILED",
                message: "Note ID is missing!"
            });
        }

        const deletedNote = await Note.findByIdAndDelete(noteId);

        if (!deletedNote) {
            return res.json({
                status: "FAILED",
                message: "Note not found!"
            });
        }

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
