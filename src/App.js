import React, { Component } from "react";
import "./css/App.css";
import axios from "axios";
import "react-awesome-button/dist/themes/theme-blue.css";
import MainApp from "grommet/components/App";
import MyHeader from "./Components/Header";
import WelcomeSection from "./Components/WelcomeSection";
import TableSection from "./Components/TableSection";
import FooterSection from "./Components/Footer";
import WinPercentageSection from "./Components/WinPercentageSection";
import Toast from "grommet/components/Toast";
import { BrowserRouter as Router } from "react-router-dom";

const columns = [
  {
    key: "id",
    name: "Id",
    sortable: true
  },
  {
    key: "Date",
    name: "Date",
    sortable: true,
    editable: true
  },
  {
    key: "Map",
    name: "Map",
    sortable: true
  },
  {
    key: "Character",
    name: "Character",
    sortable: true,
    editable: true
  },
  {
    key: "Result",
    name: "Result",
    editable: true,
    sortable: true
  },
  {
    key: "Season",
    name: "Season",
    sortable: true,
    editable: true
  },
  {
    key: "Reason",
    name: "Reason",
    sortable: true,
    editable: true
  },
  {
    key: "Rank",
    name: "Rank",
    sortable: true,
    editable: true
  },
  {
    key: "SR",
    name: "SR",
    editable: true,
    sortable: true
  },
  {
    key: "Diff",
    name: "Diff",
    sortable: true,
    editable: true
  }
];

const qpColumns = [
  {
    key: "id",
    name: "Id",
    sortable: true
  },
  {
    key: "Date",
    name: "Date",
    sortable: true
  },
  {
    key: "Map",
    name: "Map",
    sortable: true,
    editable: true
  },
  {
    key: "Character",
    name: "Character",
    sortable: true,
    editable: true
  },
  {
    key: "Result",
    name: "Result",
    sortable: true,
    editable: true
  },
  {
    key: "Mode",
    name: "Mode",
    sortable: true,
    editable: true
  }
];

class App extends Component {
  isMenuOpen = state => {
    this.setState({
      isSlideMenuOpen: state.isSlideMenuOpen
    });
  };

  handleSnackbarClose = () => {
    this.setState({
      showMsg: false
    });
  };

  onClickHandler = name => {
    console.log(name);
    this.setState({
      filter: name
    });
  };

  handleNewCompetitiveRecord = record => {
    record.id = this.state.competitiveStats.length + 1;
    this.setState({
      competitiveStats: [...this.state.competitiveStats, record],
      showMsg: true
    });
  };

  handleNewQuickplayRecord = record => {
    record.id = this.state.quickplayStats.length + 1;
    this.setState({
      quickplayStats: [...this.state.quickplayStats, record],
      showMsg: true
    });
  };

  onPressResetButton = () => {
    this.setState({
      filter: ""
    });
  };

  handleTabValueChange = value => {
    if (this.state.quickplayStats.length) {
      this.setState({
        tabValue: value
      });
    } else {
      axios.get(`http://localhost:3001/quickplay`).then(res => {
        this.setState({
          quickplayStats: res.data,
          tabValue: value
        });
      });
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      competitiveStats: [],
      quickplayStats: [],
      filter: "",
      heroes: [],
      maps: [],
      isSlideMenuOpen: false,
      showMsg: false,
      loading: false,
      tabValue: "competitive"
    };
  }

  componentDidMount() {
    this.setState({
      loading: true
    });
    axios
      .all([
        axios.get(`/competitive`),
        axios.get(`/quickplay`),
        axios.get(`/heroes`),
        axios.get(`/maps`)
      ])
      .then(
        axios.spread((competitive, quickplay, heroes, maps) => {
          let i = 1;
          let competitivedata = competitive.data;
          competitivedata.forEach(function(obj) {
            obj.id = i++;
          });

          let j = 1;
          let quickplaydata = quickplay.data;
          quickplaydata.forEach(function(obj) {
            obj.id = j++;
          });

          this.setState({
            competitiveStats: competitivedata,
            quickplayStats: quickplaydata,
            heroes: heroes.data,
            maps: maps.data,
            loading: false
          });
        })
      );
  }

  render() {
    let competitiveData = this.state.filter
      ? this.state.competitiveStats.filter(value => {
          return (
            value.Character.toString().toLowerCase() ===
            this.state.filter.toLowerCase()
          );
        })
      : this.state.competitiveStats;

    let qpData = this.state.filter
      ? this.state.quickplayStats.filter(value => {
          return (
            value.Character.toString().toLowerCase() ===
            this.state.filter.toLowerCase()
          );
        })
      : this.state.quickplayStats;

    return (
      <Router>
        <MainApp centered={false}>
          <MyHeader />
          <WelcomeSection heroes={this.state.heroes} maps={this.state.maps} />
          {this.state.showMsg ? (
            <Toast status="ok" onClose={this.handleSnackbarClose}>
              Insert Successful!
            </Toast>
          ) : (
            ""
          )}
          <WinPercentageSection
            maps={this.state.maps}
            heroes={this.state.heroes}
            competitiveFilteredData={competitiveData}
            quickplayFilteredData={qpData}
          />
          <TableSection
            imgOnClick={name => this.onClickHandler(name)}
            maps={this.state.maps}
            heroes={this.state.heroes}
            handleNewCompetitiveRecord={record =>
              this.handleNewCompetitiveRecord(record)
            }
            handleNewQuickplayRecord={record =>
              this.handleNewQuickplayRecord(record)
            }
            handleResetFilter={() => this.onPressResetButton()}
            competitiveFilteredData={competitiveData}
            quickplayFilteredData={qpData}
            columns={columns}
            qpColumns={qpColumns}
            minHeight={600}
          />
          <FooterSection />
        </MainApp>
      </Router>
    );
  }
}

export default App;
