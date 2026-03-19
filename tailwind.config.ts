import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#F8FBFF',
        backgroundSecondary: '#EEF5FF',
        panel: '#FFFFFF',
        accentPrimary: '#5C59E4',
        accentSecondary: '#386CF4',
        accentHighlight: '#E9436F',
        textPrimary: '#171A2B',
        textSecondary: '#5C667A',
        border: '#D8E4F4',
      },
      boxShadow: {
        soft: '0 16px 40px rgba(25, 50, 95, 0.08)',
        glow: '0 18px 45px rgba(92, 89, 228, 0.2)',
      },
      borderRadius: {
        xl: '1.25rem',
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
