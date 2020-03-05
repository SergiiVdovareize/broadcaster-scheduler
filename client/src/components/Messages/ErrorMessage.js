import React from 'react'
import MainMessage from './MainMessage'

const ErrorMessage = ({ message }) => (
    <MainMessage
        messageType='error'
        message={message}
        header='Error'
    />
)

export default ErrorMessage
