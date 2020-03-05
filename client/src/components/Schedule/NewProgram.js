import React, { useState } from 'react'
import { Form, Header, Button } from 'semantic-ui-react'
import DatePicker from "react-datepicker"
import ErrorMessage from '../ErrorMessage'
import Fetcher from '../../helpers/Fetcher'
import "react-datepicker/dist/react-datepicker.css"

const NewProgram = () => {
    const [errorMessage, setErrorMessage] = useState(null)
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())

    const addProgram = async (event) => {
        event.preventDefault()
        setErrorMessage(null)

        try {
            const response = await Fetcher.post('programs', new FormData(event.target))
            console.log(response)
        } catch (error) {
            setErrorMessage(error.message || 'Some error')
        }
    }

    return (
        <Form onSubmit={addProgram}>
            <Header size='large'>New Program</Header>

            <Form.Field>
                <label>Title</label>
                <input placeholder='Title' name='title'/>
            </Form.Field>
            
            <Form.TextArea label='Description' placeholder='Description' name='description' />

            <Form.Group>
                <Form.Field>
                    <DatePicker 
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        timeCaption="time"
                        dateFormat="MMMM dd, yyyy HH:mm"
                        name='startDate'
                    />
                </Form.Field>
                
                <span>_</span>

                <Form.Field>
                    <DatePicker 
                        selected={endDate}
                        onChange={date => setEndDate(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        timeCaption="time"
                        dateFormat="MMMM dd, yyyy HH:mm"
                        name='endDate'
                    />
                </Form.Field>
            </Form.Group>

            <ErrorMessage message={errorMessage}/>

            <Button type='submit'>Add Program</Button>
            
            <p>
                <a href='/programs'>Back to the list</a>
            </p>
        </Form>
    )
}
    

export default NewProgram
