import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  rejectVacation,
  rejectedEntitiesSelector,
  rejectedIsLoadingSelector,
  rejectedErrorSelector,
  rejectedProcessIdSelector
} from '../../../ducks/vacations';
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
    handleReject: PropTypes.func.isRequired,
    goBack: PropTypes.func
  }

  state = {
    rejectReason: 'Вам отказано в размещении, по причине: '
  }

  componentDidUpdate = (prevProps) => {
    if(
      !!prevProps.isLoading &&
      !this.props.isLoading &&
      this.props.rejectedVacationIds.some(id => this.props.vacation._id === id)
    ) {
      this.props.goBack();
    }
  }

  handleChange = (e) => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  }

  handleClick = () => this.props.rejectVacation(this.props.vacation, this.state.rejectReason)

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

export default connect((state, props) => {
  return {
    rejectedVacationIds: rejectedEntitiesSelector(state),
    isLoading: rejectedIsLoadingSelector(state),
    error: rejectedErrorSelector(state),
    processId: rejectedProcessIdSelector(state)
  }
}, { rejectVacation })(VacationReject);
