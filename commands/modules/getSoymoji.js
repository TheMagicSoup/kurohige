const { readFileSync } = require("fs");
module.exports = (client) => {
	try{
		const jsonString=readFileSync("./commands/json_files/soymoji.json");
		const data=JSON.parse(jsonString);
		if(data.moji.length<6)return data.moji;
		return client.emojis.cache.get(data.moji);
	} catch (error) {
		console.log(error);
	}
}