const fs=require("fs");
const owner=require("../config.json").ownerID;
module.exports={
    name: "motd_update",
    description: "Changes the message of the day!",
    usage: "Takes one argument: a new message\n```\nb!motd_update <new message>\n```",
    run: (client, message, args) => {
        let arg=args.join(" ");
        if(arg.match(/^<@!?(\d+)>$/)){
            message.channel.send("YOU CAN'T @MENTION USERS IN YOUR MOTD!");
            return;
        }
        var data;
        try{
            const jsonString=fs.readFileSync("./commands/json_files/motd.json","utf-8");
            data=JSON.parse(jsonString);
        }catch(err){
            console.log(err);
        }
        const whitelist=JSON.stringify(data.whitelist);
        if(!(whitelist.includes(message.author.id))){
            message.channel.send("YOU CAN'T CHANGE ANYTHING! YOU'RE NOT WHITELISTED!");
            return;
        } else if(!arg){
            message.channel.send("YOU NEED TO SUPPLY A NEW MESSAGE!");
            return;
        } else {
            data.motd=arg;
            fs.writeFile("./commands/json_files/motd.json",JSON.stringify(data,null,4),(err)=>{
                if(err)throw err;
                console.log("SAVED!");
            });
            message.channel.send("Successfully changed the MotD to:\n```\n"+data.motd+"\n```");
            return;
        }
    }
}