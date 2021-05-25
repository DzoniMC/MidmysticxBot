const Discord = require('discord.js')

module.exports = {
    name: 'music',
    description: "Music Command for MidmysticxBot!",
    
    async run (bot, message, args) {

        const fun = new Discord.MessageEmbed()
        .setColor('#304281')
        .setTitle('MIDMYSTICX MUSIC')
        .addFields(
            {name: 'START', value: '`m!start`'},
            {name: 'STOP', value: '`m!stop`'},
            {name: 'SKIP', value:'`m!skip`'},
            {name: 'QUEUE', value:'`m!queue`'},
            {name: 'LOOP', value:'`m!loop`'}
        )
        message.channel.send(fun);
    }
}   