/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    extend: {
        screens: {
            xs: '375px',
        },
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: ['cupcake'],
    },
};
