import React from 'react'
import { slide as Menu } from 'react-burger-menu'
import PropTypes from 'prop-types';
import '../css/App.css';
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';

import 'react-accessible-accordion/dist/fancy-example.css';
import InsertSection from "./InsertSection";
import RaisedButton from 'material-ui/RaisedButton';

const style = {
    width: '230px'
};

class Slider extends React.Component {
    showSettings (event) {
        event.preventDefault();
    };

    constructor(props) {
        super(props);
        this.state = {
            selected: ''
        }

    };
 q
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
            onClick={() => this.onClick(image.Name)}/>;
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

    render () {

        const images = <div className="imgDiv">
            {this.createImages(this.props.heroes)}
        </div>

        return (
            <div>
                <Menu onStateChange = {this.props.onStateChange}>
                    <Accordion>
                        <AccordionItem>
                            <AccordionItemTitle className="accordion_title">
                                <text>Filter</text>
                                <i className="material-icons">expand_more</i>
                            </AccordionItemTitle>
                            <AccordionItemBody>
                                {images}
                                <RaisedButton label="Reset Filter" primary={true} style={style} onClick={this.props.handleResetFilter}/>
                            </AccordionItemBody>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionItemTitle className="accordion_title">
                                <text>Insert</text>
                                <i className="material-icons">expand_more</i>
                            </AccordionItemTitle>
                            <AccordionItemBody>
                                <InsertSection heroes = {this.props.heroes}
                                               maps = {this.props.maps} handleNewRecord = {this.props.handleNewRecord} />
                            </AccordionItemBody>
                        </AccordionItem>
                    </Accordion>
                </Menu>
            </div>
        );
    }
}

export default Slider;