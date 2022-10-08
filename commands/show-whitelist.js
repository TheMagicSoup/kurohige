//Imports
const { readFileSync } = require("fs");
const { ButtonStyle } = require("discord.js");
const { ChannelPagination, NextPageButton, PreviousPageButton } = require("djs-button-pages");
const embedInit = require("./modules/embedInit.js");
//Defining module properties
module.exports = {
    name: "show-whitelist",
    description: "Posts all the currently stored tags",
    aliases: ["show-wl"],
    command_usage: "```\nb!show-whitelist\n```",
    run: async (client, message, args) => {
        //Defining goldiesList, embeds & const entriesInEmb
        var goldiesList, embeds=[];
        const entriesInEmb = 10;
        try {
            //Storing contents of whitelist.json in jsonString as a string
            const jsonString = readFileSync("./commands/json_files/whitelist.json", "utf-8");
            //Parsing jsonString and storing the returned Object in jsonData
            const jsonData = JSON.parse(jsonString);
            //For each ID in the whitelist, store the respective user's tag in goldiesList
            for (let i=0;i<jsonData.whitelist.length;i++) {
                const userID = jsonData.whitelist[i].id;
                const user= await client.users.fetch(userID).catch(()=>null);
                const userTag=user.tag;
                goldiesList.push("⮊" + userTag);
            }
        } catch (error) {
            //Log error if one occurs
            console.log(error);
        }
        //Stores length of embeds[] in embArrLen
        const embArrLen = Math.ceil(goldiesList.length / entriesInEmb);
        //Iterates through embeds[]
        for(let i=0;i<embArrLen;i++){
            //Creates pre-defined embed with title, pushes to embeds[]
            const embed = embedInit()
            .setTitle("WHITELISTED USERS");
            embeds.push(embed);
        }
        //Iterates through embeds[]
        for (let i = 0; i < embArrLen; i++) {
            //Stores current element in embed
            let embed=embeds[i];
            /**Sets string-expanding for-loop to change like the following:
             * i=0, jDef=0, jCond=j<20
             * i=1, jDef=20, jCond=j<40
             * i=2, jDef=40, jCond=j<60 etc.
             * then pulling that element from fieldVals[] until it reaches that list's limit
             */ 
            const jDef = i * entriesInEmb;
            const jCond = jDef + entriesInEmb;
            var desc="";
            for (let j = jDef; j < jCond && j < goldiesList.length; j++) {
                desc += goldiesList[j] + "\n";
            }
            embed.setDescription(desc)
            //Sets page number, set-up for pagination
            .setFooter({ text: `Page ${i + 1} of ${embeds.length}` })
        }
        //Creates array of 2 buttons for paginating embeds[], one to go back to the previous embed and another to hit the next one
        const buttons = [
            new PreviousPageButton({ custom_id: "prev_page", label: "Previous", style: ButtonStyle.Success }),
            new NextPageButton().setStyle({ custom_id: "next_page", label: "Next", style: ButtonStyle.Success })
        ]
        //Creates channelPagination(), sets up pagination with buttons[], embeds[] and a time limit before it stops listening to user responses
        const pagination = new ChannelPagination()
            .setButtons(buttons)
            .setEmbeds(embeds)
            .setTime(60000);
        //Sends paginated embed, awaits user input
        try {
            await pagination.send(message.channel);
        } catch (err) {
            console.log("MESSAGE HAS BEEN ERADICATED! AWAITING FINISHED! SORRY!");
        }
    }
}