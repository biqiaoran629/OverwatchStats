import React from 'react';
import Box from 'grommet/components/Box';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import axios from "axios/index";
import { BrowserRouter } from "react-router-dom"

const RowItem = (param) => {
    return (<TableRow justify='between'
                      separator='horizontal'>
            <td>
                {param.columnName}
            </td>
            <td>
                {(param.heroWinPercentage * 100).toFixed(2)}%
            </td>
            <td>
                {param.heroWin} - {param.heroLoss}
            </td>
            <td>
                {(param.totalWinPercentage*100).toFixed(2)}%
            </td>
            <td>
                {param.totalWin} - {param.totalLoss}
            </td>
        </TableRow>
    )
};

const RowItems = (param) => {
    var objArray = [];

    if (param.totalData.length > 0) {
        for (let i in param.maps) {
            let totalWin = param.totalData.find(element =>
                element._id.Map === param.maps[i].Name && element._id.Result === 'W'
            );
            totalWin = totalWin ? totalWin.total : 0;
            let totalLoss = param.totalData.find(element =>
                element._id.Map === param.maps[i].Name && element._id.Result === 'L'
            );
            totalLoss = totalLoss ? totalLoss.total : 0;
            let totalWinPercentage = totalWin === 0 ? 0 : totalWin / (totalWin + totalLoss);

            let heroWin = param.heroData.find(element =>
                element._id.Map === param.maps[i].Name && element._id.Result === 'W'
            );
            heroWin = heroWin ? heroWin.total : 0;
            let heroLoss = param.heroData.find(element =>
                element._id.Map === param.maps[i].Name && element._id.Result === 'L'
            );
            heroLoss = heroLoss ? heroLoss.total : 0;
            let heroWinPercentage = heroWin === 0 ? 0 : heroWin / (heroWin + heroLoss);


            objArray.push({
                columnName: param.maps[i].Name,
                totalWin: totalWin,
                totalLoss: totalLoss,
                totalWinPercentage: totalWinPercentage,
                heroWin: heroWin,
                heroLoss: heroLoss,
                heroWinPercentage: heroWinPercentage
            })
        }
    }

    return objArray.map(RowItem)

}


class IndividualHeroSummary extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            totalData: [],
            heroData: []
        };
    }

    componentDidMount() {
        axios.all([
            axios.post(`http://localhost:3001/quickplay/stats/` + this.props.match.params.id),
            axios.post(`http://localhost:3001/quickplay/stats`)
        ])
            .then(axios.spread((heroData, totalData) =>  {
                this.setState({
                    heroData: heroData.data,
                    totalData: totalData.data,
                })
            }))
    }

    createImage = function (image, history) {
        const imgSrc = require('../css/images/Icon-' + image.toLowerCase() + '.png');
        return <Box pad='large' justify='center' alignContent='center'>
            <img
                src={imgSrc} width={'100px'}
                alt={image}
                style={{border: '2px solid #ddd', borderRadius: '50%' ,alignSelf: 'center', cursor: 'pointer'}}
                onClick={history.goBack}
            />
        </Box>
    }.bind(this);


    render() {
        return (<Box full={true}>
                {this.createImage(this.props.match.params.id, this.props.history)}
                <Box direction='column'
                     justify='start'
                     align='stretch'
                     alignContent='center'
                     full={true}
                     textAlign='center'
                     pad='large'>
                <Table>
                    <thead>
                    <tr>
                        <th>
                            Map
                        </th>
                        <th>
                            {this.props.match.params.id}
                        </th>
                        <th>
                        </th>

                        <th>
                            Average
                        </th>
                        <th>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <RowItems maps = {this.props.maps} totalData = {this.state.totalData} heroData = {this.state.heroData} />
                    </tbody>
                </Table>
            </Box>
            </Box>
        )
    }
}

export default IndividualHeroSummary;