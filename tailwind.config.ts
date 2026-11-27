import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        violet: '#8B5CF6',
        cyan: '#06B6D4',
        rose: '#EC4899',
        background: '#101014',
        surface: '#191923',
        text: '#F8FAFC',
        action: '#60A5FA', // Blue for Story/Action
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'glow': '0 0 15px rgba(139, 92, 246, 0.5)',
        'glow-cyan': '0 0 15px rgba(6, 182, 212, 0.5)',
        'glow-rose': '0 0 15px rgba(236, 72, 153, 0.5)',
      },
      borderWidth: {
        'glow': '1px',
      },
      borderColor: {
        'glow': 'rgba(139, 92, 246, 0.3)',
        'glow-cyan': 'rgba(6, 182, 212, 0.3)',
        'glow-rose': 'rgba(236, 72, 153, 0.3)',
      },
    },
  },
  plugins: [],
}
export default config
