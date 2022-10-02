//Imports
const embedInit = require("./modules/embedInit.js");
//Defining module properties
module.exports = {
	name: "get-avatar",
	description: "Gets avatar of target, or command caller if there is none.",
	aliases: ["fetch_avatar","avatar"],
	command_usage: "Takes one argument - a user.\n```\nb!get-avatar <@user>\n```",
	run: (client, message, args)=>{
		/*
		* Stores targed user in user, if there's no user mentioned
		* it gets user from first argument, if there's no user in the arguments,
		* it gets the message author
		 */
		let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
		//Stores user's profile picture, with a size of 4096x4096
		let url = user.displayAvatarURL({size: 4096, dynamic:true});
		//Creates preset embed, adds title, the user's avatar image and a field link to the image
		const embed=embedInit()
			.setTitle(`Avatar for ${user.username}`)
			.setImage(url)
			.addFields({name: "Image link", value:`[CLICK HERE BITCH!](${url})`});
		//Returns embed
		message.channel.send({embeds: [embed]});
		return;
	}
}