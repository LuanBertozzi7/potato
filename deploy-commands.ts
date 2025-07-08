import fs from 'fs'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { Client } from 'discord.js';
import { config } from "dotenv";
config();

const clientId = process.env.CLIENT_ID;

export const deploy = async (token: string) => {
    if (!token || !clientId) return console.error("No token found");
    const commands: Array<string> = [];
    const slashCommandFolders = fs.readdirSync('./slashCommands');
    for (const folder of slashCommandFolders) {
        //loops through all folders of commandFolders
        const commandFiles = fs.readdirSync(`./slashCommands/${folder}`).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            //loops through all the commandFiles and add them to the client commands collection
            const command = require(`./slashCommands/${folder}/${file}`);
            if (!command.data || command.isSubcommand) continue;
            if (command.contextMenu) commands.push(command.contextMenu.toJSON());
            commands.push(command.data.toJSON());
        }
    }

    const rest = new REST({ version: '9' }).setToken(token);

    try {
        console.info('Started refreshing application (/) commands.');
        await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands },
        );
        console.info('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
    
}