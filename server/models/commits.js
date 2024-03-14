const { Schema, model } = require('mongoose');

const commitSchema = new Schema(
    {
        note: { type: ObjectId, ref: 'Note', required: true },
        user: { type: ObjectId, ref: 'User', required: true },
        changes: { type: String, required: true }
    },
    {
        timestamps: true,
    },
);

const Commit = model('Commit', commitSchema);

module.exports = Commit;
