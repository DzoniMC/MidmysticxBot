  const Discord = require('discord.js')

module.exports = {
    name: "ping", 
    description: "ping command",

    async run (bot, message, args) {

        const ping = new Discord.MessageEmbed()
        .setDescription(`🏓\`${Date.now() - message.createdTimestamp} ms\``);

        message.channel.send(ping) 
    }
}