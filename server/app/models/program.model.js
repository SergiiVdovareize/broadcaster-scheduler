const mongoose = require('mongoose')

const ProgramSchema = mongoose.Schema({
    title: String,
    description: String,
    startDate: Date,
    endDate: Date,
    duration: Number,
    categories: [String]
}, {
    timestamps: true,
})

module.exports = mongoose.model('Program', ProgramSchema)