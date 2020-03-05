import React from 'react'
import { Segment } from 'semantic-ui-react'
import ProgramList from './components/Schedule/ProgramList'
import SignUp from './components/Auth/SignUp'
import SignIn from './components/Auth/SignIn'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
import NewProgram from './components/Schedule/NewProgram'

function App() {
    const token = localStorage.getItem(process.env.REACT_APP_TOKEN_KEY)
    const loggedIn = !!token

    return (
        <Segment padded>
            {/* <div>
                <h1>Broadcast scheduler</h1>
            </div> */}

            <Router>
                <div>
                    <Switch>
                        <Route exact path="/">
                            {loggedIn ? <Redirect to="/schedule" /> : <Redirect to="/signin" /> }
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
                    </Switch>
                </div>
            </Router>
        </Segment>
    );
}

export default App;
