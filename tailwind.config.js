/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'fundoHome': "url('src\img\fundoHome.jpg')",        
      }
    },
  },
  plugins: [],
}

