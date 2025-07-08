import { Collection } from "discord.js";
import { CommandInteraction } from "discord.js";
import { promises } from "form-data";
import { Language } from "./Util/types";

declare module 'discord.js'{

  interface Client {
    eco: EcoManager;
    languages: LanguagesManager
    cachedTags: Collection<string, any>;
    cachedShopItems: Collection<string, any>;
    cachedInventories: Collection<string, any>;
    globalShopItems: Collection<boolean, any>;
    guildSettings: Collection<string, any>;
    updateCache: Collection<>; // void type?
    tickets: Collection<>;
    birthdays: Collection<>;
    birthdayConfigs: Collection<>;
    subscriptions: Collection<>;
    

  }

  interface EcoManager {
    getShopItems: (options?: {guild: string}) => Promise<any>;
    getUserItems: (options?: { user: string }) => Promise<any>;
  }

  interface languageDoc {
    user: string,
    language: string;
  }
  interface languagesManager {
    findOne: (filter: {user: string}) => Promise<LanguageDoc | null>;
  }

}