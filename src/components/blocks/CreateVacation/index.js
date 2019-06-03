import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
    Panel,
    PanelHeader,
    FormLayout,
    FormLayoutGroup,
    Input,
    Textarea,
    Select,
    Button
} from '@vkontakte/vkui';
import HeadButton from '../../commons/buttons/HeadButton';
import { fields } from './fields';
import './CreateVacation.css';

const propTypes = {
    initialValues: PropTypes.object,
    goBack: PropTypes.func,
    handleValuesUpdate: PropTypes.func.isRequired
}

const defaultProps = {
    initialValues: {}
}
const emptyArr = [];

class CreateVacation extends PureComponent{
    state = {
        values: this.props.initialValues,
        multiValues: {
            requirments: [0],
            wishes: [0],
            activities: [0],
            bonuses: [0],
            contacts: [0]
        },
        errors: {
            name: 'Должность: необходимо ввести',
            organization: 'Должность: необходимо ввести'
        }
    }

    handleCreateButtonClick = () => {
        if(this.props.handleValuesUpdate) this.props.handleValuesUpdate(this.state.values);
    }

    handleChangeField = (event) => {
        const { name, value } = event.currentTarget;

        const field = fields[name];

        this.setState(prevState => {
            const newState = {
                values: {
                    ...prevState.values,
                    [name]: value
                }
            };

            if(Array.isArray(field.validate) && field.validate.length) {
                let error = null;
                field.validate.some((validateCallback) => {
                    const errorRes = validateCallback(value, field.errorMsg);
                    if(errorRes) {
                        error = errorRes;
                        return true;
                    }
                    return false;
                });

                newState.errors = {
                    ...prevState.errors,
                    [name]: error
                }
            }

            return newState;
        });
    }

    handleAddButtonClick = (event) => {
        const { name } = event.target;
        
        this.setState(prevState => {
            return {
                multiValues: {
                    ...prevState.multiValues,
                    [name]: prevState.multiValues[name] && 
                        prevState.multiValues[name].concat(
                            prevState.multiValues[name].length
                        )
                }
            }
        })
    }

    render() {
        const {
            name,
            salaryFrom,
            salaryTo,
            organization,
            expirience,
            employmentType,
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
            <Panel id={this.props.id}>
                <PanelHeader left={<HeadButton onClick={this.props.goBack} />}>
                    Создать вакансию
                </PanelHeader>
                <div className='createVacation'>
                    <FormLayout>
                        <Input {...name.props} onChange={this.handleChangeField} />
                        <FormLayoutGroup top="Заработная плата">
                            <Input {...salaryFrom.props} onChange={this.handleChangeField} />
                            <Input {...salaryTo.props} onChange={this.handleChangeField} />
                        </FormLayoutGroup>
                        <Input {...organization.props} onChange={this.handleChangeField} />
                        <Select 
                            {...expirience.props} 
                            options={
                                this.props.lookups && 
                                this.props.lookups[expirience.lookupKey] || 
                                emptyArr
                            } 
                            onChange={this.handleChangeField} 
                        />
                        <Select 
                            {...employmentType.props} 
                            options={
                                this.props.lookups && 
                                this.props.lookups[employmentType.lookupKey] || 
                                emptyArr
                            } 
                            onChange={this.handleChangeField} 
                        />
                        <FormLayoutGroup 
                            top='Требования к кандидату' 
                            bottom='Уважите ваши требования к кандидату'
                        >
                            {this.state.multiValues.requirments.map(reqId => {
                                return (
                                    <Input 
                                        {...requirments.props} 
                                        name={`${requirments.props.name}__${reqId}`} 
                                        onChange={this.handleChangeField}
                                    />
                                )
                            })}
                            <button 
                                name={requirments.props.name} 
                                className='createVacation__addButton'
                                onClick={this.handleAddButtonClick}
                            >+</button>
                        </FormLayoutGroup>
                        <FormLayoutGroup 
                            top='Будет плюсом' 
                            bottom='Уважите что будет плюсом вашего кандидата'
                        >
                            {this.state.multiValues.wishes.map(wishId => {
                                return (
                                    <Input 
                                        {...wishes.props} 
                                        name={`${wishes.props.name}__${wishId}`} 
                                        onChange={this.handleChangeField}
                                    />
                                )
                            })}
                            <button 
                                name={wishes.props.name} 
                                onClick={this.handleAddButtonClick}
                                className='createVacation__addButton'
                            >+</button>
                        </FormLayoutGroup>
                        <FormLayoutGroup 
                            top='Чем будет заниматься' 
                            bottom='Уважите ваши чем будет заниматься ваш кандидат'
                        >
                            {this.state.multiValues.activities.map(activityId => {
                                return (
                                    <Input 
                                        {...activities.props} 
                                        name={`${activities.props.name}__${activityId}`} 
                                        onChange={this.handleChangeField}
                                    />
                                )
                            })}
                            <button 
                                name={activities.props.name} 
                                onClick={this.handleAddButtonClick}
                                className='createVacation__addButton'
                            >+</button>
                        </FormLayoutGroup>
                        <FormLayoutGroup 
                            top='Что получит взамен' 
                            bottom='Уважите что получить за работу ваш кандидат'
                        >
                            {this.state.multiValues.bonuses.map(activityId => {
                                return (
                                    <Input 
                                        {...bonuses.props} 
                                        name={`${bonuses.props.name}__${activityId}`} 
                                        onChange={this.handleChangeField}
                                    />
                                )
                            })}
                            <button 
                                name={bonuses.props.name} 
                                onClick={this.handleAddButtonClick}
                                className='createVacation__addButton'
                            >+</button>
                        </FormLayoutGroup>
                        <Textarea 
                            {...description.props} 
                            onChange={this.handleChangeField} 
                        />
                        <FormLayoutGroup top='Контакты'>
                            {this.state.multiValues.contacts.map((contactId, index) => {
                                return (
                                    <div 
                                        key={contactId}
                                        className='createVacation__contacts'
                                    >
                                        <h3 
                                            className='createVacation__contacts--head'
                                        >Контакт {index + 1}</h3>
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
                                )
                            })}
                            <button 
                                name='contacts' 
                                onClick={this.handleAddButtonClick}
                                className='createVacation__addButton'
                            >+</button>
                        </FormLayoutGroup>
                        <Input {...address.props} onChange={this.handleChangeField} />

                        <Button 
                            size="xl" 
                            onClick={this.handleCreateButtonClick}
                            disabled={
                                !!Object
                                    .keys(this.state.errors)
                                    .some(errorKey => this.state.errors[errorKey])
                            }
                        >Создать вакансию</Button>
                    </FormLayout>
                </div>
            </Panel>
        )
    }
}

CreateVacation.propTypes = propTypes;
CreateVacation.defaultProps = defaultProps;

export default CreateVacation;