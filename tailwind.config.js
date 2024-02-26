/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-background': "url('../public/assets/background.svg')",
        'red-button-background':
          "url('../public/assets/red-button-background.svg')",
        'blue-button-background':
          "url('../public/assets/blue-button-background.png')",
        'yellow-button-background':
          "url('../public/assets/yellow-button-background.svg')",
      },
      colors: {
        primary: '#2169ac',
        secondary: '#d4ae5c',
        'red-light': '#EB6C46',
        'red-medium': '#B84927',
        'red-dark': '#9F3616',
        'red-darkest': '#581D0B',
        'blue-light': '#72CDDA',
        'blue-medium': '#3994A0',
        'blue-dark': '#2B7984',
        'blue-darkest': '#0F434A',
        'yellow-light': '#E8D952',
        'yellow-medium': '#D2C445',
        'yellow-dark': '#B6AB49',
        'yellow-darkest': '#8D8220',
      },
      boxShadow: {
        custom: '3px 3px 15px 0px rgba(0, 0, 0, 0.45)',
      },
    },
  },
  plugins: [],
};
