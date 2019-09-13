import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import {
  fetchVacations,
  listEntitiesSelector,
  listLoadingSelector,
  listErrorSelector,
  listIsAllLoadedSelector
} from "../../../ducks/vacations";

import {
  Panel,
  PanelHeader,
  Search,
  PanelHeaderContent,
  HeaderContext,
  Cell,
  Spinner,
  List as VkList
} from "@vkontakte/vkui";
import HeadButton from "../../commons/buttons/HeadButton";
import Icon16Dropdown from "@vkontakte/icons/dist/16/dropdown";

import { reduceStringLength, formatDate } from "../../../utils";
import "./FindJob.css";
import { List, AutoSizer } from "react-virtualized";

class FindJob extends PureComponent {
  static propTypes = {
    id: PropTypes.string,
    goBack: PropTypes.func.isRequired,
    back: PropTypes.string.isRequired,
    goToPanel: PropTypes.func,
    vacations: PropTypes.arrayOf(
      PropTypes.shape({
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
      })
    ),
    selectedCity: PropTypes.object,
    handleCellClick: PropTypes.func
  };

  state = {
    search: "",
    skip: 20
  };

  componentDidMount = () => {
    this.props.fetchVacations({
      skip: 0,
      isAllowToShow: true,
      'city.id': this.props.selectedCity.id,
      isNotActive: false
    }, true);
  };

  timer = null;

  handleSearchChange = search => {
    this.setState({ search });

    if(this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(() => {
      this.props.fetchVacations({
        skip: 0,
        name: search,
        isAllowToShow: true,
        'city.id': this.props.selectedCity.id,
        isNotActive: false
      }, true);
      this.setState({skip: 20});
    }, 1000);
  }

  handleBackClick = () => {
    const { goBack, back } = this.props;
    goBack(back);
  };

  handleToggleContext = () => {
    this.setState(prevState => {
      return {
        contextOpened: !prevState.contextOpened
      };
    });
  };

  handleGoToExtendedFilters = () => {
    this.props.goToPanel("extendedfilters");
  };

  handleListScroll = data => {
    const { clientHeight, scrollHeight, scrollTop } = data;
    const length = this.props.vacations.length;
    if(this.props.isAllLoaded || this.props.isLoading) return null;
    if (
      !this.props.isLoading &&
      scrollHeight < (clientHeight + scrollTop + (scrollHeight * 10) / 100)
    ) {
      this.props.fetchVacations({
        skip: this.state.skip,
        isAllowToShow: true,
        'city.id': this.props.selectedCity.id,
        isNotActive: false
      });
      this.setState(prevState => {
        return {
          skip: prevState.skip + 20
        };
      });
    }
  };

  renderEmpty = () => {
    return (
      <div style={{marginLeft: 10}}>Вакансий пока нет</div>
    )
  }

  renderHeadButton = (
    <HeadButton onClick={this.handleBackClick} data-to="home" />
  );

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

  renderCell = ({ key, index, style, parent, ...restValues }) => {
    const el = this.props.vacations[index];
    const {
      name,
      salaryTo,
      salaryFrom,
      organization,
      city,
      createdAt,
      description
    } = el;
    const { width } = parent.props;

    const salary = this.renderSalary(el);

    return (
      <div
        key={key}
        style={style}
        className="jobcell"
        name={index}
        onClick={() => this.props.handleCellClick(el)}
      >
        <div className="jobcell__head">
          <p>
            <span className="jobcell__head--name">{name}</span>
            <span className="jobcell__head--salary">{salary}</span>
          </p>
        </div>
        <div className="jobcell__subhead">
          <p className="jobcell__subhead--organization">{organization}</p>
          <p className="jobcell__subhead--second">
            <span className="jobcell__subhead--second-city">
              {city && city.title}
            </span>
            <span className="jobcell__subhead--second-created">
              {createdAt ? formatDate(new Date(createdAt)) : null}
            </span>
          </p>
        </div>
        <div className="jobcell__body">
          {reduceStringLength(description, Math.round(width / 2))}
        </div>
      </div>
    );
  };

  render() {
    const { id } = this.props;
    return (
      <Panel id={id}>
        <PanelHeader left={this.renderHeadButton}>
          <PanelHeaderContent>
          {/* aside={<Icon16Dropdown />} onClick={this.handleToggleContext} */}
            Вакансии
          </PanelHeaderContent>
        </PanelHeader>
        {/*<HeaderContext
          opened={this.state.contextOpened}
          onClose={this.handleToggleContext}
        >
          <VkList>
            <Cell onClick={this.handleGoToExtendedFilters}>
              Расширенные фильтры
            </Cell>
          </VkList>
        </HeaderContext>*/}
        <Search
          value={this.state.search}
          onChange={this.handleSearchChange}
        />
        <AutoSizer>
          {({ height, width }) => {
            return (
              <>
                <List
                  rowCount={this.props.vacations.length}
                  height={height - 37}
                  width={width}
                  rowHeight={150}
                  rowRenderer={this.renderCell}
                  onScroll={this.handleListScroll}
                  noRowsRenderer={this.renderEmpty}
                ></List>
              </>
            );
          }}
        </AutoSizer>
        {this.props.isLoading && (
          <Spinner size="regular" style={{ marginTop: 20 }} />
        )}
      </Panel>
    );
  }
}

export default connect(
  state => {
    return {
      vacations: listEntitiesSelector(state),
      isLoading: listLoadingSelector(state),
      error: listErrorSelector(state),
      isAllLoaded: listIsAllLoadedSelector(state)
    };
  },
  {
    fetchVacations
  }
)(FindJob);
