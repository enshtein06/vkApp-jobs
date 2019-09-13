import React, { memo } from 'react';
import PropTypes from 'prop-types';

import {
  Panel,
  PanelHeader,
  Group,
  PanelHeaderContent,
  List,
  Cell
} from "@vkontakte/vkui";

import Icon24Gift from '@vkontakte/icons/dist/24/gift';
import Icon24Document from '@vkontakte/icons/dist/24/document';
import Icon24BrowserForward from '@vkontakte/icons/dist/24/browser_forward';
import Icon24Bug from '@vkontakte/icons/dist/24/bug';

import HeadButton from "../../commons/buttons/HeadButton";

import {
  additionalPanel,
  userVacations,
  vacationsForModerators
} from './routes';

const propTypes = {
  id: PropTypes.string.isRequired,
  goBack: PropTypes.func.isRequired,
  goToPanel: PropTypes.func.isRequired,
  user: PropTypes.shape({
    isAdmin: PropTypes.bool
  })
};

const Account = memo((props) => {
  return (
    <Panel id={props.id}>
      <PanelHeader left={<HeadButton onClick={props.goBack} />}>
        <PanelHeaderContent>
          Личный кабинет
        </PanelHeaderContent>
      </PanelHeader>
      <Group>
        <List>
          {/*<Cell
            before={<Icon24Gift />}
            asideContent={<Icon24BrowserForward />}
            onClick={() => props.goToPanel(additionalPanel)}
          >Дополнительные возможности</Cell>*/}
          <Cell
            before={<Icon24Document />}
            asideContent={<Icon24BrowserForward />}
            onClick={() => props.goToPanel(userVacations)}
          >Мои вакансии</Cell>
          {!!(props.appUser && props.appUser.isAdmin) && (
            <>
              <Cell
                before={<Icon24Bug />}
                asideContent={<Icon24BrowserForward />}
                onClick={() => props.goToPanel(vacationsForModerators)}
              >Вакансии для модерации</Cell>
            </>
          )}
        </List>
      </Group>
    </Panel>
  )
});

Account.propTypes = propTypes;

export default Account;
