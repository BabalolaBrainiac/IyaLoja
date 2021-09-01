const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const foodData = require("../foodlist.json");
const Food = require("../models/food");
const Transact = require("../models/transaction");
const errors = require("restify-errors");

//Adds food to portfolio

router.post("/:_id", (req, res, next) => {
  foodData.findById(req.body._id).then((food) => {
    if (!food) {
      return next(new errors.NotFoundError("Food Item Not Found"));
    }
    const transact = new Transact({
      _id: new mongoose.Types.ObjectId(),
      food_item: req.body.food,
      value: req.body.value,
      cost: req.body.cost,
      date: newDate().toISOString().slice(0, 10),
    });
    return transact
      .save()
      .then((transaction) => {
        console.log(transaction);
        res.status(200).json({
          Status: "Transaction Completed",
          Transaction_Details: {
            status: "Completed",
            trns_value: transaction.value,
            total_cost: transaction.cost,
            trns_date: transaction.date,
          },
        });
      })
      .catch((error) => {
        return next(
          new errors.InternalServerError("Transaction Could Not Be Completed")
        );
      });
  });
});

//Get All Available Food Items

router.get("/fitemlist", (req, res, next) => {
  Food.findById()
    .select("token quantity price totalSupply ")
    .exec()
    .then((foods) => {
      console.log(foods);
      res.status(200).json({
        Message: "Available Food Items Fetched",
      });
    })
    .catch((error) => {
      return next(new errors.NotFond("Could Not Fetch Food Item List"));
    });
});

//Get Details For Specific Food Item

router.get("/:food_id", (req, res, next) => {
  Food.findById(req.params.food_id)
    .select("token quantity price totalSupply ")
    .exec()
    .then((food) => {
      if (!food) {
        return next(new errors.NotFoundError("Food Item Not Found"));
      }

      console.log(food);
      res.status(200).json({
        Message: "Food Item Fetched",
      });
    })
    .catch((error) => {
      return next(
        new errors.InternalServerError("Could Not Fetch Food Item List")
      );
    });
});

// Get All Food Transaction Details

router.get("/history", (req, res, next) => {
  Transact.find()
    .populate("food")
    .exec()
    .then((transactions) => {
      console.log(transactions);
      res.status(200).json({
        Message: "Transaction Details Fetched",
        Transaction_Details: transactions.map((transaction) => {
          return {
            transaction_id: transaction._id,
            food_item: transaction.food_item,
            value: transaction.value,
            cost: transaction.cost,
            date: transaction.date,
          };
        }),
      });
    })
    .catch((error) => {
      return next(
        new errors.InternalServerError("Could Not Fetch Food Item List")
      );
    });
});

//Get Specific Transaction Detail
router
  .get("/:trnsId", (req, res, next) => {
    Transact.find(req.params.trnsId)
      .populate("food")
      .exec()
      .then((transaction) => {
        if (!transaction) {
          return next(new errors.NotFoundError("Transaction Not Found"));
        }
        console.log(transaction);
        res.status(200).json({
          Message: "Transaction Details Fetched",
          Transaction_Details: {
            transaction_id: transaction._id,
            transaction_value: transaction.value,
            transaction_cost: transaction.cost,
            transaction_date: transaction.date,
          },
        });
      });
  })
  .catch((error) => {
    return next(
      new errors.InternalServerError("Could Not Fetch Food Item List")
    );
  });

module.exports = router;
