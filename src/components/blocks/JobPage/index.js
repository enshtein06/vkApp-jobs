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
      activities: PropTypes.arrayOf(PropTypes.string),
      address: PropTypes.string,
      bonuses: PropTypes.arrayOf(PropTypes.string),
      city: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string
      }),
      contacts: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          numbers: PropTypes.string,
          email: PropTypes.string
        })
      ),
      createdAt: PropTypes.object,
      description: PropTypes.string,
      employmentType: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string
      }),
      expirience: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string
      }),
      name: PropTypes.string,
      organization: PropTypes.string,
      requirments: PropTypes.arrayOf(PropTypes.string),
      salaryFrom: PropTypes.string,
      salaryTo: PropTypes.string,
      schedule: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
      }),
      updatedAt: PropTypes.object,
      user: PropTypes.shape({
        first_name: PropTypes.string,
        last_name: PropTypes.string
      }),
      wishes: PropTypes.arrayOf(PropTypes.string)
    }).isRequired
  };

  renderHeadButton = <HeadButton onClick={this.props.goBack} />;

  renderSalary = ({salaryTo, salaryFrom}) => {
    let salary = null;
    switch (true) {
      case (!!(salaryFrom && !salaryTo)):
        salary = `${salaryFrom} руб.`;
        break;
      case (!!(salaryTo && !salaryFrom)):
        salary = `${salaryTo} руб.`;
        break;
      case (!!(salaryTo && salaryFrom)):
        salary = `${salaryFrom}${salaryTo && salaryFrom ? ` - ${salaryTo}` : ''} руб.`;
        break;
      default:
        break;
    }

    return salary;
  }

  render() {
    const { id, entity } = this.props;
    const {
      activities,
      address,
      bonuses,
      city,
      contacts,
      createdAt,
      description,
      employmentType,
      expirience,
      name,
      organization,
      requirments,
      salaryFrom,
      salaryTo,
      schedule,
      updatedAt,
      user,
      wishes
    } = entity;

    const salary = this.renderSalary(entity);
    return (
      <Panel id={id}>
        <PanelHeader left={this.renderHeadButton}>Вакансия</PanelHeader>
        <div className="jobpage">
          <h3 className="jobpage__name">{name}</h3>
          <p className="jobpage__salary">{salary}</p>
          <p className="jobpage__organization">Организация: {organization}</p>
          {createdAt && <p className="jobpage__created">Создано: {formatDate(new Date(createdAt))}</p>}
          <p className="jobpage__address">
            Где: {address}, {city && city.title}
          </p>
          { !!(expirience) &&
            <p className="jobpage__expirience">
              <span className="jobpage__expirience-title">
                Требуемый опыт работы:{" "}
              </span>
              <span className="jobpage__expirience-value">{expirience.title}</span>
            </p>
          }
          { !!employmentType &&
            (
              <p className="jobpage__employmentType">
                <span className="jobpage__employmentType-title">
                  Тип занятости:{" "}
                </span>
                <span className="jobpage__employmentType-value">
                  {employmentType.title}
                </span>
              </p>
            )
          }
          <p className="jobpage__description">{description}</p>
          {!!requirments && Array.isArray(requirments) && !!requirments.length (
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
              {wishes.map((wish, index) => {
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
          {/*<div className="jobpage__answer">
            <button>ОТКЛИКНУТЬСЯ</button>
            </div>*/}
        </div>
      </Panel>
    );
  }
}

export default JobPage;
