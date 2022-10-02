//Imports
const { readFileSync } = require("fs");
const { ButtonStyle } = require("discord.js");
const { ChannelPagination, NextPageButton, PreviousPageButton } = require("djs-button-pages");
const embedInit = require("./modules/embedInit.js");
//Defining module properties
module.exports = {
    name: "list-tags",
    description: "Posts all the currently stored tags",
    aliases: ["show-tags","tags-list","list-tags","tags"],
    command_usage: "```\nb!list-tags\n```",
    run: async (client, message, args) => {
        //Defining tagsList, embeds & const entriesInEmb
        var tagsList=[];
        var embeds=[];
        const entriesInEmb=10;
        try{
            //Storing contents of tags.json in jsonString
            const jsonString=readFileSync("./commands/json_files/tags.json","utf-8");
            //Parsing jsonString and storing the returned Object in jsoNData
            const jsonData=JSON.parse(jsonString);
            //Stores each key in jsonData in jsonKeys
            var jsonKeys=Object.keys(jsonData);
            //For each element in jsonKeys, add special indent character before start of string & push to tagsList[]
            jsonKeys.forEach((key)=>{
                key="⮊"+key;
                tagsList.push(key);
            });
        }catch(error){
            //Log error if it occurs
            console.log(error);
        }
        //Stores length of embeds[] in embArrLen
        const embArrLen=Math.ceil(tagsList.length/entriesInEmb);
        //Embed-defining for loop
        for(let i=0;i<embArrLen;i++){
            //Creates pre-defined embed with title, pushes to embeds[]
            const embed=embedInit()
                .setTitle("LIST OF TAGS");
                embeds.push(embed);
        }
        //Embed-completing loop
        for(let i=0;i<embArrLen;i++){
            //Stores current element in embed
            let embed=embeds[i];
            /**Sets string-expanding for-loop to change like the following:
             * i=0, jDef=0, jCond=j<20
             * i=1, jDef=20, jCond=j<40
             * i=2, jDef=40, jCond=j<60 etc.
             * then pulling that element from fieldVals[] until it reaches that list's limit
             */ 
            const jDef=i*entriesInEmb;
            const jCond=jDef+entriesInEmb;
            var desc="";
            for (let j=jDef;j<jCond && j<tagsList.length;j++){
                desc+=tagsList[j]+"\n";
            }
            embed.setDescription(desc)
            //Sets page number, set-up for pagination
            .setFooter({text:`Page ${i+1} of ${embeds.length}`})
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