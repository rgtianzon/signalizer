const mongoose = require('mongoose');

const rosterSchema = new mongoose.Schema({
    empID: Number,
    firstName: String,
    lastName: String,
    fullName: String,
    userName: String,
    password: String,

}, { timestamps: { createdAt: 'created_at' } });

const Roster = mongoose.model('Roster', rosterSchema);
module.exports = Roster;