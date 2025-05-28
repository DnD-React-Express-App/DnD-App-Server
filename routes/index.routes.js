const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.get("/health", (req, res, next) => {
  mongoose.connection.db.admin().ping()
    .then(() => {
      res.status(200).json({
        status: 'ok',
        timestamp: new Date()
      });
    })
    .catch(err => {
      console.error("MongoDb ping failed", err);
      res.status(500).json({
        status: 'error',
        message: "Failed to connect to MongoDB"
      });
    });
});

module.exports = router;
