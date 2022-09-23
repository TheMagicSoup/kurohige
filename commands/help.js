const { EmbedBuilder } = require("discord.js");
const fs = require("fs");
const embField = require("./classes/embField.js");
exports.run=(client,message,args)=>{
	const commands=fs.readdirSync("./commands").filter(file=>file.endsWith(".js"));
	let embed=new EmbedBuilder().setTitle("Help page");
	let fields=[];
	console.log(commands);
	for(const file of commands){
		let { name, description }=require(`./${file}`);
		embed.addFields({name: name, value: description});
	}
	message.channel.send({embeds: [embed]});
	/*
		const embed = new EmbedBuilder()
		.setColor(0x000000)
		.setImage(image)
		.addFields(
			{name: "Image link", value:`[CLICK HERE BITCH!](${image})`}
		);

	let categories=[];
	for(const file of commands){
		const commmandName=file.split(".")[0];
		const command=require(`./commands/${file}`);
		console.log(command.description);
	}*/
}
exports.name="help";
exports.description="Shows menu for commands";

/*
for(const file of commands){
	const commandName=file.split(".")[0];
	const command=require(`./commands/${file}`);
	console.log(`Attempting to load command ${commandName}`);
	client.commands.set(commandName,command);
}
*/