const dis = require("discord.js-commando");
const umi = new dis.Client();

umi.registry.registerGroup("basic", "Basic Commands");

umi.on ('message', message => {
    if(message.channel["name"] == "picture_chat" && message.author.username != "Umi Kitsune") {
        console.log(message.attachments)
    }
});

umi.login("MzM2NDU5NjMxMDg4MTA3NTI1.DE4pqg.itzAIRssqArnDUYF25uKlvkXCZg");