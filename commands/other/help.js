const Discord = require('discord.js')

module.exports = {
    name: 'help',
    description: "Help Command for MidmysticxBot!",

    async run (bot, message, args) {

        const help = new Discord.MessageEmbed()
        .setColor('#304281')
        .setTitle('MIDMYSTICX HELP')
        .addFields(
            {name: 'MIDMYSTICX PREFIX', value: '`m!`'},
            {name: 'BOT HELP', value: '`m!help`'},
            {name: 'BOT INFO', value: '`m!botinfo`'},
            {name: 'MIDMYSTICX FUN', value: '`m!fun`'},
            {name: 'MIDMYSTICX MODERATION', value: '`m!moderation`'}
        )
        .setFooter('Creator: `NotDzoni#4998`')

        message.channel.send(help);
    }
}     