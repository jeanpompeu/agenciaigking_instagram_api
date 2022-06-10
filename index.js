require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const imageToBase64 = require('image-to-base64');



app.use(express.json())
app.use(cors())

const instagram = require('user-instagram')

const connect = async () => {
  try{
    await instagram.authenticate(process.env.USERNAME, process.env.PASSWORD);
    
  }catch(err) {
    console.log(err)
  }
}

connect()

app.post('/instagram', async (req, res) => {
    const username = req.body.username

    try {
        const user = await instagram.getUserData(username)
    
        const name = await user.getFullName()
        var profile_pic = await user.getHdProfilePicture()
        const followers = await user.getFollowersCount()
        const following = await user.getFollowingCount()
        const isVerified = await user.isVerified()
        const isPrivate = await user.isPrivate()

        profile_pic = await imageToBase64(profile_pic).then(r=> r)
    
        return res.json({ ok: true, isVerified, isPrivate, name, profile_pic, followers, following })
    } catch (error) {
        return res.json({ ok: false, message: 'Usuário não encontrado!' })
    }

})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})