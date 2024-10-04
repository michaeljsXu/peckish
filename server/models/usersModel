const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true },
    favourites: { type: String, required: true },
    dislikes: { type: String, required: true },
    tools: { type: String, required: true },
    allergies: { type: String, required: true },
    diet: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;