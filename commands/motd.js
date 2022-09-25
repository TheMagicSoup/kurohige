//Imports
const owner = require("../config.json").ownerID;
const fs = require("fs");
//Module properties
module.exports = {
	name: "motd",
	description: "Sends out the message of the day!",
	command_usage: "```\nb!motd\n```",
	run: (client, message, args) => {
		//Fetches message of the day
		var motd_message;
		try{
			const jsonString=fs.readFileSync("./commands/json_files/motd.json","utf-8");
			const data=JSON.parse(jsonString);
			motd_message=data.motd;
		} catch (error) {
			console.log(error);
		}
		//Returns message of the day
		message.channel.send("The message of the day is: \n```" + motd_message + "\n```");
		return;
	}
}