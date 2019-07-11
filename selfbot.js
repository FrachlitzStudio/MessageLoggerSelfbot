// Selfbot by FrachlitzStudio#0392.
// I am not responsible if you get banned from Discord or any guilds.
const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token, logsChannel, userid } = require('./config.json');

// Guild blacklist
// If you do not need it, delete the text between the square brackets (var blacklist = [];).
var blacklist = ["GUILD ID", "GUILD ID", "GUILD ID"];

client.once('ready', () => {
	console.log("Selfbot by FrachlitzStudio#0392.");
	console.log("I am not responsible if you get banned from Discord or any guilds.");
	console.log("==================================================================");
	console.log('Selfbot logged in as ' + client.user.tag);
});

// Message edit log
client.on("messageUpdate", async(oldMessage, newMessage) => {
    if(oldMessage.author.bot) return;
	// Blacklist check
    for (let i = 0; i <= blacklist.length; i++) {
        if (oldMessage.channel.guild.id === blacklist[i]) {
            return;
        }
    }
    // Function
    function isEmpty(collection) {
        for(var arg in collection) {
            if(collection.hasOwnProperty(arg))
                return false;
        }
        return true;
    }
    // Logs
    if (oldMessage.content === newMessage.content) {
        return;
    }

    var attachment = (oldMessage.attachments).array();
    if(isEmpty(attachment)) {
        var img = "";
    } else {
        var img = attachment[0].url;
    }

    let embed_edit = new Discord.RichEmbed()
        .setAuthor(oldMessage.author.tag, oldMessage.author.avatarURL)
        .setColor('2615c1')
		.setTitle("Message edited!")
        .addField("Old", oldMessage.content + " " + img, true)
		.addField("New", newMessage.content + " " + img, true)
        .setFooter("#" + oldMessage.channel.name + " on server " + oldMessage.channel.guild, oldMessage.guild.iconURL)
        .setTimestamp();
    client.channels.get(logsChannel).send(embed_edit);
});

// Message delete log
client.on("messageDelete", async message => {
    if(message.author.bot) return;
	// Blacklist check
    for (let i = 0; i <= blacklist.length; i++) {
        if (message.channel.guild.id === blacklist[i]) {
            return;
        }
    }
    // Function
    function isEmpty(collection) {
        for(var arg in collection) {
            if(collection.hasOwnProperty(arg))
                return false;
        }
        return true;
    }
    // Logs
    var attachment = (message.attachments).array();
    if(isEmpty(attachment)) {
        var img = "";
    } else {
        var img = attachment[0].url;
    }

    let embed_delete = new Discord.RichEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setColor('c11515')
    .setTitle("Message deleted!")
    .setDescription(message.content + " " + img)
    .setImage(img)
    .setFooter("#" + message.channel.name + " on server " + message.channel.guild, message.guild.iconURL)
    .setTimestamp();    
    client.channels.get(logsChannel).send(embed_delete);
});

client.login(token);