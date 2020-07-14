const Discord = require('discord.js');
const config = require('./config.json');

const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.login(config.token);
client.on('message', message => {
	const channel = 'welcome-room';
/*	console.log(message.content);
	console.log(message.channel.name);
	message.delete();
*/
 // if (!message.content.startsWith(config.prefix) || message.author.bot) return;

// const args = message.content.slice(config.prefix.lenght).split(' ');
// const command = args.shift().toLowerCase();
	if (message.content === '$understood' || message.content === '!understood') {
		return;
	}
else if (channel === message.channel.name) {
message.delete().catch(err=> {
	console.error(err);

});
}
});
