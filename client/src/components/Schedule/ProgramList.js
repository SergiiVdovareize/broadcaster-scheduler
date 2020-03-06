import React, { useState, useEffect } from 'react'
import Fetcher from '../../helpers/Fetcher'
import ProgramItem from './ProgramItem'
import { Table, Button } from 'semantic-ui-react'
import Toaster from '../../helpers/Toaster'
import PageHeader from './PageHeader'

const ProgramList = ({ setAuthStatus }) => {
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

            Toaster.success('Program successfully removed')
        } catch (error) {
            Toaster.error(error.message || 'some error during the program removing')
        }
    }

    useEffect(() => {
        getProgramList()
    }, [])

    return (
        <>
            <PageHeader title='Program List' setAuthStatus={setAuthStatus}/>
            
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

            <Button as='a' href='/programs/add' color='blue'>Add program</Button>
        </>
    )
}
    

export default ProgramList
