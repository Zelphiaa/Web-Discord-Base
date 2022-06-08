require('dotenv').config();

module.exports={
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost/discordapp',
    PORT: process.env.PORT || 3000,
    SECRET: process.env.SECRET,
    DISCORD_ID: process.env.DISCORD_ID,
    DISCORD_SECRET: process.env.DISCORD_SECRET
}
