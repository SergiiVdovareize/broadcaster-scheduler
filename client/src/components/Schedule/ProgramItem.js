import React, { useState } from 'react'
import { Table } from 'semantic-ui-react'
import DateFormatter from '../../helpers/DateFormatter'

const ProgramItem = ({ program }) => {
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
        </Table.Row>
    )
}
    

export default ProgramItem
