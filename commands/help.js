const { EmbedBuilder } = require("discord.js");
const fs = require("fs");

exports.run=(client,message,args)=>{
	
	let arg;
	if(args[0])arg=args[0].toLowerCase()+".js";
	
	const commands=fs.readdirSync("./commands").filter(file=>file.endsWith(".js"));
	commands.splice(commands.indexOf("help.js"),1);
	
	let usages=[];
	let fieldVals=[];
	console.log(commands);
	
	commands.forEach((file)=>{
		
		let { 
		name, 
		description, 
		command_usage
		}=require(`./${file}`);
		
		let field={
			name: name,
			value: description,
			inline: true
		};
		
		fieldVals.push(field);
		
		usages.push(command_usage);
		
	});
	
	let embed=new EmbedBuilder()
		.setColor(0x000000);
		
	if(commands.includes(arg)){
		
		let index = commands.indexOf(arg);
		let fieldVal=fieldVals[index];
		
		fieldVal.inline=false;
		
		embed
		.setTitle(fieldVal.name)
		.setImage("https://images3.alphacoders.com/667/thumb-1920-667142.jpg")
		.addFields(
			fieldVal,
			{name: "Usage", value: usages[index]}
		);	
	} else {
		embed
		.setTitle("Help page")
		.setImage("https://wallpapercave.com/wp/wp2226861.jpg")
		.addFields({name: "help", value: "Command to show other commands, do `b!help <commandname>` to get more info on each"});
		fieldVals.forEach((fieldVal)=>{
			embed.addFields(fieldVal);
		});
	}
	message.channel.send({embeds: [embed]});
}

exports.name="help";