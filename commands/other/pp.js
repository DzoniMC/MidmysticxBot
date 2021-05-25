const Discord = require('discord.js')

module.exports = {
    name: "pp",
    description: "pp Command",

    async run (bot, message, args) {
        let member = message.mentions.users.first() || message.author

        let replies = ["Not Existing","8D","8=D","8==D","8===D","8====D","8=====D","8======D","8=======D","8========D","8=========D","8==========D","8===========D","8============D","8=============D","8==============D"]

        let result = Math.floor((Math.random() * replies.length));

        let ppembed = new Discord.MessageEmbed()
        .setAuthor(`${member.username}'s PP`)
        .setColor("RANDOM")
        .addField("LENGTH", replies[result])

        message.channel.send(ppembed)
    }
}