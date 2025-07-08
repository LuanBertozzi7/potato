import { Collection } from "discord.js";
import { CommandInteraction } from "discord.js";
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
    updateCache: (user: user) => Promise<any>

    getLocale: (Interaction: CommandInteraction, string: string, ...vars: []) => string;
    

  }

  interface EcoManager {
    getShopItems: (options?: {guild: string}) => Promise<any>;
    getUserItems: (options?: { user: string }) => Promise<any>;
  }


  interface User {
    id: string;
  }


  interface LanguageDoc {
    user: string,
    language: string;
  }
  interface LanguagesManager {
    findOne: (filter: {user: string}) => Promise<LanguageDoc | null>;
  }

}