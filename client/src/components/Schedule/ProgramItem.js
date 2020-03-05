import React, { useState } from 'react'
import { List, Table } from 'semantic-ui-react'

const ProgramItem = ({ program }) => {
    return (
        <Table.Row>
            <Table.Cell>
                {program.title}
                <br/>
                <i>{program.description}</i>
            </Table.Cell>
            <Table.Cell>{program.categories}</Table.Cell>
            <Table.Cell>{program.startDate}</Table.Cell>
            <Table.Cell>{program.endDate}</Table.Cell>
            <Table.Cell>{program.duration}</Table.Cell>
        </Table.Row>
    )
}
    

export default ProgramItem
