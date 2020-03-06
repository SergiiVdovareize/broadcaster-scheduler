import React from 'react'
import { SemanticToastContainer } from 'react-semantic-toasts'
import { Segment } from 'semantic-ui-react'
import ProgramList from './components/Schedule/ProgramList'
import SignUp from './components/Auth/SignUp'
import SignIn from './components/Auth/SignIn'
import NewProgram from './components/Schedule/NewProgram'
import EditProgram from './components/Schedule/EditProgram'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";

function App() {
    const token = localStorage.getItem(process.env.REACT_APP_TOKEN_KEY)
    const loggedIn = !!token

    return (
        <Segment padded>
            {/* <div>
                <h1>Broadcast scheduler</h1>
            </div> */}

            <SemanticToastContainer />
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/">
                            {loggedIn ? <Redirect to="/programs" /> : <Redirect to="/signin" /> }
                        </Route>
                        
                        <Route exact path="/signin">
                            <SignIn/>
                        </Route>

                        <Route exact path="/signup">
                            <SignUp/>
                        </Route>

                        <Route exact path="/programs">
                            {loggedIn ? <ProgramList /> : <Redirect to="/signin" /> }
                        </Route>

                        <Route exact path="/programs/add">
                            {loggedIn ? <NewProgram /> : <Redirect to="/signin" /> }
                        </Route>

                        <Route exact path="/programs/edit/:id">
                            {loggedIn ? <EditProgram /> : <Redirect to="/signin" /> }
                        </Route>
                    </Switch>
                </div>
            </Router>
        </Segment>
    );
}

export default App;
