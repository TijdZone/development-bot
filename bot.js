const Discord = require("discord.js");
const client = new Discord.Client();
const PREFIX = "!"

client.on("ready", () => {
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  client.user.setGame(`Developing`);
});

client.on("message", async message => {
  const swearWords = ["darn", "shucks", "frak", "shite"];
  if( swearWords.some(word => message.content.includes(word)) ) {
    message.reply("Oh no you said a bad word!!!");
  }
  if(message.author.bot) return;

  if(message.content.indexOf(config.prefix) !== 0) return;


  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();


    if(cmd === `${PREFIX}report`){

        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
        if(!rUser) return message.channel.send("Can not find the member!")
        let reason = args.join(" ").slice(22);
    
        let reportEmbed = new Discord.RichEmbed()
        .setDescription("Report")
        .setColor("#15f153")
        .addField("Reported Member", `${rUser} with the ID ${rUser.id}`)
        .addField("Reported ny", `${message.author} with the ID ${message.author.id}`)
        .addField("Reported in", message.channel)
        .addField("Reported Time", message.createdAt)
        .addField("Reported Reason", reason);

        let reportschannel = message.guild.channels.find(`name`, "reports");
        if(!reportschannel) return message.channel.send("Can not find the channel reports");

        message.delete().catch(O_o=>{});
        reportschannel.send(reportEmbed);

  }

    if(cmd === `${PREFIX}kick`){
        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!kUser) return message.channel.send("Kan de member niet vinden");
        let kReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Deze command is aleen voor staff!");
        if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Die member mag je niet kicken")

        let kickEmbed = new Discord.RichEmbed()
        .setDescription("Kick")
        .setColor("#e56b00")
        .addField("Kicked Member", `${kUser} with the ID ${kUser.id}`)
        .addField("Kicked By", `<@${message.author.id}> with the ID ${message.author.id}`)
        .addField("Kicked In", message.channel)
        .addField("Kicked Time", message.createdAt)
        .addField("Kicked Reason", kReason);

        let kickChannel = message.guild.channels.find(`name`, "mod-log");
        if(!kickChannel) return message.channel.send("Can not vind the channel mod-log")

        message.guild.member(kUser).kick(kReason);
        message.delete().catch(O_o=>{});
        kickChannel.send(kickEmbed);

  }

    if(cmd === `${PREFIX}ban`){
        let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!bUser) return message.channel.send("Can not find the member");
        let bReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("This command is only for staff");
        if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That member can not be kicked")

        let banEmbed = new Discord.RichEmbed()
        .setDescription("Ban")
        .setColor("#ff0000")
        .addField("Banned Member", `${bUser} with the ID ${bUser.id}`)
        .addField("Banned By", `<@${message.author.id}> with the ID ${message.author.id}`)
        .addField("Banned In", message.channel)
        .addField("Banned Time", message.createdAt)
        .addField("Banned Reasom", bReason);

        let banChannel = message.guild.channels.find(`name`, "mod-log");
        if(!banChannel) return message.channel.send("Can not find the channel mod-log")

        message.guild.member(bUser).ban(bReason);
        message.delete().catch(O_o=>{});
        banChannel.send(banEmbed)
  }
  if(command === "help") {
      if (args[0] === "moderation") {
        message.reply("Moderation help:")
      } else { message.channel.send({embed: {
          color: 0xFF0202,
          author: {
            name: client.user.username,
            icon_url: client.user.avatarURL
          },
          fields: [{
              name: "!help",
              value: "Get this Message"
            },
            {
              name: "!help moderation",
              value: "Get all Moderation Commands"
            },
            {
              name: "!help fun",
              value: "Get Fun Commands"
            },
            {
              name: "!help music",
              value: "Get Music Commands",
            },
            {
              name: "!help ranks",
              value: "Get all rank commands"
            }
          ],
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: " TijdZone"
          }
        }
      });}

    }
  if(command === "ping") {
    const Discord = require('discord.js');
    let embed = new Discord.RichEmbed()

    .setColor(0xFF0202)
    .addField(':ping_pong: Pong!', `Took: (**${Date.now() - message.createdTimestamp}**) ms\n1000 ms = 1 second`)
    message.channel.send({embed});
  }
  if(command === "hosting") {
     let role = message.guild.roles.find("name", "hosting");
     message.guild.member(message.author).addRole(role).catch(console.error);
       return message.reply("Je hebt nu de role Hosting!");
   }
  if(command === "userinfo") {
    var user = message.mentions.member.first()
    const status = {
      online: "Online",
      idle: "Idle",
      dnd: "Do Not Disturb",
      offline: "Offline/Invisible"
    };
    var embed2 = new Discord.RichEmbed()
      .setColor(0xFF0202)
      .addField("Full Username", `${message.author.username}#${message.author.discriminator}`)
      if(!user) message.channel.send(embed2);
  }
  if(command === "purge") {

    const deleteCount = parseInt(args[0], 10);

    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");

    const fetched = await message.channel.fetchMessages({count: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));

});
client.login(process.env.BOT_TOKEN);
