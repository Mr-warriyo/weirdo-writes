// when note is created

const Note = require("../../models/notes.js");
const User = require("../../models/user.js");
const { userID } = require("./ids");

const isValidIds = async (ids) => {
    try {
        const allUserIds = await userID();
        const uniqueIds = [...new Set(ids.map(id => parseInt(id, 10)))];

        for (const id of uniqueIds) {
            if (!allUserIds.includes(id)) {
                return false;
            }
        }

        return true;

    } catch (error) {
        console.error("Error validating IDs:", error);
        return false;
    }
};

const createNote = async (req, res) => {
    try {
        let { canEdit, canRead, title, content, owner } = req.body;

        canRead = canRead.split(", ");
        canEdit = canEdit.split(", ");

        const areIdsValid = await isValidIds([...canEdit, ...canRead, owner]);
        if (!areIdsValid) {
            return res.json({
                status: "FAILED",
                message: "Invalid user IDs for canEdit, canRead, or owner."
            });
        }

        if (!canEdit || !canRead || !title || !content || !owner) {
            return res.json({
                status: "FAILED",
                message: "Some detail seems to be invalid!"
            });
        }

        const note = new Note({
            title,
            content,
            noteC: content,
            owner,
            canRead,
            canEdit,
            _id: Date.now()
        });

        await note.save();

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
