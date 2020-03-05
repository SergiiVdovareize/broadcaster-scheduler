const Program = require('../models/program.model')

exports.index = async ({query: {sort, asc, limit = 10, page = 1}}, res) => {
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
    if (!body.title || !body.startDate || !body.endDate) {
        return res.status(400).send({
            message: "Fill all the required fields"
        })
    }

    const diffTime = (new Date(body.endDate)) - (new Date(body.startDate))
    if (diffTime < 0) {
        return res.status(400).send({
            message: "Start date must be earlier the end date"
        })
    }
    const duration = Math.ceil(diffTime / 1000) // seconds

    try {
        const program = new Program({
            title: body.title,
            description: body.description,
            startDate: body.startDate,
            endDate: body.endDate,
            duration,
            categories: body.categories
        })
    
        const newProgram = await program.save()
        res.status(201).json(newProgram)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.update = async ({ body }, res ) => {
    const task = res.task
    task.title = body.title
    task.description = body.description
    task.dueDate = body.dueDate
    
    try {
        const updatedTask = await task.save()
        res.json(updatedTask)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.delete = async (req, res) => {
    try {
        await res.task.remove()
        res.json({ message: 'Task deleted' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
