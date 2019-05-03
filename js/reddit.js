const snoowrap = require('snoowrap');
const user_details = require('./reddit-user-details')

const reddit = new snoowrap(user_details.details)

async function getPost(){
    reddit.getSubreddit("earthporn").getNew().then((data)=>{
        const json = data.toJSON()
        
    })
}

exports.getPost = getPost