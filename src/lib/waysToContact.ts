import { newLocalizedString } from './i18n-config';

// TODO: Move localization to dictionaries
export const waysToContact = [
    {
        name: newLocalizedString().set('en', 'Telegram'),
        prefix: '@/+',
        placeholder: 'durov/995 555 555 555',
        maxLength: 32,
        minLength: 4,
        validation: (value: string) => {
            if (value.length > 32)
                return newLocalizedString()
                    .set('en', 'Too long')
                    .set('ru', 'Имя/телефон слишком длинный');
            if (value.length < 4)
                return newLocalizedString()
                    .set('en', 'Too short')
                    .set('ru', 'Имя/телефон слишком короткий');
            if (!value.match(/^[a-z0-9_ \)\(-]+$/gim))
                return newLocalizedString()
                    .set('en', 'Invalid characters')
                    .set('ru', 'Недопустимые символы');
            return null;
        },
    },
    {
        name: newLocalizedString().set('en', 'Instagram'),
        prefix: '@',
        placeholder: 'slivki_coffee_ge',
        maxLength: 30,
        minLength: 1,
        validation: (value: string) => {
            if (value.length > 30)
                return newLocalizedString()
                    .set('en', 'Too long')
                    .set('ru', 'Имя слишком длинное');
            if (value.length < 1)
                return newLocalizedString()
                    .set('en', 'Too short')
                    .set('ru', 'Имя слишком короткое');
            if (!value.match(/^[a-z0-9_\.]+$/gim))
                return newLocalizedString()
                    .set('en', 'Invalid characters')
                    .set('ru', 'Недопустимые символы');
            return null;
        },
        warning: newLocalizedString()
            .set(
                'ru',
                'Чтобы мы смогли с вами связаться, ваш профиль должен быть открытым'
            )
            .set(
                'en',
                'In order for us to be able to contact you, your profile must be public'
            ),
    },
    {
        name: newLocalizedString().set('en', 'Phone').set('ru', 'Телефон'),
        prefix: '+995',
        placeholder: '555 555 555',
        maxLength: 17,
        minLength: 9,
        validation: (value: string) => {
            if (value.length > 17)
                return newLocalizedString()
                    .set('en', 'Too long')
                    .set('ru', 'Телефон слишком длинный');
            if (value.length < 9)
                return newLocalizedString()
                    .set('en', 'Too short')
                    .set('ru', 'Телефон слишком короткий');
            if (!value.match(/^[0-9 \)\(-]+$/gim))
                return newLocalizedString()
                    .set('en', 'Invalid characters')
                    .set('ru', 'Недопустимые символы');
            return null;
        },
    },
];
