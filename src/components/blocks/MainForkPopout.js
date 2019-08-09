import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert, ScreenSpinner } from '@vkontakte/vkui';

class MainFormPopout extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool
    }

    state = {
        isPopout: false
    }

    handlePopoutClose = () => {
        this.setState({isPopout: false});
    }

    render() {
        if(!this.state.isPopout) return null;

        if(this.props.isLoading) return (<ScreenSpinner />)

        return (
            <Alert
                actions={[{
                    title: 'Отмена',
                    autoclose: true,
                    style: 'cancel'
                }, {
                    title: 'Добавить',
                    autoclose: true,
                }]}
                onClose={this.handlePopoutClose}
            >
                <h2>Подтвердите действие</h2>
                <p>Добавить пользователю право на модерацию контента.</p>
            </Alert>
        )
    }
}

export default connect((state, props) => {
    return {
        isLoading: false
    }
})(MainFormPopout);