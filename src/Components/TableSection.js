import React from "react";
import Split from 'grommet/components/Split';
import Section from 'grommet/components/Section';
import Paragraph from 'grommet/components/Paragraph';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading'
import Article from 'grommet/components/Article'
import Tab from 'grommet/components/Tab'
import Tabs from 'grommet/components/Tabs'
import SideBar from './SideBar'
import DataGrid from './DataGrid';
// import Snackbar from 'material-ui/Snackbar';

class tableSection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {

        function CompetitiveSection(props) {
            return (<div>
                <DataGrid
                    rows = {props.filteredData}
                    columns = {props.columns}
                    rowGetter = {props.rowGetter}
                    rowsCount = {props.rowCount}
                    minHeight = {props.minHeight}
                    onGridSort = {props.onGridSort}
                />
                {/*<Snackbar*/}
                    {/*open={props.showMsg}*/}
                    {/*message="Insert Successful"*/}
                    {/*autoHideDuration={4000}*/}
                    {/*onRequestClose={props.handleSnackbarClose}*/}
                {/*/>*/}
            </div>)
        }

        function QuickplaySection(props) {
            return (<div>
                <DataGrid
                    rows = {props.filteredData}
                    columns = {props.columns}
                    rowGetter = {props.rowGetter}
                    rowsCount = {props.rowCount}
                    minHeight = {props.minHeight}
                    onGridSort = {props.onGridSort}
                />

                {/*<Snackbar*/}
                    {/*open={props.showMsg}*/}
                    {/*message="Insert Successful"*/}
                    {/*autoHideDuration={4000}*/}
                    {/*onRequestClose={props.handleSnackbarClose}*/}
                {/*/>*/}
            </div>)
        }

        return (
            <Split separator={true} flex='right'>
                <SideBar imgOnClick={this.props.imgOnClick}
                         maps = {this.props.maps}
                         heroes = {this.props.heroes}
                         handleNewCompetitiveRecord={this.props.handleNewCompetitiveRecord}
                         handleNewQuickplayRecord={this.props.handleNewQuickplayRecord}
                         handleResetFilter={this.props.handleResetFilter}/>
                    <Tabs>
                        <Tab title='Competitive Section'>
                            <CompetitiveSection
                            filteredData = {this.props.competitiveFilteredData}
                            columns = {this.props.columns}
                            rowCount = {this.props.competitiveFilteredData.length}
                            minHeight = '93vh'
                            onRequestClose = {this.props.onRequestClose}
                            showMsg = {this.props.showMsg}
                            />
                        </Tab>
                        <Tab title='Quickplay Section'>
                            <QuickplaySection
                                filteredData = {this.props.quickplayFilteredData}
                                columns = {this.props.qpColumns}
                                rowCount = {this.props.quickplayFilteredData.length}
                                minHeight = '93vh'
                                onRequestClose = {this.props.onRequestClose}
                                showMsg = {this.props.showMsg}
                            />
                        </Tab>
                    </Tabs>
            </Split>

        )
    }
}

export default tableSection;