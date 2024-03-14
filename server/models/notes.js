const { Schema, model } = require("mongoose");

const noteSchema = new Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        owner: { type: ObjectId, ref: 'User', required: true },
        sharedWith: [{ type: ObjectId, ref: 'User' }]
    },
    {
        timestamps: true,
    },
);

const Notes = model('Note', noteSchema);

module.exports = Notes;
