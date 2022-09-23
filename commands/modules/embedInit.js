const { EmbedBuilder, AttachmentBuilder } = require("discord.js");
const embedInit(embed){
	const author_img = new AttachmentBuilder("../../assets/images/author_img.png")
	embed
		.setColor(0x000000)
		.setAuthor({ name: "BLACKBEARD THE GREAT", iconURL: "attachments://author_img.png"})
}
module.exports=()=>{

}