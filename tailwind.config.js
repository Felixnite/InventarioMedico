/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./views/**/*.ejs"],
  content: [
    "./views/**/*.html",  
    "./src/**/*.js",
    "./components/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4769c2',
        secondary: '#97c76b',
        accent: '#edbd45',
        dark: '#1a365d'
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in',
        'fade-out': 'fadeOut 0.2s ease-out',
        'scale-in': 'scaleIn 0.2s ease-in',
        'scale-out': 'scaleOut 0.2s ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 }
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 }
        },
        scaleOut: {
          '0%': { transform: 'scale(1)', opacity: 1 },
          '100%': { transform: 'scale(0.95)', opacity: 0 }
        }
      }
    },
  },
  plugins: [],
}