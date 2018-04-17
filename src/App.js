import React, { Component } from 'react';
import './css/App.css';
import Table from './Components/Table';
import Slider from './Components/SlideMenu';
import axios from 'axios';
import 'react-awesome-button/dist/themes/theme-blue.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar from 'material-ui/Snackbar';
import { PacmanLoader} from 'react-spinners';

const columns = [{
    dataField: 'Date',
    text: 'Date',
    sort: true,
    headerStyle: {
        backgroundColor: '#f4eef1'
    }
}, {
    dataField: 'Map',
    text: 'Map',
    sort: true,
    headerStyle: {
        backgroundColor: '#f4eef1'
    }
}, {
    dataField: 'Character',
    text: 'Character',
    sort: true,
    headerStyle: {
        backgroundColor: '#f4eef1'
    }
}, {
    dataField: 'Result',
    text: 'Result',
    sort: true,
    headerStyle: {
        backgroundColor: '#f4eef1'
    }
}, {
    dataField: 'Season',
    text: 'Season',
    sort: true,
    headerStyle: {
        backgroundColor: '#f4eef1'
    }
}, {
    dataField: 'Reason',
    text: 'Reason',
    sort: true,
    headerStyle: {
        backgroundColor: '#f4eef1'
    }
}, {
    dataField: 'Rank',
    text: 'Rank',
    sort: true,
    headerStyle: {
        backgroundColor: '#f4eef1'
    }
}, {
    dataField: 'SR',
    text: 'SR',
    sort: true,
    headerStyle: {
        backgroundColor: '#f4eef1'
    }
}, {
    dataField: 'Diff',
    text: 'Diff',
    sort: true,
    headerStyle: {
        backgroundColor: '#f4eef1'
    }
}];

const rowStyle = (row, rowIndex) => {
    const style = {};
    if (row.Result === 'W') {
        if (rowIndex % 2) {
            style.backgroundColor = '#E8F5E9';
        }
        else {
            style.backgroundColor = '#C8E6C9';
        }
    }
    else if (row.Result === 'L') {
        if (rowIndex % 2) {
            style.backgroundColor = '#FFEBEE';
        }
        else {
            style.backgroundColor = '#FFCDD2';
        }
    }
    else {
        style.backgroundColor = '#FFFDE7';
    }

    return style;
};

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

    handleNewRecord = function(record) {
        this.setState({
            competitiveStats: [...this.state.competitiveStats, record],
            showMsg: true
        })
    }.bind(this);

    onPressResetButton = function() {
        this.setState({
            filter: ''
        });
    }.bind(this);

    constructor(props){
        super(props);

        this.state = {
            competitiveStats: [],
            filter: '',
            heroes: [],
            maps: [],
            isSlideMenuOpen: false,
            showMsg: false,
            loading: false
        }
    }


    componentDidMount() {
        this.setState({
            loading: true
        });
        axios.get(`http://localhost:3001/competitive`)
            .then(res => {
                this.setState({ competitiveStats: res.data });
            });
        axios.get(`http://localhost:3001/heroes`)
            .then(res => {
                this.setState({ heroes: res.data });
            });
        axios.get(`http://localhost:3001/maps`)
            .then(res => {
                this.setState({
                    maps: res.data,
                    loading: false
                })
            });
    }

    render() {
        let filteredData = this.state.filter ? this.state.competitiveStats.filter(value => {
            return value.Character.toString().toLowerCase() === this.state.filter.toLowerCase()
        }) : this.state.competitiveStats;

        return (
            <MuiThemeProvider>
                <div className="App-body">
                    <Slider onStateChange={ this.isMenuOpen }
                            heroes = {this.state.heroes}
                            imgOnClick={ (name) => this.onClickHandler(name)}
                            maps = {this.state.maps}
                            handleNewRecord={ (record) => this.handleNewRecord(record)}
                            handleResetFilter={() => this.onPressResetButton()}/>
                    <header className="App-header">
                        <h1 className="App-title">Welcome to Overwatch Stats Tracker</h1>
                    </header>
                    {this.state.loading ?
                        (
                            <div style={{position:'absolute', top: '40%', left: '40%'}}>
                                <PacmanLoader
                                    color={'#4A90E2'}
                                    loading={true}
                                    size={150}
                                />
                            </div>
                        ) :
                        (
                            <div>
                                <div className= { this.state.isSlideMenuOpen ? ("tableWrapperOpen") : ("tableWrapper")}>
                                    <Table data = {filteredData} columns = {columns} rowStyle = {rowStyle}/>
                                </div>
                                <Snackbar
                                    open={this.state.showMsg}
                                    message="Insert Successful"
                                    autoHideDuration={4000}
                                    onRequestClose={this.handleSnackbarClose}
                                />
                            </div>
                        )}
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
