import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  Panel,
  PanelHeader,
  FormLayout,
  FormLayoutGroup,
  Input,
  Select,
  Button
} from "@vkontakte/vkui";
import HeadButton from "../../commons/buttons/HeadButton";

import "./ExtendedFilters.css";

class ExtendedFilters extends PureComponent {
  static propTypes = {
    goBack: PropTypes.func,
    back: PropTypes.string,
    handleFormSubmit: PropTypes.func.isRequired
  };

  state = {
    fields: {
      category: {
        type: "select",
        top: "Профобласть",
        options: [{ id: "123", value: "", name: "" }],
        name: "category",
        placeholder: "Выберите профобласть",
        value: null
      },
      salaryFrom: {
        type: "text",
        placeholder: "от",
        name: "salaryFrom",
        value: ""
      },
      salaryTo: {
        type: "text",
        placeholder: "до",
        name: "salaryTo",
        value: ""
      },
      experience: {
        type: "select",
        top: "Опыт работы",
        options: [],
        name: "experience",
        placeholder: "Выберите количество опыта",
        value: null
      },
      employmentType: {
        type: "select",
        top: "Тип занятости",
        options: [],
        name: "employmentType",
        placeholder: "Выберите тип занятости",
        value: null
      },
      schedules: {
        type: "select",
        top: "График работы",
        options: [],
        name: "schedules",
        placeholder: "Выберите график работы",
        value: null
      }
    }
  };

  handleBackClick = () => {
    this.props.goBack();
  };

  renderButton = <HeadButton onClick={this.handleBackClick} />;

  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState(prevState => {
      const field = { ...prevState.fields[name], value };

      return {
        fields: {
          ...prevState.fields,
          [name]: field
        }
      };
    });
  };

  handleFormSubmit = () => {
    this.props.handleFormSubmit(this.state.fields);
  };

  render() {
    const { id } = this.props;
    const {
      salaryFrom,
      salaryTo,
      category,
      experience,
      employmentType,
      schedules
    } = this.state.fields;

    return (
      <Panel id={id}>
        <PanelHeader left={this.renderButton}>Расширенный поиск</PanelHeader>
        <FormLayout>
          <Button onClick={this.handleFormSubmit} size="xl">
            Начать поиск
          </Button>
          <Select {...category} onChange={this.handleChange}>
            {category.options.map(cat => {
              return (
                <option key={cat.id} value={cat.value}>
                  {cat.name}
                </option>
              );
            })}
          </Select>
          <FormLayoutGroup top="Заработная плата">
            <Input {...salaryFrom} onChange={this.handleChange} />
            <Input {...salaryTo} onChange={this.handleChange} />
          </FormLayoutGroup>
          <Select {...experience} onChange={this.handleChange} />
          <Select {...employmentType} onChange={this.handleChange} />
          <Select {...schedules} onChange={this.handleChange} />
          <div className="extendedfilters__search">
            <button onClick={this.handleFormSubmit}>Поиск</button>
          </div>
        </FormLayout>
      </Panel>
    );
  }
}

export default ExtendedFilters;
