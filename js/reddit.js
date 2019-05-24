const snoowrap = require('snoowrap');
const user_details = require('./reddit-user-details')

const reddit = new snoowrap(user_details.details)

async function getPost(){
    var json
    json = await reddit.getSubreddit("earthporn").getNew()
    return json
}

exports.getPost = getPost