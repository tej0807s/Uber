const mongooes = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userSchema = new mongooes.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'First name must be at leats 3 characters long.']
        },
        lastname: {
            type: String,
            minlength: [3, 'Last name must be at leats 3 characters long.']
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Email must be at leats 5 characters long.']
    },
    password: {
        type: String,
        required: true,
        select: false
    },  
    socketId: {
        type: String
    }
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id}, process.env.JWT_SECRET)
    return token;
} 

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.comapre(password, this.password);
} 

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
} 

const userModel = mongooes.model('user', userSchema);


module.exports = userModel;