import React, { useState } from 'react'
import { Button, Form, Header } from 'semantic-ui-react'
import Fetcher from '../../helpers/Fetcher'
import ErrorMessage from '../Messages/ErrorMessage'
import TokenManager from '../../helpers/TokenManager'
import Toaster from '../../helpers/Toaster'

const SignIn = ({ setAuthStatus }) => {
    const [errorMessage, setErrorMessage] = useState(null)

    const login = async (event) => {
        event.preventDefault()
        setErrorMessage(null)

        try {
            const response = await Fetcher.post('signin', new FormData(event.target))
            if (response.token) {
                TokenManager.set(response.token)
                Toaster.success('You successfully logged in')
                setAuthStatus(true)
            }
        } catch (error) {
            setErrorMessage(error.message || 'Some error')
        }
    }

    return <Form onSubmit={login}>
        <Header size='large'>Sign In</Header>

        <Form.Field>
            <label>Email</label>
            <input placeholder='Email' name='email'/>
        </Form.Field>

        <Form.Field>
            <label>Password</label>
            <input type='password' name='password'/>
        </Form.Field>

        <ErrorMessage message={errorMessage}/>

        <Button type='submit' color='green'>Login</Button>
        
        <p>
            <a href='/signup'>Go to Registration</a>
        </p>
    </Form>
}
    

export default SignIn
