// Command example: !!choose>tortilla,croquetas,pizza
function handler(message, args) {
  const options = args[0].split(',');
  const randomIndex = Math.floor(Math.random() * options.length);
  
  message.reply(`I choose the random option ${options[randomIndex]}. 🦄`);
}

module.exports = handler;
