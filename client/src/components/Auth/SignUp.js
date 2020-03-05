import React, { useState } from 'react'
import { Button, Form, Header, Message } from 'semantic-ui-react'
import Fetcher from '../../helpers/Fetcher'
import ErrorMessage from '../Messages/ErrorMessage'
import { useHistory } from 'react-router-dom'
import TokenManager from '../../helpers/TokenManager'

const SignUp = () => {
    const [errorMessage, setErrorMessage] = useState(null)
    let history = useHistory()

    const signup = async (event) => {
        event.preventDefault()
        setErrorMessage(null)

        try {
            const response = await Fetcher.post('signup', new FormData(event.target))
            if (response.token) {
                TokenManager.set(response.token)
                history.push('/programs')
            }
        } catch (error) {
            setErrorMessage(error.message || 'Some error')
        }
    }

    return <Form onSubmit={signup}>
        <Header size='large'>Sign Up</Header>

        <Form.Field>
            <label>Email</label>
            <input placeholder='Email' name='email'/>
        </Form.Field>

        <Form.Field>
            <label>Password</label>
            <input type='password' name='password'/>
        </Form.Field>

        <ErrorMessage message={errorMessage}/>

        <Button type='submit'>SignUp</Button>

        <p>
            <a href='/signin'>Go to Authorization</a>
        </p>
    </Form>
}


export default SignUp
