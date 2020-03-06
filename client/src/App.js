import React, { useEffect, useState } from 'react'
import { SemanticToastContainer } from 'react-semantic-toasts'
import { Segment } from 'semantic-ui-react'
import ProgramList from './components/Schedule/ProgramList'
import SignUp from './components/Auth/SignUp'
import SignIn from './components/Auth/SignIn'
import NewProgram from './components/Schedule/NewProgram'
import EditProgram from './components/Schedule/EditProgram'
import TokenManager from './helpers/TokenManager'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom"

const App = () => {
    const [loggedIn, setLoggedIn] = useState(!!TokenManager.get())

    const setAuthStatus = (status) => {
        setLoggedIn(status)
    }

    return (
        <Segment padded>
            <SemanticToastContainer />

            <Router>
                <Switch>
                    <Route exact path="/">
                        {loggedIn ? <Redirect to="/programs" /> : <Redirect to="/signin" /> }
                    </Route>
                    
                    <Route exact path="/signin">
                        {loggedIn ? <Redirect to="/programs" /> : <SignIn setAuthStatus={setAuthStatus}/> }
                    </Route>

                    <Route exact path="/signup">
                        {loggedIn ? <Redirect to="/programs" /> : <SignUp setAuthStatus={setAuthStatus}/>}
                    </Route>

                    <Route exact path="/programs">
                        {loggedIn ? <ProgramList setAuthStatus={setAuthStatus}/> : <Redirect to="/signin" /> }
                    </Route>

                    <Route exact path="/programs/add">
                        {loggedIn ? <NewProgram setAuthStatus={setAuthStatus}/> : <Redirect to="/signin" /> }
                    </Route>

                    <Route exact path="/programs/edit/:id">
                        {loggedIn ? <EditProgram setAuthStatus={setAuthStatus}/> : <Redirect to="/signin" /> }
                    </Route>
                </Switch>
            </Router>
        </Segment>
    )
}

export default App
