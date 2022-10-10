//Imports
const { EmbedBuilder } = require("discord.js");
//Defining module
module.exports = () => {
	//Create new embed with EmbedBuilder() class
	const embed = new EmbedBuilder()
		//Sets default color as black
		.setColor(0x000000)
		//Sets default thumbnail as static
		.setThumbnail("https://media4.giphy.com/media/l41K3o5TzvmhZwd4A/giphy.gif")
		//Sets author as Blackbeard
		.setAuthor({name: "KUROHIGE!", iconURL: "https://github.com/TheMagicSoup/kurohige/blob/main/assets/images/author_img.png?raw=true"});
	//Returns embed
	return embed;
}