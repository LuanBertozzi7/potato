import { SlashCommandBuilder } from "@discordjs/builders";
import { Message, EmbedBuilder, TextChannel, ChatInputCommandInteraction, Channel, InteractionCollector, TextBasedChannel} from "discord.js";
import { SlashCommand } from "../../Util/types";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("say_embed")
        .setDescription("Make the bot send an embed")
        .addStringOption(option =>
            option
                .setName("title")
                .setDescription("The title of the embed")
                .setRequired(true),
        )
        .addStringOption(option =>
            option
                .setName("description")
                .setDescription("The description of the embed"),
        ) as SlashCommandBuilder,
    category: "Fun",
    async execute(interaction: ChatInputCommandInteraction, client, footers: string[]) {
        await interaction.deferReply();
        const title = interaction.options.getString("title");
        let description = interaction.options.getString("description");

        if(!interaction.channel || !interaction.channel.isTextBased()){
            return interaction.editReply(client.getLocale(interaction, "commands.fun.say_embed.notInTextChannel") || "Este comando só pode ser usado em canais de texto.");
        }

        const channel: TextBasedChannel = interaction.channel;


        if (!description) {
            const message = await channel.send(client.getLocale(interaction, "commands.fun.say_embed.enterDesc"));
            const descriptionThingy = await channel.awaitMessages({ filter: (m: Message) => m.author.id === interaction.user.id, max: 1, time: 30000 });
            description = descriptionThingy?.first()?.content || "";
            message?.delete();
            descriptionThingy?.first()?.delete();
        }

        if (!title) return interaction.editReply(client.getLocale(interaction, "commands.fun.say_embed.specifyTitle"));

        const embed = new EmbedBuilder()
            .setColor('Random')
            .setTitle(title)
            .setDescription(description)
            .setFooter({ text: footers[Math.floor(Math.random() * footers.length)] });
        interaction.editReply({ embeds: [embed] })
    }
} as SlashCommand;