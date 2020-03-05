import React from 'react'
import { Message } from 'semantic-ui-react'

const ErrorMessage = ({ message }) => (
    <Message
        error
        visible={!!message}
        header='Error'
        content={message}
    />
)


export default ErrorMessage
