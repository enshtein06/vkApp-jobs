import React from "react";
import connect from "@vkontakte/vkui-connect";
import { connect as reduxConnect } from "react-redux";
import { Root } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import { token } from "./config";
import { requestLookupsVkApi, putLookupsVkApiToStore } from "./ducks/lookups";
import { initializeVkUserData } from "./ducks/user";
import { fetchVacationsForVkUser } from "./ducks/vacations";

import MainForm from "./components/blocks/MainFork";
import SelectCity from "./components/blocks/SelectCity";

class App extends React.Component {
  state = {
    activeView: "mainfork",
    fetchedUser: null,
    selectedCity: {
      title: "Город",
      id: 0
    }
  };

  componentDidMount() {
    connect.subscribe(e => {
      switch (e.detail.type) {
        case "VKWebAppGetUserInfoResult":
          // remove!! later
          this.setState({
            fetchedUser: e.detail.data,
            selectedCity: e.detail.data.city
          });
          break;
        case "VKWebAppCallAPIMethodResult":
          this.props.putLookupsVkApiToStore(
            e.detail.data.request_id,
            e.detail.data.response
          );
          break;
        default:
          console.log(e);
      }
    });
    connect.send("VKWebAppInit", {});
    connect.send("VKWebAppGetUserInfo", {});
    this.props.requestLookupsVkApi("database.getCities", "cities", {
      country_id: 1,
      need_all: 0,
      v: "5.95",
      access_token: token
    });
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (
      !prevState.fetchedUser &&
      this.state.fetchedUser !== prevState.fetchedUser
    ) {
      this.props.initializeVkUserData(this.state.fetchedUser.id);
      this.props.fetchVacationsForVkUser(this.state.fetchedUser.id);
    }
  };

  handleCitySelected = selectedCity => {
    this.setState({ selectedCity, activeView: "mainfork" });
  };

  goToView = activeView => {
    this.setState({ activeView });
  };

  render() {
    return (
      <Root activeView={this.state.activeView}>
        <MainForm
          id="mainfork"
          goToView={this.goToView}
          selectedCity={this.state.selectedCity}
          user={this.state.fetchedUser}
        />
        <SelectCity
          id="selectcity"
          goToView={this.goToView}
          selectedCity={this.state.selectedCity}
          handleCitySelected={this.handleCitySelected}
        />
      </Root>
    );
  }
}

export default reduxConnect(
  state => {
    return {};
  },
  {
    putLookupsVkApiToStore,
    requestLookupsVkApi,
    initializeVkUserData,
    fetchVacationsForVkUser
  }
)(App);
