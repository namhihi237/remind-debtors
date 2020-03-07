require("dotenv-safe").config({
  example: process.env.CI ? ".env.ci.example" : ".env.example"
});
var SlackBot = require("slackbots");
const bot = new SlackBot({
  token: process.env.SLACK_TOKEN, // Add a bot https://my.slack.com/services/new/bot and put the token
  name: process.env.NAME_BOT_SLACK
});
bot.on("start", function() {
  // more information about additional params https://api.slack.com/methods/chat.postMessage
  var params = {
    icon_emoji: ":cat:"
  };

  // define channel, where bot exist. You can adjust it there https://my.slack.com/services
  //   bot.postMessageToChannel("general", "meow!", params);

  // define existing username instead of 'user_name'
  //   bot.postMessageToUser("yentth237", "meow!", params);

  // If you add a 'slackbot' property,
  // you will post to another user's slackbot channel instead of a direct message
  //   bot.postMessageToUser("yentth237", "meow!", {
  //     slackbot: true,
  //     icon_emoji: ":cat:"
  //   });

  // define private group instead of 'private_group', where bot exist
  //   bot.postMessageToGroup("private_group", "meow!", params);
});
module.exports = bot;
