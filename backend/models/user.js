const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true, // Remove whitespace
    },
    lastName: {
        type: String,
        required: true,
        trim: true, // Remove whitespace
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, // Convert to lowercase
        trim: true, // Remove whitespace
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        required: true,
        minlenghth: 6,
    },
    country: {
        type: Schema.Types.ObjectId,
        ref: 'Country',
        required: true,
    },
    city: {
        type: Schema.Types.ObjectId,
        ref: 'City',
        required: true,
    },
    phone: {
        type: String,
        //required: true,
    },
    profilePicture: {
        type: String,
        default: 'https://www.gravatar.com/avatar/?d=mp',
    },
    university: {
        type: Schema.Types.ObjectId,
        ref: 'University',
        //required: true,
    },
    savedProducts: [{
            type: Schema.Types.ObjectId,
            ref: 'Product',
    }],
    rating: {
        average: {
            type: Number,
            default: 0,
        },
        count: {
            type: Number,
            default: 0,
        },
    },
    });

userSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('User', userSchema);
