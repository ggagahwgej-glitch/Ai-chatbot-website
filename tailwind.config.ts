/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#101014',
        secondary: '#191923',
        primaryAccent: '#8B5CF6',
        secondaryAccent: '#60A5FA',
        text: '#F8FAFC',
      }
    },
  },
  plugins: [],
}
