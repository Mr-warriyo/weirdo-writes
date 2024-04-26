const User = require("../../models/user.js");
const Note = require("../../models/notes.js");

const reqNote = async (req, res) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({
                status: "FAILED",
                message: "User ID is missing!"
            });
        }

        // Find the user with the provided token
        const user = await User.findById({
            _id: token
        });

        if (!user) {
            return res.status(404).json({
                status: "FAILED",
                message: "User not found!"
            });
        }

        // Extract note IDs from the user's permissions
        const canReadNoteIds = user.canRead || [];
        const canEditNoteIds = user.canEdit || [];

        // Get notes based on permissions
        const readNotes = await Note.find({ _id: { $in: canReadNoteIds } });
        const editNotes = await Note.find({ _id: { $in: canEditNoteIds } });

        // Find unique notes between canRead and canEdit
        const uniqueNoteIds = [...new Set([...canReadNoteIds, ...canEditNoteIds])];
        const unqNote = await Note.find({ _id: { $in: uniqueNoteIds } });

        res.json({
            status: "SUCCESS",
            message: "Notes requested successfully!",
            readNotes,
            editNotes,
            unqNote
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "FAILED",
            message: "Internal server error"
        });
    }
};

module.exports = { reqNote };
