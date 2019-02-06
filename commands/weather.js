const w = require('weather-js');
const discord = require(`discord.js`);

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
 let loc = args.join(" ");
    if (/^[\w\ ]+$/i.test(loc) === false) return message.reply("Only alphanumeric characters, spaces, and underscores are allowed!"); // eslint-disable-line no-useless-escape
    message.channel.startTyping();
	if (!loc) {
		message.channel.send("You need to supply a location or Zip code.")
		return;
	}
	try {
	w.find({search: loc, degreeType: 'C'}, function(err, result) {
	if (err) {
		message.channel.send("I don't know why this is broken, let my owner check it..")
     };
     let area = result[1];

    	let embed = new discord.RichEmbed()
      .setColor(message.guild.me.displayHexColor !='#000000' ? message.guild.me.displayHexColor : "7289DA")
      .setAuthor(`☁ Weather for ${area.location.name}`)
      .setDescription(`
**Temperature:** ${area.current.temperature}°C
**Feels Like:** ${area.current.feelslike}°C
**Clouds:** ${area.current.skytext}
**Humidity:** ${area.current.humidity}%
**Wind Speed:** ${area.current.winddisplay}
         `);
   	message.channel.send({ embed });
  });
	} catch(err) {
		message.channel.send("I don't know why this is broken, but it is broken!");
	}
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["weathernow"],
  permLevel: "User"
};

exports.help = {
  name: "weather",
  category: "Tools",
  description: "Current weather in your area",
  usage: "Weather Area/ZIP code"
};
