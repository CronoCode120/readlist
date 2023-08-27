/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      backgroundSize: {
        'size-200': '200%'
      },
      keyframes: {
        slide: {
          '0%': { backgroundPosition: '0% center' },
          '100%': { backgroundPosition: '200% center' }
        }
      },
      animation: {
        // eslint-disable-next-line quote-props
        'slide': 'slide 1.2s linear infinite'
      }
    }
  },
  plugins: []
}
