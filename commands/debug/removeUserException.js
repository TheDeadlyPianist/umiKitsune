const dis = require("discord.js-commando");
const di = require("discord.js");
const fs = require("fs");
const selfRel = require("self-reload-json");

let newPref = new selfRel("./preferences.json");

class RemoveUserException extends dis.Command {
    constructor(client) {
        super(client, {
            name : "removeuser",
            memberName : "remove user",
            description : "Removes a user from the picture exception list.",
            group : "debug",
            args : [{key : "username",
                    prompt : "@ mention the user you would like to remove from the exception list.",
                    type : "user"}]
        });
    };
    async run(message, args) {
        if(message.member.roles.find("name", "Admin") != null) {
            newPref.resume();
            let serverID = message.guild.id;
            let userAdd = args["username"]["id"];
            newPref["servers"][serverID]["userException"][userAdd] = false;
            newPref.save();
            newPref.stop();
            
            message.channel.send("The user <@" + args["username"]["id"] + "> has been removed from the exception list.");
        } else {
            message.reply("\nThis is an Admin command. You are unable to use this.");
        }
    };
}

module.exports = RemoveUserException;