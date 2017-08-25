const dis = require("discord.js-commando");
const disL = require("discord.js");
const fs = require("fs");
const selfRel = require("self-reload-json");
const umi = new dis.Client();

umi.registry.registerDefaults();
umi.registry.registerGroup("basic", "Basic Commands");
umi.registry.registerGroup("fun", "Fun Commands");
umi.registry.registerGroup("debug", "Debug Commands");
umi.registry.registerGroup("information", "Informational Commands");
umi.registry.registerCommandsIn(__dirname + "/commands");

const prefix = "!";
let imageTiming = [];
let preferences = new selfRel("./preferences.json");
setTimeout(writeToJson, 600000);

umi.on('message', message => {
    if(message.channel["type"] != "dm") {
        checkImagePost(message);
        if(message.author.username != "Umi Kitsune" && message.member.roles.find("name", "Admin") != null) {
            console.log(message.author.username + " is an Admin")
            const args = message.content.split("/\s+/g").slice(1);
            if(message.content.startsWith(prefix+"pt")) {
                try {
                    console.log("Prefix used")
                    let newTime = args[0];
                    let serverID = message.guild.id;
                    console.log(preferences);
                } catch (e) {
                    console.log(e);
                    message.channel.send("There was an issue with the command. Please let Hydraclone or Ranos know.");
                }
            }
        }
        //Admin Commands to Change Settings that cannot be store as unique functions (at least for now)(limited by own experience)
    }
});


umi.on("ready", () => {
    console.log("Umi Kitsune Logged In\n\nCurrent servers: " + umi.guilds.array() + "\n");
    initJSON();
});
umi.on("guildMemberAdd", (member) => {
  console.log(`New User "${member.user.username}" has joined "${member.guild.name}"` );
  member.guild.defaultChannel.send(`"${member.user.username}" has joined this server! Say hello!`);
});

function checkImagePost(message) {
    let serverId = message.guild.id;
    let channelId = message.channel.id;
    let userId = message.author.id;
    let timer = preferences["servers"][serverId]["timeout"];
    
    let cFound = false;
    let uFound = false;
    
    if(preferences["servers"][serverId]["channels"][channelId] == true){cFound = true};
    if(preferences["servers"][serverId]["userException"][userId] == true){uFound = true};
    

    try {
        if(cFound && !uFound && message.author.username != "Umi Kitsune" && (message["attachments"].array().length != 0 || message["embeds"].length != 0)) {
            if(imageTiming.length == 0) {
                imageTiming.push([message.author, message.createdAt]);
                console.log("Created initial entry.\n" + imageTiming);
            } else {
                let found = false;
                for(i=0; i<imageTiming.length; i++) {
                    console.log("Entry at: " + i + " Entry: " + imageTiming[i]+"\n");
                    if(imageTiming[i][0] == message.author) {
                        console.log("Found message by same author.");
                        if((message.createdAt - imageTiming[i][1])/1000 < timer) {
                            console.log("Not enough time has passed");
                            message.reply("it has been " + Math.floor((message.createdAt - imageTiming[i][1])/1000) + " seconds since your last image post.\nYou need to wait at least " + timer + " seconds to post another image.");
                            message.delete();
                            found = true;
                            return;
                        } else {
                            try {
                                console.log("Added additional item")
                                imageTiming.splice(i, 1);
                                imageTiming.push([message.author, message.createdAt]);
                                found = true;
                                return;
                            }
                            catch (err) {
                                console.log(err);
                            }
                        }
                    }
                }
                if(!found) {
                    console.log("Added additional item");
                    imageTiming.push([message.author, message.createdAt]);
                    return;
                }
            }
        }
    }
    catch (err) {
        message.reply("There was an error with the message.");
        console.log(err);
    }
}

function initJSON () {
    preferences.resume();
    console.log(preferences["servers"]);
    if(preferences["servers"] == undefined) {
        console.log("Creating server information");
        let newMap = {};
        umi.guilds.array().forEach(i => {
            console.log("Adding: " + i.toString() + "         Has ID: " + i.id);
            newMap[i.id] = {"timeout":60, "userException":{}, "channels":{}};
        });
        preferences["servers"] = newMap;
        console.log(preferences);
    }
    writeToJson();
}

function writeToJson () {
    preferences.save();
    console.log("Preferences saved");
}

module.exports = {"pref":preferences};

umi.login("MzM0NjE2NjgxMjk5MzEyNjYx.DIGy_g.mTP-ATsEmYY76ETael5JmpIJOls");