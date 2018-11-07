import React from "react";
import { slide as Menu } from "react-burger-menu";
import "../css/App.css";
import {
  Accordion,
  AccordionItem,
  AccordionItemBody,
  AccordionItemTitle
} from "react-accessible-accordion";

import "react-accessible-accordion/dist/fancy-example.css";
import CompetitiveInsertSection from "./CompetitiveInsertSection";
import QuickplayInsertSection from "./QuickplayInsertSection";
import RaisedButton from "material-ui/RaisedButton";

const style = {
  width: "230px"
};

class Slider extends React.Component {
  showSettings(event) {
    event.preventDefault();
  }

  constructor(props) {
    super(props);
    this.state = {
      selected: ""
    };
  }

  createImage = image => {
    const imgSrc = require("../css/images/Icon-" +
      image.Name.toLowerCase() +
      ".png");
    return (
      <img
        src={imgSrc}
        width={"70px"}
        style={
          image.Name === this.state.selected
            ? { margin: "2px", padding: "2px", border: "3px solid green" }
            : { margin: "2px", padding: "2px", border: "3px solid gray" }
        }
        alt={image.Name}
        onClick={() => this.onClick(image.Name)}
      />
    );
  };

  onClick = name => {
    this.props.imgOnClick(name);
    this.setState({
      selected: name
    });
  };

  createImages = images => {
    return images.map(this.createImage);
  };

  render() {
    const images = (
      <div className="imgDiv">{this.createImages(this.props.heroes)}</div>
    );

    return (
      <div>
        <Menu onStateChange={this.props.onStateChange}>
          <Accordion>
            <AccordionItem>
              <AccordionItemTitle className="accordion_title">
                <text>Filter</text>
                <i className="material-icons">expand_more</i>
              </AccordionItemTitle>
              <AccordionItemBody>
                {images}
                <RaisedButton
                  label="Reset Filter"
                  primary={true}
                  style={style}
                  onClick={this.props.handleResetFilter}
                />
              </AccordionItemBody>
            </AccordionItem>
            <AccordionItem>
              <AccordionItemTitle className="accordion_title">
                <text>Insert Competitive</text>
                <i className="material-icons">expand_more</i>
              </AccordionItemTitle>
              <AccordionItemBody>
                <CompetitiveInsertSection
                  heroes={this.props.heroes}
                  maps={this.props.maps}
                  handleNewCompetitiveRecord={
                    this.props.handleNewCompetitiveRecord
                  }
                />
              </AccordionItemBody>
            </AccordionItem>
            <AccordionItem>
              <AccordionItemTitle className="accordion_title">
                <text>Insert Quickplay</text>
                <i className="material-icons">expand_more</i>
              </AccordionItemTitle>
              <AccordionItemBody>
                <QuickplayInsertSection
                  heroes={this.props.heroes}
                  maps={this.props.maps}
                  handleNewQuickplayRecord={this.props.handleNewQuickplayRecord}
                />
              </AccordionItemBody>
            </AccordionItem>
          </Accordion>
        </Menu>
      </div>
    );
  }
}

export default Slider;
