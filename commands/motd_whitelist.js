//Imports
const fs=require("fs");
const owner=require("../config.json").ownerID;
module.exports = {
    //Defining module properties
    name: "motd_whitelist",
    description: "Command that controls MOTD whitelist.",
    command_usage: "Takes 2 arguments, the action (0=remove, 1=add) and the user (@mention).\n```\nb!motd_whitelist <0/1> <@user>\n```",
    run: (client, message, args)=>{
        //If I haven't made this command, don't run the command
        if(message.author.id!==owner)return;
        //First argument takes the action I'm taking (removing or adding);
        let action=args[0];
        //Second argument takes the user I'm performing this action on
        let user=message.mentions.users.first() || client.users.cache.get(args[1]);
        //If the argument is invalid, don't run the command
        if((action!=0&&action!=1)||!user){
            message.channel.send("INVALID ARGUMENTS!\nREFERENCE `b!help motd_whitelist` TO SEE HOW TO USE THIS COMMAND");
            return;
        }
        //Stores the JSON data
        let data;
        try{
            //Stores motd.json as 1 string in jsonString
            const jsonString = fs.readFileSync("./commands/json_files/motd.json","utf-8");
            //Parses jsonString, converts it into an object and stores in data
            data=JSON.parse(jsonString);
        }catch(error){
            //Returns error if one occurs
            console.log(error);
        }
        //Creates object entry that stores the user id in the same way an element of data.whitelist would
        const entry = {
            id: user.id
        };
        //Triggers if user is adding to the whitelist
        if(action==1){
            //If the whitelist array includes the user id, post that the user is already whitelisted and return
            if(JSON.stringify(data.whitelist).includes(user.id)){
                message.channel.send("THAT USER IS ALREADY WHITELISTED!");
                return;
            }
            //Add entry to data.whitelist[]
            data.whitelist.push(entry);
            //Replace contents of motd.json with data (the same as motd.json with entry appended)
            fs.writeFile("./commands/json_files/motd.json",JSON.stringify(data,null,4),(err)=>{
                //Throw an error if one occurs
                if(err)throw err;
                //Post that the user has been whitelisted
                message.channel.send(`<@${user.id} has been whitelisted!`);
                //Return to console that the element was pushed
                console.log("element got pushed!");
            });
        //Triggers if argument is 0
        } else{
            //If the user isn't in the whitelist, post that the user isn't whitelisted and return
            if(!(JSON.stringify(data.whitelist).includes(user.id))){
                message.channel.send("THAT USER ISN'T WHITELISTED!");
                return;
            }
            //Remove entry from array
            data.whitelist.splice(data.whitelist.indexOf(entry),1);
            //Replace contents of motd.json with data (data is the same as motd.json with entry abated)
            fs.writeFile("./commands/json_files/motd.json",JSON.stringify(data,null,4),(err)=>{
                //Throws an error if one occurs
                if(err)throw err;
                //Post that the user has been removed from the whitelist
                message.channel.send(`<@${user.id}> has been removed from the whitelist!`);
                //Logs that the element has been removed
                console.log("element removed!");
            });
        }
    }
}