import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
    Panel,
    PanelHeader,
    FormLayout,
    FormLayoutGroup,
    Input,
    Textarea,
    Button,
    Select
} from '@vkontakte/vkui';
import HeadButton from '../../commons/buttons/HeadButton';

const propTypes = {
    initialValues: PropTypes.object,
    goBack: PropTypes.func
}

const defaultProps = {
    initialValues: {}
}

const required = (values, id, errorMsg = 'Необходимо ввести!') => {
    if(!values[id]) return errorMsg;
    return null;
}

class CreateVacation extends PureComponent{
    state = {
        fields: {
            name: {
                id: 'name',
                props: {
                    name: 'name',
                    type: 'text',
                    top: 'Должность',
                    placeholder: 'Кого вы ищите?'
                },
                error: null,
                validatate: [required],
                required: true
            }, 
            salaryFrom: {
                id: 'salaryFrom',
                props: {
                    name: 'salaryFrom',
                    type: 'text',
                    placeholder: 'от'
                },
                error: null,
                validatate: []
            },
            salaryTo: {
                id: 'salaryTo',
                props: {
                    name: 'salaryTo',
                    type: 'text',
                    placeholder: 'до'
                },
                error: null,
                validatate: []
            },
            organization: {
                id: 'organization',
                props: {
                    name: 'organization',
                    type: 'text',
                    top: 'Наименование организации',
                    placeholder: 'Ваша организация...'
                },
                error: null,
                validatate: [required],
                required: true
            },
            expirience: {
                id: 'expirience',
                props: {
                    name: 'expirience',
                    type: 'select',
                    top: 'Опыт работы',
                    placeholder: 'Выберите опыт работы'
                },
                error: null,
                validatate: []
            },
            employmentType: {
                id: 'employmentType',
                props: {
                    name: 'employmentType',
                    type: 'select',
                    top: 'Тип занятости',
                    placeholder: 'Выберите тип занятости'
                },
                error: null,
                validatate: []
            },
            requirments: {
                id: 'requirments',
                props: {
                    name: 'requirments',
                    type: 'text',
                    top: 'Требования к соискателю',
                    placeholder: 'Введите требование'
                },
                error: null,
                validatate: [],
                isMulti: true
            },
            wishes: {
                id: 'wishes',
                props: {
                    name: 'wishes',
                    type: 'text',
                    top: 'Будет плюсом',
                    placeholder: 'Введите плюсы'
                },
                error: null,
                validatate: [],
                isMulti: true
            },
            activities: {
                id: 'activities',
                props: {
                    name: 'activities',
                    type: 'text',
                    top: 'Обязанности в работе',
                    placeholder: 'Чем будет заниматься?'
                },
                error: null,
                validatate: [],
                isMulti: true
            }, 
            bonuses: {
                id: 'bonuses',
                props: {
                    name: 'bonuses',
                    type: 'text',
                    top: 'Что получит соискатель?',
                    placeholder: 'Введите бонусы'
                },
                error: null,
                validatate: [],
                isMulti: true
            },
            description: {
                id: 'description',
                props: {
                    name: 'description',
                    type: 'text',
                    top: 'Краткое описание',
                    placeholder: 'Это первое, что увидит соискатель при поиске вакансии'
                },
                error: null,
                validatate: []
            },
            contacts: {
                id: 'contacts',
                props: {
                    name: 'contacts',
                    type: 'text',
                    top: 'Контакты для связи',
                    placeholder: ''
                },
                error: null,
                validatate: []
            },
            address: {
                id: 'address',
                props: {
                    name: 'address',
                    type: 'text',
                    top: 'Ваш адрес',
                    placeholder: 'Введите адрес организации'
                },
                error: null,
                validatate: []
            }
        }
    }

    render() {
        return (
            <Panel>
                <PanelHeader left={<HeadButton onClick={this.props.goBack} />}>
                    Создать вакансию
                </PanelHeader>
                <FormLayout>
                    <Input />
                </FormLayout>
            </Panel>
        )
    }
}