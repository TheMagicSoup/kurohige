//Imports
const { readFileSync } = require("fs");
const getSoymoji = require("../commands/modules/getSoymoji.js");
//Defining module properties
module.exports = {
	name: "motd",
	description: "Posts what emoji soylisted users are cursed with",
	aliases: ["soyed"],
	command_usage: "```\nb!soymoji\n```",
	run: (client, message, args) => {
		//Defines moji
		var moji=getSoymoji(client);
		message.channel.send(`Current emoji used is: ${moji}`);
		return;
	}
}