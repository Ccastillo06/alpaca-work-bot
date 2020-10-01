// Command example: !!ping
function handler(message) {
  const timeTaken = Date.now() - message.createdTimestamp;
  message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);

  const { id, avatar } = message.author;
  const userImage = `https://cdn.discordapp.com/avatars/${id}/${avatar}.png?size=128`;
  message.reply(`Btw, you can see this user's avatar in ${userImage}`);
}

module.exports = handler;