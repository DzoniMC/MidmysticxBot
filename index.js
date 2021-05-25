const Discord = require('discord.js');

const bot = new Discord.Client();


const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Dzoni:nikola150908@midmysticx.zg3ig.mongodb.net/Data', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then(console.log('Connected to mongo!'))



const { token } = require('./config.json');

const { readdirSync, read } = require('fs');
const ms = require('ms');

const { join } = require('path');

//levels
const Levels = require('discord-xp');
Levels.setURL("mongodb+srv://Dzoni:nikola150908@midmysticx.zg3ig.mongodb.net/Data")



const config = require('./config.json');
bot.config = config;


bot.commands = new Discord.Collection();
const commandFolders = readdirSync('./commands');
const Timeout = new Discord.Collection();


const prefix = 'm!';


for (const folder of commandFolders) {
    const commandFiles = readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        bot.commands.set(command.name, command);
    }
}

bot.on("error", console.error);

//------------------------------------------------------------------------------
bot.on('ready', () => {
    console.log('Mid Bot is Up!');

   const arrayOfStatus = [
       `Over ${bot.guilds.cache.size} servers!`,
       `Prefix is: 'm!'`,
       `This bot is made for Midmysticx Community!`
   ];

   let index = 0;
   setInterval(() => {
       if(index === arrayOfStatus.length) index = 0;
       const status = arrayOfStatus[index];
       console.log(status);
       bot.user.setActivity(status, { type: "WATCHING" }).catch(console.error)
       index++;
   }, 10000)
})
//------------------------------------------------------------------------------
bot.on("message", async (message) => {

    if(message.author.bot) return;
    if(message.channel.type === 'dm') return; //optional#

    //Levels
    const randomAmountOfXp = Math.floor(Math.random() * 29) + 1; // Min 1, Max 30
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
    if (hasLeveledUp) {
        const user = await Levels.fetch(message.author.id, message.guild.id);
        message.channel.send(`${message.author}, congratulations! You have leveled up to **${user.level}**!`);
    }
    //

    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);

        const commandName = args.shift().toLowerCase();

        const command = bot.commands.get(commandName) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if(!command) return;

        if (command) {
            if(command.cooldown) {
                if(Timeout.has(`${command.name}${message.author.id}`)) return message.channel.send(`Please Wait \`${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), {long: true})}\` Before using this command again!`);
                command.run(bot, message, args)
                Timeout.set(`${command.name}${message.author.id}`, Date.now() + command.cooldown)
                setTimeout(() => {
                    Timeout.delete(`${command.name}${message.author.id}`)
                }, command.cooldown)
            } else command.run(bot, message, args);
        }
    }
})


bot.on('guildCreate', (guild) => {
    let channeltoSend;
    guild.channels.cache.forEach((channel => {
        if (
            channel.type === "text" &&
            !channeltoSend &&
            channel.permissionsFor(guild.me).has("SEND_MESSAGES")
        ) channeltoSend = channel;
    }));
    if(!channeltoSend) return;

    let channelEmbed = new Discord.MessageEmbed()
    .setColor("PURPLE")
    .setAuthor(`Hello! Thank you for inviting me to ${guild.name}!`)
    .setDescription("Prefix is 'm!' btw")
    .addField("Something is not working right?", "If you see something is not right, please tag me so i can fix it :D")

    channeltoSend.send(channelEmbed).catch(e => {
        if (e) {
            return;
        }});
})


//-------------------------------------------------------------------------------------------------------------------------------------\\
const distube = require('distube');
bot.distube = new distube(bot, { searchSongs: false, emitNewSongOnly: true })
bot.distube
    .on('playSong', (message, queue, song) => message.channel.send(
        `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`,
    ))
    .on('addSong', (message, queue, song) => message.channel.send(
        `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`,
    ))
    .on('error', (message, e) => {
		//console.error(e)
		message.channel.send(`An error encountered: ${e}`)
	})

//----------------------------------------------------------------------------------------------------------------------------------------\\
const WelcomeSchema = require('./Schema/welcome-schema');

bot.on("guildMemberAdd", async (member, guild) => {
    WelcomeSchema.findOne({ guildId: member.guild.id }, async (err, data) => {
        if(!data) return;

        const user = member.user;
        const channel = member.guild.channels.cache.get(data.channelId);
        const welcomemsg = data.welcomeMsg;

        channel.send(`Welcome ${user}! ` + welcomemsg)
    })
})



//------------------------------------------------------------------------------------------------------------------------------------------\\
bot.on("guildMemberAdd", async (member) => {
    console.log(member.user.tag); 
})

bot.login(process.env.token);