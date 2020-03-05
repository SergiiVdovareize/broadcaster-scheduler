import React, { useState } from 'react'
import { Button, Form, Header } from 'semantic-ui-react'
import Fetcher from '../../helpers/Fetcher'
import ErrorMessage from '../Messages/ErrorMessage'
import { useHistory } from 'react-router-dom'
import TokenManager from '../../helpers/TokenManager'

const SignIn = () => {
    const [errorMessage, setErrorMessage] = useState(null)
    let history = useHistory()

    const login = async (event) => {
        event.preventDefault()
        setErrorMessage(null)

        try {
            const response = await Fetcher.post('signin', new FormData(event.target))
            if (response.token) {
                TokenManager.set(response.token)
                history.push('/programs')
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

        <Button type='submit'>Login</Button>
        
        <p>
            <a href='/signup'>Go to Registration</a>
        </p>
    </Form>
}
    

export default SignIn
