// To validate Note

const Note = require("../../models/notes");

const noteID = async (req, res) => {
    try {
        const { id } = req.body;

        const notes = await Note.find({}, "_id title content noteC owner canRead canEdit commits");
        const noteIds = notes.map(note => note._id.toString());

        if (!noteIds.includes(id)) {
            return res.json({
                status: "FAILED",
                message: "Invalid note ID"
            });
        }

        const note = notes.find(note => note._id.toString() === id);

        return res.json({
            status: "SUCCESS",
            message: "Valid note ID",
            note
        });

    } catch (error) {
        console.error(error);
        return res.json({
            status: "FAILED",
            message: "Failed to retrieve note details: " + error.message
        });
    }
}

module.exports = { noteID };
