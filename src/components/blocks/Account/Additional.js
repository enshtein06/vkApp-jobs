import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
  Panel,
  PanelHeader,
  PanelHeaderContent,
  Group,
  Button,
  List,
  Cell,
  CellButton,
  Separator
} from "@vkontakte/vkui";
import HeadButton from "../../commons/buttons/HeadButton";
import Icon24View from '@vkontakte/icons/dist/24/view';
import Icon24Market from '@vkontakte/icons/dist/24/market';

import { additionalPanel } from './routes';

class Additional extends PureComponent {
  static propTypes = {
    goBack: PropTypes.func.isRequired
  }

  render() {
    // use this page as a description of premuim account for user
    return (
      <Panel id={additionalPanel}>
        <PanelHeader left={<HeadButton onClick={this.props.goBack} />}>
          <PanelHeaderContent>
            Дополнительные возможности
          </PanelHeaderContent>
        </PanelHeader>
        <Group title='Премиум аккаунт'>
          <List>
            <Cell before={<Icon24View />}>Управлейте видимостью своих вакансии!</Cell>
            <Cell before={<Icon24Market />}>Увеличьте количество создаваемых вакансии до 10!</Cell>
            <CellButton>Активировать</CellButton>
          </List>
        </Group>
      </Panel>
    )
  }
}

export default Additional;
