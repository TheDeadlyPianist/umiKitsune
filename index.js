const dis = require("discord.js-commando");
const disL = require("discord.js");
const fs = require("fs");
let prefs = require("./preferences.json");
const umi = new dis.Client();

umi.registry.registerDefaults();
umi.registry.registerGroup("basic", "Basic Commands");
umi.registry.registerGroup("debug", "Debug Commands");
umi.registry.registerCommandsIn(__dirname + "/commands");

let imageTiming = new Array();

umi.on('message', message => {
    checkImagePost(message);
});

umi.on("ready", () => {
    console.log("Umi Kitsune Logged In\n\nCurrent servers: " + umi.guilds.array() + "\n\n");
    readFromJson();
})

function checkImagePost(message) {
    const localPrefs = require("./preferences.json")
    try {
        if(message.channel["name"] == "picture_chat" && message.author.username != "Umi Kitsune" && (message["attachments"].array().length != 0 || message["embeds"].length != 0)) {
            if(imageTiming.length == 0) {
                imageTiming.push([message.author, message.createdAt]);
                console.log("Created initial entry.\n" + imageTiming);
            } else {
                for(i=0; i<imageTiming.length; i++) {
                    console.log("Entry at: " + i + " Entry: " + imageTiming[i]+"\n")
                    if(imageTiming[i][0] == message.author) {
                        console.log("Found message by same author.");
                        if((message.createdAt - imageTiming[i][1])/1000 < timer) {
                            console.log("Not enough time has passed")
                            message.reply("it has been " + Math.floor((message.createdAt - imageTiming[i][1])/1000) + " seconds since your last image post.\nYou need to wait at least " + timer + " seconds to post another image.");
                            message.delete();
                            return;
                        } else {
                            try {
                                console.log("Added additional item")
                                imageTiming.splice(i, 1);
                                imageTiming.push([message.author, message.createdAt]);
                                return;
                            }
                            catch (err) {
                                console.log(err);
                            }
                        }
                    }
                }
            }
        }
    }
    catch (err) {
        message.reply("There was an error with the message.");
        console.log(err);
    }
}

function readFromJson () {
    fs.readFile("./preferences.json", "utf8", (err, data) => {
        if(err) {
            console.log("Error encountered: " + err);
        } else {
            obj = JSON.parse(data);
            if (obj.servers.length == 0) {
                console.log("Server list empty");
                newEntry = disL.Client;
                console.log("\nNew Server: " + newEntry + "\n");
            } else {
                
            }
        }
    })
}

function writeToJson () {

}

function createMap () {
    
}
umi.login("MzM2NDU5NjMxMDg4MTA3NTI1.DE4pqg.itzAIRssqArnDUYF25uKlvkXCZg");