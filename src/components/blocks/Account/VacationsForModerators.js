import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchVacations,
  listEntitiesSelector,
  listIsAllLoadedSelector,
  listLoadingSelector,
  listErrorSelector
} from '../../../ducks/vacations';

import {
  Panel,
  PanelHeader,
  PanelHeaderContent,
  Spinner,
  List,
  Cell,
  Button,
  Group,
  Div,
  Separator
} from "@vkontakte/vkui";
import HeadButton from "../../commons/buttons/HeadButton";

import { vacationsForModerators } from './routes';

class VacationsForModerators extends PureComponent {
  static propTypes = {
    goBack: PropTypes.func.isRequired,
    onVacationReject: PropTypes.func.isRequired
  }

  state = {
    limit: 20,
    skip: 20
  }

  componentDidMount = () => {
    this.props.fetchVacations({
      isAllowToShow: false,
      skip: 0
    }, true);
  }

  handleLoadVacations = () => {
    this.props.fetchVacations({
      skip: this.state.skip
    });
    this.setState(prevState => {
      return {
        skip: prevState.skip + 20
      };
    });
  }

  render() {
    return (
      <Panel id={vacationsForModerators}>
        <PanelHeader left={<HeadButton onClick={this.props.goBack} />}>
          <PanelHeaderContent>
            Вакансии для модерации
          </PanelHeaderContent>
        </PanelHeader>
        {!!this.props.isLoading && <Spinner size='regular' />}
        <List>
          {this.props.vacations.map(vac => {
            return (
              <Div>
                <h3>Имя: {vac.name}</h3>
                <p>
                  Зарплата:
                  от - {vac.salaryFrom || 'Не указанно'} |
                  до - {vac.salaryTo || 'Не указано'}
                </p>
                <p>Описание: {vac.description}</p>
                <p>
                  Контакты:
                  имя - {vac.contact && vac.contact.name ? vac.contact.name : 'Не указано'} |
                  номер - {vac.contact && vac.contact.numbers ? vac.contact.numbers : 'Не указано'}
                </p>
                <Div style={{display: 'flex'}}>
                  <Button
                    size="l"
                    stretched
                    style={{ marginRight: 8 }}
                  >Разместить</Button>
                  <Button
                    size="l"
                    stretched
                    level="secondary"
                    onClick={() => this.props.onVacationReject(vac)}
                  >Отказать</Button>
                </Div>
                <Separator />
              </Div>
            )
          })}
          {!!this.props.isAllLoaded ? (
            <div>Загружены все вакансии</div>
          ) : (
            <Button
              onClick={this.handleLoadVacations}
              size="xl"
            >Загрузить еще</Button>
          )}
        </List>
      </Panel>
    )
  }
}

export default connect((state) => {
  return {
    vacations: listEntitiesSelector(state),
    isLoading: listLoadingSelector(state),
    isAllLoaded: listIsAllLoadedSelector(state),
    error: listErrorSelector(state),
    allowed: []
  }
}, {fetchVacations})(VacationsForModerators);
