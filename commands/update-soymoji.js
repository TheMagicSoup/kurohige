const isWhitelisted=require("./modules/isWhitelisted.js");
const { readFileSync, writeFile } = require("fs");
const getSoymoji = require("../commands/modules/getSoymoji.js");
module.exports = {
	name: "update-soymoji",
	description: "Changes the emoji soy users are cursed with",
	aliases: ["updatesoymoji","usoy","u-soy"],
	usage: "Takes one argument: a new message\n```\nb!update-motd <new emoji>\n```",
	run: (client, message, args) => {
		let arg=args[0];
		if(!arg){
			message.channel.send("SUPPLY AN EMOJI!");
			return;
		}
		if(!arg.match(/<a:.+?:\d+>|<:.+?:\d+>|\p{Extended_Pictographic}/gu)){
			message.channel.send("EMOJI IS INVALID!");
			return;
		}
		if(!arg.match(/\p{Extended_Pictographic}/gu)){
			arg=arg.split(":")[2];
			arg=arg.substring(0,arg.length-1);
		}
		var data;
		try{
			const jsonString=readFileSync("./commands/json_files/soymoji.json");
			data=JSON.parse(jsonString);
		} catch (err) {
			console.log(err);
		}
		if(!isWhitelisted(message.author.id)){
			message.channel.send("ONLY WHITELISTED MEMBERS CAN CHANGE THIS!");
			return;
		}
		data.moji=arg;
		writeFile("./commands/json_files/soymoji.json",JSON.stringify(data,null,4),(err)=>{
			//Throws error if one occurs, else logs that data has been successfully saved
			if(err)throw err;
			console.log("SAVED!");
		});
		message.channel.send(`CHANGED!`);
		return;
	}
}