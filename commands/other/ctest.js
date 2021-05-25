const Discord = require('discord.js')

module.exports = {
    name: "ctest",
    description: "covid test",

    async run (bot, message, args) {
        let member = message.mentions.users.first() || message.author

        let replies = ["Positive","Negative","Negative, but positive","Positive, but negative"]
        let result = Math.floor((Math.random() * replies.length));

        let ppembed = new Discord.MessageEmbed()
        .setAuthor(`${member.username}'s Covid test`)
        .setColor("RANDOM")
        .addField("Result", replies[result])

        message.channel.send(ppembed)
    }
}