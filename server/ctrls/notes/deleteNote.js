// When a Note is deleted
const Note = require("../../models/notes.js");

const deleteNote = async (req, res) => {
    try {
        const { noteId } = req.body;

        if (!noteId) {
            return res.json({
                status: "FAILED",
                message: "Note ID is missing!"
            });
        }

        Note.findByIdAndDelete(noteId)
            .then(() => {
                res.json({
                    status: "SUCCESS",
                    message: "Note deleted successfully!"
                });
            })
            .catch((error) => {
                res.json({
                    status: "FAILED",
                    message: error.message
                });
                console.error(error);
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
