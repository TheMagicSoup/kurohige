//Imports
const embedInit = require("./modules/embedInit.js");
const magicEightball = require("./modules/magicEightball.js");
//Defining module properties
module.exports = {
    name: "eightball",
    description: "Command that gives responses to questions like a magic eightball would!",
    aliases: ["8ball","magicball","eball","e-ball","8b"],
    command_usage: "Takes one argument: a question.\n```\nb!eightball <question>\n```",
    run: (client, message, args)=>{
        //Stores all arguments separated by spaces in question
        const question=args.join(" ");
        //If the argument is empty or doesn't end in a question mark, return
        if(!question||!question.endsWith("?")){
			message.channel.send("YOU NEED TO ASK A QUESTION! (question must end with \"?\")");
			return;
		}
        //Stores response as code block text
        const response="```\n"+magicEightball()+"\n```";
        //Creates pre-set embed, adding a title and a field with the pre-defined response
        const embed=embedInit()
            .setTitle(question)
            .addFields(
                {name: "🎱 says...", value: response}
            );
        //Returns embed
        message.channel.send({embeds: [embed]});
        return;
    }
}