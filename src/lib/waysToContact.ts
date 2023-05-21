import { newLocalizedString } from './i18n-config';

export const waysToContact = [
    {
        name: newLocalizedString().set('en', 'Telegram'),
        prefix: '@/+',
        placeholder: 'durov/995 555 555 555',
    },
    {
        name: newLocalizedString().set('en', 'Instagram'),
        prefix: '@',
        placeholder: 'slivki_coffee_ge',
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
    },
];
