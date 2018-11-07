import React from "react";
import ReactDataGrid, { Row } from "react-data-grid";
import update from "immutability-helper";
import axios from "axios";

// import ReactDataGridPlugins from 'react-data-grid/addons';

class RowRenderer extends React.Component {
  setScrollLeft = scrollBy => {
    // if you want freeze columns to work, you need to make sure you implement this as apass through
    this.row.setScrollLeft(scrollBy);
  };

  rowBackground =
    this.props.row.Result === "W" ? "green-background" : "red-background";

  render() {
    // here we are just changing the style
    // but we could replace this with anything we liked, cards, images, etc
    // usually though it will just be a matter of wrapping a div, and then calling back through to the grid
    return (
      <div>
        <Row
          ref={node => (this.row = node)}
          {...this.props}
          extraClasses={this.rowBackground}
        />
      </div>
    );
  }
}

class DataGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      originalRows: props.rows,
      rows: props.rows.slice(0)
    };
  }

  handleGridSort = (sortColumn, sortDirection) => {
    const comparer = (a, b) => {
      if (sortDirection === "ASC") {
        return a[sortColumn] > b[sortColumn] ? 1 : -1;
      } else if (sortDirection === "DESC") {
        return a[sortColumn] < b[sortColumn] ? 1 : -1;
      }
    };

    const rows =
      sortDirection === "NONE"
        ? this.state.originalRows.slice(0)
        : this.state.rows.sort(comparer);

    this.setState({ rows });
  };

  rowGetter = i => {
    return this.state.rows[i];
  };

  handleGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    let rows = this.state.rows.slice();

    for (let i = fromRow; i <= toRow; i++) {
      let rowToUpdate = rows[i];
      let updatedRow = update(rowToUpdate, { $merge: updated });
      rows[i] = updatedRow;
      //Competitive
      var id = rows[i]._id;
      if (rows[i].Season) {
        axios
          .put(`http://localhost:3001/competitive/${id}`, rows[i])
          .then(function(response) {
            console.log(response);
          })
          .catch(function(error) {
            console.log(error);
          });
      }
      //Quickplay
      else {
        axios
          .put(`http://localhost:3001/quickplay/${id}`, rows[i])
          .then(function(response) {
            console.log(response);
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    }

    this.setState({ rows });
  };

  render() {
    return (
      <ReactDataGrid
        enableCellSelect={false}
        enableCellEdit={false}
        columns={this.props.columns}
        rowGetter={this.rowGetter}
        rowsCount={this.props.rowsCount}
        minHeight={this.props.minHeight}
        onGridSort={this.handleGridSort}
        rowRenderer={RowRenderer}
        onGridRowsUpdated={this.handleGridRowsUpdated}
      />
    );
  }
}

export default DataGrid;
