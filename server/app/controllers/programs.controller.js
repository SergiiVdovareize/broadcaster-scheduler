const Program = require('../models/program.model')

exports.index = async ({query: {sort, asc, limit = 1000, page = 1}}, res) => {
    const sortField = sort || 'startDate'
    limit = parseInt(limit, 10)
    page = parseInt(page, 10)
    if (page < 1) {
        page = 1
    }

    const query = {}

    try {
        const programs = await Program.find(query)
            .sort({[sortField]: asc === 'desc' ? -1 : 1})
            .limit(limit, 10)
            .skip((page - 1) * limit)
        res.send(programs)
    } catch (err) {
        res.status(500).json( {message: err.message } )
    }
}

exports.create = async ({ body }, res) => {
    const isValid = await validateProgram(body, res)
    if (!isValid) {
        return
    }
    
    const diffTime = (new Date(body.endDate)) - (new Date(body.startDate))

    try {
        const program = new Program({
            title: body.title,
            description: body.description,
            startDate: body.startDate,
            endDate: body.endDate,
            duration: Math.ceil(diffTime / 1000),
            categories: body.categories.split(',')
        })
    
        const newProgram = await program.save()
        res.status(201).json(newProgram)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.show = async (req, res ) => {
    res.json(res.program)
}

exports.update = async ({ body }, res ) => {
    const program = res.program

    const isValid = await validateProgram(body, res, program._id)
    if (!isValid) {
        return
    }

    program.title = body.title
    program.description = body.description
    program.startDate = body.startDate
    program.endDate = body.endDate
    program.categories = body.categories.split(',')
    
    const diffTime = (new Date(body.endDate)) - (new Date(body.startDate))
    program.duration = Math.ceil(diffTime / 1000) // seconds
    
    try {
        const updatedProgram = await program.save()
        res.json(updatedProgram)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.delete = async (req, res) => {
    try {
        await res.program.remove()
        res.json({ message: 'Program deleted' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const validateProgram = async (body, res, excludeId) => {
    if (!body.title || !body.startDate || !body.endDate) {
        res.status(400).send({
            message: "Fill all the required fields"
        })
        return false
    }

    if ((new Date(body.endDate)) <= (new Date(body.startDate))) {
        res.status(400).send({
            message: "Start date must be earlier the end date"
        })
        return false
    }

    if (await hasTimeOverlap(body, excludeId)) {
        res.status(400).send({
            message: "There is some time overlap. Check the existing schedule and try again"
        })
        return false
    }

    return true
}

const hasTimeOverlap = async ({ startDate, endDate }, excludeId = null) => {
    const overlap = await Program.find({
        $and: [{
            $or: [{
                endDate: {$gt: startDate},
                startDate: {$lt: endDate}
            }, {
                startDate: {$lt: endDate},
                endDate: {$gt: startDate}
            }]
        }, {
            _id: { $ne: excludeId}
        }]
    })
    // add AND by id

    return overlap && overlap.length > 0
}