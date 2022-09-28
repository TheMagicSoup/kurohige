const isGoodLink=require("./modules/isGoodLink.js");
const { XMLHttpRequest }=require("xmlhttprequest");
const owner=require("../config.json").ownerID;
module.exports = {
    name: "httprequest",
    description: "OWNER-ONLY\nReturns status of HTTP request",
    command_usage: "Takes one argument, a URL\n```\nb!httprequest <url>\n```",
    run: (client, message, args) => {
        if(!args[0]){
            message.channel.send("Enter a URL!");
        }
        const http=new XMLHttpRequest();
        http.open("HEAD",args[0],false);
        http.send();
        message.channel.send(`HTTP status for that webpage is: ${http.status}`);
    }
}
