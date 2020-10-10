// Command example: !!help
export default function handler(message) {
  message.reply(`**Comandos disponibles:**\n
${'**`!!help o !!ayuda`**'} => Devuelve una lista todos los comandos disponibles.\n
${'**`!!me`**'} => Devuelve tus datos de usuario de Discord 🕵️‍♀️🕵️‍♂️.\n
${'**`!!ping`**'} => Devuelve la latencia entre Discord y el bot (tiempo de respuesta). También devuelve un link para descargar tu avatar 😁.\n
${'**`!!subjects o !!temas`**'} => Devuelve los temas en los que has estado trabajando. Cada vez que haces ${'`!!start Mi trabajo`'} creas un tema **Mi Trabajo**.\n
${'**`!!start o !!empezar`**'} => Te añade el rol ${'`Trabajando`'} y comienza a contar tu tiempo de trabajo en esta sesión. **Tip:** Puedes mandarle el título de tu sesión de trabajo usando un argumento de la siguiente forma:  ${'**`!!start MI TITULO`**'}.\n 
${'**`!!stop o !!parar`**'} => Termina tu sesión de trabajo actual y guarda esta información en nuestra base de datos. ¡Podrás ver tus métricas muy pronto! 🚀\n
${'**`!!latest`**'} =>
    - Consulta tu última sesión con ${'`!!latest`'} ⏰
    - ¿Te has equivocado en tu última sesión y quieres borrarla del registro? Usa ${'`!!latest remove`'} y la eliminarás, ¡ten cuidado al usarlo ☠️!
    - También puedes restar horas a tu última sesión si olvidaste pararlo a tiempo con ${'`!!latest -hh:mm:ss`'} añadiendo el tiempo que quieras quitar.

**¿Cómo funciona el comando ${'`!!start`'}?**
Este comando aceptará un argumento a tu elección y creará un **tema** en la base de datos. Se contarán tus horas de trabajo desde que utilizas el comando hasta que **te desconectas, te retiran el rol Trabajando o usas el comando ${'`!!stop`'}**. En ese momento, se terminará tu sesión de trabajo y se guardará en nuestra DB para que veas tu eficacía en las gráficas de la web.
`)
}
