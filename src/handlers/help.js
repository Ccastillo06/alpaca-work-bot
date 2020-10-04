// Command example: !!ping
export default function handler(message) {
  message.reply(`**Comandos disponibles:**\n
    ${'**`!!help`**' } => Devuelve una lista todos los comandos disponibles.\n
    ${'**`!!me`**' } => Devuelve tus datos de usuario de Discord 🕵️‍♀️🕵️‍♂️.\n
    ${'**`!!ping`**' } => Devuelve la latencia entre Discord y el bot (tiempo de respuesta). También devuelve un link para descargar tu avatar 😁.\n
    ${'**`!!start`**' } => Te añade el rol ${'`Trabajando`'} y comienza a contar tu tiempo de trabajo en esta sesión. **Tip:** Puedes mandarle el título de tu sesión de trabajo usando un argumento de la siguiente forma:  ${'**`!!start>MI TITULO`**' }.\n 
    ${'**`!!stop`**' } => Termina tu sesión de trabajo actual y guarda esta información en nuestra base de datos. ¡Podrás ver tus métricas muy pronto! 🚀\n
  `)
}
