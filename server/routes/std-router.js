const express = require('express')

const stdCtrl = require('../controllers/std-ctrl')

const router = express.Router()

router.get('/history/:std_id', stdCtrl.getHistoryByID)
router.get('/history', stdCtrl.getHistory)

router.get('/del_history/:std_id', stdCtrl.deleteHistory)

router.post('/save_history', stdCtrl.createHistory)
router.post('/update_history/:std_id',stdCtrl.updateHistory)

router.get('/subj', stdCtrl.getSubj)

module.exports = router