import React from 'react'
import MainMessage from './MainMessage'

const SuccessMessage = ({ message }) => (
    <MainMessage
        messageType='success'
        message={message}
        header='Success'
    />
)

export default SuccessMessage
