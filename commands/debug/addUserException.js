const dis = require("discord.js-commando");
const di = require("discord.js");
const fs = require("fs");
const selfRel = require("self-reload-json");

let newPref = new selfRel("./preferences.json");

class AddUserException extends dis.Command {
    constructor(client) {
        super(client, {
            name : "adduser",
            memberName : "add user",
            description : "Adds a user to the picture exception list.",
            group : "debug",
            args : [{key : "username",
                    prompt : "@ mention the user you would like to add to the exception list.",
                    type : "user"}]
        });
    };
    async run(message, args) {
        if(message.member.roles.find("name", "Admin") != null) {
            newPref.resume();
            let serverID = message.guild.id;
            let userAdd = args["username"]["id"];
            newPref["servers"][serverID]["userException"][userAdd] = true;
            newPref.save();
            newPref.stop();
            
            message.channel.send("The user <@" + args["username"]["id"] + "> has been added to the exception list.");
        } else {
            message.reply("\nThis is an Admin command. You are unable to use this.");
        }
    };
}

module.exports = AddUserException;