import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createVacation } from "../../ducks/vacations";
import {
  View,
  Panel,
  PanelHeader,
  Button,
  SelectMimicry,
  FormLayout
} from "@vkontakte/vkui";
import vkuiConnect from "@vkontakte/vkui-connect";
import "./MainFork.css";

import FindJob from "./FindJob";
import ExtendedFilters from "./ExtendedFilters";
import JobPage from "./JobPage";
import CreateVacation from "./CreateVacation";

class MainFork extends Component {
  static propTypes = {
    id: PropTypes.string,
    selectCity: PropTypes.object.isRequired
  };

  state = {
    activePanel: "mainfork",
    history: ["mainfork"],
    selected: null,
    createJobValues: {},
    popout: null
  };

  goBack = () => {
    const history = [...this.state.history];
    history.pop();
    const activePanel = history[history.length - 1];
    if (activePanel === "mainfork") {
      vkuiConnect.send("VKWebAppDisableSwipeBack");
    }
    this.setState({ history, activePanel });
  };

  goForward = activePanel => {
    const history = [...this.state.history];
    history.push(activePanel);
    if (this.state.activePanel === "mainfork") {
      vkuiConnect.send("VKWebAppEnableSwipeBack");
    }
    this.setState({ history, activePanel });
  };

  goToCityView = () => {
    this.props.goToView("selectcity");
  };

  goToFindJob = () => {
    this.goForward("findjob");
  };

  handleCellClick = selected => {
    this.setState({ selected });
    this.goForward("jobpage");
  };

  goToGiveJob = () => this.goForward("createvacation");

  handleExtendedFiltersSubmit = fields => {
    this.goBack();
  };

  handleCreateJobValuesChange = values => {
    //this.props.createVacation(values);
    //this.setState({createJobValues: values});
  };

  handlePopuotChange = popout => this.setState({ popout });

  render() {
    const { id } = this.props;
    const { activePanel } = this.state;

    return (
      <View id={id} activePanel={activePanel} popout={this.state.popout}>
        <Panel id="mainfork">
          <PanelHeader>Работа</PanelHeader>
          <div className="mainfork">
            <div className="mainfork-wrapper">
              <Button size="xl" onClick={this.goToFindJob} stretched>
                Ищу работу
              </Button>
              <Button
                size="xl"
                onClick={this.goToGiveJob}
                level="outline"
                stretched
              >
                Даю работу
              </Button>
              <FormLayout>
                <SelectMimicry
                  top="Откуда вы?"
                  placeholder="Выберите город"
                  onClick={this.goToCityView}
                >
                  {this.props.selectedCity.title}
                </SelectMimicry>
              </FormLayout>
            </div>
          </div>
        </Panel>
        <FindJob
          id="findjob"
          goBack={this.goBack}
          goToPanel={this.goForward}
          handleCellClick={this.handleCellClick}
          selectedCity={this.props.selectedCity}
        />
        <ExtendedFilters
          id="extendedfilters"
          goBack={this.goBack}
          handleFormSubmit={this.handleExtendedFiltersSubmit}
        />
        <JobPage
          id="jobpage"
          goBack={this.goBack}
          goToPanel={this.goForward}
          entity={this.state.selected}
        />
        <CreateVacation
          id="createvacation"
          goBack={this.goBack}
          handleValuesUpdate={this.handleCreateJobValuesChange}
          initialValues={this.state.createJobValues}
          user={this.props.user}
          handlePopuotChange={this.handlePopuotChange}
          selectedCity={this.props.selectedCity}
        />
      </View>
    );
  }
}

export default connect(
  state => {
    return {};
  },
  {
    createVacation
  }
)(MainFork);
