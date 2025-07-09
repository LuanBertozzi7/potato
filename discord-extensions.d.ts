import { Collection } from "discord.js";
import { CommandInteraction } from "discord.js";
import { Language } from "./Util/types";
import { Model, Document } from 'mongoose';


declare module 'discord.js'{

  interface Client {
    // general properties
    eco: EcoManager;
    languages: LanguagesManager
    cachedTags: Collection<string, any>;
    cachedShopItems: Collection<string, any>;
    cachedInventories: Collection<string, any>;
    globalShopItems: Collection<boolean>;
    //updateCache: Record<string, any>;
    updateCache: () => void;
    shop: Collection<string, ShopItem>;
    slashCommands: Collection<string, any>;
    buttons: Collection<string, any>;
    selectMenus: Collection<string, any>;
    tictactoe: Record<any, any>;



    // mongoose properties
    tickets: Model<Ticket>;
    birthdays: Model<Birthdays>;
    birthdayConfigs: Model<BirthdayConfigs>;
    guildSettings: Model<GuildSettings>;
    subscriptions: Model<Subscriptions>;



    getLocale: (Interaction: CommandInteraction, string: string, ...vars: []) => string;
    

  }

  interface EcoManager {
    getShopItems: (options?: {guild?: string; user?: string}) => Promise<any>;
    getUserItems: (options?: { user: string }) => Promise<any>;
  }


  interface User {
    id: string;
  }


  interface LanguageDoc {
    user: string,
    language: string;
  }
  type languageManager = Model<LanguageDoc>;

}