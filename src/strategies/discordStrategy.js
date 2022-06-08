const {DISCORD_ID, DISCORD_SECRET} = require('../config')
const User = require("../models/User");
const passport = require('passport')
const {Strategy} = require('passport-discord')

passport.serializeUser((user, done) => {
    done(null, user.id)

})

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user)
    
})
passport.use(new Strategy({
    clientID: DISCORD_ID,
    clientSecret: DISCORD_SECRET,
    callbackURl: '/auth/redirect',
    scope: ['identify']
}, async (accesToken, refreshToken, profile, done) =>{
    try {
        const user = await User.findOne({discordId: profile.id})

        if (user){
            if(user.banner != `https://cdn.discordapp.com/banners/${profile.id}/${profile.banner}.gif?size=512`){
                user.banner = `https://cdn.discordapp.com/banners/${profile.id}/${profile.banner}.gif?size=512`
            }
            await user.save()
            return done(null, user)
        }

        const newUser = new User({
            discordId: profile.id,
            discriminator: profile.discriminator,
            username: profile.username,
            avatar: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.gif?size=512`,
            banner: `https://cdn.discordapp.com/banners/${profile.id}/${profile.banner}.gif?size=512`
        })
        await newUser.save()
        done(null, newUser)
        
    } catch (error) {
        console.log(error)
        return done(error, null)
    }
}))