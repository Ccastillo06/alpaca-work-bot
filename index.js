require('dotenv').config();
const Discord = require('discord.js');

const ping = require('./handlers/ping');
const choose = require('./handlers/choose');
const rates = require('./handlers/rates');
const op = require('./handlers/op');

const client = new Discord.Client();

const prefix = '!!';
const argsDivider = '>';

const handlersByCommand = {
  ping,
  choose,
  rates,
  op,
};

client.on('message', function (message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const userMessage = message.content.replace(prefix, '').trim().toLowerCase();
  const [command, ...args] = userMessage.split(argsDivider);

  const handler = handlersByCommand[command];
  if (handler) {
    handler(message, args);
  }
});

client.login(process.env.BOT_TOKEN);
