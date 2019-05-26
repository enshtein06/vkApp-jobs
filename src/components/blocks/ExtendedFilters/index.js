import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Panel, PanelHeader } from '@vkontakte/vkui';
import HeadButton from '../../commons/buttons/HeadButton';

class ExtendedFilters extends PureComponent {
    static propTypes = {
        goBack: PropTypes.func,
        back: PropTypes.string
    }

    handleBackClick = () => {
        this.props.goBack();
    }

    render() {
        const {id} = this.props;
        return (
            <Panel id={id}>
                <PanelHeader left={<HeadButton onClick={this.handleBackClick} />}>
                    Расширенный поиск
                </PanelHeader>
            </Panel>
        )
    }
}

export default ExtendedFilters;
