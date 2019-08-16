import { required } from "../../../utils/validations";

export const fields = {
  name: {
    id: "name",
    props: {
      name: "name",
      type: "text",
      top: "Должность",
      placeholder: "Кого вы ищите?",
      bottom: "* обязательно"
    },
    errorMsg: "Должность: необходимо ввести",
    error: null,
    validate: [required],
    required: true
  },
  salaryFrom: {
    id: "salaryFrom",
    props: {
      name: "salaryFrom",
      type: "text",
      placeholder: "от"
    },
    error: null,
    validate: []
  },
  salaryTo: {
    id: "salaryTo",
    props: {
      name: "salaryTo",
      type: "text",
      placeholder: "до"
    },
    error: null,
    validate: []
  },
  organization: {
    id: "organization",
    props: {
      name: "organization",
      type: "text",
      top: "Наименование организации",
      placeholder: "Ваша организация...",
      bottom: "* обязательно"
    },
    error: null,
    errorMsg: "Должность: необходимо ввести",
    validate: [required],
    required: true
  },
  expirience: {
    id: "expirience",
    props: {
      name: "expirience",
      type: "select",
      top: "Опыт работы",
      placeholder: "Выберите опыт работы"
    },
    lookupKey: "expirience",
    error: null,
    validate: []
  },
  description: {
    id: "description",
    props: {
      name: "description",
      type: "text",
      top: "Краткое описание",
      placeholder: "Это первое, что увидит соискатель при поиске вакансии"
    },
    error: null,
    validate: []
  },
  employmentType: {
    id: "employmentType",
    props: {
      name: "employmentType",
      type: "select",
      top: "Тип занятости",
      placeholder: "Выберите тип занятости"
    },
    lookupKey: "employmentType",
    error: null,
    validate: []
  },
  schedule: {
    id: "schedule",
    props: {
      name: "schedule",
      type: "select",
      top: "График",
      placeholder: "Выберите график работы"
    },
    lookupKey: "schedule",
    error: null,
    validate: []
  },
  requirments: {
    id: "requirments",
    props: {
      name: "requirments",
      type: "text",
      top: "Требования к соискателю",
      placeholder: "Введите требование"
    },
    error: null,
    validate: [],
    isMulti: true
  },
  wishes: {
    id: "wishes",
    props: {
      name: "wishes",
      type: "text",
      top: "Будет плюсом",
      placeholder: "Введите плюсы"
    },
    error: null,
    validate: [],
    isMulti: true
  },
  activities: {
    id: "activities",
    props: {
      name: "activities",
      type: "text",
      top: "Обязанности в работе",
      placeholder: "Чем будет заниматься?"
    },
    error: null,
    validate: [],
    isMulti: true
  },
  bonuses: {
    id: "bonuses",
    props: {
      name: "bonuses",
      type: "text",
      top: "Что получит соискатель?",
      placeholder: "Введите бонусы"
    },
    error: null,
    validate: [],
    isMulti: true
  },
  contact_name: {
    id: "contact_name",
    props: {
      name: "contact_name",
      type: "text",
      placeholder: "Имя"
    },
    error: null,
    validate: [],
    isMulti: true
  },
  contact_numbers: {
    id: "contact_numbers",
    props: {
      name: "contact_numbers",
      type: "text",
      placeholder: "Телефон"
    },
    error: null,
    validate: [],
    isMulti: true
  },
  contact_email: {
    id: "contact_email",
    props: {
      name: "contact_email",
      type: "text",
      placeholder: "Email"
    },
    error: null,
    validate: [],
    isMulti: true
  },
  address: {
    id: "address",
    props: {
      name: "address",
      type: "text",
      top: "Ваш адрес",
      placeholder: "Введите адрес организации"
    },
    error: null,
    validate: []
  }
};
