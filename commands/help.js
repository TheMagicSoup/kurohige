const { EmbedBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const fs = require("fs");
const { embedInit } = require("./modules/embedInit.js");
const { ChannelPagination, NextPageButton, PreviousPageButton } = require("djs-button-pages");


exports.run= async (client,message,args)=>{
	
	let arg;
	if(args[0])arg=args[0].toLowerCase()+".js";
	
	const commands=fs.readdirSync("./commands").filter(file=>file.endsWith(".js"));
	commands.splice(commands.indexOf("help.js"),1);
	let embeds=[];
	const embArrLen=Math.ceil(commands.length/6);
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
	for(let i=0;i<embArrLen;i++){
		let embed=new EmbedBuilder();
		embedInit(embed);
		embeds.push(embed);
	}
	
	if(arg&&commands.includes(arg)){
		let index=commands.indexOf(arg);
		let fieldVal=fieldVals[index];
		fieldVal.inline=false;
		embeds[0]
			.setTitle(fieldVal.name)
			.setImage("https://images3.alphacoders.com/667/thumb-1920-667142.jpg")
			.addFields(
				fieldVal,
				{name: "Usage", value: usages[index]}
			);
		message.channel.send({embeds: [embeds[0]]});
		return
	}
	for(let i=0;i<embeds.length;i++){

		let embed=embeds[i];

		embed
		.setTitle("Help page")
		.setImage("https://wallpapercave.com/wp/wp2226861.jpg")
		.setDescription("Command to show other commands, do `b!help <commandname>` to get more info on each");
		for(let j=i*6;j<=(i*6)+5&&j<fieldVals.length;j++){
			embed.addFields(fieldVals[j]);
		}
		embed.setFooter({text:`Page ${i+1} of ${embeds.length}`});
	}
	const buttons=[
		new PreviousPageButton({custom_id: "prev_page", label: "Previous", style: ButtonStyle.Success}),
		new NextPageButton().setStyle({custom_id: "next_page", label: "Next", style: ButtonStyle.Success})
	]
	const pagination=new ChannelPagination()
		.setButtons(buttons)
		.setEmbeds(embeds)
		.setTime(60000);
	await pagination.send(message.channel);
}

exports.name="help";