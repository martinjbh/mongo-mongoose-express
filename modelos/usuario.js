const moongose = require('mongoose')

const UserSchema = new moongose.Schema({
    id:Number,
    name: String,
    lastName:String,
    total:Number,
})

const User = moongose.model("User",UserSchema)
module.exports = User