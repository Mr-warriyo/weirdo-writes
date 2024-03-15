// When User Requests Note on Dashboard

const User = require("../../models/user.js");
const Note = require("../../models/notes.js");

const reqNote = async (req, res) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.json({
                status: "FAILED",
                message: "User ID is missing!"
            });
        }

        const user = await User.findById({
            _id: token
        });

        if (!user) {
            return res.json({
                status: "FAILED",
                message: "User not found!"
            });
        }

        const userNotes = await Note.find({
            $or: [
                { owner: token },
                { canRead: token },
                { canEdit: token }
            ]
        });

        if (!userNotes.length) {
            return res.json({
                status: "FAILED",
                message: "No notes found for this user!"
            });
        }

        const permissions = userNotes.map(note => ({
            noteId: note._id,
            canRead: note.canRead,
            canEdit: note.canEdit
        }));

        res.json({
            status: "SUCCESS",
            message: "Notes requested successfully!",
            permissions
        });
    } catch (error) {
        res.json({
            status: "FAILED",
            message: error.message
        });
        console.error(error);
    }
};

module.exports = { reqNote };
