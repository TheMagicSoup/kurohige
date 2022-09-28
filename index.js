const {
	Client,
	GatewayIntentBits,
	Collection
	} = require("discord.js");
	
const client = new Client({
    intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.MessageContent
	]
});

const fs = require("fs");

const config=require("./config.json");
client.config=config;
client.commands=new Collection();

const events = fs.readdirSync("./events").filter(file=>file.endsWith(".js"));
for(const file of events){
	const eventName=file.split(".")[0];	
	const event=require(`./events/${file}`);
	client.on(eventName,event.bind(null,client));
}
const commands=fs.readdirSync("./commands").filter(file=>file.endsWith(".js"));
for(const file of commands){
	const commandName=file.split(".")[0];
	const command=require(`./commands/${file}`);
	console.log(`Attempting to load command ${commandName}`);
	client.commands.set(commandName,command);
}
client.on("ready", () => {
  console.log("BOT HAS STARTED! ZEHAHAHAHA");
});

client.login(config.token);