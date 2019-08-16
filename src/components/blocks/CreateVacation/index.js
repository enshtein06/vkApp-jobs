import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  createVacation,
  createMethodLoadingSelector,
  createMethodEntitySelector,
  createMethodErrorSelector,
  createMethodisCreatedSelector
} from "../../../ducks/vacations";
import { initialVkUserEntitySelector } from "../../../ducks/user";
import { vkUserListEntitiesSelector } from "../../../ducks/vacations";
import { lookupsValuesSelector } from "../../../ducks/lookups";
import {
  Panel,
  PanelHeader,
  FormLayout,
  FormLayoutGroup,
  Input,
  Textarea,
  Select,
  Button,
  Alert
} from "@vkontakte/vkui";
import HeadButton from "../../commons/buttons/HeadButton";
import { fields } from "./fields";
import { errors } from "./errors";
import "./CreateVacation.css";
import ErrorComponent from "./ErrorComponent";

const propTypes = {
  initialValues: PropTypes.object,
  goBack: PropTypes.func,
  isCreationLoaded: PropTypes.bool,
  selectedCity: PropTypes.object,
  handlePopuotChange: PropTypes.func.isRequired
};

const defaultProps = {
  initialValues: {}
};
const emptyArr = [];

class CreateVacation extends PureComponent {
  state = {
    values: {
      ...this.props.initialValues,
      schedule: "0",
      employmentType: "0",
      expirience: "0"
    },
    multiValues: {
      requirments: [0],
      wishes: [0],
      activities: [0],
      bonuses: [0],
      contacts: [0]
    },
    errors: {
      name: "Должность: необходимо ввести",
      organization: "Должность: необходимо ввести"
    },
    isLoading: false,
    isErrorOccured: false
  };

  handleModalClose = () => {
    this.props.handlePopuotChange(null);
    this.props.goBack();
  };

  successAlert = (
    <Alert
      actions={[{ title: "Круто!", autoclose: true }]}
      onClose={this.handleModalClose}
    >
      <h3>Спасибо за создание вакансии!</h3>
      <p>Совсем скоро ее увидят ваши потенциальные соискатели.</p>
    </Alert>
  );

  errorAlert = (
    <Alert
      actions={[{ title: "Ок", autoclose: true }]}
      onClose={this.handleModalClose}
    >
      <h3>Не удалось создать вакансию</h3>
      <p>Причиной может быть: </p>
      <ul>
        <li>
          Вы уже создали больше 3 вакансии. Чтобы создать больше можете удалить
          одну из созданных или Купить подписку
        </li>
        <li>Произошла какая то ошибка в системе.</li>
      </ul>
    </Alert>
  );

  static getDerivedStateFromProps(props, state) {
    if (props.isLoading !== state.isLoading) {
      return {
        isLoading: props.isLoading,
        isErrorOccured: !props.isLoading && !!state.isLoading && !!props.error
      };
    }
    return null;
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (!prevProps.isCreationLoaded && this.props.isCreationLoaded) {
      this.props.handlePopuotChange(this.successAlert);
    }
    if (this.state.isErrorOccured && !prevState.isErrorOccured) {
      this.props.handlePopuotChange(this.errorAlert);
    }
  };

  handleCreateButtonClick = () => {
    this.props.createVacation({
      ...this.state.values,
      vkUserId: this.props.user.id,
      city: this.props.selectedCity,
      user: this.props.user
    });
  };

  handleChangeField = event => {
    const { name, value } = event.currentTarget;

    if (name.includes("__")) {
      const [nameField, indexField] = name.split("__");

      this.setState(prevState => {
        const values = prevState.values || {};
        const fieldValues = values[nameField] ? [...values[nameField]] : [];
        fieldValues[+indexField] = value;

        return {
          values: {
            ...values,
            [nameField]: fieldValues
          }
        };
      });
    } else {
      const field = fields[name];

      this.setState(prevState => {
        const newState = {
          values: {
            ...prevState.values,
            [name]: value
          }
        };

        if (Array.isArray(field.validate) && field.validate.length) {
          let error = null;
          field.validate.some(validateCallback => {
            const errorRes = validateCallback(value, field.errorMsg);
            if (errorRes) {
              error = errorRes;
              return true;
            }
            return false;
          });

          newState.errors = {
            ...prevState.errors,
            [name]: error
          };
        }

        return newState;
      });
    }
  };

  handleAddButtonClick = event => {
    const { name } = event.target;

    this.setState(prevState => {
      return {
        multiValues: {
          ...prevState.multiValues,
          [name]:
            prevState.multiValues[name] &&
            prevState.multiValues[name].concat(
              prevState.multiValues[name].length
            )
        }
      };
    });
  };

  renderError = (vkUser, vacations) => {
    return errors.reduce((result, errValidation) => {
      if (errValidation.validate({ vkUser, vacations })) {
        result.push(errValidation.message);
      }
      return result;
    }, []);
  };

  renderContent = () => {
    const {
      name,
      salaryFrom,
      salaryTo,
      organization,
      expirience,
      employmentType,
      schedule,
      requirments,
      wishes,
      activities,
      bonuses,
      description,
      contact_name,
      contact_numbers,
      contact_email,
      address
    } = fields;
    return (
      <FormLayout>
        <Input {...name.props} onChange={this.handleChangeField} />
        <FormLayoutGroup top="Заработная плата">
          <Input {...salaryFrom.props} onChange={this.handleChangeField} />
          <Input {...salaryTo.props} onChange={this.handleChangeField} />
        </FormLayoutGroup>
        <Input {...organization.props} onChange={this.handleChangeField} />
        <Select
          {...expirience.props}
          onChange={this.handleChangeField}
          value={this.state.values[expirience.id]}
        >
          {this.props.lookups && this.props.lookups[expirience.lookupKey]
            ? this.props.lookups[expirience.lookupKey].map(el => {
                return <option value={el.id}>{el.title}</option>;
              })
            : emptyArr}
        </Select>
        <Textarea {...description.props} onChange={this.handleChangeField} />
        <Select
          {...employmentType.props}
          onChange={this.handleChangeField}
          value={this.state.values[employmentType.id]}
        >
          {this.props.lookups && this.props.lookups[employmentType.lookupKey]
            ? this.props.lookups[employmentType.lookupKey].map(el => {
                return <option value={el.id}>{el.title}</option>;
              })
            : emptyArr}
        </Select>
        <Select
          {...schedule.props}
          onChange={this.handleChangeField}
          value={this.state.values[schedule.id]}
        >
          {this.props.lookups && this.props.lookups[schedule.lookupKey]
            ? this.props.lookups[schedule.lookupKey].map(el => {
                return <option value={el.id}>{el.title}</option>;
              })
            : emptyArr}
        </Select>
        <FormLayoutGroup
          top="Требования к кандидату"
          bottom="Уважите ваши требования к кандидату"
        >
          {this.state.multiValues.requirments.map(reqId => {
            return (
              <Input
                {...requirments.props}
                name={`${requirments.props.name}__${reqId}`}
                onChange={this.handleChangeField}
              />
            );
          })}
          <button
            name={requirments.props.name}
            className="createVacation__addButton"
            onClick={this.handleAddButtonClick}
          >
            +
          </button>
        </FormLayoutGroup>
        <FormLayoutGroup
          top="Будет плюсом"
          bottom="Уважите что будет плюсом вашего кандидата"
        >
          {this.state.multiValues.wishes.map(wishId => {
            return (
              <Input
                {...wishes.props}
                name={`${wishes.props.name}__${wishId}`}
                onChange={this.handleChangeField}
              />
            );
          })}
          <button
            name={wishes.props.name}
            onClick={this.handleAddButtonClick}
            className="createVacation__addButton"
          >
            +
          </button>
        </FormLayoutGroup>
        <FormLayoutGroup
          top="Чем будет заниматься"
          bottom="Уважите ваши чем будет заниматься ваш кандидат"
        >
          {this.state.multiValues.activities.map(activityId => {
            return (
              <Input
                {...activities.props}
                name={`${activities.props.name}__${activityId}`}
                onChange={this.handleChangeField}
              />
            );
          })}
          <button
            name={activities.props.name}
            onClick={this.handleAddButtonClick}
            className="createVacation__addButton"
          >
            +
          </button>
        </FormLayoutGroup>
        <FormLayoutGroup
          top="Что получит взамен"
          bottom="Уважите что получить за работу ваш кандидат"
        >
          {this.state.multiValues.bonuses.map(activityId => {
            return (
              <Input
                {...bonuses.props}
                name={`${bonuses.props.name}__${activityId}`}
                onChange={this.handleChangeField}
              />
            );
          })}
          <button
            name={bonuses.props.name}
            onClick={this.handleAddButtonClick}
            className="createVacation__addButton"
          >
            +
          </button>
        </FormLayoutGroup>
        <FormLayoutGroup top="Контакты">
          {this.state.multiValues.contacts.map((contactId, index) => {
            return (
              <div key={contactId} className="createVacation__contacts">
                <h3 className="createVacation__contacts--head">
                  Контакт {index + 1}
                </h3>
                <Input
                  {...contact_name.props}
                  name={`${contact_name.props.name}__${contactId}`}
                  onChange={this.handleChangeField}
                />
                <Input
                  {...contact_numbers.props}
                  name={`${contact_numbers.props.name}__${contactId}`}
                  onChange={this.handleChangeField}
                />
                <Input
                  {...contact_email.props}
                  name={`${contact_email.props.name}__${contactId}`}
                  onChange={this.handleChangeField}
                />
              </div>
            );
          })}
          <button
            name="contacts"
            onClick={this.handleAddButtonClick}
            className="createVacation__addButton"
          >
            +
          </button>
        </FormLayoutGroup>
        <Input {...address.props} onChange={this.handleChangeField} />

        <Button
          size="xl"
          onClick={this.handleCreateButtonClick}
          disabled={
            !!Object.keys(this.state.errors).some(
              errorKey => this.state.errors[errorKey]
            )
          }
        >
          Создать вакансию
        </Button>
      </FormLayout>
    );
  };

  render() {
    const { vkUser, vacations } = this.props;

    const errors = this.renderError(vkUser, vacations);

    return (
      <Panel id={this.props.id}>
        <PanelHeader left={<HeadButton onClick={this.props.goBack} />}>
          Создать вакансию
        </PanelHeader>
        <div className="createVacation">
          {errors.length ? (
            <ErrorComponent errors={errors} />
          ) : (
            this.renderContent()
          )}
        </div>
      </Panel>
    );
  }
}

CreateVacation.propTypes = propTypes;
CreateVacation.defaultProps = defaultProps;

export default connect(
  state => {
    return {
      isLoading: createMethodLoadingSelector(state),
      createdVacation: createMethodEntitySelector(state),
      isCreationLoaded: createMethodisCreatedSelector(state),
      error: createMethodErrorSelector(state),
      lookups: lookupsValuesSelector(state),
      vkUser: initialVkUserEntitySelector(state),
      vacations: vkUserListEntitiesSelector(state)
    };
  },
  {
    createVacation
  }
)(CreateVacation);
