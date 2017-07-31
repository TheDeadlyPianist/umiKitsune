const dis = require("discord.js-commando");
const di = require("discord.js");
const fs = require("fs");
const selfRel = require("self-reload-json");

let newPref = new selfRel("./preferences.json");

class RemoveChannel extends dis.Command {
    constructor(client) {
        super(client, {
            name : "removechannel",
            memberName : "remove channel",
            description : "Removes a channel from the block list.",
            group : "debug",
            args : [{key : "channelName",
                    prompt : "Enter the name of the channel you would like to remove from the list.",
                    type : "channel"}]
        });
    };
    async run(message, args) {
        if(message.member.roles.find("name", "Admin") != null) {
            newPref.resume();
            let serverID = message.guild.id;
            let chanAdd = args["channelName"]["id"];
            newPref["servers"][serverID]["channels"][chanAdd] = false;
            newPref.save();
            newPref.stop();
            message.channel.send("The channel <#" + args["channelName"]["id"] + "> has been removed from the monitoring list.");
        } else {
            message.reply("\nThis is an Admin command. You are unable to use this.");
        }
    };
}

module.exports = RemoveChannel;