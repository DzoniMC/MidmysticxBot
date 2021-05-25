const Discord = require('discord.js')

module.exports = {
    name: 'moderation',
    description: "Moderation Command for Midmysticx Bot!",
    
    async run (bot, message, args) {

        const fun = new Discord.MessageEmbed()
        .setColor('#304281')
        .setTitle('MIDMYSTICX MODERATION')
        .addFields(
            {name: 'KICK', value: '`m!kick [user mention]`'},
            {name: 'BAN', value: '`m!ban [user mention]`'},
        )
        message.channel.send(fun);
    }
}   