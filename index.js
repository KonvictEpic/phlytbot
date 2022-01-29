const Discord = require('discord.js');
const config = require('./config.json');
const cron = require('node-cron');
const fs = require('fs');
readline = require('readline');

function getDays(start, last) {
    //initialize dates with Date object
		//console.log("im running");
    const date1 = new Date(start);
    const date2 = new Date(last);

    // calculation for converting a day into milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    // calculation for the time difference between start and last
    const diffTime = date2.getTime() - date1.getTime();

    // calculation for the days between start and last
    const diffDays = Math.round(diffTime / oneDay);
    // return number of days
    return diffDays;
	};
/*
var rd = readline.createInterface({
	input:fs.createReadStream('troublemakers.json'),
	output: process.stdout,
	console: false
});
rd.on('line', function(line) {
	console.log(line);
});
*/


const client = new Discord.Client();

function ready () {
client.once('ready', () => {
	console.log('Ready!');
	const guilds = client.guilds.cache.map(guild => guild);
	console.log(guilds);


});}
ready();

client.login(config.token);
const channel = 'welcome-room';
//const guild = client.guilds.cache.get('334839197607264257');
//console.log(guild);


/*
fs.readFile('troublemakers.json', (err, data) => {
	if (err) console.log(err);
	var array = data.toString().split("\n");
	for (i in array) {
		const date = array[i].replace('\n', '').split("\t");
		myDate = new Date();

		if (getDays("2/1/2020", myDate) >= '180'){
			client.users.fetch('473943552263585842')
			.then(user => {
				console.log(user)
				//user.roles.remove(config.rulebreaker);
				console.log("did it work?");
		})
		.catch(console.log);
	}
}
});
*/
async function waiting() {

cron.schedule(' * * 23 * * * ', function() {
	console.log("running");
	fs.readFile('troublemakers.json', (err, data) => {
		if (err) console.log(err);
		var array = data.toString().split("\n");
		for (i in array) {
			const date = array[i].replace('\n', '').split("\t");
			myDate = new Date();

			if (getDays("2/1/2020", myDate) >= '180'){
				client.users.fetch(date[1])
				.then(user => {
					user.roles.remove('rulebreaker');
					console.log("did it work?")
			});
		}
	}
	});
});
}
client.on('message', message => {
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

			var today = new Date();
			//var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

			message.guild.members.fetch(args[1])
			.then(user => {
				user.roles.remove('memelord');

				let value = today + '\t' + user.id+ '\n';
				//let value = idtemp.toString();
				fs.appendFile('troublemakers.json', value, err=>{console.error(err);})
			})
			.catch(console.error);

		}
	}
});
