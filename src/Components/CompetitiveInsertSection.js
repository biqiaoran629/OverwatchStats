import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const rank = ["Bronze","Silver","Gold","Platinum","Diamond","Master","Grandmaster"]

const results = ["Win","Draw","Lose"]

const styles = {width: '230px', textAlign: 'left'};

let heroes, maps = [];

const style = {
    width: '230px'
};

class CompetitiveInsertSection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Map: '',
            Character: '',
            Result: '',
            Season: '',
            Reason: '',
            Rank: '',
            SR: '',
            Diff: '',
            seasonError:'',
            srDiffError:'',
            srError:''
        }
    }

    handleWinLoseSelect = function(index) {
        this.setState({
            Result: results[index]
        });
    }

    handleRankSelect = function(index) {
        this.setState({
            Rank: rank[index]
        });
    }

    handleHeroSelect = function(index) {
        this.setState({
            Character: heroes[index]
        });
    }

    handleMapSelect = function(index) {
        this.setState({
            Map: maps[index]
        });
    }

    handleInsert = function(func) {
        const today = new Date();
        const date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
        const newRecord = {
            Date: date,
            Map: this.state.Map,
            Character: this.state.Character,
            Result: this.state.Result.charAt(0),
            Season: this.state.Season,
            Reason: this.state.Reason,
            Rank: this.state.Rank,
            SR: this.state.SR,
            Diff: this.state.Diff
        }
        if (this.state.seasonError === '' && this.state.seasonError === '' && this.state.seasonError === '') {
            axios.post('http://localhost:3001/competitive', newRecord)
                .then(function (response) {
                    if (response.status === 200) {
                        func(newRecord);
                        this.setState({
                            seasonError:'',
                            srDiffError:'',
                            srError:'',
                        })
                    }

                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }.bind(this);

    render() {

        heroes = this.props.heroes.map(index => (
            index.Name
        ));

        maps = this.props.maps.map(index => (
            index.Name
        ));

        const isDisabled = this.state.seasonError !== '' || this.state.seasonError !== '' || this.state.seasonError !== '' || this.state.Map === ''
            || this.state.Character === '' || this.state.Result === '' || this.state.Season === '' || this.state.Rank === '';

        return (
            <MuiThemeProvider>
            <form noValidate autoComplete="off" style={{textAlign: 'center', marginBottom: '50px'}}>

                <SelectField floatingLabelText="Character" onChange={(evt, newIndex) => this.handleHeroSelect(newIndex)} value={this.state.Character}  style = {styles} labelStyle={{textAlign: 'left'}}>
                    {heroes.map(function(w, index){
                        return  <MenuItem value={w} primaryText={heroes[index]} />;
                    })}
                </SelectField>
                <br />
                <SelectField floatingLabelText="Map" onChange={(evt, newIndex) => this.handleMapSelect(newIndex)} value={this.state.Map}  style = {styles} labelStyle={{textAlign: 'left'}}>
                    {maps.map(function(w, index){
                        return  <MenuItem value={w} primaryText={maps[index]} />;
                    })}
                </SelectField>
                <br />
                <SelectField floatingLabelText="Result" onChange={(evt, newIndex) => this.handleWinLoseSelect(newIndex)} value={this.state.Result}  style = {styles} labelStyle={{textAlign: 'left'}}>
                    {results.map(function(w, index){
                        return  <MenuItem value={w} primaryText={results[index]} />;
                    })}
                </SelectField>
                <br />
                <TextField
                    style = {styles}
                    floatingLabelText="Season"
                    errorText={this.state.seasonError}
                    onChange={(event, newValue) => {
                        if (newValue && parseInt(newValue) == newValue) {
                            this.setState({
                                Season: newValue,
                                seasonError: ''
                            })
                        }
                        else if(!newValue) {
                            this.setState({ seasonError: 'You have to enter a season!' })
                        }
                        else {
                            this.setState({ seasonError: 'This field has to be a number!' })
                        }
                    }}
                />
                <br />
                <TextField
                    style = {styles}
                    hintText="e.g. Teammate throwing"
                    floatingLabelText="Reason"
                    onChange={(event, newValue) => this.setState({
                        Reason: newValue
                    })}
                />
                <br />
                <SelectField floatingLabelText="Rank" onChange={(evt, newIndex) => this.handleRankSelect(newIndex)} value={this.state.Rank}  style = {styles} labelStyle={{textAlign: 'left'}}>
                    {rank.map(function(w, index){
                        return  <MenuItem value={w} primaryText={rank[index]} />;
                    })}
                </SelectField>
                <br />
                <TextField
                    style = {styles}
                    hintText="Current SR"
                    floatingLabelText="SR"
                    errorText={this.state.srError}
                    onChange={(event, newValue) => {
                        if (parseInt(newValue) == newValue) {
                            this.setState({
                                SR: newValue,
                                srError: ''
                            })
                        }
                        else {
                            this.setState({ srError: 'This field has to be a number!' })
                        }
                    }}
                />
                <br />
                <TextField
                    style = {styles}
                    hintText="e.g. +25 or -25"
                    floatingLabelText="SR difference"
                    errorText={this.state.srDiffError}
                    onChange={(event, newValue) => {
                        if (parseInt(newValue) == newValue) {
                            this.setState({
                                Diff: newValue,
                                srDiffError: ''
                            })
                        }
                        else {
                            this.setState({ srDiffError: 'This field has to be a number!' })
                        }
                    }}
                />
                <br />
                <RaisedButton label="Insert"
                              primary={true}
                              style={style}
                              onClick={() => this.handleInsert(this.props.handleNewCompetitiveRecord)}
                              disabled={isDisabled}
                />
            </form>
            </MuiThemeProvider>

        );
    }
}

export default CompetitiveInsertSection;
