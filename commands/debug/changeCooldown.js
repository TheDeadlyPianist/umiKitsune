const dis = require("discord.js-commando");
const fs = require("fs");
const selfRel = require("self-reload-json");

let newPref = new selfRel("./preferences.json");

class ChangePostCooldown extends dis.Command {
    constructor(client) {
        super(client, {
            name : "changecooldown",
            memberName : "cooldown timer change",
            description : "Changes the cooldown period for posting images.",
            group : "debug",
            args : [{key : "cooldowntimer",
                    prompt : "Enter the new picture post cooldown timer in seconds.",
                    type : "integer"}]
        });
    };
    async run(message, args) {
        if(message.member.roles.find("name", "Admin") != null) {
            newPref.resume();
            let newT = args["cooldowntimer"];
            let serverID = message.guild.id;
            newPref["servers"][serverID]["timeout"] = newT;
            newPref.save();
            newPref.stop();
            message.channel.send("The cooldown timer has been changed to " + newT + " seconds.");
        } else {
            message.reply("\nThis is an admin command. You are unable to use this.");
        }
    };
}

module.exports = ChangePostCooldown;