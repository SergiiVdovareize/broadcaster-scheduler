import React from 'react'
import { Message } from 'semantic-ui-react'

const MainMessage = ({ message, messageType, header }) => (
    <Message
        error={messageType === 'error'}
        success={messageType === 'success'}
        visible={!!message}
        header={header}
        content={message}
    />
)

export default MainMessage
