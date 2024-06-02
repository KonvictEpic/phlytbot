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
	return guilds[0];

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
async function waiting() {       // is supposed to go through troublemaker.json daily to check if someone should have their role removed,
								// however I cant fetch guild outside of a client function or make it wait for guilds to be avaiable before trying to fetch them.

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
//message.guild.members.fetch(args[1])
//.then( user => {console.log(user)})


	
	
	if (channel === message.channel.name) {

		if (!message.content === '$understood' || !message.content === '!understood' || !message.author.bot) { // cleans up welcome room.
			message.delete().catch(err=> {
			console.error(err);
			});
		}
	}
	else if (message.channel.name === 'aperture' || message.channel.name === 'kons-coding-room') {
		if (args[0] =='!mute' || args[0] == '!tempmute') { // removes memelord from muted users

		

			message.guild.members.fetch(args[1])
			.then(user => {
				user.roles.remove(config.memlord)
				.then(console.log)
				.catch(err=> { console.error(err)});
			})
			.catch(console.error);

		}
		else if (args[0] == '$rulebreak'){ //checks for rulebreakers and appends their name and date to the troublemakers file.
			
			var thisday = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(); // cleaner date, easier to read

			message.guild.members.fetch(args[1]) //finds user based on provided UID
			.then(user => {
	
				let value = thisday + '\t' + user.id+ '\n';
				//let value = idtemp.toString();
				fs.appendFile('troublemakers.json', value, err=>{console.error(err);}) //appends to user to file
			})
			.catch(console.error);
		}
	}
	else if (message.guild.id === '730156420107862057'){
		if (args[0] === '!restrict') {
			message.guild.members.fetch(args[1]).then(user => {
				user.roles.add('781222980990402600')
					.then(console.log).catch(console.error)
			}).catch(console.error);
			let key = "";
			console.log(args)
			for (let i = 2; i < args.length; i++){
				 key += args[i] + " ";
			}
			message.channel.send('!warn ' + args[1] + ' muted for ' + key );}
	}
});
