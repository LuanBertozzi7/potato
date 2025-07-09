export * from "colors";

import config from "./config.json";
import { ExtendedClient } from "./structs/ExtendedClient";

import fs from "fs"
import path from "path"


export { client, config };

const client = new ExtendedClient(); 
client.start();

/* Bot initial Messages */
client.on("ready", () => {
  console.log("Potato is online!".yellow);
})
client.on("messageCreate", (message)=> {
  if(message.content === "ping") {
    message.reply("pong");
  }
})


