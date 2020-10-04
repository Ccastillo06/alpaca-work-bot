# Discord Test Bot

This is a simple Discord bot project already configured to work by just following some steps:

1. Follow the [instructions](https://www.digitalocean.com/community/tutorials/how-to-build-a-discord-bot-with-node-js-es) in **Step 1** to create your own bot using your Discord accout and generate a **Token**
2. Create an `.env` file and paste your token using the `.env.dist` variable name given `BOT_TOKEN=YOUR_TOKEN`.
3. Invite the bot to your Discord channel and run it using `npm run start` or `npm run dev`.

To create new functions just replicate some of the files in the `handlers` folder and import it in `index.js`.

---

## Using Firebase Admin SDK

In order to connect your project with **Firebase** you should first download your admin credentials in `json` format from [Firebase Control Panel](https://console.firebase.google.com/project/YOUR_PROJECT/settings/serviceaccounts/adminsdk).

Update the environment variables in the same order as they are in `env.dist` but in your own `.env` file to connect with the firebase services you want to use.

---

## Available Commands

- **!!help** => Returns all available commands.
- **!!me** => Returns user id, username and discriminator.
- **!!ping** => Returns the bot answer latency and a link to download your current user avatar.
- **!!start** => Generates a new **session** document in Firebase with the current working session `startTime` and `subject`. Also appends the `workingRole` you configured in your server to the current user.
- **!!stop** => End the previous **session** document in Firebase with the current working session `endTime` and `timeSpent`.

In case any user **disconnects** while having `workingRole` active, Alpaca Work Bot will automatically run the `stop` handler for that user.

## Next steps:

- If any user sends **`!!start`** after having an active working session, let them decide on continuing with that session or start a new one.

## Heroku commands:

- Stop dyno: `heroku ps:scale web=0`
- Start dyno: `heroku ps:scale web=1`