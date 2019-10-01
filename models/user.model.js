const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:'Full name can\'t be empty'
    },
    email:{
        type:String,
        required:'Email can\'t be empty',
        unique:true
    },
    password:{
        type:String,
        required:'Password can\'t be empty',
        minlength:[4,'Password must be at least 4 characters long!']
    },
    hotel:{
        type:String
    }
});

userSchema.path('email').validate((val)=>{
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
},'Invalid e-mail');

userSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
            next();
});

//methods
userSchema.methods.verifyPassword = function(password){
    return bcrypt.compareSync(password,this.password);
}

userSchema.methods.generateJwt = function(){
    return jwt.sign({ _id: this._id },
    process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXP
    });
}

mongoose.model('User',userSchema);