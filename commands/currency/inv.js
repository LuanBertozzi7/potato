module.exports = {
  name: "inventory",
  aliases: ["inv"],
  usage: "inv",
  category: "Currency",
  async execute(message, args, cmd, client, Discord) {
    const embed = new Discord.MessageEmbed()
      .setAuthor(`Inventory of ${message.author.tag}`, message.guild.iconURL)
      .setColor("RANDOM")
      .setThumbnail()
      .setTimestamp();
    const x = client.db.get(`items_${message.author.id}`);
    if(!x) { return message.channel.send(`No Items Found To Display`); }
    const arrayToObject = x.reduce((itemsobj, x) => {
        itemsobj[x.name] = (itemsobj[x.name] || 0) + 1;
        return itemsobj;
    }, {});
    const result = Object.keys(arrayToObject).map(k => embed.addField(`Name: ${k}`,`Quantity: **${arrayToObject[k]}**`, false));
    
    return message.channel.send({ embeds: [embed] })
  }
}