const Discord = require("discord.js");

const TOKEN = "NDMwNzE0MDA1NzU0MDg1Mzc2.DaUNgA.QoC6_9e4X6_BM5obqVfN4g4XGIc";
const PREFIX = "!!";

var bot = new Discord.Client();




bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = PREFIX.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(cmd === `${PREFIX}report`){

        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
        if(!rUser) return message.channel.send("Kan de member niet vinden!")
        let reason = args.join(" ").slice(22);
    
        let reportEmbed = new Discord.RichEmbed()
        .setDescription("Report")
        .setColor("#15f153")
        .addField("Reported Member", `${rUser} met ID ${rUser.id}`)
        .addField("Reported Door", `${message.author} met ID ${message.author.id}`)
        .addField("Reported in", message.channel)
        .addField("Reported Tijd", message.createdAt)
        .addField("Reported Reden", reason);

        let reportschannel = message.guild.channels.find(`name`, "speler-reports");
        if(!reportschannel) return message.channel.send("Kan de channel niet vinden");

        message.delete().catch(O_o=>{});
        reportschannel.send(reportEmbed);

        return;
    }
    if(cmd === `${PREFIX}ban`){
        let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!bUser) return message.channel.send("Kan de member niet vinden");
        let bReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Deze command is aleen voor staff!");
        if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Die member mag je niet kicken")

        let banEmbed = new Discord.RichEmbed()
        .setDescription("Ban")
        .setColor("#ff0000")
        .addField("Banned Member", `${bUser} met ID ${bUser.id}`)
        .addField("Banned door", `<@${message.author.id}> met ID ${message.author.id}`)
        .addField("Banned in", message.channel)
        .addField("Banned tijd", message.createdAt)
        .addField("Banned reden", bReason);

        let banChannel = message.guild.channels.find(`name`, "straffen-2");
        if(!banChannel) return message.channel.send("Kan de channel straffen-2 niet vinden")

        message.guild.member(bUser).ban(bReason);
        message.delete().catch(O_o=>{});
        banChannel.send(banEmbed)

        return;

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
        .addField("Kicked Member", `${kUser} met ID ${kUser.id}`)
        .addField("Kicked door", `<@${message.author.id}> met ID ${message.author.id}`)
        .addField("Kicked in", message.channel)
        .addField("Kicked tijd", message.createdAt)
        .addField("Kicked reden", kReason);

        let kickChannel = message.guild.channels.find(`name`, "straffen-2");
        if(!kickChannel) return message.channel.send("Kan de channel straffen niet vinden")

        message.guild.member(kUser).kick(kReason);
        message.delete().catch(O_o=>{});
        kickChannel.send(kickEmbed);

        return;

    }
    if(cmd === `${PREFIX}warn`){
        let wUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
        if(!wUser) return message.channel.send("Het is !!warn <@member> <reden>")
        let reason = args.join(" ").slice(22);
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Deze command is aleen voor staff!");
        if(wUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Die member mag je niet warnen!")
    
        let warnEmbed = new Discord.RichEmbed()
        .setDescription("Warn")
        .setColor("#F1C40F")
        .addField("Warned Member", `${wUser} met ID ${wUser.id}`)
        .addField("Warned Door", `${message.author} met ID ${message.author.id}`)
        .addField("Warned in", message.channel)
        .addField("Warned Tijd", message.createdAt)
        .addField("Warned Reden", reason);

        let warnchannel = message.guild.channels.find(`name`, "straffen-2");
        if(!warnchannel) return message.channel.send("Kan de channel niet vinden");

        message.delete().catch(O_o=>{});
        warnchannel.send(warnEmbed);

        return;
    }
});
bot.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find('name', 'welkom')
    if (!channel) return;
    channel.send(`Welkom op DieEneServer ${member} :wink: !`);
});

bot.on('guildMemberRemove', member => {
    const channel = member.guild.channels.find('name', 'welkom')
    if (!channel) return;
    channel.send(`${member} Jammer dat je DieEneServer hebt verlaten :pensive: `);
});

bot.on("ready", async () => {
    console.log("Ready");

    bot.user.setActivity("Prefix !!", {type: "PLAYING"});
});




bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0].toLowerCase()) {
        case "invite":
        message.channel.send({embed:{
            title: 'Dit is de discord invite link',
            description: 'Deze link kan je naar mensen stuuren om ze te inviten https://discord.gg/zJNNRMk',
            color: 0x2874A6,
        }})
            break;
        case "website":
         message.channel.send({embed:{
            title: 'Dit is de link naar onze website',
            description: 'Via deze link kan je naar onze website  http://dieeneserver.tk/forum/',
            color: 0x2874A6,
        }})
                break;
        case "ip":
        message.channel.send({embed:{
            title: 'Dit is de server ip',
            description: 'De server ip is ``dieeneserver.chplay.nl``',
            color: 0x2874A6,
        }})
            break;
        case "commands":
        message.channel.send({embed:{
            title: 'Bot commands',
            description: 'Hier kan je alle commands van de bot zien',
            color: 0x2874A6,
            fields:[
                {
                    name:'!!invite',
                    value: 'Met deze commands krijg je de discord link waarmee je mensen kan invite ',
                    inline: false
                },
                {
                    name:'!!website ',
                    value: 'Met deze command krijg je de website link ',
                    inline: false
                },
                {
                    name:'!!ip ',
                    value: 'Als je de server ip niet hebt krijg je met deze command de ip',
                    inline: false
                },
                {
                    name:'!!report <@member> <reden> ',
                    value: 'Met deze command kan je een speler reporten op hacks of andere dingen zoals schelden lever dan ook bewijs erbij een als je een bot report krijg je een warn. ',
                    inline: false
                },
            ]
            
        }})
            break;
            case "staff-commands":
            message.channel.send({embed:{
                title: 'Staff commands',
                description: 'Hier kan je alle commands van de bot zien voor de staff',
                color: 0x2874A6,
                fields:[
                    {
                        name:'!!warn <@member> <reden>',
                        value: 'Met deze command kan je iemand warnen',
                        inline: false
                    },
                    {
                        name:'!!kick <@member> <reden>',
                        value: 'Met deze command kan je iemand kicken',
                        inline: false
                    },
                    {
                        name:'!!ban <@member> <reden>',
                        value: 'Met deze command kan je iemand bannen',
                        inline: false
                    },
                ]
                
            }})
                break;

    }
});



bot.login(TOKEN);
