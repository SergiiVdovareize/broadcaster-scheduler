import React from 'react'
import { Button, Header } from 'semantic-ui-react'
import TokenManager from '../../helpers/TokenManager'
import Toaster from '../../helpers/Toaster'

const PageHeader = ({ title, setAuthStatus }) => {
    const signOut = () => {
        TokenManager.reset()
        setAuthStatus(false)
        Toaster.success('You successfully signed out')
    }

    return (
        <div>
            <Header floated='left' size='large'>{title}</Header>
            <Button floated='right' color='orange' onClick={signOut}>SignOut</Button>
        </div>
    )
}
    

export default PageHeader
