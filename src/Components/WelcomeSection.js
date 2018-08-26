import React from 'react';
import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';
import Paragraph from 'grommet/components/Paragraph';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import IndividualHeroSummary from './IndividualHeroSummary';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class WelcomeSection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    createImage = function (image) {
        const imgSrc = require('../css/images/Icon-' + image.Name.toLowerCase() + '.png');
        return <Box margin='small'>
            <Link to={image.Name}>
            <img
            src={imgSrc} width={'100px'}
            alt={image.Name}
            style={{border: '2px solid #ddd', borderRadius: '50%' }}
            />
            </Link>
        </Box>
    }.bind(this);

    createImages = function (images) {
        return images.map(this.createImage);
    }.bind(this);


    render() {

        const images = () => {return <Section
                full={true}
                colorIndex='accent-2-a'
                pad='large'
                justify='start'
                align='center'
            >
                <Heading size='xlarge' strong={true} uppercase={true}>Overwatch Statistics App</Heading>
                <Paragraph align='center' size='large'>
                    Record your stats and see how you do with each hero!
                </Paragraph>
                <Box direction='row'
                     justify='center'
                     align='center'
                     wrap={true}
                     pad='large'>
                    {this.createImages(this.props.heroes)}
                </Box>
            </Section>
};

        return (
            <Article>
                <Route path="/" exact component={images} />
                <Route path="/:id" exact render={( {match, history} )=> <Section
                    full={true}
                    colorIndex='accent-2-a'
                    pad='large'
                    justify='start'
                    align='center'
                ><IndividualHeroSummary match={match} history={history} maps={this.props.maps}/></Section>}/>
            </Article>
        )
    }
}

export default WelcomeSection;