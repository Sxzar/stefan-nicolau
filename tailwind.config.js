/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  prefix: 'tw-',
  content: [
     "./src/**/*.{njk,html,js}","./src/**/*.{njk,html,js}"
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
        noto: ['Noto', 'sans-serif'],
        notoSerif: ['Noto Serif', 'serif'],
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        'barbershop': {
          "primary": "#313131",
          "primary-content": "#353634",
          "secondary": "#F8F8F8",
          "secondary-content": "#413028",
          "accent": "#d5b480",
          "accent-content": "#d7cdbf",
          "base-100": "#313131",
          "base-200": "#686868",
          "success": "#81c784",
          "warning": "#ffb74d",
          "error": "#e57373",
          "info": "#4fc3f7"
        },
      }
    ]
  }
}

