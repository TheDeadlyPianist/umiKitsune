const dis = require("discord.js-commando");
const di = require("discord.js");
const fs = require("fs");
const selfRel = require("self-reload-json");

let newPref = new selfRel("./preferences.json");

class AddChannel extends dis.Command {
    constructor(client) {
        super(client, {
            name : "addchannel",
            memberName : "add channel",
            description : "Adds a channel to the block list.",
            group : "debug",
            args : [{key : "channelName",
                    prompt : "Enter the name of the channel you would like to add to the list.",
                    type : "channel"}]
        });
    };
    async run(message, args) {
        if(message.member.roles.find("name", "Admin") != null) {
            newPref.resume();
            let serverID = message.guild.id;
            let chanAdd = args["channelName"]["id"];
            newPref["servers"][serverID]["channels"][chanAdd] = true;
            newPref.save();
            newPref.stop();
            
            message.channel.send("The channel <#" + args["channelName"]["id"] + "> has been added to the monitoring list.");
        } else {
            message.reply("\nThis is an Admin command. You are unable to use this.")
        }
    };
}

module.exports = AddChannel;