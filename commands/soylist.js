const { readFileSync, writeFile } = require("fs");
const owner=require("../config.json").ownerID;
const issoylisted=require("./modules/issoylisted.js");
module.exports={
    name: "soylist",
    description: "Command that manipulates the soylist for certain things",
    aliases: ["sl","u-soylist","soylist-u"],
    command_usage: "Takes 2 arguments, the action (0=remove, 1=add) and the user (@mention).\n```\nb!soylist <0/1> <@user>\n```",
    run: (client, message, args) => {
        if(message.author.id!==owner)return;
        let action=args[0];
        let user=message.mentions.users.first() || client.users.cache.get(args[1]);
        if((action!=0&&action!=1)||!user){
            message.channel.send("INVALID ARGUMENTS!\nREFERENCE `b!help soylist` TO SEE HOW TO USE THIS COMMAND");
            return;
        }
        let data;
        try{
            const jsonString=readFileSync("./commands/json_files/soylist.json","utf-8");
            data=JSON.parse(jsonString);
        }catch(error){
            console.log(error);
        }

        const entry={
            id: user.id
        };

        if(action==1){
            if(issoylisted(user.id)){
                message.channel.send("THAT USER IS ALREADY SOYLISTED!");
                return;
            }
            data.soylist.push(entry);
            writeFile("./commands/json_files/soylist.json",JSON.stringify(data,null,4),(err)=>{
                if(err)throw err;
                message.channel.send(`**${user.tag}** has been soylisted!`);
                console.log("element got pushed!");
            });
        } else {
            if(!issoylisted(user.id)){
                message.channel.send("THAT USER ISN'T SOYLISTED!");
                return;
            }
            data.soylist.splice(data.soylist.indexOf(entry),1);
            writeFile("./commands/json_files/soylist.json",JSON.stringify(data,null,4),(err)=>{
                if(err)throw err;
                message.channel.send(`**${user.tag}** has been removed from the soylist!`);
                console.log("element removed!");
            });
        }
    }
}