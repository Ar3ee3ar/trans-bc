const {history,subj,trans,account} = require('../models/std-models')

// controller for => History and subj

const createHistory = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a movie',
        })
    }

    try{
        const history_file = new history(body)
        history_file
            .save()
            .then(() => {
                return res.status(201).json({
                    success: true,
                    id: history_file._id,
                    message: 'Student created!',
                })
            })
            .catch(error => {
                return res.status(400).json({
                    error,
                    message: 'Student not created!',
                })
            })
    }
    catch(error){
        return res
            .status(400)
            .json({ success: false, error: error.message })
    }
}

const updateHistory = async (req, res) => {
    // console.log(typeof(req))
    const body = req.body
    // console.log(body.json)

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }
    try{
        // console.log(body)
        const history_file = await history.findOneAndUpdate({ _id: req.params.std_id}, body, {
            new: true
        });
        // console.log(history_file)
        if (!history_file) {
            return res
                .status(404)
                .json({message: `Student not found`})
        }
        return res
            .status(200)
            .json({ success: true, data: history_file })
    }
    catch (error){
        return res
            .status(400)
            .json({ success: false, error: error.message })
    }
}


const deleteHistory = async (req, res) => {
    try{
        const history_file = await history.findOneAndDelete({ _id: req.params.std_id });
        if (!history_file) {
            return res
                .status(404)
                .json({message: `Student not found`})
        }
        return res
            .status(200)
            .json({ success: true, data: history_file })
    }
    catch(error){
        return res
            .status(400)
            .json({ success: false, error: error.message })
    }
}

const getHistoryByID = async (req, res) => {
    try{
        const history_file = await history.aggregate([
            {
                $lookup: {
                from: "all_subj_info",
                localField: "course.subj_ID",
                foreignField: "_id",
                as: 'subj_info'
                }
            },
            {
                $match: {_id: req.params.std_id}
            }
        ]);

        if (!history_file) {
            return res
                .status(404)
                .json({message: `Student not found`})
        }
        return res
            .status(200)
            .json({ success: true, data: history_file })
    }
    catch(error){
        return res
            .status(400)
            .json({ success: false, error: error.message })
    }
}

const getHistory = async (req, res) => {
    try{
        const history_file = await history.aggregate([
            {
                $lookup: {
                from: "all_subj_info",
                localField: "course.subj_ID",
                foreignField: "_id",
                as: 'subj_info'
                }
            }
        ]);
        // console.log(data);
        if (!history_file) {
            return res
                .status(404)
                .json({message: `Student not found`})
        }
        return res
            .status(200)
            .json({ success: true, data: history_file })
    }
    catch(error){
        return res.status(500).json({message: error.message})
    }
}

const getSubj = async (req, res) => {
    try{
        const subj_file = await subj.find({});
        // console.log(data);
        if (!subj_file) {
            return res
                .status(404)
                .json({message: `Subject not found`})
        }
        return res
            .status(200)
            .json({ success: true, data: subj_file })
    }
    catch(error){
        return res.status(500).json({message: error.message})
    }
}

// controller for => Account
const createAccount = (req, res) => {
    const body = req.body
    console.log(body)

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a movie',
        })
    }

    try{
        const account_file = new account(body)
        account_file
            .save()
            .then(() => {
                return res.status(201).json({
                    success: true,
                    id: account_file._id,
                    message: 'Account created!',
                })
            })
            .catch(error => {
                return res.status(400).json({
                    error,
                    message: 'Account not created!',
                })
            })
    }
    catch(error){
        return res
            .status(400)
            .json({ success: false, error: error.message })
    }
}

const updateAccount = async (req, res) => {
    // console.log(typeof(req))
    const body = req.body
    console.log(body.json)

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }
    try{
        console.log(body)
        const account_file = await account.findOneAndUpdate({ _id: req.params.std_id}, body, {
            new: true
        });
        // console.log(history_file)
        if (!account_file) {
            return res
                .status(404)
                .json({message: `Account not found`})
        }
        return res
            .status(200)
            .json({ success: true, data: account_file })
    }
    catch (error){
        return res
            .status(400)
            .json({ success: false, error: error.message })
    }
}

const getAccountByID = async (req, res) => {
    try{
        const account_file = await account.findOne({ _id: req.params.std_id});

        if (!account_file) {
            return res
                .status(404)
                .json({message: `Account not found`})
        }
        return res
            .status(200)
            .json({ success: true, data: account_file })
    }
    catch(error){
        return res
            .status(400)
            .json({ success: false, error: error.message })
    }
}
// controller for => ProofTran
const createProof = (req, res) => {
    const body = req.body
    console.log(body)

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a movie',
        })
    }

    try{
        const trans_file = new trans(body)
        trans_file
            .save()
            .then(() => {
                return res.status(201).json({
                    success: true,
                    id: trans_file._id,
                    message: 'Proof created!',
                })
            })
            .catch(error => {
                return res.status(400).json({
                    error,
                    message: 'Proof not created!',
                })
            })
    }
    catch(error){
        return res
            .status(400)
            .json({ success: false, error: error.message })
    }
}

const updateProof = async (req, res) => {
    // console.log(typeof(req))
    const body = req.body
    // console.log(body.json)

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }
    try{
        // console.log(body)
        const trans_file = await trans.findOneAndUpdate({ _id: req.params.std_id}, body, {
            new: true
        });
        // console.log(history_file)
        if (!trans_file) {
            return res
                .status(404)
                .json({message: `Proof not found`})
        }
        return res
            .status(200)
            .json({ success: true, data: trans_file })
    }
    catch (error){
        return res
            .status(400)
            .json({ success: false, error: error.message })
    }
}

const getProofByID = async (req, res) => {
    try{
        const trans_file = await trans.findOne({ _id: req.params.std_id});

        if (!trans_file) {
            return res
                .status(404)
                .json({message: `Proof not found`})
        }
        return res
            .status(200)
            .json({ success: true, data: trans_file })
    }
    catch(error){
        return res
            .status(400)
            .json({ success: false, error: error.message })
    }
}


module.exports = {
    createHistory,
    updateHistory,
    deleteHistory,
    getHistory,
    getHistoryByID,
    getSubj,
    createAccount,
    updateAccount,
    getAccountByID,
    createProof,
    updateProof,
    getProofByID
}