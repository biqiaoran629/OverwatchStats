import React from 'react';
import Box from 'grommet/components/Box';
import Sidebar from 'grommet/components/Sidebar';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Footer from 'grommet/components/Footer'
import Button from 'grommet/components/Button'
import User from 'grommet/components/icons/base/User'
import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import FilterIcon from 'grommet/components/icons/base/Filter'
import CompetitiveInsertSection from "./CompetitiveInsertSection";
import QuickplayInsertSection from "./QuickplayInsertSection";

class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: ''
        };
    }

    createImage = function (image) {
        const imgSrc = require('../css/images/Icon-' + image.Name.toLowerCase() + '.png');
        return <img
            src={imgSrc} width={'70px'}
            style={
                image.Name === this.state.selected ?
                    {margin: '2px', padding: '2px', border: '3px solid green'}
                    :
                    {margin: '2px', padding: '2px', border: '3px solid gray'}}
            alt={image.Name}
            onClick={() => this.onClick(image.Name)}/>
    }.bind(this);

    onClick = function (name) {
        this.props.imgOnClick(name);
        this.setState({
            selected: name
        });
    }.bind(this);

    createImages = function (images) {
        return images.map(this.createImage);
    }.bind(this);

    render() {
        const images = <div style={{margin:'15px', alignItems:'center'}}>
            {this.createImages(this.props.heroes)}
        </div>

        return (
            <Sidebar colorIndex='light-1'>
                <Header pad='medium'
                        justify='between'>
                    <Title>
                        Actions
                    </Title>
                </Header>
                <Box flex='grow'
                     justify='start'>
                    <Accordion>
                        <AccordionPanel heading='Filters'>
                            {images}
                            <Button icon={<FilterIcon />}
                                    label='Label'
                                    fill={false}
                                    onClick={this.props.handleResetFilter} />

                        </AccordionPanel>
                        <AccordionPanel heading='Insert Competitive Records'>
                            <CompetitiveInsertSection heroes = {this.props.heroes}
                                                      maps = {this.props.maps} handleNewCompetitiveRecord = {this.props.handleNewCompetitiveRecord} />
                        </AccordionPanel>
                        <AccordionPanel heading='Insert Quickplay Records'>
                            <QuickplayInsertSection heroes = {this.props.heroes}
                                                    maps = {this.props.maps} handleNewQuickplayRecord = {this.props.handleNewQuickplayRecord} />
                        </AccordionPanel>
                    </Accordion>
                </Box>
                <Footer pad='medium'>
                    <Button icon={<User />} />
                </Footer>
            </Sidebar>
        )
    }
}

export default SideBar;