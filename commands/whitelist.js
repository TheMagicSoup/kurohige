const { readFileSync, writeFile } = require("fs");
const owner=require("../config.json").ownerID;
const isWhitelisted=require("./modules/isWhitelisted.js");
module.exports={
    name: "whitelist",
    description: "Command that manipulates the whitelist for updating tags and the MotD",
    aliases: ["wl","u-whitelist","whitelist-u"],
    command_usage: "Takes 2 arguments, the action (0=remove, 1=add) and the user (@mention).\n```\nb!whitelist <0/1> <@user>\n```",
    run: (client, message, args) => {
        if(message.author.id!==owner)return;
        let action=args[0];
        let user=message.mentions.users.first() || client.users.cache.get(args[1]);
        if((action!=0&&action!=1)||!user){
            message.channel.send("INVALID ARGUMENTS!\nREFERENCE `b!help whitelist` TO SEE HOW TO USE THIS COMMAND");
            return;
        }
        let data;
        try{
            const jsonString=readFileSync("./commands/json_files/whitelist.json","utf-8");
            data=JSON.parse(jsonString);
        }catch(error){
            console.log(error);
        }

        const entry={
            id: user.id
        };

        if(action==1){
            if(isWhitelisted(user.id)){
                message.channel.send("THAT USER IS ALREADY WHITELISTED!");
                return;
            }
            data.whitelist.push(entry);
            writeFile("./commands/json_files/whitelist.json",JSON.stringify(data,null,4),(err)=>{
                if(err)throw err;
                message.channel.send(`**${user.tag}** has been whitelisted!`);
                console.log("element got pushed!");
            });
        } else {
            if(!isWhitelisted(user.id)){
                message.channel.send("THAT USER ISN'T WHITELISTED!");
                return;
            }
            data.whitelist.splice(data.whitelist.indexOf(entry),1);
            writeFile("./commands/json_files/whitelist.json",JSON.stringify(data,null,4),(err)=>{
                if(err)throw err;
                message.channel.send(`**${user.tag}** has been removed from the whitelist!`);
                console.log("element removed!");
            });
        }
    }
}