import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { lookupsValuesSelector } from '../../../ducks/lookups';
import {
  updateVacation,
  updateMethodLoadingSelector,
  updateMethodEntitySelector,
  updateMethodIsLoadedSelector,
  updateMethodErrorSelector
} from '../../../ducks/vacations';
import { formatDate } from "../../../utils";

import {
  Panel,
  PanelHeader,
  PanelHeaderContent,
  List,
  Cell,
  Group,
  Input,
  Select,
  Textarea,
  FormLayout,
  FormLayoutGroup,
  Button,
  Div,
  CellButton,
  Switch
} from "@vkontakte/vkui";
import Icon24Favorite from '@vkontakte/icons/dist/24/favorite';
import Icon24View from '@vkontakte/icons/dist/24/view';
import Icon24Hide from '@vkontakte/icons/dist/24/hide';
import HeadButton from "../../commons/buttons/HeadButton";

class AccountVacation extends PureComponent {
  static propTypes = {
    id: PropTypes.string,
    goBack: PropTypes.func.isRequired,
    user: PropTypes.object,
    goToPanel: PropTypes.func,
    appUser: PropTypes.object,
    vacation: PropTypes.object.isRequired,
    handleUpClick: PropTypes.func.isRequired
  }

  state = {
    name: this.props.vacation && this.props.vacation.name ?
      this.props.vacation.name :
      '',
    description: this.props.vacation && this.props.vacation.description ?
      this.props.vacation.description :
      '',
    contact_name: this.props.vacation && this.props.vacation.contact &&
      this.props.vacation.contact.name ?
        this.props.vacation.contact.name :
        '',
    contact_numbers: this.props.vacation && this.props.vacation.contact &&
      this.props.vacation.contact.numbers ?
        this.props.vacation.contact.numbers :
        '',
    expirience: this.props.vacation && this.props.vacation.expirience ?
      `${this.props.vacation.expirience.id}` :
      '0',
    employmentType: this.props.vacation && this.props.vacation.employmentType ?
      `${this.props.vacation.employmentType.id}` :
      '0',
    schedule: this.props.vacation && this.props.vacation.schedule ?
      `${this.props.vacation.schedule.id}` :
      '0',
    errorOccured: null
  }

  componentDidUpdate = (prevProps) => {
    if(
      prevProps.isLoading &&
      !this.props.isLoading &&
      this.props.isLoaded
    ) {
      if(this.props.error) {
        this.setState({errorOccured: this.props.error});
      } else {
        this.props.goBack();
      }
    }
  }

  handleChange = (e) => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  }

  handleUpClick = () => {
    this.props.handleUpClick(this.props.vacation);
  }

  handleSaveClick = () => {
    const stateValues = {...this.state};
    delete stateValues.errorOccured;

    this.props.updateVacation(
      this.props.vacation._id,
      {
        ...this.props.vacation,
        ...stateValues,
        isAllowToShow: false,
        isRejectedToShow: false,
        rejectedReason: null
      }
    );
  }

  handleViewChange = () => {
    this.props.updateVacation(
      this.props.vacation._id,
      {
        ...this.props.vacation,
        isNotActive: !this.props.vacation.isNotActive
      }
    )
  }

  renderStatus = (vacation) => {
    const {
      isAllowToShow,
      isRejectedToShow,
      rejectedReason
    } = vacation;

    let content = 'На рассмотрении';

    if(isRejectedToShow) {
      content = `Отказано. Сообщение от модератора - "${rejectedReason}"`;
    } else if(isAllowToShow) {
      content = 'Опубликовано';
    }

    return (
      <Group title='Статус модерации'>
        <Div>
          {content}
        </Div>
      </Group>
    );
  }

  renderVacationsStatus = () => {
    if(this.props.appUser.isPremiumAccount) {
      return (
        <Group title='Статус отображения'>
          <CellButton
            onClick={this.handleViewChange}
            before={
              this.props.vacation.isNotActive ?
                (<Icon24View />) : (<Icon24Hide />)
            }
          >{
            !this.props.vacation.isNotActive ?
              'Отключить видимость в поиске' :
              'Восстановить видимость в поиске'
          }</CellButton>
        </Group>
      )
    }
    return null;
  }

  render() {
    const {
      name,
      description,
      contact_name,
      contact_numbers,
      schedule,
      expirience,
      employmentType
    } = this.state;
    const { lookupsValues } = this.props;
    const { vacation } = this.props;

    return (
      <Panel id={this.props.id}>
        <PanelHeader left={<HeadButton onClick={this.props.goBack} />}>
          <PanelHeaderContent>
            {this.props.vacation && this.props.vacation.name}
          </PanelHeaderContent>
        </PanelHeader>
        {/*<Group>
          <List>
            <CellButton
              before={<Icon24Favorite />}
              asideContent={null}
              onClick={this.handleUpClick}
              disabled={!vacation.isAllowToShow}
            >
              <Div>
                Поднять в топ {!vacation.isAllowToShow && '(модерация не пройдена)'}
              </Div>
            </CellButton>
          </List>
        </Group>*/}
        {this.renderStatus(vacation)}
        {this.renderVacationsStatus()}
        <Group>
          <FormLayout>
            <Input
              top='Наименование вакансии'
              name="name"
              value={name}
              onChange={this.handleChange}
            />
            <Textarea
              top='Описание'
              name="description"
              value={description}
              onChange={this.handleChange}
            />
            <FormLayoutGroup top="Контакты">
              <Input
                placeholder='Имя'
                name="contact_name"
                value={contact_name}
                onChange={this.handleChange}
              />
              <Input
                placeholder='Номер'
                name="contact_numbers"
                value={contact_numbers}
                onChange={this.handleChange}
              />
            </FormLayoutGroup>
            <Select
              value={expirience}
              name='expirience'
              top='Опыт работы'
              placeholder='Выберите опыт работы'
              onChange={this.handleChange}
            >
              {lookupsValues.expirience.map((el, index) => {
                return (
                  <option key={index} value={`${el.id}`}>{el.title}</option>
                )
              })}
            </Select>
            <Select
              value={employmentType}
              name='employmentType'
              top='Тип занятости'
              placeholder='Выберите тип занятости'
              onChange={this.handleChange}
            >
              {lookupsValues.employmentType.map((el, index) => {
                return (
                  <option key={index} value={`${el.id}`}>{el.title}</option>
                )
              })}
            </Select>
            <Select
              value={schedule}
              name='schedule'
              top='График'
              placeholder='Выберите график'
              onChange={this.handleChange}
            >
              {lookupsValues.schedule.map((el, index) => {
                return (
                  <option key={index} value={`${el.id}`}>{el.title}</option>
                )
              })}
            </Select>
            <Div>
              При изменении, вакансия снова уйдет в модерацию
            </Div>
            <Button
              size="xl"
              onClick={this.handleSaveClick}
            >Сохранить</Button>
          </FormLayout>
        </Group>
      </Panel>
    );
  }
}

export default connect((state) => {
  return {
    lookupsValues: lookupsValuesSelector(state),

    isLoaded: updateMethodIsLoadedSelector(state),
    isLoading: updateMethodLoadingSelector(state),
    entity: updateMethodEntitySelector(state),
    error: updateMethodErrorSelector(state)
  }
}, { updateVacation })(AccountVacation);
