const Note = require("../../models/notes.js");

const editNote = async (req, res) => {
    try {
        console.log(req.body)
        const { noteId, token, title, content, msg, canRead, canEdit } = req.body;

        if (!noteId) {
            return res.json({
                status: "FAILED",
                message: "Note ID is missing!"
            });
        }

        const originalNote = await Note.findById(noteId);
        console.log(originalNote)

        const newCommit = await {
            user: token,
            timestamp: Date.now(),
            changes: {
                title: originalNote.title,
                msg,
                canRead: originalNote.canRead,
                canEdit: originalNote.canEdit
            }
        };

        await Note.findByIdAndUpdate(noteId, {
            $set: { title, content, canRead, canEdit },
            $push: { commits: newCommit }
        });

        res.json({
            status: "SUCCESS",
            message: "Note updated successfully!"
        });
    } catch (error) {
        res.json({
            status: "FAILED",
            message: error.message
        });
        console.error(error);
    }
};

module.exports = { editNote };
