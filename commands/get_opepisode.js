const embedInit=require("./modules/embedInit.js");
const isGoodLink=require("./modules/isGoodLink.js");
module.exports={
    name: "get_opepisode",
    description: "Fetches a desired one piece episode!",
    command_usage: "Takes one argument, an episode number\n```\nb!get_opepisode <episode numbe>\n```",
    run: (client, message, args) => {
        if(!(/^[0-9]+$/.test(args[0]))){
            message.channel.send("ENTER A REAL NUMBER!");
            return;
        }
        const arg=args[0];
        if(!isGoodLink(`https://onepiece.fandom.com/wiki/Episode_${arg}`)){
            message.channel.send("ENTER AN ACCEPTABLE NUMBER!\nAcceptable number: 1 to current ep. number!");
            return;
        }
        const link=`https://9anime.id/watch/one_piece.ov8/ep-${arg}`;
        const embed=embedInit()
            .setTitle(`Watch One Peak episode ${arg} NOW!`)
            .setImage("https://www.barnesandnoble.com/blog/wp-content/uploads/2017/07/onepiece43-45-1.jpg")
            .addFields({name: "Episode link", value: `[CLICK HERE BITCH!](${link})`});
        message.channel.send({embeds: [embed]});    
    }
}