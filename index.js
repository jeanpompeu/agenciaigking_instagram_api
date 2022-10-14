require('dotenv').config();
const express = require("express");
const app = express();
const fetch = require("cross-fetch");
const cors = require("cors");
const lib = require("instagram-apis");
const imageToBase64 = require('image-to-base64')


app.use(cors());

const client = new lib();
(async () => {
    await client.init({
        cookie: process.env.COOKIES,
    });
    const data = await client.getUsernameInfo('nay_louback')


})();

app.get("/instagram", async (request, response) => {
    const { username } = request.query;

    if (!username || username.trim() == "") {
        return response.status(400).json({ ok: false });
    }

    try {
        const data = await client.getUsernameInfo(username)
        var profile_pic = data.profile_pic_url_hd
    
        profile_pic = await imageToBase64(profile_pic)
        var edge_followed_by = data.edge_followed_by
        var edge_follow = data.edge_follow
        var full_name = full_name
        var is_private = data.is_private
        var is_verified = data.is_verified
    
        return response.status(200).json({ ok: true, data: {
            full_name,
            profile_pic,
            edge_follow,
            edge_followed_by,
            is_verified,
            is_private
        }})
        
    } catch (error) {
        return response.status(400).json({ ok: false})
    }

});


// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, () => {
    console.log("Your app is listening on port " + listener.address().port);
});
