import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { 
  Panel, 
  View, 
  PanelHeader, 
  HeaderButton, 
  platform, 
  IOS, 
  Icon24Cancel
 } from '@vkontakte/vkui';

const osname = platform();

class SelectCity extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    goToView: PropTypes.func.isRequired
  }

  state = {
    activePanel: 'main'
  }

  goToMain = () => this.props.goToView('mainfork');

  renderHeaderButton = (
    <HeaderButton 
      onClick={this.goToMain}
    >
      {osname === IOS ? 'Назад' : <Icon24Cancel/>}
    </HeaderButton>
  )

  render () {
    const { id } = this.props;
    return (
      <View id={id} activePanel={this.state.activePanel}>
        <Panel id='main'>
          <PanelHeader left={this.renderHeaderButton}>Выберите город</PanelHeader>
        </Panel>
      </View>
    )
  }
}

export default SelectCity;
