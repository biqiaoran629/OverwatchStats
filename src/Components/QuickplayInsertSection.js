import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';

const rank = ["Bronze","Silver","Gold","Platinum","Diamond","Master","Grandmaster"]

const results = ["Win","Draw","Lose"]

const modes = ["Attack","Defense","N/A"]

const styles = {width: '230px', textAlign: 'left'};

let heroes, maps = [];

const style = {
    width: '230px'
};

class QuickplayInsertSection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Map: '',
            Character: '',
            Result: '',
            Season: '',
            Mode: ''
        }
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

    handleModeSelect = function(index) {
        this.setState({
            Mode: modes[index]
        });
    }

    handleWinLoseSelect = function(index) {
        this.setState({
            Result: results[index]
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
            Mode: this.state.Mode
        }
            axios.post('http://localhost:3001/quickplay', newRecord)
                .then(function (response) {
                    if (response.status === 200) {
                        func(newRecord);
                    }

                })
                .catch(function (error) {
                    console.log(error);
                });

    }.bind(this);

    render() {

        heroes = this.props.heroes.map(index => (
            index.Name
        ));

        maps = this.props.maps.map(index => (
            index.Name
        ));

        const isDisabled =  this.state.Map === '' || this.state.Character === '' || this.state.Result === '' || this.state.Mode === '' ;

        return (
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
                <SelectField floatingLabelText="Mode" onChange={(evt, newIndex) => this.handleModeSelect(newIndex)} value={this.state.Mode}  style = {styles} labelStyle={{textAlign: 'left'}}>
                    {modes.map(function(w, index){
                        return  <MenuItem value={w} primaryText={modes[index]} />;
                    })}
                </SelectField>
                <br />
                <RaisedButton label="Insert"
                              primary={true}
                              style={style}
                              onClick={() => this.handleInsert(this.props.handleNewQuickplayRecord)}
                              disabled={isDisabled}
                />
            </form>
        );
    }
}

export default QuickplayInsertSection;
