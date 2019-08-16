import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Panel, PanelHeader } from "@vkontakte/vkui";
import HeadButton from "../../commons/buttons/HeadButton";
import { formatDate } from "../../../utils";

import "./JobPage.css";

class JobPage extends PureComponent {
  static propTypes = {
    id: PropTypes.string,
    goToPanel: PropTypes.func,
    goBack: PropTypes.func.isRequired,
    back: PropTypes.string.isRequired,
    entity: PropTypes.shape({
      name: PropTypes.string,
      salary: PropTypes.string,
      organization: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
      }),
      city: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
      }),
      createdAt: PropTypes.object,
      description: PropTypes.string,
      contacts: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          numbers: PropTypes.string
        })
      ),
      address: PropTypes.string,
      employmentType: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
      }),
      requirments: PropTypes.arrayOf(PropTypes.string),
      wishes: PropTypes.arrayOf(PropTypes.string),
      activities: PropTypes.arrayOf(PropTypes.string),
      bonuses: PropTypes.arrayOf(PropTypes.string),
      expirience: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
      }),
      shedule: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
      })
    }).isRequired
  };

  renderHeadButton = <HeadButton onClick={this.props.goBack} />;

  render() {
    const { id, entity } = this.props;
    const {
      name,
      salary,
      organization,
      city,
      createdAt,
      description,
      contacts,
      address,
      employmentType,
      requirments,
      wishes,
      activities,
      bonuses,
      expirience
    } = entity;
    return (
      <Panel id={id}>
        <PanelHeader left={this.renderHeadButton}>Вакансия</PanelHeader>
        <div className="jobpage">
          <h3 className="jobpage__name">{name}</h3>
          <p className="jobpage__salary">{salary}</p>
          <p className="jobpage__organization">{organization}</p>
          <p className="jobpage__created">Создано: {formatDate(createdAt)}</p>
          <p className="jobpage__address">
            {address}, {city}
          </p>
          <p className="jobpage__expirience">
            <span className="jobpage__expirience-title">
              Требуемый опыт работы:{" "}
            </span>
            <span className="jobpage__expirience-value">{expirience}</span>
          </p>
          <p className="jobpage__employmentType">
            <span className="jobpage__employmentType-title">
              Тип занятости:{" "}
            </span>
            <span className="jobpage__employmentType-value">
              {employmentType}
            </span>
          </p>
          <p className="jobpage__description">{description}</p>
          {!!requirments && (
            <div className="jobpage__requirments">
              <h4>Требования к кандидату:</h4>
              {requirments.map((requirment, index) => {
                return <p key={index}>{requirment}</p>;
              })}
            </div>
          )}
          {!!wishes && (
            <div className="jobpage__wish">
              <h4>Будет плюсом:</h4>
              {activities.map((wish, index) => {
                return <p key={index}>{wish}</p>;
              })}
            </div>
          )}
          {!!activities && (
            <div className="jobpage__activity">
              <h4>Чем вы будете заниматься:</h4>
              {activities.map((activity, index) => {
                return <p key={index}>{activity}</p>;
              })}
            </div>
          )}
          {!!bonuses && (
            <div className="jobpage__bonuses">
              <h4>Вы получите:</h4>
              {bonuses.map((bonuse, index) => {
                return <p key={index}>{bonuse}</p>;
              })}
            </div>
          )}
          {!!contacts && (
            <div className="jobpage__contacts">
              <h4>Контакты:</h4>
              {contacts.map(contact => {
                return (
                  <p key={contact.id}>
                    <span>{contact.name}</span>: <span>{contact.numbers}</span>
                  </p>
                );
              })}
            </div>
          )}
          <div className="jobpage__answer">
            <button>ОТКЛИКНУТЬСЯ</button>
          </div>
        </div>
      </Panel>
    );
  }
}

export default JobPage;
