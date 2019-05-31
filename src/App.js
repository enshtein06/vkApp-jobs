import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { Root } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import MainForm from './components/blocks/MainFork';
import SelectCity from './components/blocks/SelectCity';

class App extends React.Component {
	state = {
		activeView: 'mainfork',
		fetchedUser: null,
	};

	componentDidMount() {
		connect.subscribe((e) => {
			switch (e.detail.type) {
				case 'VKWebAppGetUserInfoResult':
					this.setState({ fetchedUser: e.detail.data });
					break;
				default:
					console.log(e.detail.type);
			}
		});
		connect.send('VKWebAppGetUserInfo', {});
  }
  
  goToView = (activeView) => {
    this.setState({ activeView });
  }

	render() {
		return (
			<Root activeView={this.state.activeView}>
        <MainForm id='mainfork' goToView={this.goToView} />
        <SelectCity id='selectcity' goToView={this.goToView} />
      </Root>
		);
	}
}

export default App;
