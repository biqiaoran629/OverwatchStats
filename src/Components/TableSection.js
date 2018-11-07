import React from "react";
import Split from "grommet/components/Split";
import Tab from "grommet/components/Tab";
import Tabs from "grommet/components/Tabs";
import SideBar from "./SideBar";
import DataGrid from "./DataGrid";

// import Snackbar from 'material-ui/Snackbar';

class tableSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    function CompetitiveSection(props) {
      return (
        <div>
          <DataGrid
            rows={props.filteredData}
            columns={props.columns}
            rowGetter={props.rowGetter}
            rowsCount={props.rowCount}
            minHeight={props.minHeight}
            onGridSort={props.onGridSort}
          />
        </div>
      );
    }

    function QuickplaySection(props) {
      return (
        <div>
          <DataGrid
            rows={props.filteredData}
            columns={props.columns}
            rowGetter={props.rowGetter}
            rowsCount={props.rowCount}
            minHeight={props.minHeight}
            onGridSort={props.onGridSort}
          />
        </div>
      );
    }

    return (
      <Split separator={true} flex="right">
        <SideBar
          imgOnClick={this.props.imgOnClick}
          maps={this.props.maps}
          heroes={this.props.heroes}
          handleNewCompetitiveRecord={this.props.handleNewCompetitiveRecord}
          handleNewQuickplayRecord={this.props.handleNewQuickplayRecord}
          handleResetFilter={this.props.handleResetFilter}
        />
        <Tabs>
          <Tab title="Competitive Section">
            <CompetitiveSection
              filteredData={this.props.competitiveFilteredData}
              columns={this.props.columns}
              rowCount={this.props.competitiveFilteredData.length}
              minHeight="92vh"
              onRequestClose={this.props.onRequestClose}
              showMsg={this.props.showMsg}
            />
          </Tab>
          <Tab title="Quickplay Section">
            <QuickplaySection
              filteredData={this.props.quickplayFilteredData}
              columns={this.props.qpColumns}
              rowCount={this.props.quickplayFilteredData.length}
              minHeight="92vh"
              onRequestClose={this.props.onRequestClose}
              showMsg={this.props.showMsg}
            />
          </Tab>
        </Tabs>
      </Split>
    );
  }
}

export default tableSection;
