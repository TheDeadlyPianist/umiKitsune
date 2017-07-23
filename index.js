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
let serverMap = {};

umi.on('message', message => {
    try {
        checkImagePost(message, message.guild.id);
    }
    catch(err) {
        message.reply("\nThere has been an issue processing this message.\nPlease copy the following and PM it to Hydraclone: "+err);
    }
    //Admin Commands to Change Settings that cannot be store as unique functions (at least for now)(limited by own experience)
});

umi.on("ready", () => {
    console.log("Umi Kitsune Logged In\n\nCurrent servers: " + umi.guilds.array() + "\n\n");
    readFromJson();
})

function checkImagePost(message, serverId) {
    let timer = serverMap[serverId]["picTim"];
    console.log("Timer: " + timer);
    try {
        if(message.channel["name"] == "picture_chat" && message.author.username != "Umi Kitsune" && (message["attachments"].array().length != 0 || message["embeds"].length != 0)) {
            if(imageTiming.length == 0) {
                imageTiming.push([message.author, message.createdAt]);
                console.log("Created initial entry.\n" + imageTiming);
            } else {
                let found = false;
                for(i=0; i<imageTiming.length; i++) {
                    console.log("Entry at: " + i + " Entry: " + imageTiming[i]+"\n")
                    if(imageTiming[i][0] == message.author) {
                        console.log("Found message by same author.");
                        if((message.createdAt - imageTiming[i][1])/1000 < timer) {
                            console.log("Not enough time has passed")
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
    };
};

function readFromJson () {
    fs.readFile("./preferences.json", "utf8", (err, data) => {
        if(err) {
            console.log("Error encountered: " + err);
        } else {
            obj = JSON.parse(data);
            if (obj.servers.length == 0) {
                if(umi.guilds.array().length > 0) {
                    console.log("Server list empty. Populating with current servers.\n");
                    createNewMaps();
                } else {
                    console.log("Not currently connected to a server.")
                }
            } else {
                console.log("Checking for new servers.")
                populateMaps();
            };
        };
    });
};

function writeToJson () {
    let toJSON = {servers:[]};
    Object.keys(serverMap).forEach((i) => {
        let id = i;
        toJSON["servers"].push([id, serverMap[i]]);
    });
    fs.writeFile("./preferences.json", JSON.stringify(toJSON), (err) => {
        if(err) {
            console.log(err)
        } else {
            console.log("\nNew JSON file has been saved.\n")
        }
    });
};

function createNewMaps () {
    umi.guilds.array().forEach((i) => {
        serverMap[i.id] = {"name":i.name, "picTim":60};
    });
    Object.keys(serverMap).forEach((i) => {
        console.log("Server id: " + i + "       Name: " + serverMap[i]["name"] + "        Timeout Timer: " + serverMap[i]["picTim"])
    });
    writeToJson();
};

function populateMaps () {
    serverMaps = {};
    fs.readFile("./preferences.json", "utf8", (err, data) => {
        if (err) {
            console.log("Error: " + err);
        } else {
            console.log("Parsing following data: " + data + "\n\n");
            let obj = JSON.parse(data);
            //Populate the actual Map
            obj["servers"].forEach((i) => {
                serverMap[i[0]] = i[1];
            });
            //Print keys out in console for easy debugging + just to check information
            Object.keys(serverMap).forEach((i) => {
                console.log("Server id: " + i + "       Name: " + serverMap[i]["name"] + "        Timeout Timer: " + serverMap[i]["picTim"])
            });
        };
    });
};

umi.login("MzM2NDU5NjMxMDg4MTA3NTI1.DE4pqg.itzAIRssqArnDUYF25uKlvkXCZg");