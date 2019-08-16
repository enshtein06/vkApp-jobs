import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import {
    fetchVacations,
    listEntitiesSelector,
    listLoadingSelector,
    listErrorSelector
} from '../../../ducks/vacations';

import { 
    Panel, 
    PanelHeader, 
    Search, 
    PanelHeaderContent, 
    HeaderContext,
    Cell,
    Spinner,
    List as VkList
} from '@vkontakte/vkui';
import HeadButton from '../../commons/buttons/HeadButton';
import Icon16Dropdown from '@vkontakte/icons/dist/16/dropdown';

import { reduceStringLength, formatDate } from '../../../utils';
import './FindJob.css';
import { List, AutoSizer } from 'react-virtualized';


class FindJob extends PureComponent {
    static propTypes = {
        id: PropTypes.string,
        goBack: PropTypes.func.isRequired,
        back: PropTypes.string.isRequired,
        goToPanel: PropTypes.func,
        vacations: PropTypes.arrayOf(PropTypes.shape({
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
            contacts: PropTypes.arrayOf(PropTypes.shape({
                name: PropTypes.string,
                numbers: PropTypes.string
            })),
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
        })),
        selectedCity: PropTypes.object,
        handleCellClick: PropTypes.func
    }

    state = {
        search: '',
        skip: 0
    }

    componentDidMount = () => {
        this.props.fetchVacations({
            skip: this.state.skip
        });
    }

    handleSearchChange = (search) => this.setState({ search });

    handleBackClick = () => {
        const { goBack, back } = this.props;
        goBack(back);
    }

    handleToggleContext = () => {
        this.setState(prevState => {
            return {
                contextOpened: !prevState.contextOpened
            }
        });
    }

    handleGoToExtendedFilters = () => {
        this.props.goToPanel('extendedfilters')
    }

    handleListScroll = (data) => {
        const { clientHeight, scrollHeight, scrollTop } = data;
        const length = this.props.vacations.length;
        if(!
            this.props.isLoading && 
            (scrollHeight < (
                clientHeight + scrollTop + (scrollHeight * 10 / 100)
            ))
        ) {
            this.props.fetchVacations({
                skip: this.state.skip
            });
            this.setState(prevState => {
                return {
                    skip: prevState.skip + length
                }
            });
        }
    }

    renderHeadButton = (
        <HeadButton onClick={this.handleBackClick} data-to="home" />
    )

    renderCell = ({ key, index, style }) => {
        const el = this.props.vacations[index];
        const {
            name,
            id,
            salary,
            organization,
            city,
            createdAt,
            description
        } = el;
        return (
            <div 
                key={key} 
                style={style}
                className='jobcell'
                name={index}
                onClick={() => this.props.handleCellClick(el)}
            >
                <div className='jobcell__head'>
                    <p>
                        <span className='jobcell__head--name'>{name}</span> 
                        <span className='jobcell__head--salary'>{salary}</span>
                    </p>
                </div>
                <div className='jobcell__subhead'>
                    <p className='jobcell__subhead--organization'>{organization}</p>
                    <p className='jobcell__subhead--second'>
                        <span className='jobcell__subhead--second-city'>{city && city.title}</span> 
                        <span className='jobcell__subhead--second-created'>
                            {createdAt ? formatDate(new Date(createdAt)) : null}
                        </span>
                    </p>
                </div>
                <div className='jobcell__body'>{reduceStringLength(description, 200)}</div>
            </div>
        )
    }

    render() {
        const { id } = this.props;
        return (
            <Panel id={id}>
                <PanelHeader left={this.renderHeadButton}>
                    <PanelHeaderContent aside={<Icon16Dropdown />} onClick={this.handleToggleContext}>
                        Вакансии
                    </PanelHeaderContent>
                </PanelHeader>
                <HeaderContext 
                    opened={this.state.contextOpened} 
                    onClose={this.handleToggleContext}
                >
                    <VkList>
                        <Cell onClick={this.handleGoToExtendedFilters}>
                            Расширенные фильтры
                        </Cell>
                    </VkList>
                </HeaderContext>
                <Search value={this.state.search} onChange={this.handleSearchChange} />
                <AutoSizer>
                    {({height, width}) => {
                        return (
                            <>
                                <List 
                                    rowCount={this.props.vacations.length}
                                    height={height - 37}
                                    width={width}
                                    rowHeight={150}
                                    rowRenderer={this.renderCell}
                                    onScroll={this.handleListScroll}
                                ></List>
                            </>
                        )
                    }}
                </AutoSizer>
                {this.props.isLoading && 
                    <Spinner size="regular" style={{ marginTop: 20 }} />}
            </Panel>
        )
    }
}

export default connect((state) => {
    return {
        vacations: listEntitiesSelector(state),
        isLoading: listLoadingSelector(state),
        error: listErrorSelector(state)
    }
}, {
    fetchVacations
})(FindJob);
