//Imports
const { EmbedBuilder } = require("discord.js");
//Defining module
module.exports = () => {
	//Create new embed with EmbedBuilder() class, sets colour as black, sets default static gif as thumbnail & sets Blackbeard author name & icon
	const embed = new EmbedBuilder()
		.setColor(0x000000)
		.setThumbnail("https://media4.giphy.com/media/l41K3o5TzvmhZwd4A/giphy.gif")
		.setAuthor({name: "KUROHIGE!", iconURL: "https://github.com/TheMagicSoup/kurohige/blob/main/assets/images/autor_img.png?raw=true"});
	//Returns embed
	return embed;
}