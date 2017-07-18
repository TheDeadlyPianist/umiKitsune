const dis = require("discord.js-commando");

class ChangePostCooldown extends dis.Command {
    constructor(client) {
        super(client, {
            name : "changecooldown",
            memberName : "changecooldown",
            description : "Changes the cooldown period for posting images.",
            group : "debug"
        });
    };
    async run() {
        
    };
};

module.exports = ChangePostCooldown;