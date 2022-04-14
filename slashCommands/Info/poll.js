const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("poll")
        .setDescription("Make the bot send a poll")
        .addStringOption(option =>
            option
                .setName("title")
                .setDescription("The title of the poll")
                .setRequired(true),
        )
        .addStringOption(option =>
            option
                .setName("description")
                .setDescription("The description of the poll"),
        )
        .addStringOption(option => option.setName("option1").setDescription("The first option of the poll"))
        .addStringOption(option => option.setName("option2").setDescription("The second option of the poll"))
        .addStringOption(option => option.setName("option3").setDescription("The third option of the poll"))
        .addStringOption(option => option.setName("option4").setDescription("The fourth option of the poll"))
        .addStringOption(option => option.setName("option5").setDescription("The fifth option of the poll"))
        .addStringOption(option => option.setName("option6").setDescription("The sixth option of the poll"))
        .addStringOption(option => option.setName("option7").setDescription("The seventh option of the poll"))
        .addStringOption(option => option.setName("option8").setDescription("The eighth option of the poll")),
    async execute(interaction, client, Discord, footers) {
        var title = interaction.options.getString("title");
        var description = interaction.options.getString("description");
        var options = [];
        for (var i = 1; i <= 25; i++) {
            if (interaction.options.getString("option" + i) != null) {
                options.push(interaction.options.getString("option" + i));
            }
        }

        if (options.length < 1) {
            const embed = new Discord.MessageEmbed()
                .setTitle('📊 ' + title)
                .setColor('RANDOM')
                .setFooter({ text: footers[Math.floor(Math.random() * footers.length)], iconURL: message.author.avatarURL({ dynamic: true }) })
            if (description != null) embed.setDescription(description)

            interaction.reply({ embeds: [embed], fetchReply: true }).then(msg => {
                msg.react('👍');
                msg.react('👎');
            });
        }

        else {
            const embed = new Discord.MessageEmbed();

            const alphabet = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮', '🇯', '🇰', '🇱',
                '🇲', '🇳', '🇴', '🇵', '🇶', '🇷', '🇸', '🇹', '🇺', '🇻', '🇼', '🇽', '🇾', '🇿'];

            const arr = [];

            let count = 0;

            options.forEach(option => {
                arr.push(alphabet[count] + ' ' + option);
                count++;
            });

            embed
                .setTitle('📊 ' + title)
                .setColor('RANDOM')
                .setFooter({ text: footers[Math.floor(Math.random() * footers.length)], iconURL: message.author.avatarURL({ dynamic: true }) })
            if (description != null) embed.setDescription(description + '\n\n' + arr.join('\n\n'))
            else embed.setDescription(arr.join('\n\n'))

            interaction.reply({ embeds: [embed], fetchReply: true }).then(msg => {
                for (let i = 0; i < options.length; i++) {
                    msg.react(alphabet[i]);
                }
            })
        }
    }
} 