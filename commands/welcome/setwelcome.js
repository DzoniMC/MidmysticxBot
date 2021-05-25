const Discord = require('discord.js');
const Schema = require('../../Schema/welcome-schema');

module.exports = {
    name: "setwelcome",
    description: "sets a welcome channel!",

    async run (bot, message, args) {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You cannot use this command!");

        const channel = message.mentions.channels.first();
        if(!channel) return message.reply("Please specify a channel you would like to be your welcome channel!");

        const msg = args.slice(1).join(" ");
        if(!msg) return message.reply("Please specify a welcome message!");


        Schema.findOne({ guildId: message.guild.id }, async (err, data) => {
            if (data){
                data.channelId = channel.id;
                data.welcomeMsg = msg;
                data.save();
            } else {
                new Schema({
                    guildId: message.guild.id,
                    welcomeMsg: msg,
                    channelId: channel.id,
                }).save();
            }
            message.reply(`New welcome channel is now set as: ${channel}!`);
        })
    }
}