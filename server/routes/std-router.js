const express = require('express')

const stdCtrl = require('../controllers/std-ctrl')

const router = express.Router()

router.get('/history/:std_id', stdCtrl.getHistoryByID)
router.get('/history', stdCtrl.getHistory)

module.exports = router