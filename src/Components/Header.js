import React from 'react';
import MyHeader from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import IconActions from 'grommet/components/icons/base/Actions'


class Header extends React.Component {

    constructor(props) {
        super(props);
        this.setState({});
    }

    render() {
        return (
            <MyHeader fixed={false}
                      float={false}
                      size='medium'
                      colorIndex='grey-1'>
                {/*<Title>*/}
                    {/*Welcome, Minjun!*/}
                {/*</Title>*/}
                {/*<Box flex={true}*/}
                     {/*justify='end'*/}
                     {/*direction='row'*/}
                     {/*responsive={false}>*/}
                    {/*<Menu icon={<IconActions />}*/}
                          {/*dropAlign={{"right": "right"}}>*/}
                        {/*<Anchor href='#'*/}
                                {/*className='active'>*/}
                            {/*First*/}
                        {/*</Anchor>*/}
                        {/*<Anchor href='#'>*/}
                            {/*Second*/}
                        {/*</Anchor>*/}
                        {/*<Anchor href='#'>*/}
                            {/*Third*/}
                        {/*</Anchor>*/}
                    {/*</Menu>*/}
                {/*</Box>*/}
            </MyHeader>
        )
    }
}

export default Header;