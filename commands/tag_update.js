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
        //Occurs if action is to implement a tag
        if(action==1){
            //If the tag is already present in tags.json, return
            if(JSON.stringify(jsonData).includes(tag)){
                message.channel.send("THIS TAG IS ALREADY DEFINED!");
                return;
            }
            //Send message asking user to define new content for the tag
            message.channel.send("Enter your proposed message for the new tag in chat!");
            //Define filter for createMessageCollector(), filters out messages not from the command caller
            const filter=(mes)=>mes.author===message.author;
            //Creates new message collector, adds pre-defined filter, only accepts one message, time limit of 20 seconds
            const collector=message.channel.createMessageCollector({filter, max: 1, time: 20000});
            //Event for collecting messages
            collector.on("collect",m=>{
                //Stops as soon as first message is collected, as I'm only accepting one message
                collector.stop();
            });
            //Event for when the collector ends
            collector.on("end",collected=>{
                //Fetches message from collected and stores it in inp
                const [inp]=collected.values();
                //Fetches content of message from inp and stores it in new_message
                const new_message=inp.content;
                //Creates new Object with sole key of "message", defined as new_message
                const entry = {
                    message: new_message
                };
                //Creates new key in tags.json, defined as entry
                jsonData[tag]=entry;
                //Stringify jsonData with pretty print, copy contents of jsonData into tags.json
                writeFile("./commands/json_files/tags.json",JSON.stringify(jsonData,null,4),(err)=>{
                    //If an error occurs, throw error, otherwise post that the tag has been implemented
                    if(err)throw err;
                    message.channel.send(`TAG: ${tag} HAS BEEN IMPLEMENTED!`);
                    console.log("element pushed!");
                });
            });
            return;
        //Occurs if action is to remove a tag
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