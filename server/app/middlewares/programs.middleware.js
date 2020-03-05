const Program = require('../models/program.model')

exports.getProgram = async ({ params: { id: programId }}, res, next) => {
    let program

    try {
        program = await Program.findById(programId)
        if (program == null) {
            return res.status(404).json({ message: 'Cannot find program' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    
    res.program = program
    next()
}