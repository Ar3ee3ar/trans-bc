const history = require('../models/std-models')

// const createMovie = (req, res) => {
//     const body = req.body

//     if (!body) {
//         return res.status(400).json({
//             success: false,
//             error: 'You must provide a movie',
//         })
//     }

//     const history_file = new history(body)

//     if (!history_file) {
//         return res.status(400).json({ success: false, error: err })
//     }

//     history_file
//         .save()
//         .then(() => {
//             return res.status(201).json({
//                 success: true,
//                 id: history_file._id,
//                 message: 'Movie created!',
//             })
//         })
//         .catch(error => {
//             return res.status(400).json({
//                 error,
//                 message: 'Movie not created!',
//             })
//         })
// }

// const updateMovie = async (req, res) => {
//     const body = req.body

//     if (!body) {
//         return res.status(400).json({
//             success: false,
//             error: 'You must provide a body to update',
//         })
//     }

//     history.findOne({ _id: req.params.id }, (err, history_file) => {
//         if (err) {
//             return res.status(404).json({
//                 err,
//                 message: 'Movie not found!',
//             })
//         }
//         history_file.name = body.name
//         history_file.time = body.time
//         history_file.rating = body.rating
//         history_file
//             .save()
//             .then(() => {
//                 return res.status(200).json({
//                     success: true,
//                     id: history_file._id,
//                     message: 'Movie updated!',
//                 })
//             })
//             .catch(error => {
//                 return res.status(404).json({
//                     error,
//                     message: 'Movie not updated!',
//                 })
//             })
//     })
// }

// const deleteMovie = async (req, res) => {
//     await history.findOneAndDelete({ _id: req.params.id }, (err, history_file) => {
//         if (err) {
//             return res.status(400).json({ success: false, error: err })
//         }

//         if (!history_file) {
//             return res
//                 .status(404)
//                 .json({ success: false, error: `Movie not found` })
//         }

//         return res.status(200).json({ success: true, data: history_file })
//     }).catch(err => console.log(err))
// }

const getHistoryByID = async (req, res) => {
    try{
        const history_file = await history.findOne({ std_id : req.params.std_id });

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
        const history_file = await history.find({});
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

module.exports = {
    // createMovie,
    // updateMovie,
    // deleteMovie,
    getHistory,
    getHistoryByID,
}