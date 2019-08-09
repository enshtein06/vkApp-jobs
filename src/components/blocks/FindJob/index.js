import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { fetchVacations } from '../../../ducks/vacations';

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


const fakeList = [];
for(let i = 0; i < 20; i++) {
    fakeList.push({
        name: `Официант`,
        id: `id: ${i}`,
        salary: `${i + 1}0 000 rub.`,
        organization: 'Ресторан: The doors bar',
        city: 'Saint P.',
        createdAt: new Date(),
        description: 'Controls the alignment scrolled-to-rows. The default ("auto") scrolls the least amount possible to ensure that the specified row is fully visible. Use "start" to always align rows to the top of the list and "end" to align them bottom. Use "center" to align them in the middle of container.',
        contacts: [
            {
                name: 'Alex',
                numbers: '89992145123'
            }, {
                name: 'Elena',
                numbers: '89525426672'
            }
        ],
        address: 'address asd',
        employmentType: 'full time',
        requirments: [
            'Также вы можете использовать предопределенные константы, определяющие платформу:', 
            'Как вариант, на корневой элемент можно навесить модификаторы.'
        ],
        activities: [
            'Также вы можете использовать предопределенные константы, определяющие платформу:', 
            'Как вариант, на корневой элемент можно навесить модификаторы.'
        ],
        bonuses: [
            'Также вы можете использовать предопределенные константы, определяющие платформу:', 
            'Как вариант, на корневой элемент можно навесить модификаторы.'
        ],
        wishes: [
            'Также вы можете использовать предопределенные константы, определяющие платформу:', 
            'Как вариант, на корневой элемент можно навесить модификаторы.'
        ],
        expirience: 'от 1 до 3 года'
    });
}

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
        handleCellClick: PropTypes.func
    }

    state = {
        search: '',
        contextOpened: false,
        isRequestStarted: false,
        isLoaded: false,
        listArray: [...fakeList]
    }

    componentDidMount = () => {
        this.props.fetchVacations();
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
        const length = this.state.listArray.length;
        if(!
            this.state.isRequestStarted && 
            (scrollHeight < (
                clientHeight + scrollTop + (scrollHeight * 10 / 100)
            ))
        ) {
            this.setState({isRequestStarted: true});
            const listArray = [...this.state.listArray];
            for(let i = length; i < length + 10; i++) {
                listArray.push({
                    name: `Официант`,
                    id: `id: ${i}`,
                    salary: `${i + 1}0 000 rub.`,
                    organization: 'Ресторан: The doors bar',
                    city: 'Saint P.',
                    createdAt: new Date(),
                    description: 'Controls the alignment scrolled-to-rows. The default ("auto") scrolls the least amount possible to ensure that the specified row is fully visible. Use "start" to always align rows to the top of the list and "end" to align them bottom. Use "center" to align them in the middle of container.',
                    contacts: [
                        {
                            name: 'Alex',
                            numbers: '89992145123'
                        }, {
                            name: 'Elena',
                            numbers: '89525426672'
                        }
                    ],
                    address: 'address asd',
                    employmentType: 'full time',
                    requirments: [
                        'Также вы можете использовать предопределенные константы, определяющие платформу:', 
                        'Как вариант, на корневой элемент можно навесить модификаторы.'
                    ],
                    activities: [
                        'Также вы можете использовать предопределенные константы, определяющие платформу:', 
                        'Как вариант, на корневой элемент можно навесить модификаторы.'
                    ],
                    bonuses: [
                        'Также вы можете использовать предопределенные константы, определяющие платформу:', 
                        'Как вариант, на корневой элемент можно навесить модификаторы.'
                    ],
                    wishes: [
                        'Также вы можете использовать предопределенные константы, определяющие платформу:', 
                        'Как вариант, на корневой элемент можно навесить модификаторы.'
                    ],
                    expirience: 'от 1 до 3 года'
                });
            }
            setTimeout(() => {
                this.setState({listArray, isRequestStarted: false});
            }, 2000);
        }
    }

    renderHeadButton = (
        <HeadButton onClick={this.handleBackClick} data-to="home" />
    )

    renderCell = ({ key, index, style }) => {
        const el = this.state.listArray[index];
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
                        <span className='jobcell__subhead--second-city'>{city}</span> 
                        <span className='jobcell__subhead--second-created'>
                            {formatDate(createdAt)}
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
                                    rowCount={this.state.listArray.length}
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
                {this.state.isRequestStarted && 
                    <Spinner size="regular" style={{ marginTop: 20 }} />}
            </Panel>
        )
    }
}

export default connect((state) => {
    return {
        vacations: []
    }
}, {
    fetchVacations
})(FindJob);
