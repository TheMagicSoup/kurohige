module.exports= {
	name: "ping",
	description: "Basic ping command",
	command_usage: "```\nb!ping\n```",
	run: (client,message,args)=>{
		message.channel.send("pong!").catch(console.error);
	}
}