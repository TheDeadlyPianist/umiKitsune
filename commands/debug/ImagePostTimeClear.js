const dis = require("discord.js-commando");

class ImagePostTimeClear extends dis.Command {
    constructor(client) {
        super(client, {
            name : "timingclear",
            memberName : "timingclear",
            description : "Clears all current tracked timings for posting images in the Picture Chat section.",
            group : "debug"
        })
    }
    async run() {
        
    }
}

module.exports = ImagePostTimeClear;