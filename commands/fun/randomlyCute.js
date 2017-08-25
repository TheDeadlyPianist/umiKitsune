const dis = require("discord.js-commando");
const pic = require("./cuteImagesAndGifs.js");

class randomlyCute extends dis.Command {
    constructor(client) {
        super(client, {
            name : "randomlycute",
            memberName : "randomlycute",
            description : "Umi likes cute things.",
            group : "fun",
            throttling: {
                usages: 4,
                duration: 20
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

module.exports = randomlyCute;