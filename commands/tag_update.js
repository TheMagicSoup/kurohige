//Imports
const isWhitelisted = require("./modules/isWhitelisted.js");
const { readFileSync, writeFile } = require("fs");
//Defining module properties
module.exports = {
    name: "tag_update",
    description: "Updates a selected tag",
    command_usage: "Takes 3 arguments in 2 staggered messages, the action (0=remove, 1=add), the selected tag\nand a new tag\n```\nb!tag_update <tag name>\n<then enter new tag message>\n```",
    run: (client, message, args) => {
        //Stores action to be taken in action
        const action = args[0];
        //If no second argument is supplied or first argument isn't 0||1, return
        if(!args[1]||(action!=0&&action!=1)){
            message.channel.send("INVALID ARGUMENTS!\nREFERENCE `b!help whitelist` TO SEE HOW TO USE THIS COMMAND");
            return;
        }
        //Stores all content after the action separated by spaces and converted to lowercase as tag
        const tag = args.slice(1,args.length).join(" ").toLowerCase();
        //If the message author is not whitelisted, return
        if(!isWhitelisted(message.author.id)){
            message.channel.send("YOU CAN'T EDIT TAGS! YOU AREN'T WHITELISTED!");
            return;
        }
        //Defines jsonData
        var jsonData;
        try{
            //Stores contents of tags.json as string in jsonString
            const jsonString=readFileSync("./commands/json_files/tags.json","utf-8");
            //Parses jsonString and stores returned Object in jsonData
            jsonData=JSON.parse(jsonString);
        } catch (error) {
            //Logs error if one occurs
            console.log(error);
        }
        if(action==1){
            //If the tag is already defined, return
            if(JSON.stringify(jsonData).includes(tag)){
                message.channel.send("THIS IS ALREADY A TAG!");
                return;
            }
            //Stores new tag message, soon-to-be implemented
            var newTagMessage="";
            //Creates Object with new tag message
            var entry = {
                message: newTagMessage
            };
            //Pushes new key to jsonData with entry defined as arg's definition
            jsonData[key]=entry;
            //Stringify data with pretty print, copy contents of jsonData into tags.json
            writeFile("./commands/json_files/tags.json",JSON.stringify(data,null,4),(err)=>{
                //If error occurs, throw error
                if(err)throw err;
                //Otherwise, post that tag has been implemented
                message.channel.send(`IMPLEMENTED TAG ${tag}!`);
                return;
            });
        }else{
            //If tags.json doesn't feature the tag, return
            if(!JSON.stringify(jsonData).includes(tag)){
                message.channel.send("THIS TAG DOESN'T EXIST!");
                return;
            }
            //Remove key from jsonData
            delete jsonData[tag];
            //Stringify jsonData with pretty print, copy contents of jsonData into tags.json
            writeFile("./commands/json_files/tags.json",JSON.stringify(jsonData,null,4),(err)=>{
                //If error occurs, throw error, otherwise post that the tag has been removed
                if(err)throw err;
                message.channel.send(`TAG: ${tag} has been removed!`);
                return;
            });
        }
    }
}