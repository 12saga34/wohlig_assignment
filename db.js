const mongoose = require('mongoose');

const userSchema = {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    phone: { type: String, required: true },
    applied_for: { type: String, enum: ['front-end', 'back-end', 'full-stack'], required: true },
    rating: { type: Number, min: 1, max: 5, required: true }
};

const User = mongoose.model("users", userSchema);
module.exports=User