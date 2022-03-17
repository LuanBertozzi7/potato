module.exports = {
  name: "beg",
  aliases: [],
  usage: "beg",
  category: "Currency",
  async execute(message, args, cmd, client, Discord) {
    let users = [
        "Potato Moon",
        "Mumbo potato",
        "tat man",
        "super potato"
    ];  
    let amount = Math.floor(Math.random() * 50) + 10;
    let beg = await client.eco.beg(message.author.id, false, amount, { canLose: true });
    console.log(beg)
    if (beg.cooldown) return message.reply(`Begon Thot! Come back after ${beg.time.seconds} seconds.`);
    if (beg.lost) return message.channel.send(`**${users[Math.floor(Math.random() * users.length)]}:** Begon Thot! Try again later.`);
    else return message.reply(`**${users[Math.floor(Math.random() * users.length)]}** donated you **${amount}** 💸.`);
  }
}