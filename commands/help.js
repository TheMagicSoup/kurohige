//Imports
const { ButtonStyle } = require("discord.js");
const fs = require("fs");
const embedInit  = require("./modules/embedInit.js");
const { ChannelPagination, NextPageButton, PreviousPageButton } = require("djs-button-pages");
module.exports = {
	name: "help",
	description: "Command helping the user with the bot's commands!",
	command_usage: "```\nb!help or b!help <command name>\n```",
	run: async (client, message, args) => {
		//Creates arg, if there's an argument it's stored in arg 
		let arg="";
		if(args[0])arg=args[0].toLowerCase()+".js";
		//Creates list of strings holding each filename in commands, filters to only store elements ending in ".js"
		const commands=fs.readdirSync("./commands").filter(file=>file.endsWith(".js"));
		//Omits "help.js" from list (I'm giving it it's own field)
		commands.splice(commands.indexOf("help.js"),1);
		/*
		* Creates array for:
		* embeds,
		* field values (so I can do .addFields(fieldVal) instead of making a new object),
		* and usages (I can't store them in the fieldVals array because it's not an accepted property for .addFields())
		*/
		let embeds=[];
		let usages=[];
		let fieldVals=[];
		//Stores how many fields describing commands will populate each embed
		const fieldsInEmb=6;
		//Stores how many embeds there will be, also outputs the commands list
		const embArrLen=Math.ceil(commands.length/fieldsInEmb);
		console.log(commands);
		//For-loop, iterates through commands[] and makes embed fields for each one, pushes command_usage properties to usages[]
		commands.forEach((file)=>{
			let { name, description, command_usage }=require(`./${file}`);
			let field={ name: name, value: description, inline: true };
			fieldVals.push(field);			
			usages.push(command_usage);
			
		});
		//Sets up array of embeds, initialises each embed for format I layed out in embedInit.js
		for(let i=0;i<embArrLen;i++){
			let embed=embedInit().setTitle("Help page");
			embeds.push(embed);
		}
		//If the user did b!help <command name>
		if(commands.includes(arg)){
			//Fetches index of argument in commands[], as it'll be the index of the element relating to that command in all arrays
			let index=commands.indexOf(arg);
			//Fetches & stores that command's respective field value
			let fieldVal=fieldVals[index];
			//I want the inline to be false, as I want these fields to completely occupy their respective embeds
			fieldVal.inline=false;
			//Just using the first embed element as it's only returning an embed relating to that specific command
			embeds[0]
				//Sets title to the command's name
				.setTitle("Description")
				//Sets to this specific Samurai Champloo image, considering making a new property for each element storing different image links for when this embed is returned
				.setImage("https://images3.alphacoders.com/667/thumb-1920-667142.jpg")
				//Makes 2 fields for the embed, one storing the name and description of the export & another for storing the usage
				.addFields(
					fieldVal,
					{name: "Usage", value: usages[index]}
				);
			//Returns embed, ends process
			message.channel.send({embeds: [embeds[0]]});
			return
		// This is called if the user provides an argument to b!help that aren't real commands
		} else if(arg&&!(commands.includes(arg))){
			message.channel.send("NOT A REAL COMMAND!\nRECOMMEND YOU DO `b!help` TO SEE WHAT IS REAL!");
		}
		//Iterates through embeds (note: I couldn't do a for-each loop like for(const element in embeds) because "elements" would become a string in the array
		for(let i=0;i<embArrLen;i++){
			//Stores current element in it's own var for easy writing
			let embed=embeds[i];
			//Initialises each embed, adds default image & description
			embed
			.setImage("https://wallpapercave.com/wp/wp2226861.jpg")
			.setDescription("Command to show other commands, do `b!help <commandname>` to get more info on each");
			/*Sets field-defining for-loop to change like the following:
				i=0, jDef=0, jCond=5
				i=1, jDef=6, jCond=11
				i=2, jDef=12, jCond=17 etc.
			then pulling that element from fieldVals[] until it reaches that list's limit
			*/
			const jDef=i*fieldsInEmb;
			const jCond=jDef+(fieldsInEmb-1);
			for(let j=jDef;j<=jCond&&j<fieldVals.length;j++){
				embed.addFields(fieldVals[j]);
			}
			//Sets page number, set-up for pagination
			embed.setFooter({text:`Page ${i+1} of ${embeds.length}`});
		}
		//Creates array of 2 buttons for paginating embeds[], one to go back to the previous embed and another to hit the next one
		const buttons=[
			new PreviousPageButton({custom_id: "prev_page", label: "Previous", style: ButtonStyle.Success}),
			new NextPageButton().setStyle({custom_id: "next_page", label: "Next", style: ButtonStyle.Success})
		]
		//Creates channelPagination(), sets up pagination with buttons[], embeds[] and a time limit before it stops listening to user responses
		const pagination=new ChannelPagination()
			.setButtons(buttons)
			.setEmbeds(embeds)
			.setTime(60000);
		//Sends paginated embed, awaits user input
		await pagination.send(message.channel);
	}
}