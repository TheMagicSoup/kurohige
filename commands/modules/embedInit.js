const { EmbedBuilder } = require("discord.js");
module.exports = () => {
	const embed = new EmbedBuilder()
		.setColor(0x000000)
		.setThumbnail("https://media4.giphy.com/media/l41K3o5TzvmhZwd4A/giphy.gif")
		.setAuthor({name: "KUROHIGE!", iconURL: "https://github.com/TheMagicSoup/kurohige/blob/main/assets/images/author_img.png?raw=true"});
	return embed;
}