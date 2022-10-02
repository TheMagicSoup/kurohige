//Imports
const { XMLHttpRequest }=require("xmlhttprequest");
//Defining module properties
module.exports = {
    name: "httprequest",
    description: "Returns status of HTTP request",
    aliases: ["httpstatus"],
    command_usage: "Takes one argument, a URL\n```\nb!httprequest <url>\n```",
    run: (client, message, args) => {
        //If there's no argument provided, return
        if(!args[0]){
            message.channel.send("Enter a URL!");
            return;
        }
        //Stores new XMLHttpRequest in http
        const http=new XMLHttpRequest();
        //Opens & sends HTTP request to provided URL
        http.open("HEAD",args[0],false);
        http.send();
        //Returns http status for the provided argument
        message.channel.send(`HTTP status for that webpage is: ${http.status}`);
    }
}
