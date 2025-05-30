import tailwindScrollbar from 'tailwind-scrollbar';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        scrollbar: '#888',
        'scrollbar-thumb': '#555',
        'scrollbar-track': '#f1f1f1',
      },
    },
  },
  plugins: [tailwindScrollbar],
};
