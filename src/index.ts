export * from "colors";

import { ExtendedClient } from "./structs/ExtendedClient";

const client = new ExtendedClient(); 
client.start();
export { client };

client.on("ready", () => {
  console.log("Bot is online!".green);
  console.log(`Logged in as ${client.user?.tag}`.blue);
})