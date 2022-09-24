const { EmbedBuilder } = require("discord.js");
exports.embedInit=(embed)=>{
	embed
		.setColor(0x000000)
		.setThumbnail("https://media4.giphy.com/media/l41K3o5TzvmhZwd4A/giphy.gif")
		.setAuthor({ name: "BLACKBEARD THE GREAT", iconURL: "https://github.com/TheMagicSoup/kurohige/blob/main/assets/images/author_img.png?raw=true"})
	return embed;	
}