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
const args = message.content.split(/ +/);

// if (!message.content.startsWith(config.prefix) || message.author.bot) return;

if (message.content === '$understood' || message.content === '!understood') {
		return;
	}
else if (channel === message.channel.name) {
message.delete().catch(err=> {
	console.error(err);

});
}
else if (args[0] === '!mute') {
const guild = client.guilds.cache.get('334839197607264257');

const member = guild.members.cache.get(args[1]);
member.roles.remove('710237948150284389').catch(err => {
	console.error(err);
});
}
// console.log(message.mentions.users.first());
/* taggedUser.id.roles.remove(710237948150284389).catch(err=> {
	console.error(err);
});
*/

/*
if (command === '!mute') {

const taggedUser = message.mentions.users.first();
console.log(message.mentions.users.first());
 // get mentioned user
 console.log(message.mentions.users.first);
	if (taggedUser.roles.find('name', 'memelord')) {
			// check if muted user has role
	taggedUser.removeRole(710237948150284389).catch(err=> {
		console.error(err);
	});
	}
}
*/

});
