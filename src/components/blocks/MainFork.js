import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createVacation } from "../../ducks/vacations";
import { initialVkUserEntitySelector } from '../../ducks/user';
import {
  View,
  Panel,
  PanelHeader,
  Button,
  SelectMimicry,
  FormLayout,
  Group
} from "@vkontakte/vkui";
import Icon24User from '@vkontakte/icons/dist/24/user';
import vkuiConnect from "@vkontakte/vkui-connect";
import "./MainFork.css";

import {
  additionalPanel,
  userVacations,
  vacationsForModerators,
  accountVacation,
  rejectVacation
} from './Account/routes';

import FindJob from "./FindJob";
import ExtendedFilters from "./ExtendedFilters";
import JobPage from "./JobPage";
import CreateVacation from "./CreateVacation";
import Account from './Account';
import Additional from './Account/Additional';
import AccountVacations from './Account/AccountVacations';
import VacationsForModerators from './Account/VacationsForModerators';
import AccountVacation from './Account/AccountVacation';
import VacationReject from './Account/VacationReject';

const account = 'account';

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
    popout: null,
    selectedAccountVacation: null,
    rejectedVacation: null
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
  goToAccountData = () => this.goForward(account);

  handleExtendedFiltersSubmit = fields => {
    this.goBack();
  };

  handleAccountCellClick = (vacation) => {
    this.goForward(accountVacation);
    this.setState({ selectedAccountVacation: vacation });
  }

  handleCreateJobValuesChange = values => {
    //this.props.createVacation(values);
    //this.setState({createJobValues: values});
  };

  handlePopuotChange = popout => this.setState({ popout });

  handleVacationReject = (vacation) => {
    console.log(vacation);
    console.log(rejectVacation);
    this.goForward(rejectVacation);
    this.setState({rejectedVacation: vacation});
  }

  handleVacationUpClick = (vacation) => {
    console.log(vacation);
  }

  render() {
    const { id } = this.props;
    const { activePanel } = this.state;

    return (
      <View id={id} activePanel={activePanel} popout={this.state.popout}>
        <Panel id="mainfork">
          <PanelHeader>Работа</PanelHeader>
          <div className="mainfork">
            <div className='mainform-private'>
              <Button
                before={<Icon24User />}
                size="xl"
                level="secondary"
                onClick={this.goToAccountData}
              >Личный кабинет</Button>
            </div>
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
        <Account
          id={account}
          goBack={this.goBack}
          goToPanel={this.goForward}
          vkUser={this.props.user}
          appUser={this.props.initialValues}
        />
        <Additional
          id={additionalPanel}
          goBack={this.goBack}
          goToPanel={this.goForward}
          vkUser={this.props.user}
          appUser={this.props.initialValues}
        />
        <AccountVacations
          id={userVacations}
          goBack={this.goBack}
          goToPanel={this.goForward}
          vkUser={this.props.user}
          appUser={this.props.initialValues}
          handleCellClick={this.handleAccountCellClick}
        />
        <VacationsForModerators
          id={vacationsForModerators}
          goBack={this.goBack}
          goToPanel={this.goForward}
          vkUser={this.props.user}
          appUser={this.props.initialValues}
          onVacationReject={this.handleVacationReject}
        />
        <AccountVacation
          id={accountVacation}
          goBack={this.goBack}
          goToPanel={this.goForward}
          user={this.props.user}
          appUser={this.props.initialValues}
          vacation={this.state.selectedAccountVacation}
          handleUpClick={this.handleVacationUpClick}
        />
        <VacationReject
          id={rejectVacation}
          goBack={this.goBack}
          vacation={this.state.rejectedVacation}
        />
      </View>
    );
  }
}

export default connect(
  state => {
    return {
      initialValues: initialVkUserEntitySelector(state)
    };
  },
  {
    createVacation
  }
)(MainFork);
