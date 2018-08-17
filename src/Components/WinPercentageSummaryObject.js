import React from "react";
import Meter from 'grommet/components/Meter';
import Box from 'grommet/components/Box';
import Value from 'grommet/components/Value';
import Heading from 'grommet/components/Heading'


class WinPercentageSummaryObject extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (<Box responsive={false}
                     align='center'>
                <Heading strong={false}>
                    {this.props.Type}
                </Heading>
                {this.props.Total === 0 ? (<Box>
                    <Meter vertical={false}
                           type='arc'
                           value={0.00}
                    />
                    <Value value={0.00}
                           units='%'/>
                </Box>) : (<Box><Meter vertical={false}
                                       type='arc'
                                       value={(this.props.Win / this.props.Total * 100).toFixed(0)}
                                       colorIndex = {this.props.Win / this.props.Total * 100 >= 50? ('ok') : ('critical')}
                />
                    <Value value={(this.props.Win / this.props.Total * 100).toFixed(0)}
                           units='%'
                           colorIndex = {this.props.Win / this.props.Total * 100 >= 50? ('ok') : ('critical')}/>
                </Box>)}
            </Box>
        )
    }
}

export default WinPercentageSummaryObject;