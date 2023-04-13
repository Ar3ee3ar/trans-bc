const express = require('express')
// const bodyParser = require('body-parser')

const stdCtrl = require('../controllers/std-ctrl')

const router = express.Router()
// router.use(bodyParser.raw({inflate:true, limit: '100kb', type: 'application/json'}));

router.get('/history/:std_id', stdCtrl.getHistoryByID)
router.get('/history', stdCtrl.getHistory)

router.delete('/del_history/:std_id', stdCtrl.deleteHistory)

router.post('/save_history', stdCtrl.createHistory)
router.put('/update_history/:std_id',stdCtrl.updateHistory)

router.get('/subj', stdCtrl.getSubj)

router.post('/acc',stdCtrl.createAccount)
router.put('/acc/:std_id',stdCtrl.updateAccount)
router.get('/acc/:std_id',stdCtrl.getAccountByID)

router.post('/proof',stdCtrl.createProof)
router.put('/proof/:std_id',stdCtrl.updateProof)
router.get('/proof/:std_id',stdCtrl.getProofByID)

module.exports = router