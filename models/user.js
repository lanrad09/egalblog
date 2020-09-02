const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({

    firstname: {
        type:String,
        required: true
    }, 
    lastname: {
        type:String,
        required: true
        
    }, 
    username: {
        type:String        
    },
    email: {
        type:String,
        required: true
    },
    password: {
        type:String,
        required: true    
    },
    createdAt: {
        type:Date,
        default: Date.now()    
    },
    permissionLevel:{
        type:Number
        

    }
})

mongoose.set('useCreateIndex', true); //set before mongoose.model call
module.exports = mongoose.model('User', userSchema)