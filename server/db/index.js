const mongoose = require('mongoose')

mongoose
    .connect('mongodb+srv://arzeezarl:Ar3ee3ar123@cluster0.9mm8gst.mongodb.net/university', { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db