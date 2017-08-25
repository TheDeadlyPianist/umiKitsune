const dis = require("discord.js-commando");

class serverRules extends dis.Command {
    constructor (client) {
        super(client, {
            name : "serverrules",
            memberName : "serverrules",
            description : "List out the rules for the server.",
            group : "information",
            throttling : {
                usages : 2,
                duration : 60
            }
        });
    }
    async run(message, args){
        message.channel.send("Rules - Text Chat  :keyboard:\n" +
        ":loudspeaker: Do not spam and don't annoy other users.\n" +
        ":link: Do not advertise other Discords, products, servers or social media. We are ad-free!\n" +
        ":angry:  Do not try to bait people into flaming (By trying to make someone angry or to get a reaction out of someone.)\n" +
        ":no_entry:  Do not argue with moderators or youtubers. (We are all here for a good time, and moderators simply have the final say on a situation.)\n" +
        ":flag_gb:  This is a English channel. Please refrain from speaking different languages.\n" +
        ":nsfw: If picture uploading is allowed, never post any NSFW content.\n\n" +
        
        ":shield:  Rules - Voice Chat  :microphone2:\n" +
        ":musical_note: Do not use soundboards.\n" +
        ":boy: Keep things civil.\n" +
        ":mute: Please tweak your microphone properly so it does not record noises such as keyboard sounds, local surroundings or your computer speakers.");
    }
}

module.exports = serverRules