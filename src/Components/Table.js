import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next';

const Table = ({ data, columns, rowStyle, rowEvents }) => {
    return (
        <BootstrapTable
            keyField='id'
            data={ data }
            columns={ columns }
            bordered={ false }
            rowStyle ={ rowStyle }
            rowEvents={ rowEvents }
            condensed/>
    )
}

export default Table;