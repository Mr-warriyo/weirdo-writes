// When a Note is created
const noteSchema = require("../../models/notes.js")

const createNote = async (req, res) => {
    try {
        let {canEdit, canRead, title, content, owner } = req.body
        if (canEdit && canRead && title && content && owner) {
            // PASS
            // Mow, we need to create noteSchema.

            const note = new noteSchema({
                title,
                content,
                owner,
                canRead,
                canEdit,
                _id: Date.now()
            })

            note.save().then(() => {
                res.json({
                    status: "SUCCESS",
                    message: "Note created Successfully!!",
                    noteId: Date.now()
                })
            }).catch((error) => {
                rres.json({
                    status: "FAILED",
                    message: error.message
                })
                console.error(error)
            })
        } else {
            // FAIL
            res.json({
                status: "FAILED",
                message: "Some detail seems to be invalid!"
            })
        }
    } catch (error) {
        res.json({
            status: "FAILED",
            message: error.message
        })
        console.log(error)
    }
}

module.exports = { createNote }