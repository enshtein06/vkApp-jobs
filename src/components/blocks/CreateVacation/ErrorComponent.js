import React, { memo } from "react";
import PropTypes from "prop-types";

const propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string).isRequired
};

const ErrorComponent = memo(props => {
  return (
    <div>
      <h3>Вы не можете создать вакансию</h3>
      {props.errors.map(err => {
        return <p>{err}</p>;
      })}
    </div>
  );
});

ErrorComponent.propTypes = propTypes;

export default ErrorComponent;
