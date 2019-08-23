import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Panel,
  PanelHeader,
  PanelHeaderContent,
  Textarea,
  FormLayout,
  Button
} from "@vkontakte/vkui";
import HeadButton from "../../commons/buttons/HeadButton";

class VacationReject extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    vacation: PropTypes.object.isRequired,
    handleReject: PropTypes.func.isRequired
  }

  state = {
    rejectReason: 'Вам отказано в размещении, по причине: '
  }

  handleChange = (e) => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  }

  handleClick = () => this.props.handleReject(this.props.vacation)

  render() {
    return (
      <Panel id={this.props.id}>
        <PanelHeader left={<HeadButton onClick={this.props.goBack} />}>
          <PanelHeaderContent>
            Отказать в размещении
          </PanelHeaderContent>
        </PanelHeader>
        <FormLayout>
          <Textarea
            top={`Отказ для: ${this.props.vacation.name}. | Причина отказа:`}
            value={this.state.rejectReason}
            name='rejectReason'
            onChange={this.handleChange}
          />
          <Button onClick={this.handleClick} size="xl">Отказать</Button>
        </FormLayout>
      </Panel>
    )
  }
}

export default VacationReject;
