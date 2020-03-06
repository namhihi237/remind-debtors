const User = require("../models/user.model");
const PayBook = require("../models/payBook.model");
const mongoose = require("mongoose");
const Debtors = require("../models/debtors.model");

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
    const newItem = {
      creditorsId,
      ...req.body,
      status: "Not Done"
    };
    await PayBook.create(newItem);
    const { name, email, phone } = req.body;
    const debtors = await Debtors.findOne({ email });
    if (!debtors) {
      const newDebtors = {
        name,
        email,
        phone
      };
      await Debtors.create(newDebtors);
    }
    // res.json(newPayBook);
    res.redirect("/paybook");
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
    res.render("paybook/update", { item });
  } catch (error) {
    next(error);
  }
};
module.exports.postUpdate = async (req, res, next) => {
  const _id = req.body._id;
  try {
    await PayBook.findByIdAndUpdate({ _id }, req.body);
    res.redirect("/paybook");
  } catch (error) {
    next(error);
  }
};
