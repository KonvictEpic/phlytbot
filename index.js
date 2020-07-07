const Discord = require('discord.js');
const config = require('./config.json');

const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.login(config.token);
client.on('message', message => {

  if (message.content === '$understood' || message.content === '!understood') {
	message.channel.send('Pong.');
}
});
