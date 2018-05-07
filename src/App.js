import React, { Component } from 'react';
import './css/App.css';
import DataGrid from './Components/DataGrid';
import Slider from './Components/SlideMenu';
import axios from 'axios';
import 'react-awesome-button/dist/themes/theme-blue.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar from 'material-ui/Snackbar';
import { PacmanLoader} from 'react-spinners';
import Paper from 'material-ui/Paper';
import {Tabs, Tab} from 'material-ui/Tabs';

const columns = [
    {
        key: 'id',
        name: 'Id',
        sortable: true
    },
    {
        key: 'Date',
        name: 'Date',
        sortable: true,
        editable: true
    }, {
        key: 'Map',
        name: 'Map',
        sortable: true
    }, {
        key: 'Character',
        name: 'Character',
        sortable: true,
        editable: true
    }, {
        key: 'Result',
        name: 'Result',
        editable: true,
        sortable: true
    }, {
        key: 'Season',
        name: 'Season',
        sortable: true,
        editable: true
    }, {
        key: 'Reason',
        name: 'Reason',
        sortable: true,
        editable: true
    }, {
        key: 'Rank',
        name: 'Rank',
        sortable: true,
        editable: true
    }, {
        key: 'SR',
        name: 'SR',
        editable: true,
        sortable: true
    }, {
        key: 'Diff',
        name: 'Diff',
        sortable: true,
        editable: true
    }];

const qpColumns = [
    {
        key: 'id',
        name: 'Id',
        sortable: true
    },
    {
        key: 'Date',
        name: 'Date',
        sortable: true
    }, {
        key: 'Map',
        name: 'Map',
        sortable: true,
        editable: true
    }, {
        key: 'Character',
        name: 'Character',
        sortable: true,
        editable: true
    }, {
        key: 'Result',
        name: 'Result',
        sortable: true,
        editable: true
    }, {
        key: 'Mode',
        name: 'Mode',
        sortable: true,
        editable: true
    }
];

class App extends Component {

    isMenuOpen = function(state) {
        this.setState({
            isSlideMenuOpen: state.isSlideMenuOpen
        })
    }.bind(this);

    handleSnackbarClose = function() {
        this.setState({
            showMsg: false
        })
    }.bind(this);

    onClickHandler = function(name) {
        console.log(name);
        this.setState({
            filter: name
        });
    }.bind(this);

    handleNewCompetitiveRecord = function(record) {
        record.id = this.state.competitiveStats.length + 1;
        this.setState({
            competitiveStats: [...this.state.competitiveStats, record],
            showMsg: true
        })
    }.bind(this);

    handleNewQuickplayRecord = function(record) {
        record.id = this.state.quickplayStats.length + 1;
        this.setState({
            quickplayStats: [...this.state.quickplayStats, record],
            showMsg: true
        })
    }.bind(this);

    onPressResetButton = function() {
        this.setState({
            filter: ''
        });
    }.bind(this);

    handleTabValueChange = function(value) {
        if (this.state.quickplayStats.length) {
            this.setState({
                tabValue: value
            })
        }
        else {
            axios.get(`http://localhost:3001/quickplay`)
                .then(res => {
                    this.setState({
                        quickplayStats: res.data,
                        tabValue: value
                    });
                });
        }
    }.bind(this);

    constructor(props){
        super(props);

        this.state = {
            competitiveStats: [],
            quickplayStats: [],
            filter: '',
            heroes: [],
            maps: [],
            isSlideMenuOpen: false,
            showMsg: false,
            loading: false,
            tabValue: "competitive"
        }
    }


    componentDidMount() {
        this.setState({
            loading: true
        });
        axios.all([
            axios.get(`http://localhost:3001/competitive`),
            axios.get(`http://localhost:3001/quickplay`),
            axios.get(`http://localhost:3001/heroes`),
            axios.get(`http://localhost:3001/maps`)
        ])
            .then(axios.spread((competitive, quickplay, heroes, maps) =>  {
                let i = 1;
                let competitivedata = competitive.data;
                competitivedata.forEach(function(obj) { obj.id = i++ });

                let j = 1;
                let quickplaydata = quickplay.data;
                quickplaydata.forEach(function(obj) { obj.id = j++ });

                this.setState({
                    competitiveStats: competitivedata,
                    quickplayStats: quickplaydata,
                    heroes: heroes.data,
                    maps: maps.data,
                    loading: false
                })
            }))
    }

    render() {

        let competitiveData = this.state.filter ? this.state.competitiveStats.filter(value => {
            return value.Character.toString().toLowerCase() === this.state.filter.toLowerCase()
        }) : this.state.competitiveStats;

        let qpData = this.state.filter ? this.state.quickplayStats.filter(value => {
            return value.Character.toString().toLowerCase() === this.state.filter.toLowerCase()
        }) : this.state.quickplayStats;

        let filteredData = this.state.tabValue === 'competitive' ? (competitiveData) : (qpData);

        const LoadingIcon = () => {
            return (<div style={{position: 'absolute', top: '40%', left: '40%'}}>
                <PacmanLoader
                    color={'#4A90E2'}
                    loading={true}
                    size={150}
                />
            </div>)
        }

        function CompetitiveSection(props) {
            return (<div>
                <div className= { props.isSlideMenuOpen ? ("tableWrapperOpen") : ("tableWrapper")}>
                    {props.rowCount === 0 ? ('') : (
                        <DataGrid
                            rows = {filteredData}
                            columns = {props.columns}
                            rowGetter = {props.rowGetter}
                            rowsCount = {props.rowCount}
                            minHeight = {props.minHeight}
                            onGridSort = {props.onGridSort}
                        />)}
                </div>
                <Snackbar
                    open={props.showMsg}
                    message="Insert Successful"
                    autoHideDuration={4000}
                    onRequestClose={props.handleSnackbarClose}
                />
            </div>)
        }

        function QuickplaySection(props) {
            return (<div>
                <div className= { props.isSlideMenuOpen ? ("tableWrapperOpen") : ("tableWrapper")}>
                    {props.rowCount === 0 ? ('') : (
                        <DataGrid
                            rows = {filteredData}
                            columns = {props.columns}
                            rowGetter = {props.rowGetter}
                            rowsCount = {props.rowCount}
                            minHeight = {props.minHeight}
                            onGridSort = {props.onGridSort}
                        />)}
                </div>
                <Snackbar
                    open={props.showMsg}
                    message="Insert Successful"
                    autoHideDuration={4000}
                    onRequestClose={props.handleSnackbarClose}
                />
            </div>)
        }

        return (
            <MuiThemeProvider>
                <div className="App-body">
                    <Slider onStateChange={ this.isMenuOpen }
                            heroes = {this.state.heroes}
                            imgOnClick={ (name) => this.onClickHandler(name)}
                            maps = {this.state.maps}
                            handleNewCompetitiveRecord={ (record) => this.handleNewCompetitiveRecord(record)}
                            handleNewQuickplayRecord={ (record) => this.handleNewQuickplayRecord(record)}
                            handleResetFilter={() => this.onPressResetButton()}/>
                    <header className="App-header">
                        <div>

                            <h1 className="App-title">Overwatch Stats Tracker</h1>
                        </div>
                    </header>
                    {this.state.loading ?
                        (
                            <LoadingIcon />
                        ) :
                        (
                            <div>
                                <Tabs
                                    value={this.state.tabValue}
                                    onChange={this.handleTabValueChange}
                                >
                                    <Tab label="Competitive" value="competitive">

                                        <CompetitiveSection isSlideMenuOpen = {this.state.isSlideMenuOpen}
                                                            columns = {columns}
                                                            rowCount = {filteredData.length}
                                                            minHeight = {600}
                                                            onRequestClose = {this.handleSnackbarClose}
                                                            showMsg = {this.state.showMsg}
                                        />
                                    </Tab>
                                    <Tab label="Quickplay" value="quickplay">
                                        <div>

                                            <QuickplaySection isSlideMenuOpen = {this.state.isSlideMenuOpen}
                                                              columns = {qpColumns}
                                                              rowCount = {filteredData.length}
                                                              minHeight = {600}
                                                              onRequestClose = {this.handleSnackbarClose}
                                                              showMsg = {this.state.showMsg}
                                            />
                                        </div>
                                    </Tab>
                                </Tabs>
                            </div>

                        )}
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
