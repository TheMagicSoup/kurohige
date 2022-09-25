const { EmbedBuilder } = require("discord.js");
module.exports = {
	name: "get_avatar",
	description: "Gets avatar of target, or command caller if there is none.",
	command_usage: "Takes one argument - a user.\n```\nb!get_avatar <@user>\n```",
	run: (client, message, args)=>{
		let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
		let url = user.displayAvatarURL({size: 4096, dynamic:true});
		
		const embed=new EmbedBuilder()
			.setTitle(`Avatar for ${user.username}`)
			.setImage(url)
			.setColor(0x000000)
			.addFields({name: "Image link", value:`[CLICK HERE BITCH!](${url})`});
		
		message.channel.send({embeds: [embed]});
	}
}