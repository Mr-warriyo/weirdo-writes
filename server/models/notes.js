const { Schema, model } = require("mongoose");

const noteSchema = new Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        owner: { type: ObjectId, ref: 'User', required: true },
        canRead: [{ type: ObjectId, ref: 'User' }],
        canEdit: [{ type: ObjectId, ref: 'User'}],
        _id: { type: Number, required: true },
        commits: [{
            user: { type: ObjectId, ref: 'User', required: true },
            timestamp: { type: Date, default: Date.now },
            changes: {
                title: String,
                msg: String,
                canRead: [{ type: ObjectId, ref: 'User' }],
                canEdit: [{ type: ObjectId, ref: 'User' }]
            }
        }]
    },
    {
        timestamps: true,
    },
);

const Notes = model('Note', noteSchema);

module.exports = Notes;
