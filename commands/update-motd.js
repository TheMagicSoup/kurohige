//Imports
const isWhitelisted=require("./modules/isWhitelisted.js");
const { readFileSync, writeFile } = require("fs");
//Defining module properties
module.exports={
    name: "update-motd",
    description: "Changes the message of the day!",
    aliases: ["updatemotd",",u-motd",",motd-u"],
    usage: "Takes one argument: a new message\n```\nb!update-motd <new message>\n```",
    run: (client, message, args) => {
        console.log(isWhitelisted(message.author.id));
        //Stores arguments separated by spaces in arg
        let arg=args.join(" ");
		if(!arg){
			message.channel.send("SUPPLY A MESSAGE!");
			return;
		}
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
        }
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