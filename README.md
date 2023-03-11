## The database entries can be added via the frontend interface. It has CRUD applications to manage interview candidates' information.

Database script to create the users collection in MongoDB using Mongoose:

const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://127.0.0.1:27017/users");

const userSchema = {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    phone: { type: String, required: true },
    applied_for: { type: String, enum: ['front-end', 'back-end', 'full-stack'], required: true },
    rating: { type: Number, min: 1, max: 5, required: true }
};

const User = mongoose.model("users", userSchema);
