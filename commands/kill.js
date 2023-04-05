module.exports = {
    name: "kill",
    description: "OWNER-ONLY\nCommand that kills bot process",
    aliases: ["killemall"],
    command_usage: "```\nb!kill\n```",
	run: (client, message, args) => {
		process.exit();
	}
}