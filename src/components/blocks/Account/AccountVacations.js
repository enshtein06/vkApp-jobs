import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchVacations,
  listEntitiesSelector,
  listErrorSelector,
  listLoadingSelector,
  listIsAllLoadedSelector,
  vkUserListEntitiesSelector,
  vkUserListIsLoadedSelector,
  vkUserListErrorSelector
} from '../../../ducks/vacations';
import {
  initialVkUserEntitySelector
} from '../../../ducks/user';

import {
  Panel,
  PanelHeader,
  PanelHeaderContent,
  List,
  Cell,
  Group
} from "@vkontakte/vkui";
import HeadButton from "../../commons/buttons/HeadButton";

import { userVacations } from './routes';

class AccountVacations extends PureComponent {
  static propTypes = {
    goBack: PropTypes.func.isRequired,
    user: PropTypes.object,
    handleCellClick: PropTypes.func
  }

  render() {
    const {
      userVacationsList,
      userVacationsError,
      userVacationsIsLoaded,
      goBack
    } = this.props;

    let content = null;
    if(!userVacationsIsLoaded) {
      content = (
        <div>loading...</div>
      );
    } else if(userVacationsError) {
      content = (
        <Group>
          Произошла какая-то ошибка!
        </Group>
      );
    } else if(!userVacationsList.length) {
      content = (
        <Group>
          У вас нет созданных вакансий!
        </Group>
      );
    } else if(Array.isArray(userVacationsList) && userVacationsList.length) {
      content = (
        <List>
          {userVacationsList.map((vacation, index) => {
            return (
              <Cell
                key={index}
                onClick={() => this.props.handleCellClick(vacation)}
              >{vacation.name}</Cell>
            )
          })}
        </List>
      );
    }

    return (
      <Panel id={userVacations}>
        <PanelHeader left={<HeadButton onClick={goBack} />}>
          <PanelHeaderContent>
            Мои вакансии
          </PanelHeaderContent>
        </PanelHeader>
        {content}
      </Panel>
    )
  }
}

export default connect((state) => {
  return {
    isLoading: listLoadingSelector(state),
    error: listErrorSelector(state),
    isLoaded: listIsAllLoadedSelector(state),
    vacations: listEntitiesSelector(state),
    user: initialVkUserEntitySelector(state),

    userVacationsList: vkUserListEntitiesSelector(state),
    userVacationsError: vkUserListErrorSelector(state),
    userVacationsIsLoaded: vkUserListIsLoadedSelector(state)
  }
})(AccountVacations);
