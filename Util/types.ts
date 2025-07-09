import { ContextMenuCommandBuilder, SlashCommandBuilder, SlashCommandSubcommandBuilder, SlashCommandSubcommandGroupBuilder } from '@discordjs/builders';
import Economy from 'currency-system';
import { ButtonInteraction, Client as DiscClient, Collection, CommandInteraction, APIContextMenuInteraction, Message, PermissionResolvable, SelectMenuInteraction, ChatInputCommandInteraction } from 'discord.js';
import { Document, Model } from 'mongoose';
import { Music } from '../localization';
import { shop } from './config.json';

export type SlashCommand = {
    data: SlashCommandBuilder | SlashCommandSubcommandGroupBuilder | SlashCommandSubcommandBuilder;
    contextMenu?: ContextMenuCommandBuilder;
    category: string;
    guildOnly?: boolean;
    permissions?: PermissionResolvable | "BotAdmin";
    execute: (interaction: ChatInputCommandInteraction | CommandInteraction, client: Client, footers: string[], locale?: Music) => void;
}

export type MessageComponent = {
    name: string;
    permissions?: PermissionResolvable | "BotAdmin";
    execute: (interaction: ButtonInteraction | SelectMenuInteraction, client: Client, footers: string[]) => void;
}

export type Event = {
    name: string;
    execute(...args: any): any;
}

export interface GuildSettings extends Document {
    guildId: string,
    welcomeMessage?: string,
    welcomeChannel?: string,
    welcomeRole?: string,
    tags: { name: string, value: string }[],
    tagDescriptions: Map<string, string>,
    suggestionChannel?: string,
    ghostPing: boolean,
    statChannels: {
        type: string & "members" | "all members" | "bots" | "boosts" | "role members",
        channel: string,
        role?: string
    }[],
    onlyimageChannels: string[],
    autoemoteChannels: { channel: string, emoji: string }[]
}

export type AutoCompleteValue = {
    name: string;
    value: string | number;
}

export type Language = {
    user: string;
    language: string;
}

export type Ticket = {
    guildId: string,
    categoryId: string,
    closeCategoryId: string,
    channelId: string[],
    messageId: string,
    title: string,
    description: string,
}

export type Birthday = {
    userId: string,
    birthday: Date,
    haveCelebratedYears: number[]
}

export type BirthdayConfig = {
    guildId: string,
    channelId: string,
    roleId: string,
    message: string
}

export type Subscription = {
    type: "Twitter" | "Youtube",
    webhookId: string,
    text: string,
    username: string,
    userId: string
}

export interface Client extends DiscClient {
    cachedTags: Collection<string, AutoCompleteValue[]>;
    cachedShopItems: Collection<string, AutoCompleteValue[]>;
    cachedInventories: Collection<string, AutoCompleteValue[]>;
    globalShopItems: any[];
    eco: typeof Economy;
    languages: Model<Language>;
    tickets: Model<Ticket>;
    birthdays: Model<Birthday>;
    birthdayConfigs: Model<BirthdayConfig>;
    guildSettings: Model<GuildSettings>;
    subscriptions: Model<Subscription>;
    shop: typeof shop;
    slashCommands: Collection<string, SlashCommand>;
    buttons: Collection<string, MessageComponent>;
    selectMenus: Collection<string, MessageComponent>;
    tictactoe: { [key: string]: { x: string, o: string, message: Message, lastInteraction: number } };
    getLocale(interaction: CommandInteraction | ButtonInteraction | SelectMenuInteraction | APIContextMenuInteraction, key: string, ...args: any[]): any;
    updateCache(): void;
}