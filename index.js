const Discord = require('discord.js');
const config = require('./config.json');

const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.login(config.token);
client.on('message', message => {
	const channel = 'welcome-room';
	const guild = client.guilds.cache.get('334839197607264257');
/*	console.log(message.content);
	console.log(message.channel.name);
	message.delete();
*/

	const args = message.content.split(/ +/);
	/*
	const member = new Promise((resolve, reject) => {
		if (typeof this !== 'undefined') {
						resolve('success')
		if
		}
	})

	/*
	function success(memberid) {
	memberid.roles.remove('710237948150284389').catch(err => {
		console.error(err);
		});
}
// if (!message.content.startsWith(config.prefix) || message.author.bot) return;
/*
if (message.content === '$understood' || message.content === '!understood' || message.author.bot) {
		return;
	}
	*/
	if (channel === message.channel.name) {

		if (!message.content === '$understood' || !message.content === '!understood' || !message.author.bot) {
			message.delete().catch(err=> {
			console.error(err);
			});
		}
	}
	else if (message.channel.name === 'aperture' || message.channel.name === 'kons-coding-room') {
		if (args[0] === '!mute' || args[0] === '!tempmute') {
			guild.members.fetch(args[1])

			.then(user => {
			user.roles.remove('710237948150284389');
			})
			.catch(console.error);

		}
	}
});
