import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next';

const Table = ({ data, columns, rowStyle }) => {
    return (
        <BootstrapTable
            keyField='id'
            data={ data }
            columns={ columns }
            bordered={ false }
            rowStyle ={ rowStyle }
            condensed/>
    )
}

export default Table;