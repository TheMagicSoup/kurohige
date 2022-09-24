const owner = require("../config.json").ownerID;
const motd = require("./modules/motd.json");
const fs=require("fs");
exports.run = (client, message, args) => {
	let arg=args.join(" ");


	if (arg) {
		if (message.author.id === owner) {
			let msg={
				"message": arg
			};
			fs.writeFile("./commands/modules/motd.json",JSON.stringify(msg),(err)=>{
				if(err){
					throw(err);
				}
				console.log("SAVED!");
			});
			message.channel.send("Set the MotD to:\n```" + motd.message + "\n```");
			return;
		}
	}
	message.channel.send("The message of the day: \n```"+motd.message+"\n```");
	return;
}
exports.name = "motd";
exports.description = "Sends out the message of the day!\n Takes an optional argument: a new motd";
exports.command_usage = "```\nb!motd <argument>\n```";