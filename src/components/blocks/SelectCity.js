import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Panel,
  View,
  PanelHeader,
  Search
 } from '@vkontakte/vkui';
import HeadButton from '../commons/buttons/HeadButton';
import { List, AutoSizer } from 'react-virtualized';
import { token } from '../../config';
import Icon24Done from '@vkontakte/icons/dist/24/done';
import './SelectCity.css';

import { connect } from 'react-redux';
import { citiesListSelector, requestLookupsVkApi } from '../../ducks/lookups';

class SelectCity extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    goToView: PropTypes.func.isRequired,
    selectedCity: PropTypes.object
  }

  state = {
    activePanel: 'main',
    searchValue: ''
  }

  goToMain = () => this.props.goToView('mainfork');

  handleSearchChange = (value) => {
    this.setState({searchValue: value});
    if(value.trim()) {
      this.props.requestLookupsVkApi(
        'database.getCities',
        'cities',
        {
          'country_id': 1,
          'need_all': 1,
          'v': '5.95',
          'q': value,
          'access_token': token
        }
      );
    } else if(!value.trim() && value) {} else {
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
  }

  renderHeaderButton = (
    <HeadButton onClick={this.goToMain} />
  );

  renderCell = ({ key, index, style }) => {
    const el = this.props.cities[index];
    const { title, id } = el;
    return (
        <div
            key={key}
            style={style}
            className='cityCell'
            name={index}
            onClick={() => this.props.handleCitySelected(el)}
        >{title}{this.props.selectedCity.id === id && (
          <div className='cityCell__arrow'><Icon24Done /></div>
        )}</div>
    )
  }

  render () {
    const { id } = this.props;

    return (
      <View id={id} activePanel={this.state.activePanel}>
        <Panel id='main'>
          <PanelHeader left={this.renderHeaderButton}>
            Выберите город
          </PanelHeader>
          <Search 
            value={this.state.searchValue} 
            onChange={this.handleSearchChange} 
          />
          <AutoSizer>
            {({height, width}) => {
              return (
                <List 
                  rowCount={this.props.cities.length}
                  height={height - 40}
                  width={width}
                  rowHeight={44}
                  rowRenderer={this.renderCell}
                />
              )
            }}
          </AutoSizer>
        </Panel>
      </View>
    )
  }
}

export default connect((state) => {
  return {
    cities: citiesListSelector(state)
  }
}, {
  requestLookupsVkApi
})(SelectCity);
