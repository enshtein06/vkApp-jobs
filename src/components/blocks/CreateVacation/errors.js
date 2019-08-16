export const errors = [
    {
        message: 'Вам запрещено создавать вакансии модераторами приложения',
        validate: (values) => {
            const { vkUser, vacations } = values;
            return !!(vkUser && !vkUser.isAbleToCreateVacations);
        }
    }, {
        message: 'Вы создали слишком много вакансий. Можете увеличить лимит создания в личном кабинете!',
        validate: (values) => {
            const { vkUser, vacations } = values;
            return !!(vkUser.vacationsLimit && Array.isArray(vacations) &&
                vkUser.vacationsLimit < vacations.length);
        }
    }
]