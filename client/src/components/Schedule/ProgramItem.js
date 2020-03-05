import React from 'react'
import { Table, Button } from 'semantic-ui-react'
import DateFormatter from '../../helpers/DateFormatter'

const ProgramItem = ({ program, handleRemoveProgram }) => {
    return (
        <Table.Row>
            <Table.Cell>
                {program.title}
                <br/>
                <i>{program.description}</i>
            </Table.Cell>
            <Table.Cell>{program.categories}</Table.Cell>
            <Table.Cell>{DateFormatter.humanize(program.startDate)}</Table.Cell>
            <Table.Cell>{DateFormatter.humanize(program.endDate)}</Table.Cell>
            <Table.Cell>{Math.ceil(program.duration / 60)}</Table.Cell>
            <Table.Cell>
                <Button basic color='red' compact onClick={handleRemoveProgram.bind(null, program._id)}>Remove</Button>
            </Table.Cell>
        </Table.Row>
    )
}
    

export default ProgramItem
