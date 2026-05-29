/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        sand: 'var(--sand)',
        parchment: 'var(--parchment)',
        ember: 'var(--accent)',
        emberStrong: 'var(--accent-strong)',
        clay: 'var(--clay)',
        cocoa: 'var(--muted)',
        smoke: 'var(--smoke)',
        mist: 'var(--mist)',
        stone: 'var(--stone)',
        ink: 'var(--text)',
        panel: 'var(--panel)',
        panelSoft: 'var(--panel-soft)'
      },
      boxShadow: {
        soft: '0 18px 45px rgba(91, 47, 18, 0.12)'
      },
      borderRadius: {
        xl2: '1.25rem'
      }
    }
  },
  plugins: []
};
