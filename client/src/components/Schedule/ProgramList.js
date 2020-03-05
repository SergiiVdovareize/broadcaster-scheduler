import React, { useState, useEffect } from 'react'
import Fetcher from '../../helpers/Fetcher'
import ProgramItem from './ProgramItem'
import { Table, Button } from 'semantic-ui-react'

const ProgramList = () => {
    const [schedule, setSchedule] = useState([])

    const getProgramList = async () => {
        try {
            const list = await Fetcher.get('programs')
            setSchedule(list)
        } catch (error) {

        }
    }

    const handleRemoveProgram = async (programId) => {
        if (!programId || !window.confirm('Are you sure?')) {
            return false
        }

        try {
            await Fetcher.destroy(`programs/${programId}`)
            const list = [...schedule].filter(item => {
                return item._id !== programId
            })
            setSchedule(list)
        } catch (error) {
            console.log('some error during the program removing')
        }
    }

    useEffect(() => {
        getProgramList()
    }, [])

    return (
        <>
            <Table celled striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Program</Table.HeaderCell>
                        <Table.HeaderCell>categories</Table.HeaderCell>
                        <Table.HeaderCell>starts</Table.HeaderCell>
                        <Table.HeaderCell>ends</Table.HeaderCell>
                        <Table.HeaderCell>duration (min)</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {schedule.map((item, index) => (<ProgramItem 
                        key={index} 
                        program={item}
                        handleRemoveProgram={handleRemoveProgram}/>
                    ))}
                </Table.Body>
            </Table>

            <Button as='a' href='/programs/add'>Add program</Button>
        </>
    )
}
    

export default ProgramList
