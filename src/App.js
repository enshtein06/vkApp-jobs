import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { connect as reduxConnect } from 'react-redux';
import { Root } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { token } from './config';
import { requestLookupsVkApi, putLookupsVkApiToStore } from './ducks/lookups';

import MainForm from './components/blocks/MainFork';
import SelectCity from './components/blocks/SelectCity';

class App extends React.Component {
	state = {
		activeView: 'mainfork',
		fetchedUser: null,
		selectedCity: {
			title: 'Город',
			id: 0
		}
	};

	componentDidMount() {
		connect.subscribe((e) => {
			switch (e.detail.type) {
				case 'VKWebAppGetUserInfoResult':
				// remove!! later
					console.log(e.detail.data);
					this.setState({ 
						fetchedUser: e.detail.data, 
						selectedCity: e.detail.data.city 
					});
					break;
				case 'VKWebAppCallAPIMethodResult':
					this.props
						.putLookupsVkApiToStore(
							e.detail.data.request_id, 
							e.detail.data.response
						);
					break
				default:
					console.log(e);
					console.log(e.detail.type);
			}
		});
		connect.send('VKWebAppGetUserInfo', {});
		this.props.requestLookupsVkApi(
			'database.getCities',
			'cities',
			{
				'country_id': 1,
				'need_all': 0,
				'v': '5.95',
				'access_token': token
			}
		);
  }

  handleCitySelected = (selectedCity) => {
	  this.setState({selectedCity, activeView: 'mainfork'});
  }

  goToView = (activeView) => {
    this.setState({ activeView });
  }

	render() {
		return (
			<Root activeView={this.state.activeView}>
				<MainForm 
					id='mainfork' 
					goToView={this.goToView} 
					selectedCity={this.state.selectedCity} 
				/>
				<SelectCity 
					id='selectcity' 
					goToView={this.goToView} 
					selectedCity={this.state.selectedCity}
					handleCitySelected={this.handleCitySelected}
				/>
			</Root>
		);
	}
}

export default reduxConnect(state => {
	console.log(state);
	return {}
}, {
	putLookupsVkApiToStore,
	requestLookupsVkApi
})(App);
