import { Client } from "discord.js"
import { Partials, IntentsBitField, GatewayIntentsString } from "discord.js";
import  dotenv from "dotenv";
dotenv.config();

export class ExtendedClient extends Client {
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
