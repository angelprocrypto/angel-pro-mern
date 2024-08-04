const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");
const requredUser = require("../middlewares/requiredUser");

router.post("/deposite", requredUser, transactionController.createDeposit);
router.post("/withdrawal", requredUser, transactionController.createWithdrawal);
router.get(
  "/depositHistory",
  requredUser,
  transactionController.getDepositHistory
);
router.get(
  "/sellusdtHistory",
  requredUser,
  transactionController.getSellUsdtHistory
);
router.get(
  "/getalldeposits",
  requredUser,
  transactionController.getAllDeposits
);
router.get(
  "/getallwithdrawals",
  requredUser,
  transactionController.getAllWithdrawals
);
router.get(
  "/withdrawalHistory",
  requredUser,
  transactionController.getWithdrawalHistory
);
router.post("/addbank", requredUser, transactionController.createBankAccount);
router.get("/bankaccounts", requredUser, transactionController.getBankAccount);
router.post("/sellusdt", requredUser, transactionController.sellUsdt);
router.get("/getsellusdt", requredUser, transactionController.getSellUsdt);
router.get("/getallsellusdts", transactionController.getAllSellUsdts);
router.put("/sellusdt/:transactionId", transactionController.updateSellUsdt);
router.put("/deposit/:transactionId", transactionController.updateDeposit);
router.put(
  "/withdrawal/:transactionId",
  transactionController.updateWithdrawal
);

module.exports = router;
