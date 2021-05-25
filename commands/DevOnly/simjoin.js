const Discord = require('discord.js');

module.exports = {
    name: "simjoin",
    description: "simulates a join!",

    async run (bot, message, args) {
        if(message.author.id != "722835860873281656")
        bot.emit('guildMemberAdd', message.member);
    }
}