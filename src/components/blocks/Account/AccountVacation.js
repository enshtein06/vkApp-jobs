import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { lookupsValuesSelector } from '../../../ducks/lookups';

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
  Button
} from "@vkontakte/vkui";
import Icon24Favorite from '@vkontakte/icons/dist/24/favorite';
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
    nameContact: this.props.vacation && this.props.vacation.contact &&
      this.props.vacation.contact.name ?
        this.props.vacation.contact.name :
        '',
    numbersContact: this.props.vacation && this.props.vacation.contact &&
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
  }

  handleChange = (e) => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  }

  handleUpClick = () => {
    this.props.handleUpClick(this.props.vacation);
  }

  render() {
    const {
      name,
      description,
      nameContact,
      numbersContact,
      schedule,
      expirience,
      employmentType
    } = this.state;
    const { lookupsValues } = this.props;
    return (
      <Panel id={this.props.id}>
        <PanelHeader left={<HeadButton onClick={this.props.goBack} />}>
          <PanelHeaderContent>
            {this.props.vacation && this.props.vacation.name}
          </PanelHeaderContent>
        </PanelHeader>
        <Group>
          <List>
            <Cell
              before={<Icon24Favorite />}
              asideContent={null}
              onClick={this.handleUpClick}
            >
              <Button size='l' level="tertiary">
                Поднять в топ
              </Button>
            </Cell>
          </List>
        </Group>
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
                name="nameContact"
                value={nameContact}
                onChange={this.handleChange}
              />
              <Input
                placeholder='Номер'
                name="numbersContact"
                value={numbersContact}
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
            <Button size="xl">Сохранить</Button>
          </FormLayout>
        </Group>
      </Panel>
    );
  }
}

export default connect((state) => {
  return {
    lookupsValues: lookupsValuesSelector(state)
  }
})(AccountVacation);
