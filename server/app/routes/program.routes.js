module.exports = (app) => {
    const programs = require('../controllers/programs.controller')
    const auth = require('../middlewares/auth.middleware')
    const getProgram = require('../middlewares/programs.middleware').getProgram
    
    app.post('/programs', auth, programs.create)
    app.get('/programs', programs.index)
    app.get('/programs/:id', [auth, getProgram], programs.show)
    app.put('/programs/:id', [auth, getProgram], programs.update)
    app.delete('/programs/:id', [auth, getProgram], programs.delete)
}
