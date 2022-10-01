//Imports
const isWhitelisted=require("./modules/isWhitelisted.js");
const { readFileSync, writeFile } = require("fs");
//Defining module properties
module.exports={
    name: "motd_update",
    description: "Changes the message of the day!",
    usage: "Takes one argument: a new message\n```\nb!motd_update <new message>\n```",
    run: (client, message, args) => {
        //Stores arguments separated by spaces in arg
        let arg=args.join(" ");
        //If there's an @mention in arg, return
        if(arg.match(/^<@!?(\d+)>$/)){
            message.channel.send("YOU CAN'T @MENTION USERS IN YOUR MOTD!");
            return;
        }
        //Defines data
        var data;
        //try-catch block
        try{
            //Stores motd.json as an Object in data
            const jsonString=readFileSync("./commands/json_files/motd.json","utf-8");
            data=JSON.parse(jsonString);
        }catch(err){
            //If there's an error, log it
            console.log(err);
        }
        //If whitelist doesn't include author's id, return
        if(!isWhitelisted(message.author.id)){
            message.channel.send("YOU CAN'T CHANGE ANYTHING! YOU'RE NOT WHITELISTED!");
            return;
        } else if(!arg){
        //If no new message of the day is provided, return
            message.channel.send("YOU NEED TO SUPPLY A NEW MESSAGE!");
            return;
        } else {
        //Otherwise, store argument as data's motd property
            data.motd=arg;
            //Stringify data with pretty print, copy contents of data into motd.json
            writeFile("./commands/json_files/motd.json",JSON.stringify(data,null,4),(err)=>{
                //Throws error if one occurs, else logs that data has been successfully saved
                if(err)throw err;
                console.log("SAVED!");
            });
            //Returns that the motd has been set
            message.channel.send("Successfully changed the MotD to:\n```\n"+data.motd+"\n```");
            return;
        }
    }
}