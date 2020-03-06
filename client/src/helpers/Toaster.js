import { toast } from 'react-semantic-toasts'

const success = (message) => {
    push('success', 'Success', message)
}

const error = (message) => {
    push('error', 'Error', message)
}

const push = (type, title, description) => {
    toast({
        type,
        title,
        description,
        time: 4000,
        animation: 'fade'
    })
}

export default { success, error }