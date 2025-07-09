import { Client, Collection } from "discord.js"
import { Partials, IntentsBitField, GatewayIntentsString } from "discord.js";
import  dotenv from "dotenv";
import { CommandType, ComponentsButton, ComponentsSelect, ComponentsModal } from "./types/command";
dotenv.config();

export class ExtendedClient extends Client {
  // structures
  public commands: Collection<string, CommandType> = new Collection();
  public buttons: ComponentsButton = new Collection();
  public select: ComponentsSelect = new Collection();
  public modal: ComponentsModal = new Collection(); 

  
  constructor() {
    super({
      intents: [
        "Guilds",
        "GuildMembers",
        "GuildModeration",
        "GuildEmojisAndStickers",
        "GuildIntegrations",
        "GuildWebhooks",
        "GuildInvites",
        "GuildVoiceStates",
        "GuildPresences",
        "GuildMessages",
        "GuildMessageReactions",
        "GuildMessageTyping",
        "DirectMessages",
        "DirectMessageReactions",
        "DirectMessageTyping",
        "MessageContent",
        "GuildScheduledEvents",
        "AutoModerationConfiguration",
        "AutoModerationExecution"
      ],
      partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.GuildScheduledEvent,
        Partials.Message,
        Partials.Reaction,
        Partials.User,
        Partials.ThreadMember
      ]
    })
  }
  public start() {
      this.login(process.env.POTATO_TOKEN)
  }
}
