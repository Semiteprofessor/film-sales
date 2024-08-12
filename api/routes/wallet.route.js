const express = require("express");
const router = express.Router();
const {
  completeWalletFunding,
  walletBalance,
} = require("../controllers/wallet.controller");

//create user routes

router.post("/complete", completeWalletFunding);
router.get("/wallet_balance", walletBalance);

module.exports = router;
