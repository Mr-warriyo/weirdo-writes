const { Schema, model } = require("mongoose");

const noteSchema = new Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        owner: { type: Object, ref: 'User', required: true },
        canRead: [{ type: Object, ref: 'User' }],
        canEdit: [{ type: Object, ref: 'User'}],
        _id: { type: Number, required: true },
        commits: [{
            user: { type: Object, ref: 'User', required: true },
            timestamp: { type: Date, default: Date.now },
            changes: {
                title: String,
                msg: String,
                canRead: [{ type: Object, ref: 'User' }],
                canEdit: [{ type: Object, ref: 'User' }]
            }
        }]
    },
    {
        timestamps: true,
    },
);

const Notes = model('Note', noteSchema);

module.exports = Notes;
