import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  Panel,
  PanelHeader,
  FormLayout,
  FormLayoutGroup,
  Input,
  Textarea
} from "@vkontakte/vkui";
import HeadButton from "../../commons/buttons/HeadButton";

class JobResponse extends PureComponent {
  static propTypes = {
    goBack: PropTypes.func.isRequired
  };

  render() {
    const { id, entity } = this.props;
    return (
      <Panel id={id}>
        <PanelHeader left={<HeadButton onClick={this.props.goBack} />}>
          Отклик
        </PanelHeader>
        <div></div>
      </Panel>
    );
  }
}

export default JobResponse;
