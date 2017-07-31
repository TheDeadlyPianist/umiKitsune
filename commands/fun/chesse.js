const dis = require("discord.js-commando");
const pic = require("./cheesePictures.js");

class cheese extends dis.Command {
    constructor(client) {
        super(client, {
            name : "cheese",
            memberName : "cheese",
            description : "Umi likes cheese.",
            group : "fun",
            throttling: {
                usages: 2,
                duration: 10
            },
        });
    };
    async run(message, args) {
        let pictures = pic.pics;
        let randN = Math.floor(Math.random()*pictures.length);
        let file = pictures[randN];
        message.channel.send("",{
            files : [
                file
            ]
        });
    };
};

module.exports = cheese;