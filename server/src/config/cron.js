const CronJob = require("cron").CronJob;
const bot = require("./slack");
const PayBooks = require("../api/models/payBook.model");
const Users = require("../api/models/user.model");
const twilio = require("twilio");
const client = new twilio(
  process.env.ACCOUNTSID_TWILIO,
  process.env.AUTHTOKEN_TWILIO
);
const remind = function() {
  const job = new CronJob(
    `*/2 * * * *`, // 2 p gui sms 1 lan
    async function() {
      try {
        const items = await PayBooks.find({ status: "Not Done" });
        const promises = items.map(async item => {
          const creditorsId = item.creditorsId;
          const email = item.email;
          const _id = item._id;
          const nameSlack = email.split("@")[0];
          const money = item.money;
          const count = item.count + 1;
          const phone = item.phone;
          const creditors = await Users.findById({ _id: creditorsId });
          const name = creditors.name;
          if (item.count < 5) {
            bot.postMessageToUser(
              nameSlack,
              `Bạn cần phải trả số tiền ${money}  cho ${name}`,
              {
                icon_emoji: ":dog:"
              }
            );
          } else {
            client.messages
              .create({
                body: `Bạn cần phải trả số tiền ${money}  cho ${name}`,
                to: phone, // Text this number
                from: "+12345678901" // From a valid Twilio number
              })
              .then(message => console.log(message.sid));
          }
          await PayBooks.findByIdAndUpdate({ _id }, { count });
        });
        await Promise.all(promises);
      } catch (error) {}
    },
    null,
    true,
    "Asia/Ho_Chi_Minh"
  );
  job.start();
};
module.exports = remind;
