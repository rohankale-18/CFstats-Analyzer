/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textColor: {
        'Newbie':'#C9C8CB',
        'Pupil':'#1C8F1D',
        'Specialist':'#0FACA3',
        'Expert':'#0100FE',
        'CandidateMaster':'#8E1E8E',
        'Master':'#FFA500',
        'InternationalMaster':'#FEB125',
        'GrandMaster':'#FE0001',
        'InternationalGrandMaster':'#FE1F1F',
        'LegendaryGrandMaster':'#FE1F1F',
      },
      backgroundColor: {
        'navbar':'#FFBA39',
        
      }
    },
  },
  plugins: [],
}

