import React, { useState, useEffect } from 'react'
import { Form, Header, Button } from 'semantic-ui-react'
import DatePicker from "react-datepicker"
import ErrorMessage from '../Messages/ErrorMessage'
import SuccessMessage from '../Messages/SuccessMessage'
import Fetcher from '../../helpers/Fetcher'
import "react-datepicker/dist/react-datepicker.css"
import { useParams } from 'react-router-dom'

const EditProgram = (data) => {
    const { id: programId } = useParams()

    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)
    const [program, setProgram] = useState({categories: []})

    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const fetchProgram = async () => {
        try {
            const item = await Fetcher.get(`programs/${programId}`)
            setProgram(item)
            setStartDate(new Date(item.startDate))
            setEndDate(new Date(item.endDate))
        } catch (error) {
            setErrorMessage(error.message || 'Some error getting the program')
        }
    }

    const saveProgram = async (event) => {
        event.preventDefault()
        setErrorMessage(null)
        setSuccessMessage(null)

        try {
            const form = event.target
            await Fetcher.put(`programs/${programId}`, new FormData(form))
            setSuccessMessage('Program successfully saved')
        } catch (error) {
            setErrorMessage(error.message || 'Some error')
        }
    }

    useEffect(() => {
        fetchProgram()
    }, [])

    return (
        <Form onSubmit={saveProgram}>
            <Header size='large'>Edit Program</Header>

            <Form.Field>
                <label>Title</label>
                <input placeholder='Title' name='title' defaultValue={program.title}/>
            </Form.Field>
            
            <Form.TextArea label='Description' placeholder='Description' name='description' defaultValue={program.description}/>

            <Form.Group>
                <Form.Field>
                    <DatePicker
                        autoComplete='off'
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
                        autoComplete='off'
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

            <Form.Field>
                <label>Categories</label>
                <input placeholder='Categories' name='categories' defaultValue={program.categories.join(', ')}/>
            </Form.Field>

            <ErrorMessage message={errorMessage}/>
            <SuccessMessage message={successMessage}/>

            <Button type='submit'>Save</Button>
            
            <p>
                <a href='/programs'>Back to the list</a>
            </p>
        </Form>
    )
}
    

export default EditProgram
