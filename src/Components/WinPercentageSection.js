import React from "react";
import Article from 'grommet/components/Article'
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading'
import WinPercentageObject from './WinPercentageObject'
import WinPercentageSummeryObject from './WinPercentageSummaryObject'

class WinPercentageSection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    winPercentageObjs = function(heroes, records) {
        let arr = [];
        for (var i in heroes) {
            var obj = {
                ImgSrc: require('../css/images/Icon-' +heroes[i].Name.toLowerCase() + '.png'),
                Name: heroes[i].Name,
                Type: heroes[i].Type,
                Win: 0,
                Loss: 0,
                Total: 0
            }
            arr[obj.Name] = obj;
        }
        for (var j in records) {
            if (records[j].Result === 'L') {
                arr[records[j].Character].Loss++;
            }
            else if (records[j].Result === 'W') {
                arr[records[j].Character].Win++;
            }
            arr[records[j].Character].Total++;
        }

        return Object.keys(arr).map((obj) => {
            return <WinPercentageObject image={<img src = {arr[obj].ImgSrc} />}
                                        Win = {arr[obj].Win}
                                        Loss = {arr[obj].Loss}
                                        Total = {arr[obj].Total}
            />
        })
    };

    summary = (heroes, records) => {
        let arr = [];
        let damageTotal = {
            Win: 0,
            Loss: 0,
            Total: 0
        };
        let tankTotal = {
            Win: 0,
            Loss: 0,
            Total: 0
        };

        let supportTotal = {
            Win: 0,
            Loss: 0,
            Total: 0
        };
        for (let i in heroes) {
            let obj = {
                ImgSrc: require('../css/images/Icon-' + heroes[i].Name.toLowerCase() + '.png'),
                Name: heroes[i].Name,
                Type: heroes[i].Type,
                Win: 0,
                Loss: 0,
                Total: 0
            }
            arr[obj.Name] = obj;
        }
        for (let j in records) {
            if (records[j].Result === 'L') {
                arr[records[j].Character].Loss++;
            }
            else if (records[j].Result === 'W') {
                arr[records[j].Character].Win++;
            }
            arr[records[j].Character].Total++;
        }

        for (let i in Object.keys(arr)) {
            switch (arr[Object.keys(arr)[i]].Type) {
                case 'Damage':
                    damageTotal.Win += arr[Object.keys(arr)[i]].Win;
                    damageTotal.Loss += arr[Object.keys(arr)[i]].Loss;
                    damageTotal.Total += arr[Object.keys(arr)[i]].Total;
                    break;
                case 'Tank':
                    tankTotal.Win += arr[Object.keys(arr)[i]].Win;
                    tankTotal.Loss += arr[Object.keys(arr)[i]].Loss;
                    tankTotal.Total += arr[Object.keys(arr)[i]].Total;
                    break;
                case 'Support':
                    supportTotal.Win += arr[Object.keys(arr)[i]].Win;
                    supportTotal.Loss += arr[Object.keys(arr)[i]].Loss;
                    supportTotal.Total += arr[Object.keys(arr)[i]].Total;
                    break;
            }
        }
        return <Box direction='row'>
            <WinPercentageSummeryObject Win = {damageTotal.Win}
                                        Type = 'Damage'
                                        Total = {damageTotal.Total}/>
            <WinPercentageSummeryObject Win = {tankTotal.Win}
                                        Type = 'Tank'
                                        Total = {tankTotal.Total}/>
            <WinPercentageSummeryObject Win = {supportTotal.Win}
                                        Type = 'Support'
                                        Total = {supportTotal.Total}/>
        </Box>
    }


    render() {

        return (
            <Article>
                <Box
                    direction='column'
                    pad='small'
                    justify='center'
                    colorIndex='grey-1'
                    align='center'>
                    <Heading strong={true}
                             uppercase={true}
                             truncate={false}
                             tag='h3'>
                        Competitive Section
                    </Heading>
                    {this.summary(this.props.heroes, this.props.competitiveFilteredData)}
                </Box>
                <Box direction='row'
                     pad='large'
                     justify='center'
                     align='center'
                     colorIndex='accent-2-a'
                     wrap={true}>
                    {this.winPercentageObjs(this.props.heroes, this.props.competitiveFilteredData)}
                </Box>
                <Box
                    direction='column'
                    pad='small'
                    justify='center'
                    colorIndex='grey-1'
                    align='center'>
                    <Heading strong={true}
                             uppercase={true}
                             truncate={false}
                             tag='h3'>
                        Quickplay Section
                    </Heading>
                    {this.summary(this.props.heroes, this.props.quickplayFilteredData)}
                </Box>
                <Box direction='row'
                     pad='large'
                     justify='center'
                     align='center'
                     colorIndex='accent-2-a'
                     wrap={true}>
                    {this.winPercentageObjs(this.props.heroes, this.props.quickplayFilteredData)}
                </Box>
            </Article>
        )
    }


}

export default WinPercentageSection;