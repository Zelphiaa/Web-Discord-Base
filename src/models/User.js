const {Schema, model} = require("mongoose")


const userSchema = new Schema({
    discordId:{
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    discriminator: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: false,
    },
    banner: {
        type: String,
        required: false,
    }
},{
    timestamps: true
})

module.exports = model('User', userSchema)

