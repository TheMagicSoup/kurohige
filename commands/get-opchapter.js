//Imports
const embedInit=require("./modules/embedInit.js");
const isGoodLink=require("./modules/isGoodLink.js");
const isDigit=require("./modules/isDigit.js");
//Defining module properties
module.exports = {
    name: "get-opchapter",
    description: "Fetches a One Piece chapter",
    aliases: ["fetch-opchapter","opchapter"],
    command_usage: "Takes one argument, a chapter number\n```\nb!get-opchapter <chapter number>\n```",
    run: (client, message, args) => {
        //If the argument isn't a number, return
        if(!isDigit(args[0])){
            message.channel.send("ENTER A REAL CHAPTER NUMBER!");
            return;
        }
        //Stores argument in arg
        const arg=args[0];
        //Stores mangainn URL to chapter in link
        const link= `https://mangainn.net/one-piece1/${arg}/1`;
        /*
        * For some unknown reason, mangainn returns a 200 on any link,
        * So I'm checking if there's a wiki entry for the episode.
        * If the HTTP request for the wiki entry for the episode isn't successful, return
        */
        if(!isGoodLink(`https://onepiece.fandom.com/wiki/Chapter_${arg}`)){
            message.channel.send("ENTER A VALID CHAPTER NUMBER! BETWEEN 1 TO CURRENT CHAPTER NUMBER!");
            return;
        }
        //Creates preset embed, adds title, default One Piece image and adds field with text link to manga chapter
        const embed = embedInit()
            .setTitle(`Read One Peak chapter ${arg} NOW!`)
            .setImage("https://i0.wp.com/news.qoo-app.com/en/wp-content/uploads/sites/3/2022/06/one_piece_1_month_break_feature-1.jpg")
            .addFields({name: "Chapter link", value: `[CLICK HERE BITCH!](${link})`});
        //Returns embed
        message.channel.send({embeds: [embed]});
        return;
    }
}