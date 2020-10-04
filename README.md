# Discord Test Bot

This is a simple Discord bot project already configured to work by just following some steps:

1. Follow the [instructions](https://www.digitalocean.com/community/tutorials/how-to-build-a-discord-bot-with-node-js-es) in **Step 1** to create your own bot using your Discord accout and generate a **Token**
2. Create an `.env` file and paste your token using the `.env.dist` variable name given `BOT_TOKEN=YOUR_TOKEN`.
3. Invite the bot to your Discord channel and run it using `npm run start` or `npm run dev`.

To create new functions just replicate some of the files in the `handlers` folder and import it in `index.js`.

## Using Firebase Admin SDK

In order to connect your project with **Firebase** you should first download your admin credentials in `json` format from [Firebase Control Panel](https://console.firebase.google.com/project/YOUR_PROJECT/settings/serviceaccounts/adminsdk).

Update the import in `firebase.js` to connect with the firebase services you want to use.

## Additional info:

Authors in the `message.author` variable come with this format:

```
// Using TypeScript to define an interface...

interface AuthorI {
  id: String;
  username: string;
  bot: false,
  discriminator: String;
  avatar: String;
  // Some more fields..
}
```
