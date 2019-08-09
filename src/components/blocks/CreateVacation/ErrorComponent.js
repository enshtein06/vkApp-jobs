import React, { memo } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    error: PropTypes.shape({
        message: PropTypes.string
    })
}

const ErrorComponent = memo((props) => {
    return (
        <div>
            <h3>Вы не можете создать вакансию</h3>
            {props && props.error && props.error.message ? (
                <p>{props.error.message}</p>
            ) : null}
        </div>
    )
});

ErrorComponent.propTypes = propTypes;

export default ErrorComponent;
