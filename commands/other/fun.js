const Discord = require('discord.js')

module.exports = {
    name: 'fun',
    description: "Fun Command for MidmysticxBot!",
    
    async run (bot, message, args) {

        const fun = new Discord.MessageEmbed()
        .setColor('#304281')
        .setTitle('MIDMYSTICX FUN')
        .addFields(
            {name: 'MEME', value: '`m!meme`'},
            {name: 'PP', value: '`m!pp [user mention]`'},
            {name: 'COVID', value:'`m!ctest [user mention]`'},
            {name: '8BALL', value:'`m!8ball [question]`'},
            {name: 'HOWGAY', value:'`m!howgay [user mention]`'},
            {name: 'TICTACTOE', value:'`m!tictactoe [user mention]`'}
        )
        message.channel.send(fun);
    }
}   