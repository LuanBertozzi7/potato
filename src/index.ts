export * from "colors";

import config from "./config.json";
import { ExtendedClient } from "./structs/ExtendedClient";

export { client, config };

const client = new ExtendedClient(); 
client.start();

/* Bot initial Messages */
client.on("ready", () => {
  console.log("Bot is online!".green);
  console.log(`Logged in as ${client.user?.tag}`.blue);
})
client.on("messageCreate", (message)=> {
  if(message.content === "ping") {
    message.reply("e é é?");
  }

})