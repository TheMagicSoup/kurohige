//Imports
const { readFileSync } = require("fs");
//Defining module properties
module.exports = {
	name: "motd",
	description: "Sends out the message of the day!",
	command_usage: "```\nb!motd\n```",
	run: (client, message, args) => {
		//Defines motd_message
		var motd_message;
		//try-catch block
		try{
			//Stores contents of motd.json as string in jsonString (encoded in utf-8 to make it usable)
			const jsonString=readFileSync("./commands/json_files/motd.json","utf-8");
			//Stores parsed jsonString as Object in data
			const data=JSON.parse(jsonString);
			//Stores motd property in motd_message
			motd_message=data.motd;
		} catch (error) {
			//If an error occurs, log it
			console.log(error);
		}
		//Returns message of the day
		message.channel.send("The message of the day is: \n```" + motd_message + "\n```");
		return;
	}
}