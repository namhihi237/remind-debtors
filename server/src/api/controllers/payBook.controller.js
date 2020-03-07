const User = require("../models/user.model");
const PayBook = require("../models/payBook.model");
const bot = require("../../../src/config/slack");
const stts = ["Done", "Not Done"];

module.exports.getAll = async (req, res, next) => {
  const googleId = req.signedCookies.userId;
  try {
    const user = await User.findOne({ googleId });
    const creditorsId = user._id;
    const items = await PayBook.find({ creditorsId });
    // res.json(items);
    res.render("paybook/index", { items });
  } catch (error) {
    next(error);
  }
};

module.exports.create = async (req, res, next) => {
  res.render("paybook/create");
};

module.exports.postCreate = async (req, res, next) => {
  const googleId = req.signedCookies.userId;
  try {
    const user = await User.findOne({ googleId });
    const creditorsId = user._id;
    const { email } = req.body;
    const debtors = await User.findOne({ email });
    if (debtors) {
      const newItem = {
        creditorsId,
        ...req.body,
        email,
        phone: debtors.phone,
        status: "Not Done"
      };
      await PayBook.create(newItem);
      const nameSlack = email.split("@")[0];
      bot.postMessageToUser(
        nameSlack,
        `Bạn cần phải trả số tiền ${req.body.money} cho ${user.name}`,
        {
          icon_emoji: ":dog:"
        }
      );
      // job(1, nameSlack, req.body.money, user.name, item._id);
      res.redirect("/paybook");
      return;
    } else {
      res.render("paybook/create", {
        mess: "Email người nợ không tồn tại trong hệ thống"
      });
    }
    // res.json(newPayBook);
  } catch (error) {
    next(error);
  }
};

module.exports.delete = async (req, res, next) => {
  const _id = req.params._id;
  try {
    await PayBook.findByIdAndDelete({ _id });
    res.redirect("/paybook");
  } catch (error) {
    next(error);
  }
};
module.exports.update = async (req, res, next) => {
  const _id = req.params._id;
  try {
    const item = await PayBook.findById({ _id });
    res.render("paybook/update", { item, stts });
  } catch (error) {
    next(error);
  }
};
module.exports.postUpdate = async (req, res, next) => {
  const _id = req.params._id;
  const { content, name, email, money, status } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      await PayBook.findOneAndUpdate(
        { _id },
        { status, money, content, email, name, phone: user.phone }
      );
      if (status === "Done") {
      }
      res.redirect("/paybook");
    } else {
      const item = await PayBook.findById({ _id });
      res.render("paybook/update", {
        item,
        stts,
        mess: "Email người nợ không tồn tại trong hệ thống"
      });
    }
  } catch (error) {
    next(error);
  }
};
