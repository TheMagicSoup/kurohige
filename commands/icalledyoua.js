exports.run = (client, message, args) => {
	word=args[0].toUpperCase();
	message.channel.send(`YOU CALLED ME A WHAT? A ${word}??? I'LL KILL YOU!`).catch(console.error);
}
exports.name="icalledyoua";