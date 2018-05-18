import Footer from 'grommet/components/Footer';
import Title from 'grommet/components/Title';
import React from "react";
import Box from 'grommet/components/Box';
import Paragraph from 'grommet/components/Paragraph';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';

class FooterSection extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return <Footer justify='center'
                size='large'
                colorIndex='grey-1-a'
                align='center'
                >
            <Box direction='row'
                 align='center'
                 appCentered={true}
                 pad={{"between": "medium"}}>
                <Paragraph margin='none'>
                    © Overwatch App
                </Paragraph>
                <Menu direction='row'
                      size='small'
                      dropAlign={{"right": "right"}}>
                    <Anchor href='#'>
                        Support
                    </Anchor>
                    <Anchor href='#'>
                        Contact
                    </Anchor>
                    <Anchor href='#'>
                        About
                    </Anchor>
                </Menu>
            </Box>
        </Footer>
    }
}

export default FooterSection;