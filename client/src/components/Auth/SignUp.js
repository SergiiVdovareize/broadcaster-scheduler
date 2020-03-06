import React, { useState } from 'react'
import { Button, Form, Header } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import Fetcher from '../../helpers/Fetcher'
import ErrorMessage from '../Messages/ErrorMessage'
import TokenManager from '../../helpers/TokenManager'
import Toaster from '../../helpers/Toaster'

const SignUp = ({ setAuthStatus }) => {
    const [errorMessage, setErrorMessage] = useState(null)
    let history = useHistory()

    const signup = async (event) => {
        event.preventDefault()
        setErrorMessage(null)

        try {
            const response = await Fetcher.post('signup', new FormData(event.target))
            if (response.token) {
                TokenManager.set(response.token)
                Toaster.success('You successfully signed up')
                setAuthStatus(true)
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

        <Button type='submit' color='blue'>SignUp</Button>

        <p>
            <a href='/signin'>Go to Authorization</a>
        </p>
    </Form>
}


export default SignUp
