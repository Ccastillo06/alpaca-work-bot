const botsChannel = 'bot-commands'

export const getChannelNames = (guild) => guild.channels.cache.map((cache) => cache.name)
export const getChannelData = (guild, channelName) =>
  guild.channels.cache.find((channel) => channel.name === channelName)

export const getBotsChannelData = (guild) => getChannelData(guild, botsChannel)
