import React from "react";
import Box from "grommet/components/Box";
import Value from "grommet/components/Value";
import Meter from "grommet/components/Meter";
import Linkup from "grommet/components/icons/base/LinkUp";
import LinkDown from "grommet/components/icons/base/LinkDown";
import Flag from "grommet/components/icons/base/Flag";

class WinPercentageObject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Box pad="small" justify="center" align="center">
        <Box>{this.props.image}</Box>
        <Box direction="row" justify="center" align="center" wrap={true}>
          <Box pad="small">
            <Value
              value={this.props.Win}
              icon={<Linkup colorIndex="ok" />}
              colorIndex="ok"
              label="Win"
            />
          </Box>
          <Box pad="small">
            <Value
              value={this.props.Loss}
              icon={<LinkDown colorIndex="critical" />}
              colorIndex="critical"
              label="Lose"
            />
          </Box>
          <Box pad="small">
            <Value
              value={this.props.Total}
              icon={<Flag colorIndex="warning" />}
              colorIndex="warning"
              label="Total"
            />
          </Box>
        </Box>
        {this.props.Total === 0 ? (
          <Box responsive={false} align="center">
            <Meter vertical={false} type="arc" size="xsmall" value={0} />
            <Value value={0} units="%" />
          </Box>
        ) : (
          <Box responsive={false} align="center">
            <Meter
              vertical={false}
              type="arc"
              size="xsmall"
              value={((this.props.Win / this.props.Total) * 100).toFixed(0)}
              colorIndex={
                (this.props.Win / this.props.Total) * 100 >= 50
                  ? "ok"
                  : "critical"
              }
            />
            <Value
              value={((this.props.Win / this.props.Total) * 100).toFixed(0)}
              units="%"
              colorIndex={
                (this.props.Win / this.props.Total) * 100 >= 50
                  ? "ok"
                  : "critical"
              }
            />
          </Box>
        )}
      </Box>
    );
  }
}

export default WinPercentageObject;
